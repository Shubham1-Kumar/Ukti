// components/RecoilInitializer.tsx
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect } from "react";
import {
  userState,
  isLoggedInState,
  draftArticleAtom,
} from "../store/RecoilStore";


export const RecoilInitializer: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  console.log("running after ", Date.now().toString());
  const setUser = useSetRecoilState(userState);
  const setLoggedIn = useSetRecoilState(isLoggedInState);
  const setDraft = useSetRecoilState(draftArticleAtom);
  const draft = useRecoilValue(draftArticleAtom);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storeDraft = localStorage.getItem("draft_article");
  

    if (storedUser) {
      console.log(storedUser);
      setUser(JSON.parse(storedUser));
      setLoggedIn(true);
    }

    if (storeDraft) {
      console.log("Reaching here");
      console.log(storeDraft);
      
      setDraft(JSON.parse(storeDraft));
      console.log("Inside the RecoilInitializer after");
      console.log(draft);
    }

  }, []);

return <> {children} </>;
   
};
