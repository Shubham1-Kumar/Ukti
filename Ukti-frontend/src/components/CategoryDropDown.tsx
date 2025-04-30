import { useState } from "react";
import { useGetAllCategores } from "../hooks/useCategory";
import {
  usedDraftTagsSync,
  useDraftCategorySync,
} from "../hooks/useDebouncedDraftSync";
import { useRecoilValue } from "recoil";
import { draftArticleAtom } from "../store/RecoilStore";

export enum open {
  CAT,
  TAG,
}

type Props = {
  drop: open;
};

export const CategoryAndTagDropDown = ({ drop }: Props) => {
  const draft = useRecoilValue(draftArticleAtom);
  const { categories, loading } = useGetAllCategores();
  const [selectedCategory, setSelectedCategory] = useState(draft.category);
  const [selectedTags, setSelecteTag] = useState<string[]>([]);

  // Sync selected category to Recoil
  useDraftCategorySync(selectedCategory);
  usedDraftTagsSync(selectedTags);

  if (loading) return <div>Loading categories...</div>;
  const tagClickHandler = (tag: string) => {
    setSelecteTag((prev) => {
      const lowerTag = tag.toLowerCase();
      const normalizedPrev = prev.map((t) => t.toLowerCase());

      if (normalizedPrev.includes(lowerTag)) {
        // Remove tag (case-insensitive match)
        return prev.filter((t) => t.toLowerCase() !== lowerTag);
      } else {
        // Add tag
        return [...prev, tag];
      }
    });
  };

  const categoryClickHandler = (categoryName: string) => {
    setSelectedCategory(categoryName);
  };

  const showCategoryDropdown = drop === open.CAT;
  const showTagDropdown = drop === open.TAG;

  const CategoryDropdown = () => (
    <div className="relative">
      {/* Tooltip Box */}
      <div className="absolute bottom-1 left-4 translate-y-full mt-3 z-50 bg-gray-200 shadow-lg p-5 rounded-tr-[100px] rounded-bl-[100px] rounded-tl-none max-w-4xl w-[700px]">
        {/* Top-left Arrow */}
        <div className="absolute -top-2.5 left-1 w-5 h-5 bg-gradient-to-tl from-gray-200 via-gray-400 to-gray-900 rotate-45 z-10"></div>

        {/* Category Buttons */}
        <div className="flex flex-wrap gap-3 justify-center items-start">
          {categories.map((category) => {
            const isSelected = selectedCategory === category.name;
            return (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-3xl text-sm transition border font-semibold whitespace-nowrap ${
                  isSelected
                    ? "bg-[#FF8205] text-white border-black font-black"
                    : "bg-white text-gray-800 hover:bg-gray-300 hover:text-black hover:border-black"
                }`}
                onClick={() => categoryClickHandler(category.name)}
              >
                {category.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  const TagDropdown = () => {
    const selectedCategory = draft.category;
    const [customTag, setCustomTag] = useState("");
    const maxTagLength = 30;

    if (!selectedCategory) {
      return (
        <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-md shadow-md max-w-md text-center font-medium">
          ⚠️ Please select a category first to add tags.
        </div>
      );
    }

    const selectedObject = categories.find(
      (cat) => cat.name === selectedCategory
    );
    const handleAddCustomTag = () => {
      const normalizedTags = selectedTags.map((t) => t.toLowerCase());
      const newTag = customTag.trim(); // remove leading/trailing space
      const newTagNormalized = newTag.toLowerCase();

      if (newTag && !normalizedTags.includes(newTagNormalized)) {
        setSelecteTag([...selectedTags, newTag]);
        setCustomTag("");
      } else {
        alert("Tag already exists or is empty");
      }
    };

    return (
      <div className="relative">
        {/* Tooltip Box */}
        <div className="absolute bottom-1 left-36.5 translate-y-full mt-3 z-50 bg-gray-200 shadow-lg p-6 rounded-tr-[100px] rounded-bl-[100px] rounded-tl-none max-w-4xl w-lg">
          {/* Top-left Arrow */}
          <div className="absolute -top-2.5 left-1 w-5 h-5 bg-gradient-to-tl from-gray-200 via-gray-400 to-gray-900 rotate-45 z-10"></div>
          {/* Existing Tags */}
          <div className="flex flex-wrap gap-3 justify-center items-start mb-4">
            {selectedObject?.tags.map((tag, index) => {
              const isSelected = selectedTags.some(
                (t) => t.toLowerCase() === tag.toLowerCase()
              );
              return (
                <button
                  onClick={() => tagClickHandler(tag)}
                  key={index}
                  className={`px-4 py-2 rounded-3xl text-sm transition border font-semibold whitespace-nowrap ${
                    isSelected
                      ? "bg-[#FF8205] text-white border-black font-black"
                      : "bg-white text-gray-800 hover:bg-gray-300 hover:text-black hover:border-black"
                  }`}
                >
                  {tag}
                </button>
              );
            })}

            {/* Custom Tags */}
            {selectedTags
              .filter(
                (tag) =>
                  !selectedObject?.tags.some(
                    (catTag) => catTag.toLowerCase() === tag.toLowerCase()
                  )
              )
              .map((tag, index) => (
                <button
                  key={`custom-${index}`}
                  onClick={() => tagClickHandler(tag)}
                  className="px-4 py-2 rounded-3xl text-sm transition border  whitespace-nowrap bg-[#FF8205] text-white border-black font-black"
                >
                  {tag}
                </button>
              ))}
          </div>

          {/* Create Custom Tag */}
          <div className="flex justify-center items-center gap-3">
            <input
              type="text"
              value={customTag}
              onChange={(e) => {
                const rawValue = e.target.value;
                const trimmedValue = rawValue.trimStart(); // live typing, trim only start
                const isOnlyLetters = /^[a-zA-Z\s]*$/.test(trimmedValue);
                if (trimmedValue.length <= maxTagLength && isOnlyLetters) {
                  setCustomTag(trimmedValue);
                }
              }}
              placeholder="Enter new tag"
              className="px-4 py-1.5 text-sm border border-gray-400 rounded-2xl w-60 outline-none focus:border-black"
            />
            <button
              onClick={handleAddCustomTag}
              className="bg-gray-600 text-white font-medium px-4 py-1.5 rounded-full hover:bg-black"
            >
              Create
            </button>
          </div>

          {/* Character count */}
          {customTag.length > 0 && (
            <div className="text-xs text-gray-600 mt-1 text-center">
              {customTag.length}/{maxTagLength} characters
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      {showCategoryDropdown && <CategoryDropdown />}
      {showTagDropdown && <TagDropdown />}
    </>
  );
};
