// hooks/useDebouncedDraftSync.ts
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { draftArticleAtom } from "../store/RecoilStore";

export const useDebouncedDraftSync = (
  title: string,
  content: any,
  contentDelta: any
) => {
  const [draft, setDraft] = useRecoilState(draftArticleAtom);

  useEffect(() => {
    // Prevent unnecessary update
    if (
      (!title && !content && !contentDelta) ||
      (draft.title === title &&
        draft.content === content &&
        JSON.stringify(draft.contentDelta) === JSON.stringify(contentDelta))
    )
      return;

    const timeout = setTimeout(() => {
      setDraft((prev) => ({
        ...prev,
        title,
        content,
        contentDelta,
        updatedAt: new Date().toISOString(),
      }));
    }, 500);

    return () => clearTimeout(timeout);
  }, [title, content, contentDelta]);

  console.log(draft.title, draft.category, draft.content, draft.contentDelta);
};


export const useDraftCategorySync = (category: string) => {
  const [draft, setDraft] = useRecoilState(draftArticleAtom);
  useEffect(() => {
    if (!category || draft.category === category) {
      return;
    }
    setDraft((prev) => ({ ...prev, category }));
  }, [category]);
};

export const usedDraftTagsSync = (tags: string[]) => {
  const [draft, setDraft] = useRecoilState(draftArticleAtom);
  useEffect(() => {
    if (!tags || draft.tags === tags) {
      return;
    }
    setDraft((prev) => ({ ...prev, tags }));
  }, [tags]);
};

export const useDraftDescriptionSync = (description: string) => {
  const [draft, setDraft] = useRecoilState(draftArticleAtom);
  useEffect(() => {
    if (!description || draft.description === description) {
      return;
    }
    setDraft((prev) => ({ ...prev, description }));
  }, [description]);
};
