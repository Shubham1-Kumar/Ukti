import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { RecoilRoot } from "recoil";
import { RecoilInitializer } from "./hooks/useRecoilPersist.tsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RecoilRoot>
      <RecoilInitializer>
        <Toaster position="top-right" reverseOrder={false} />
        <App />
      </RecoilInitializer>
    </RecoilRoot>
  </StrictMode>
);
