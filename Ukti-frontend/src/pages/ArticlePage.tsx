// pages/ArticlePage.tsx
import { useLocation } from "react-router-dom";
import { useMemo, useState } from "react";
import { InnerNav } from "../components/InnerNav";
import { convertDeltaToHtml } from "../utils/editorUtils";
import { ArticleNav } from "../components/ArticleNave";
import Avatar from "react-avatar";

export function ArticlePage() {
  const location = useLocation();
  const data = location.state;
  const [follow, setFollow] = useState(false);

  const followButtonClickHandler = () => {
    setFollow((prev) => !prev);
  };
  const articles = useMemo(() => {
    const stored = localStorage.getItem("Articles");
    try {
      return JSON.parse(stored || "{}")?.articles || [];
    } catch (err) {
      console.error("Failed to parse Articles from localStorage:", err);
      return [];
    }
  }, []);

  const currentArticle = useMemo(
    () => articles.find((article: any) => article?.id === data?.articleId),
    [articles, data]
  );

  if (!currentArticle)
    return <p className="text-center mt-10">Article not found</p>;

  const htmlContent = useMemo(
    () => convertDeltaToHtml(currentArticle?.content?.text || ""),
    [currentArticle]
  );

  const authorName = currentArticle?.author?.name || "Unknown";

  return (
    <>
      <InnerNav />
      <div className="flex flex-col items-center bg-gray-50 min-h-screen">
        <div className="max-w-5xl w-full px-4 md:px-6 pt-8 pb-16">
          {/* Title */}
          <h1 className="text-6xl font-semibold mb-4 leading-tight">
            {currentArticle.title}
          </h1>

          {/* Author Info */}
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-6 pt-5">
            <Avatar
              name={authorName}
              size="40" // Increase overall size
              textSizeRatio={2} // Smaller ratio = larger text
              round={true}
            />
            <span className="text-gray-700 text-xl">By {authorName}</span>
            {!follow ? (
              <button onClick={followButtonClickHandler} className="bg-white text-black font-medium border border-black px-5 py-2 rounded-full hover:bg-[#FF8205] hover:text-white">
                Follow
              </button>
            ) : (
              <button onClick={followButtonClickHandler} className="bg-white text-black font-medium border border-black px-5 py-2 rounded-full shadow-md drop-shadow-xl">
                Following
              </button>
            )}
            <span>•</span>
            <span>{data?.formattedDate || "Unknown date"}</span>
            <span>•</span>
            <span>3 min read</span>
          </div>

          {/* Article Navigation */}
          <div className=" mb-12 ">
            <ArticleNav articleId={data?.articleId} likes={data?.likes} comments={data?.comments} />
          </div>
          {/* Cover Image */}
          {currentArticle.coverImage && (
            <img
              className="w-full h-full rounded-md mb-8"
              src={currentArticle.coverImage}
              alt="cover"
              loading="lazy"
            />
          )}

          {/* Article Content */}
          <div
            className="prose prose-lg max-w-none text-gray-800"
            dangerouslySetInnerHTML={{
              __html: htmlContent || "<p>Hi there</p>",
            }}
          />
        </div>
      </div>
    </>
  );
}
