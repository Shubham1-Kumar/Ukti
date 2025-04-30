"use client";

import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useGetAllCategores } from "../hooks/useCategory";

interface CategoryTabsProps {
  onCategoryClick?: (query: any) => void;
}

export function CategoryTabs({ onCategoryClick }: CategoryTabsProps) {
  const { categories, loading } = useGetAllCategores();
  const [activeCategory, setActiveCategory] = useState("All");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleCategoryClick = (category: string, categoryId?: string) => {
    setActiveCategory(category);

    // ✅ Base neutral query values
    const baseQuery = {
      page: 1,
      limit: 10,
      sortBy: "createdAt" as "createdAt",
      order: "desc" as "desc",
    };

    // ✅ Add category filter if needed
    const finalQuery =
      category === "All"
        ? { query: { ...baseQuery } }
        : { query: { ...baseQuery, categoryId } };

    onCategoryClick?.({ finalQuery, categoryId });
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.5;
      scrollContainerRef.current.scrollTo({
        left:
          direction === "left"
            ? scrollLeft - scrollAmount
            : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (loading) return <p>Loading....</p>;

  return (
    <div className="w-full max-w-3xl mx-auto flex items-center justify-between px-2 py-4 border-b border-gray-300 bg-gray-50">
      <button onClick={() => scroll("left")} className="pr-1 rounded">
        <ChevronLeft className="h-4 w-4" />
      </button>

      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-hidden w-full scrollbar-hide"
      >
        <button
          onClick={() => handleCategoryClick("All")}
          className={`whitespace-nowrap rounded-full px-4 py-[2px] text-sm font-medium transition 
            ${
              activeCategory === "All"
                ? "border-b-1 bg-[#ff9225] text-white font-semibold "
                : " text-gray-700"
            }`}
        >
          All
        </button>

        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.name, category.id)}
            className={`whitespace-nowrap rounded-full px-4 py-[2px] text-sm font-medium transition 
              ${
                activeCategory === category.name
                  ? "border-b-1 bg-[#ff9225] text-white font-semibold "
                  : " text-gray-700"
              }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      <button
        onClick={() => scroll("right")}
        className="pl-1 rounded transition"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
