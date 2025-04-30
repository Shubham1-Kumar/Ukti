import { useRecoilValue } from "recoil";
import { draftArticleAtom } from "../store/RecoilStore";
import { useState, useEffect } from "react";
import { useDraftDescriptionSync } from "../hooks/useDebouncedDraftSync";

export function DescriptionDropDown() {
  const draft = useRecoilValue(draftArticleAtom);
  const [description, setDescription] = useState(draft.description || "");
  const [error, setError] = useState("");
  const [showDropdown, setShowDropdown] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  const MAX_LENGTH = 250;

  useDraftDescriptionSync(description);

  useEffect(() => {
    if (draft.description) {
      setDescription(draft.description);
    }
  }, [draft.description]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;
    const validPattern = /^[a-zA-Z0-9\s.,'"!@#%&()\-_/]*$/;

    if (!validPattern.test(input)) {
      setError("Only letters, numbers, and basic punctuation allowed.");
      return;
    }

    if (input.length > MAX_LENGTH) {
      setError("Maximum length is 250 characters.");
      return;
    }

    setError("");
    setDescription(input);
  };

  const handleSubmit = () => {
    if (!description.trim()) {
      setError("Description cannot be empty.");
      return;
    }

    if (description.length > MAX_LENGTH) {
      setError("Maximum length is 250 characters.");
      return;
    }

    setError("");
    setShowDropdown(false);
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
    }, 3000); // Hide success after 3s
  };

  return (
    <div className="relative">
      {showDropdown && (
        <div className="absolute bottom-1 left-60.5 translate-y-full mt-3 z-50 bg-gray-200 shadow-lg px-5 py-4 rounded-tr-[100px] rounded-bl-[100px] rounded-tl-none w-md transition-all duration-300 ease-in-out min-h-[200px]">
          {/* Arrow */}
          <div className="absolute -top-2.5 left-1 w-5 h-5 bg-gradient-to-tl from-gray-200 via-gray-400 to-gray-900 rotate-45 z-10" />

          <div className="flex flex-col items-center mt-4">
            <textarea
              onChange={handleChange}
              value={description}
              maxLength={MAX_LENGTH}
              placeholder="Write a short description for your article"
              rows={4}
              className="w-sm resize-none px-3 py-3 border border-gray-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-[#FF8205] placeholder:text-gray-500 bg-gray-100"
            />
          </div>
          <div className="flex justify-end-safe mt-2 pr-3 gap-5">
            {/* Error + Character Count */}
            <div className="mt-2 flex justify-between text-xs text-gray-600">
              <span className={error ? "text-red-500" : ""}>{error}</span>
              <span>
                {description.length}/{MAX_LENGTH}
              </span>
            </div>

            {/* Submit Button */}
            <div className=" ">
              <button
                onClick={handleSubmit}
                className="bg-gray-600 hover:bg-black text-white px-4 py-1.5 rounded-full text-sm font-medium transition-all"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Message */}
      {showSuccess && (
        <div className="absolute bottom-1 left-60.5 translate-y-full mt-3 px-4 py-2 bg-green-100 text-green-800 rounded-md text-sm shadow">
          Description saved successfully!
        </div>
      )}
    </div>
  );
}
