import write_icon from "../assets/svg/write_jcon_02.svg";
import search_icon from "../assets/svg/search.svg";
import notification_Icon from "../assets/svg/notification.svg";
import { useRecoilValue } from "recoil";
import { userState } from "../store/RecoilStore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ProfileToggle } from "./ProfileToggle";
import Avatar from "react-avatar";

export function InnerNav() {
  const user = useRecoilValue(userState);
  const [profileOpen, setProfileOpen] = useState(false);

  const profileClickHandler = () => {
    setProfileOpen((prev) => !prev);
  };

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/write");
  };

  return (
    <>

    <div className="border-b bg-[#f9f6f1] px-6 py-2  flex items-center justify-between box-border">
      {/* Left: Logo + Search */}
      <div className="flex items-center gap-6">
        {/* Logo */}
        <span className="font-bold font-serif text-2xl tracking-tight">
          Ukti
        </span>
        {/* Search bar */}
        <div className="flex items-center bg-gray-100 rounded-2xl px-3 py-[2px] border border-gray-300">
          <img src={search_icon} alt="search icon" className="w-4 h-4 mr-2" />
          <input
            type="text"
            placeholder="Search"
            name="search-input"
            className="bg-transparent placeholder-gray-600 text-sm py-[2px] outline-none"
          />
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-5">
        {/* Write */}
        <div
          onClick={handleClick}
          className="flex items-center gap-2 text-gray-800 cursor-pointer hover:text-black"
        >
          <img src={write_icon} alt="write icon" className="w-8 h-8 mb-3" />
          <span className="text-lg ">Write</span>
        </div>

        {/* Notification */}
        <img
          src={notification_Icon}
          alt="notification icon"
          className="w-5 h-5 cursor-pointer"
        />

        {/* Profile Initial */}
        <Avatar
              onClick={profileClickHandler}
              name={user?.name}
              size="40"              // Increase overall size
              textSizeRatio={2}    // Smaller ratio = larger text
              round={true}
            />
      </div>
    </div>
    {
      profileOpen && <ProfileToggle />
    }
    </>
  );
}
