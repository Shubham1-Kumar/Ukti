import write_icon from "../assets/svg/write_jcon_02.svg";
import search_icon from "../assets/svg/search.svg";
import notification_Icon from "../assets/svg/notification.svg";
import { useRecoilValue } from "recoil";
import { userState } from "../store/RecoilStore";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { ChevronUp } from "lucide-react";

export function MyArticlesNav() {
  const user = useRecoilValue(userState);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleClick = () => {
    navigate("/write");
  };

  const handleAction = (action: string) => {
    console.log(`${action} clicked`);
    setDropdownOpen(false);
    // Add routing or function as per action
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div className="border-b bg-[#f9f6f1] px-6 py-2 flex items-center justify-between box-border relative">
      {/* Left: Logo + Search */}
      <div className="flex items-center gap-6">
        <span className="font-bold font-serif text-2xl tracking-tight">
          Ukti
        </span>

        <div className="flex items-center bg-gray-100 rounded-2xl px-3 py-[2px] border border-gray-300">
          <img src={search_icon} alt="search icon" className="w-4 h-4 mr-2" />
          <input
            title="Type-title or status or category"
            type="text"
            placeholder="Search"
            name="search-input"
            className="bg-transparent placeholder-gray-600 text-sm py-[2px] outline-none"
          />
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4 relative">
        
        {/* Action Dropdown Button */}
        <div ref={dropdownRef} className="relative">
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex justify-center gap-3 items-center border border-gray-400 px-4 pb-0.5  rounded-full text-lg font-medium bg-transparent shadow-xs hover:bg-gray-50"
          >
            Actions <span className="pt-1">{dropdownOpen?<ChevronDown className=" h-8 w-8 text-gray-600"/>:<ChevronUp className=" w-8 h-8 text-gray-600"/>}</span>
          </button>

          {dropdownOpen && (
            <div className="flex justify-center absolute -right-1 mt-2 w-35 gap-6 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <ul className="text-lg py-2 flex flex-col gap-3 text-gray-700">
                <li
                  onClick={() => handleAction("View")}
                  className="px-4 py-1 hover:border hover:border-gray-500 rounded-full cursor-pointer"
                >
                  View
                </li>
                <li
                  onClick={() => handleAction("Update")}
                  className="px-4 py-1 hover:border hover:border-gray-500 rounded-full  cursor-pointer"
                >
                  Update
                </li>
                <li
                  onClick={() => handleAction("Publish")}
                  className="px-4 py-1 hover:border hover:border-gray-500 rounded-full  cursor-pointer"
                >
                  Publish
                </li>
                <li
                  onClick={() => handleAction("Delete")}
                  className="px-4 py-1  hover:border hover:border-gray-500 rounded-full  cursor-pointer text-red-500"
                >
                  Delete
                </li>
              </ul>
            </div>
          )}
        </div>
        {/* Write */}
        <div
          onClick={handleClick}
          className="flex items-center gap-2 text-gray-800 cursor-pointer hover:text-black"
        >
          <img src={write_icon} alt="write icon" className="w-8 h-8 mb-3" />
          <span className="text-lg">Write</span>
        </div>

        {/* Notification */}
        <img
          src={notification_Icon}
          alt="notification icon"
          className="w-5 h-5 cursor-pointer"
        />

        {/* Profile */}
        <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-medium cursor-pointer">
          {user?.name[0] || ""}
        </div>

      </div>
    </div>
  );
}
