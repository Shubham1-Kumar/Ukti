import { useRecoilValue } from "recoil";
import { draftArticleAtom } from "../store/RecoilStore";
import { useEffect, useState } from "react";

export function useSyncDraftToLocalStorage() {
  const draft = useRecoilValue(draftArticleAtom);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("draft_article");
    console.log("Inside the useSyncDraftToLocalStorage",stored);
    
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        console.log("Inside the useSyncDraftToLocalStorage parsed",parsed);
        setHydrated(true); // ✅ We know localStorage had a value, assume hydration will occur
      } catch {}
    } else {
      setHydrated(true); // Even if not found, allow sync to continue
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    console.log("Draft before trim", draft);
    
    const {category, description, CoverImage, ...others} = draft;
    console.log("trimed draft",draft);
    localStorage.setItem("draft_article", JSON.stringify(others));
    const stored = localStorage.getItem("draft_article");
    console.log("Inside the useSyncDraftToLocalStorage parsed just after setup",stored);
    
  }, [draft, hydrated]);
}

