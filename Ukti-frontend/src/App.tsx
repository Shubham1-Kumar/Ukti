import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { SignupPage } from "./pages/SignupPage";
import { LoginPage } from "./pages/LoginPage";
import { Landing } from "./pages/Landing";
import ErrorPage from "./pages/ErrorPage";
import SuccessPage from "./pages/SuccessPage";
import { ArticleStore } from "./pages/ArticleStore";
import { WriteArticle } from "./pages/CreateArticlePage";
import { ArticlePreview } from "./components/ArticlePreview";
import { MyArticlesPage } from "./pages/MyArticlesPage";
import { ArticlePage } from "./pages/ArticlePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/articles" element={<ArticleStore />} />
        <Route path="/write" element={<WriteArticle />} />
        <Route path="/articles/preview" element={<ArticlePreview />} />
        <Route path="/articles/myarticles" element={<MyArticlesPage />} />
        <Route path="/articles/read" element={<ArticlePage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
