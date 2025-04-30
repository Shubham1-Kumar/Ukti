import { useRecoilValue, useSetRecoilState } from "recoil";
import { draftArticleAtom, userState } from "../store/RecoilStore";
import save_icon from "../assets/svg/save.svg";
import saved_icon from "../assets/svg/saved.svg";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bell } from "lucide-react";
import { PlusCircle } from "lucide-react";
import { CategoryAndTagDropDown, open } from "./CategoryDropDown";
import { showToast } from "../utils/createCustomToast";
import { isContentDeltaEmpty, isHTMLContentEmpty } from "../utils/checkContent";
import { useArticle } from "../hooks/useArticle";
import { useGetAllCategores } from "../hooks/useCategory";
import { createArticleSchemaType } from "../../../common/schemas/articleSchema";
import { DescriptionDropDown } from "./DescriptionDropDown";
import { CoverImage } from "./ImageUploader";

export function EditorNav() {
  const draft = useRecoilValue(draftArticleAtom);
  const setDraft = useSetRecoilState(draftArticleAtom);
  const { name = "" } = useRecoilValue(userState) || "";
  const [isSaved, setIsSaved] = useState(false);
  const [openCategory, setCategoryOpen] = useState(false);
  const [openTag, setTagOpen] = useState(false);
  const [openDescription, setDescriptionOpen] = useState(false);
  const [putCoverImage, setPutCoverImage] = useState(false);
  const user = useRecoilValue(userState);
  const userId = user?.id;

  const {
    createArticleAsDraft,
    GetAllArticlesForAUser,
    loading,
    error,
    success,
  } = useArticle();

  const { categories } = useGetAllCategores();
  const category = categories.find((cat) => cat.name === draft.category);

  const navigate = useNavigate();
  const previewClickHandler = () => {
    navigate("/articles/preview");
  };

  const categoryButtonClickHandler = () => {
    setTagOpen(false);
    setDescriptionOpen(false);
    setPutCoverImage(false);
    setCategoryOpen((prev) => !prev);
  };

  const tagButtonClickHandler = () => {
    setCategoryOpen(false);
    setDescriptionOpen(false);
    setPutCoverImage(false);
    setTagOpen((prev) => !prev);
  };

  const descriptionClickHandler = () => {
    setTagOpen(false);
    setCategoryOpen(false);
    setPutCoverImage(false);
    setDescriptionOpen((prev) => !prev);
  };

  const coverImageClickHandler = () => {
    setTagOpen(false);
    setCategoryOpen(false);
    setDescriptionOpen(false);
    setPutCoverImage((prev) => !prev);
  };

  const draftSaveClickHandler = async () => {
    const contentIsEmpty = isHTMLContentEmpty(draft.content);
    const deltaIsEmpty = isContentDeltaEmpty(draft.contentDelta);
    if (
      !draft.content ||
      !draft.contentDelta ||
      contentIsEmpty ||
      deltaIsEmpty
    ) {
      showToast(
        "Can't save empty article!!",
        "bg-gray-900 border-red-500",
        "text-white",
        "🚫"
      );
      return;
    }

    if (!draft.title) {
      showToast(
        "Article must have a title",
        "bg-yellow-50 border-yellow-300",
        "text-yellow-950",
        "📝",
        "font-semibold"
      );
      return;
    }

    if (!draft.category) {
      showToast(
        "Please select a category",
        "bg-orange-100 border-orange-300",
        "text-orange-800",
        "⚠️"
      );
      return;
    }
    if (!draft.description) {
      showToast(
        "Please add a description",
        "bg-orange-100 border-orange-300",
        "text-orange-800",
        "⚠️"
      );
      return;
    }
    // create payload for the input
    console.log(draft);

    const payload: createArticleSchemaType = {
      body: {
        description: draft.description,
        title: draft.title,
        categoryId: category?.id || "",
        content: draft.contentDelta,
        tags: draft.tags || [],
        coverImage: draft.CoverImage,
        status: draft.status,
      },
    };
    await createArticleAsDraft(payload);
    console.log("loging the draftArticle payload", payload);
    console.log(typeof draft.status);
  };

  useEffect(() => {
    (async () => {
      if (success) {
        setIsSaved(true);
        showToast(
          "Draft saved successfully!",
          "bg-green-100 border-green-300",
          "text-green-800",
          "✅"
        );

        const queryInput = {
          query: {
            userId,
          },
        };

        const data = await GetAllArticlesForAUser(queryInput);
        localStorage.setItem("MyArticles", JSON.stringify(data));
        localStorage.setItem("draft_article", JSON.stringify(""));
        setDraft({
          title: "",
          content: "",
          contentDelta: "",
          description: "",
          status: "DRAFT",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          category: "",
          tags: [],
          CoverImage: "",
        });
        setTimeout(() => {
          navigate("/articles/myarticles");
        }, 300);
      }

      if (error) {
        setIsSaved(false);
        showToast(
          "Error while saving the article",
          "bg-gray-900 border-red-500",
          "text-white",
          "🚫"
        );
      }
    })();
  }, [navigate, success, error]);

  return (
    <>
      <header className="flex justify-between items-center px-6 py-4 border-b border-gray-200 bg-[#f9f6f1] sticky top-0 z-50">
        {/* Left section: Branding and Draft Status */}
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-semibold font-serif tracking-tight">
            Ukti
          </h1>
          <span className="text-sm text-gray-500">
            Draft in <span className="font-medium text-black">{name}</span>
          </span>
          <div onClick={draftSaveClickHandler}>
            {loading ? (
              "loading..."
            ) : (
              <img
                src={isSaved ? saved_icon : save_icon}
                alt="save icon to save the article"
                className="w-5 h-5"
              />
            )}
          </div>
        </div>
        <div className="relative flex justify-between items-center gap-8 px-4 py-1.5 border rounded-full shadow-sm bg-muted/30">
          {/* Category Button */}
          <button
            onClick={categoryButtonClickHandler}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
          >
            <PlusCircle className="h-6 w-6 hover:scale-110 transition-transform duration-200 text-gray-600 hover:text-black " />
            <span className="font-medium text-gray-800 hover:text-black transition">
              Category
            </span>
          </button>

          {/* Dropdown Menu */}
          {openCategory && (
            <div className="absolute top-12 left-0 z-50 w-max ">
              <CategoryAndTagDropDown drop={open.CAT} />
            </div>
          )}
          {openTag && (
            <div className="absolute top-12 left-0 z-50 w-max">
              <CategoryAndTagDropDown drop={open.TAG} />
            </div>
          )}
          {openDescription && (
            <div className="absolute top-12 left-0 z-50 w-max">
              <DescriptionDropDown />
            </div>
          )}

          {putCoverImage && (
            <div className="absolute top-12 left-0 z-50 w-max">
              <CoverImage />
            </div>
          )}

          {/* Tags Button */}
          <button
            onClick={tagButtonClickHandler}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
          >
            <PlusCircle className="h-6 w-6 hover:scale-110 transition-transform duration-200 text-gray-600 hover:text-black " />
            <span className="font-medium text-gray-800 hover:text-black transition">
              Tags
            </span>
          </button>
          <button
            onClick={descriptionClickHandler}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
          >
            <PlusCircle className="h-6 w-6 hover:scale-110 transition-transform duration-200 text-gray-600 hover:text-black " />
            <span className="font-medium text-gray-800 hover:text-black transition">
              Description
            </span>
          </button>
          <button
            onClick={coverImageClickHandler}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
          >
            <PlusCircle className="h-6 w-6 hover:scale-110 transition-transform duration-200 text-gray-600 hover:text-black " />
            <span className="font-medium text-gray-800 hover:text-black transition">
              CoverImage
            </span>
          </button>
        </div>

        {/* Right section: Buttons and Avatar */}
        <div className="flex items-center gap-4">
          <button
            onClick={previewClickHandler}
            className=" cursor-pointer bg-transparent text-black border border-black  px-4 py-1.5 rounded-full text-sm font-medium hover:bg-[#D16900] hover:text-white transition"
          >
            Preview
          </button>
          <button className="cursor-pointer bg-[#FF8205] text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-[#D16900] transition">
            Publish
          </button>
          <Bell className="h-5 w-5 text-gray-600 transition hover:text-black cursor-pointer" />
          <div className="cursor-pointer w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold">
            {name[0]}
          </div>
        </div>
      </header>
    </>
  );
}
