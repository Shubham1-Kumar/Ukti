// components/ArticlePreview.tsx
import { useRecoilValue } from "recoil";
import { draftArticleAtom } from "../store/RecoilStore";

export const ArticlePreview = () => {
  const draft = useRecoilValue(draftArticleAtom);
  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="text-black text-sm mb-6">
        Last updated: {new Date(draft.updatedAt).toLocaleString()}
      <h1 className="text-4xl font-bold mb-4">{draft.title || "Untitled"}</h1>
      </div>
      {/* Quill content (already in HTML format) */}
      <div
        className="prose prose-lg max-w-none text-2xl"
        dangerouslySetInnerHTML={{ __html: draft.content }}
      />
    </div>
  );
};
