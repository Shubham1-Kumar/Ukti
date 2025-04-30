import {
  User,
  ChartNoAxesCombined,
  Library,
  BookOpenText,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ProfileToggle = () => {
  const navigate = useNavigate();

  const logoutClickHandler = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="relative">
      <div className="absolute bottom-0 right-4 translate-y-full mt-3 z-500 bg-gray-100 shadow-lg px-5 py-5 w-[300px]">
        <div className="flex flex-col gap-8 items-start ml-5 text-gray-600 text-2xl">
          <span className="flex gap-20  items-center">
            <User className="h-8 w-8 text-gray-700" />
            Profile
          </span>
          <span className="flex gap-20  items-center">
            <ChartNoAxesCombined className="h-8 w-8 text-gray-700" />
            Stats
          </span>
          <span className="flex gap-20  items-center">
            <Library className="h-8 w-8 text-gray-700" />
            Library
          </span>
          <span className="flex gap-20  items-center">
            <BookOpenText className="h-8 w-8 text-gray-700" />
            Stories
          </span>
          <span
            onClick={logoutClickHandler}
            className="flex gap-20  items-center"
          >
            <LogOut className="h-8 w-8 text-gray-700" />
            Logout
          </span>
        </div>
      </div>
    </div>
  );
};
