import { Clock, Heart, MessageCircle, ChevronRight } from "lucide-react";
import { format } from "timeago.js";
import preBookMarkIcon from "../assets/svg/save_with_plus.svg";
import { useNavigate } from "react-router-dom";

type ArticleCardProps = {
  articleId: string;
  title: string;
  description: string;
  createdAT: string;
  likes: number;
  comments: number;
  coverImageUrl?: string | null;
  imageAlt?: string;
};

export const ArticleCard = ({
  articleId,
  title,
  description,
  createdAT,
  likes,
  comments,
  coverImageUrl = null,
  imageAlt = "Article image",
}: ArticleCardProps) => {
  const maxDescLength = 100;
  const truncatedDesc =
    description.length > maxDescLength
      ? description.slice(0, maxDescLength) + "..."
      : description;

  const fallbackImage = "https://via.placeholder.com/150?text=No+Image";
  const displayImage = coverImageUrl || fallbackImage;
  console.log(coverImageUrl);

  const formattedDate = createdAT
    ? format(new Date(createdAT))
    : "Some time ago";

  const navigate = useNavigate();
  const showArticleOnClick = () => {
    navigate("/articles/read" , {
      state: {
        articleId,
        title,
        description,
        formattedDate,
        likes,
        comments,
        coverImageUrl,
      }
    });
  };

  return (
    <div className="max-w-3xl rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 cursor-pointer">
      {/* Top section with title, description, and image */}
      <div className="p-6 flex justify-between items-start gap-2">
        {/* Text Content */}
        <div className="flex-1 max-w-xl">
          <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 text-wrap max-w-lg">
            {title}
          </h2>
          <p className="text-gray-600 text-sm max-w-lg text-wrap">
            {truncatedDesc}
          </p>
        </div>

        {/* Image */}
        <div className="w-50 h-25 flex-shrink-0">
          <img
            onClick={showArticleOnClick}
            src={displayImage}
            alt={imageAlt}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
      </div>

      {/* Bottom metadata section */}
      <div className="px-6 py-4 border-t border-gray-100 flex justify-between items-center">
        {/* Left stats */}
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <span className="flex items-center">
            <Clock className="h-5 w-5 mr-1 text-gray-600 " />
            {formattedDate}
          </span>
          <span className="flex items-center">
            <Heart className="h-5 w-5 mr-1 text-gray-600" />
            {likes}
          </span>
          <span className="flex items-center">
            <MessageCircle className="h-5 w-5 mr-1 text-gray-600" />
            {comments}
          </span>
        </div>
        <div>
          <span className="flex items-center">
            <img
              src={preBookMarkIcon}
              alt="pre save icon"
              className="h-5 w-5 ml-5"
            />
          </span>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Tags and Read more */}
        <div className="flex items-center space-x-4">
          {/* Tags */}
          <div className="flex space-x-2">
            <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
              Fitness
            </span>
            <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
              Health
            </span>
          </div>

          {/* Read more button */}
          <button
            onClick={showArticleOnClick}
            className="flex items-center text-blue-500 hover:text-blue-700 text-sm"
          >
            Read more <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Example usage:
export const ExampleArticleCard = () => (
  <ArticleCard
    articleId = ""
    title="Cardiac Deaths During Marathons Are Becoming Rare..."
    description="Vitamin D and your heart, Do massage guns actually help with recovery... What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry..."
    createdAT=""
    likes={365}
    comments={5}
    coverImageUrl="https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    imageAlt="Fitness related image"
  />
);
