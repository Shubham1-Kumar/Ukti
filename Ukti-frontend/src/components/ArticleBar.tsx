import { FC } from "react";

interface ArticleBarInput {
  title: string;
  category: string;
  createdAT: string;
  status: string;
}

export const ArticleBar: FC<ArticleBarInput> = ({
  title = "",
  category = "",
  createdAT = "",
  status = "",
}) => {
  return (
    <>
      {/* No container grid here, it's already in MyArticlesPage */}
      <div
        title="Article's title"
        className="text-lg text-gray-900 truncate"
      >
        {title}
      </div>

      <div title="Category" className="text-md text-gray-800">
        {category}
      </div>

      <div title="Date of creation" className="text-md text-gray-700">
        {createdAT}
      </div>

      <div
        title="Status"
        className={`text-sm font-semibold ${
          status.toLowerCase() === "published"
            ? "text-green-600"
            : status.toLowerCase() === "draft"
            ? "text-yellow-600"
            : "text-gray-600"
        }`}
      >
        {status}
      </div>
    </>
  );
};
