import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { draftArticleAtom } from "../store/RecoilStore";


export const DraftTagsSync = (tags: string[]) => {
  const [draft, setDraft] = useRecoilState(draftArticleAtom);
  useEffect(() => {
    if (!tags) {
      return;
    }
    setDraft((prev) => ({ ...prev, tags }));
    console.log("Inside tagsync", draft);
  }, [tags]);
};
