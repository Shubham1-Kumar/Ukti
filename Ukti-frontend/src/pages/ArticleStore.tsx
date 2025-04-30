import { ArticleCard, ExampleArticleCard } from "../components/ArticleCard";
import { CategoryTabs } from "../components/CategoryTabs";
import { InnerNav } from "../components/InnerNav";
import { useEffect, useState } from "react";
import { useArticle } from "../hooks/useArticle";
import { Loader2 } from "lucide-react";
import { Article } from "../store/RecoilStore";
import { getCache } from "../utils/handleCache";
import { setCache } from "../utils/handleCache";
export function ArticleStore() {
  const [scrolled, setScrolled] = useState(false);
  const { GetAllArticlesForAUser, loading } = useArticle
  ();
  const [articles, setArticles] = useState<Article[]>([]);
  const [initialLoadDone, setInitialLoadDone] = useState(false);
  
  const cacheExpireTime = 1;
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 5);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Initial Load for "All" Articles
  useEffect(() => {
    const fetchAllArticles = async () => {
      const storageKey = "articles_all";
      const cached = getCache(storageKey);

      try {
        if (cached) {
          setArticles(cached);
        } else {
          const query = {
            query: {
              page: 1,
              limit: 10,
              sortBy: "createdAt" as "createdAt",
              order: "desc" as "desc",
            },
          };
          const result = await GetAllArticlesForAUser(query);
          const dataToSet = result?.articles || result || [];
          setCache(storageKey, dataToSet, cacheExpireTime); // cache for 1 minutes
          setArticles(
            Array.isArray(dataToSet) ? dataToSet : dataToSet.articles || []
          );
        }
      } catch (error) {
        console.error("Error loading articles on page load:", error);
        setArticles([]);
      } finally {
        setInitialLoadDone(true);
      }
    };
    fetchAllArticles();
  }, []);

  return (
    <div className="h-screen overflow-y-auto whitespace-nowrap scrollbar-hide bg-[#E8E7E6]">
      <InnerNav />

      <div className="flex justify-center ml-50 pt-1">
        <div className="w-full flex flex-col px-4">
          <div
            className={`sticky top-0 z-30 max-w-3xl overflow-x-auto whitespace-nowrap scrollbar-hide flex 
            transition-all duration-300 pt-2 pb-0 px-1
            ${scrolled ? "bg-transparent shadow-sm" : "bg-[#E8E7E6]"}`}
          >
            <CategoryTabs
              onCategoryClick={async (inputObject) => {
                const { finalQuery: query, categoryId } = inputObject;
                const storageKey = categoryId ?? "articles_all";
                const cached = getCache(storageKey);

                try {
                  if (cached) {
                    setArticles(cached);
                  } else {
                    const result = await GetAllArticlesForAUser(query);
                    const dataToSet = result?.articles || result || [];
                    setCache(storageKey, dataToSet, cacheExpireTime); // 1 mins cache
                    setArticles(
                      Array.isArray(dataToSet)
                        ? dataToSet
                        : dataToSet.articles || []
                    );
                  }
                } catch (error) {
                  console.error("Failed to load articles for category:", error);
                  setArticles([]);
                }
              }}
            />
          </div>

          {/* Article List */}
          <div className="mt-3 flex flex-col gap-4 max-w-3xl">
            {loading && !initialLoadDone ? (
              <div className="flex justify-center">
                <Loader2 className="animate-spin h-6 w-6" />
              </div>
            ) : articles.length === 0 ? (
              <div className="text-center text-gray-500 pt-8">
                No articles found.
              </div>
            ) : (
              articles.map((article: Article) => (
                <ArticleCard
                  key={article.id}
                  articleId={article.id}
                  title={article.title}
                  description={
                    article.description ??
                    "This is the general description from us"
                  }
                  comments={article.noOfComments}
                  likes={article.likes}
                  createdAT={article.createdAt}
                  coverImageUrl={article.coverImage}
                />
              ))
            )}

            {/* Sample fallback cards */}
            <ExampleArticleCard />
            <ExampleArticleCard />
          </div>
        </div>
      </div>
    </div>
  );
}
