import React, { useCallback, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  coverImageAsFileAtom,
  coverImagePreviewAtom,
  draftArticleAtom,
} from "../store/RecoilStore";

const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

type Props = {
  onSelectImage: (file: File) => void;
};

export const CoverImageUploader: React.FC<Props> = ({ onSelectImage }) => {
  const  setCoverImageAsFile = useSetRecoilState(coverImageAsFileAtom);
  const [preview, setPreview] = useRecoilState(coverImagePreviewAtom);
  const setError = useState<string | null>(null)[1]; // Ignore local state, error can also be lifted to Recoil if needed

  const handleFile = useCallback(
    (file: File) => {
      if (!allowedTypes.includes(file.type)) {
        setError("Unsupported file type. Please use PNG, JPEG, or WebP.");
        return;
      }
      setError(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result); // Set preview in Recoil
      };
      reader.readAsDataURL(file);

      setCoverImageAsFile(file);
      onSelectImage(file); // Notify parent
    },
    [onSelectImage, setCoverImageAsFile, setPreview]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    const file = Array.from(e.clipboardData.files).find((f) =>
      allowedTypes.includes(f.type)
    );
    if (file) handleFile(file);
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onPaste={handlePaste}
      className="flex items-center justify-center mt-2 mb-2 border-2 border-dashed border-gray-400 p-4 rounded-md text-center cursor-pointer hover:border-blue-500 transition"
      onClick={() => document.getElementById("cover-image-input")?.click()}
    >
      <input
        type="file"
        id="cover-image-input"
        accept={allowedTypes.join(",")}
        onChange={handleInputChange}
        className="hidden"
      />
      {preview ? (
        <img
          key={preview}
          src={preview}
          alt="Cover preview"
          className="w-50 h-25 object-cover rounded-md shadow"
        />
      ) : (
        <p className="text-gray-600">Click, drag & drop, or paste an image here</p>
      )}
    </div>
  );
};



import { fileToBase64 } from "../utils/filteToString";

export function CoverImage() {
  const setDraft = useSetRecoilState(draftArticleAtom);
  const setImageAsFile = useSetRecoilState(coverImageAsFileAtom);
  const setImagePreview = useSetRecoilState(coverImagePreviewAtom);

  const handleSelectImage = async (file: File) => {
    setImageAsFile(file);
    try {
      const base64Url = await fileToBase64(file);
      setDraft((prev) => (
        {
        ...prev,
        CoverImage: base64Url,
      }));
      setImagePreview(base64Url);
    } catch (err) {
      console.error("Failed to convert image to base64", err);
    }
  };

  return (
    <div className="relative">
      <div className="absolute bottom-1 left-97 translate-y-full mt-3 z-50 bg-gray-200 shadow-lg p-5 rounded-md max-w-xl w-xs min-h-[100px]">
        <div className="absolute -top-2.5 left-1 w-5 h-5 bg-gradient-to-tl from-gray-200 via-gray-400 to-gray-900 rotate-45 z-10 "></div>
        <CoverImageUploader onSelectImage={handleSelectImage} />
      </div>
    </div>
  );
}
