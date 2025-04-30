import { useRef, useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Quill from "quill";

import CustomToolbar from "./Toolbar";
import { useSyncDraftToLocalStorage } from "../hooks/useSyncDraftToLocalStorage";
import { useDebouncedDraftSync } from '../hooks/useDebouncedDraftSync';
import { useQuillImageHandler } from "../hooks/useQuillImageHandler";
import { useRecoilValue } from "recoil";
import { draftArticleAtom } from "../store/RecoilStore";

// Custom fonts
const Font = Quill.import("formats/font");
Font.whitelist = [
  "sans-serif", "serif", "monospace", "inter", "roboto", "lato", "montserrat",
  "open-sans", "poppins", "raleway", "ubuntu", "merriweather",
  "playfair-display", "nunito", "quicksand", "oswald"
];
Quill.register(Font, true);

const modules = {
  toolbar: { container: "#custom-toolbar" },
  history: { delay: 500, maxStack: 100, userOnly: true },
};

const formats = [
  "header", "font", "size", "bold", "italic", "underline", "list", "bullet",
  "align", "link", "image", "blockquote", "code-block", "color", "background", "clean",
];

const Editor = () => {
  const draft = useRecoilValue(draftArticleAtom);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(""); // HTML
  const [contentDelta, setContentDelta] = useState<any>(null);

  useEffect(() => {
    setTitle(draft.title || "");
    setContent(draft.content || "");
    setContentDelta(draft.contentDelta || null)
  }, [draft.title, draft.content]);

  const quillRef = useRef<ReactQuill | null>(null);
  useQuillImageHandler(quillRef);

  // Update HTML & Delta content on change
  const handleContentChange = (_html: string) => {
    setContent(_html);
    const editor = quillRef.current?.getEditor();
    if (editor) {
      const delta = editor.getContents(); // Quill Delta
      setContentDelta(delta);
    }
  };

  // Sync to Recoil & LocalStorage
  useDebouncedDraftSync(title, content, contentDelta);
  useSyncDraftToLocalStorage();

  return (
    <div className="max-w-3xl mx-auto px-4">
      <CustomToolbar />
      <input
        type="text"
        placeholder="Title"
        aria-label="Article Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full ml-2 mt-10 text-5xl font-serif font-light bg-transparent outline-none border-none placeholder:text-gray-500 focus:ring-0 focus:outline-none mb-2"
      />
      <div className="prose prose-lg w-full focus:outline-none">
        <ReactQuill
          ref={quillRef}
          value={content}
          onChange={handleContentChange}
          modules={modules}
          formats={formats}
          placeholder="Tell your story..."
          className="bg-white rounded-md min-h-[300px]"
        />
      </div>
    </div>
  );
};

export default Editor;
