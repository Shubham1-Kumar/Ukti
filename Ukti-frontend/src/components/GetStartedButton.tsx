import { useNavigate } from "react-router-dom";

export const GetStartedButton = () => {
  const navigate = useNavigate();
  const clickHandler = () => {
    navigate("/signup");
  };
  return (
    <button
      className="bg-black text-white px-5 py-2 rounded-full text-lg hover:opacity-90 transition
    hover:border hover:border-black hover:bg-[#FF8205]
    "
    onClick={clickHandler}
    >
      Get started
    </button>
  );
};
