// components/CustomToolbar.tsx
import {
    Bold,
    Italic,
    Underline,
    List,
    ListOrdered,
    Link,
    Image as ImageIcon,
    Eraser,
    Undo2,
    Redo2,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Quote,
    Code,
  } from "lucide-react";
  
  const CustomToolbar = () => {
    return (
      <div className="flex justify-center items-center">
        <div
          id="custom-toolbar"
          className="flex flex-wrap justify-center items-center gap-2 p-2 border border-gray-300 rounded-md bg-white"
        >
          <select className="ql-header px-2 pb-1 border rounded-md text-sm text-gray-900">
            <option value="1">H1</option>
            <option value="2">H2</option>
            <option value="">Normal</option>
          </select>
  
          <select className="ql-font border rounded-md" >
            <option value="sans-serif">Sans</option>
            <option value="serif">Serif</option>
            <option value="monospace">Monospace</option>
            <option value="inter">Inter</option>
            <option value="roboto">Roboto</option>
            <option value="lato">Lato</option>
            <option value="montserrat">Montserrat</option>
            <option value="open-sans">Open Sans</option>
            <option value="poppins">Poppins</option>
            <option value="raleway">Raleway</option>
            <option value="ubuntu">Ubuntu</option>
            <option value="merriweather">Merriweather</option>
            <option value="playfair-display">Playfair Display</option>
            <option value="nunito">Nunito</option>
            <option value="quicksand">Quicksand</option>
            <option value="oswald">Oswald</option>
          </select>
  
          <select className="ql-size px-2 pb-1 border rounded-md text-sm text-gray-900">
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
            <option value="huge">Huge</option>
          </select>
  
          <button className="ql-bold p-1 hover:bg-gray-100 rounded">
            <Bold size={18} />
          </button>
          <button className="ql-italic p-1 hover:bg-gray-100 rounded">
            <Italic size={18} />
          </button>
          <button className="ql-underline p-1 hover:bg-gray-100 rounded">
            <Underline size={18} />
          </button>
  
          <button className="ql-list" value="ordered">
            <ListOrdered size={18} />
          </button>
          <button className="ql-list" value="bullet">
            <List size={18} />
          </button>
  
          <button className="ql-align" value="">
            <AlignLeft size={18} />
          </button>
          <button className="ql-align" value="center">
            <AlignCenter size={18} />
          </button>
          <button className="ql-align" value="right">
            <AlignRight size={18} />
          </button>
  
          <button className="ql-blockquote p-1 hover:bg-gray-100 rounded">
            <Quote size={18} />
          </button>
          <button className="ql-code-block p-1 hover:bg-gray-100 rounded">
            <Code size={18} />
          </button>
  
          <button className="ql-link p-1 hover:bg-gray-100 rounded">
            <Link size={18} />
          </button>
          <button className="ql-image p-1 hover:bg-gray-100 rounded">
            <ImageIcon size={18} />
          </button>
  
          <select className="ql-color" />
          <select className="ql-background" />
  
          <button className="ql-clean p-1 hover:bg-gray-100 rounded">
            <Eraser size={18} />
          </button>
  
          <button className="ql-undo p-1 hover:bg-gray-100 rounded" type="button">
            <Undo2 size={18} />
          </button>
          <button className="ql-redo p-1 hover:bg-gray-100 rounded" type="button">
            <Redo2 size={18} />
          </button>
        </div>
      </div>
    );
  };
  
  export default CustomToolbar;
  