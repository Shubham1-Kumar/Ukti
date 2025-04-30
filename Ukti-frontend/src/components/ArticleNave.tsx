// components/ArticleNav.tsx
import {
  Bookmark,
  MessageCircle,
  MoreHorizontal,
  Play,
  Share,
  Heart,
  HeartOff,
} from "lucide-react";
import { useArticle } from "../hooks/useArticle";
import { useState } from "react";

export function ArticleNav({ articleId , likes , comments }: { articleId: string , likes:number , comments:number}) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes); // example count
  const { likeArticle, unlikeArticle, loading, error } = useArticle();

  const handleLike = async () => {
    if (loading) return;

    try {
      if (isLiked) {
        await unlikeArticle(articleId);
        setIsLiked(false);
        setLikeCount((prev) => prev - 1);
      } else {
        await likeArticle(articleId);
        setIsLiked(true);
        setLikeCount((prev) => prev + 1);
      }
    } catch (err) {
      console.error("Error while liking/unliking the article:", err);
    }
  };

  return (
    <div className="flex items-center justify-between border-y py-5 border-gray-200 text-gray-600 text-sm">
      {/* Left - Likes & Comments */}
      <div className="flex space-x-6 items-center">
        <div
          className={`flex text-md items-center space-x-2 cursor-pointer ${
            loading ? "opacity-50 pointer-events-none" : "hover:text-black"
          }`}
          onClick={handleLike}
        >
          {isLiked ? (
            <Heart fill="#dc2626" color="#dc2626" size={24} />
          ) : (
            <Heart size={24} />
          )}
          <span>{likeCount.toLocaleString()}</span>
        </div>

        <div className="flex items-center text-md space-x-2 cursor-pointer hover:text-black">
          <MessageCircle size={24} />
          <span>335</span>
        </div>
      </div>

      {/* Right - Icons */}
      <div className="flex items-center space-x-6">
        <Bookmark className="cursor-pointer hover:text-black" size={24} />
        <Play className="cursor-pointer hover:text-black" size={24} />
        <Share className="cursor-pointer hover:text-black" size={24} />
        <MoreHorizontal className="cursor-pointer hover:text-black" size={24} />
      </div>
    </div>
  );
}
