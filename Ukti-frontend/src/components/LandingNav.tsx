import { useNavigate } from "react-router-dom";
import { GetStartedButton } from "./GetStartedButton";

export const LandingNavBar = () => {
  const navigate = useNavigate();
  const clickHandler = ()=>{
    navigate("/login")
  }
  return (
    <div className="w-full border-b border-gray-500 bg-[#f9f6f1]">
      <nav className="w-full">
        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="text-2xl font-serif font-semibold text-black ">Ukti</div>

          {/* Links */}
          <div className="flex items-center space-x-6 lg:space-x-7 text-lg font-medium text-gray-800">
            <div className="hover:underline cursor-pointer">Our Story</div>
            <div
            onClick={clickHandler}
            className="hover:underline cursor-pointer">Sign in</div>
            <GetStartedButton />
          </div>
        </div>
      </nav>
    </div>
  );
};
