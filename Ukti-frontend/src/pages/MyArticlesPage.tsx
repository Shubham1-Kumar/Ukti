import { useEffect, useState } from "react";
import { ArticleBar } from "../components/ArticleBar";
import { MyArticlesNav } from "../components/MyArticleNav";
import { useArticle } from "../hooks/useArticle";

type Article = {
  id: string;
  title: string;
  content: JSON;
  authorId: string;
  categoryId: string;
  likes: number;
  views: number;
  readingTime: number;
  coverImage: string | null;
  isFeatured: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  author: {
    id: string;
    name: string;
    avatar: string | null;
  };
};

type ArticlesApiResponse = {
  page: number;
  limit: number;
  count: number;
  articles: Article[];
};

export const MyArticlesPage = () => {
  const { GetAllArticlesForAUser, loading } = useArticle();
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const fetchArticles = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const userId = user?.id;
    if (!userId) return console.error("User ID missing");

    const queryInput = { query: { userId } };
    try {
      const data = await GetAllArticlesForAUser(queryInput);
      if (data?.articles) {
        setArticles(data.articles);
        localStorage.setItem("MyArticles", JSON.stringify(data));
      }
    } catch (err) {
      console.error("Error fetching articles:", err);
    }
  };

  useEffect(() => {
    const data = localStorage.getItem("MyArticles");
    if (data) {
      try {
        const parsedData: ArticlesApiResponse = JSON.parse(data);
        setArticles(parsedData.articles);
      } catch (e) {
        console.error("Parsing failed, refetching");
        fetchArticles();
      }
    } else {
      fetchArticles();
    }
  }, []);

  return (
    <>
      <MyArticlesNav />

      <div className="mx-5 mt-4">
        <header className="flex gap-10 items-center mx-0.5 my-2 py-2 font-semibold ">
          <span className="flex items-center gap-5">
            Select <p>|</p>{" "}
          </span>
          <span className="flex items-center gap-5">
            Title <p>|</p>
          </span>
          <span className="flex items-center gap-5">
            Category <p>|</p>{" "}
          </span>
          <span className="flex items-center gap-5">
            CreatedAt <p>|</p>{" "}
          </span>
          <span className="flex items-center gap-5">Status</span>
        </header>

        {loading ? (
          <p>Loading...</p>
        ) : articles.length > 0 ? (
          articles.map((article) => (
            <div
              key={article.id}
              className={`flex items-center gap-4 px-4 py-3 mb-3 border border-gray-300 rounded-md shadow-sm bg-white transition ${
                selectedId === article.id ? "ring-2 ring-blue-500" : ""
              }`}
            >
              <input
                type="radio"
                name="articleSelect"
                checked={selectedId === article.id}
                onChange={() => setSelectedId(article.id)}
                className="accent-blue-600 w-5 h-5"
              />
              <div className="ml-4 grid grid-cols-4 w-full gap-2">
                <ArticleBar
                  title={article.title}
                  category="Personal life" // Replace with dynamic category if available
                  createdAT={new Date(article.createdAt).toLocaleDateString()}
                  status={article.status}
                />
              </div>
            </div>
          ))
        ) : (
          <p>No articles found.</p>
        )}
      </div>
    </>
  );
};
