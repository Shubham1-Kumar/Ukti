// hooks/useQuillImageHandler.ts
import { useEffect } from "react";
import ReactQuill from "react-quill";

// const MAX_WIDTH = 705;
// const MAX_HEIGHT = 356;

export const useQuillImageHandler = (
  quillRef: React.RefObject<ReactQuill | null>
) => {
  useEffect(() => {
    const quill = quillRef.current?.getEditor();
    if (!quill) return;

    const editor = quill.root;

    const toolbar = document.getElementById("custom-toolbar");
    toolbar?.querySelector(".ql-undo")?.addEventListener("click", () => {
      //@ts-ignore
      quill.history.undo();
    });
    toolbar?.querySelector(".ql-redo")?.addEventListener("click", () => {
      //@ts-ignore
      quill.history.redo();
    });

    // const resizeImage = (file: File): Promise<string> => {
    //   return new Promise((resolve) => {
    //     const reader = new FileReader();
    //     reader.onload = (e) => {
    //       const img = new Image();
    //       img.onload = () => {
    //         let { width, height } = img;

    //         // if (width > MAX_WIDTH || height > MAX_HEIGHT) {
    //         //   const scale = Math.min(MAX_WIDTH / width, MAX_HEIGHT / height);
    //         //   width = width * scale;
    //         //   height = height * scale;
    //         // }

    //         const canvas = document.createElement("canvas");
    //         canvas.width = MAX_WIDTH;
    //         canvas.height = MAX_HEIGHT;

    //         const ctx = canvas.getContext("2d");
    //         ctx?.drawImage(img, 0, 0, width, height);

    //         const dataUrl = canvas.toDataURL("image/jpeg", .9); // You can adjust quality
    //         resolve(dataUrl);
    //       };
    //       img.src = e.target?.result as string;
    //     };
    //     reader.readAsDataURL(file);
    //   });
    // };

    // const handleImageInsert = async (file: File) => {
    //   // const resizedDataUrl = await resizeImage(file);
    //   const range = quill.getSelection();
    //   const index = range ? range.index : quill.getLength();
    //   // quill.insertEmbed(index, "image", resizedDataUrl);
    // };
    const handleImageInsert = async (file: File) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        const range = quill.getSelection();
        const index = range ? range.index : quill.getLength();
        quill.insertEmbed(index, "image", result);
      };
      reader.readAsDataURL(file);
    };

    const preventDefaultImageInsert = (e: Event) => {
      const clipboard = (e as ClipboardEvent).clipboardData;
      const dt = (e as DragEvent).dataTransfer;
      if (
        (clipboard &&
          Array.from(clipboard.items).some((i) =>
            i.type.startsWith("image/")
          )) ||
        (dt && Array.from(dt.items).some((i) => i.type.startsWith("image/")))
      ) {
        e.preventDefault();
      }
    };

    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (const item of items) {
        if (item.type.indexOf("image") === 0) {
          e.preventDefault();
          const file = item.getAsFile();
          if (file) handleImageInsert(file);
        }
      }
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      if (e.dataTransfer?.files?.length) {
        const file = e.dataTransfer.files[0];
        if (file.type.startsWith("image/")) {
          handleImageInsert(file);
        }
      }
    };

    editor.addEventListener("paste", preventDefaultImageInsert);
    editor.addEventListener("drop", preventDefaultImageInsert);
    editor.addEventListener("paste", handlePaste);
    editor.addEventListener("drop", handleDrop);

    return () => {
      editor.removeEventListener("paste", preventDefaultImageInsert);
      editor.removeEventListener("drop", preventDefaultImageInsert);
      editor.removeEventListener("paste", handlePaste);
      editor.removeEventListener("drop", handleDrop);
    };
  }, [quillRef]);
};
