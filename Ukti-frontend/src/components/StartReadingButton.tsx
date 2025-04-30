import { useNavigate } from "react-router-dom";

export const StartReadingButton = () => {
  const navigate = useNavigate();
  const clickHandler = ()=>{
    navigate("/signup")
  }
  return (
<button className="bg-gray-100
 border border-gray-200 text-gray-800
  hover:text-white hover:bg-[#FF8205] px-5 py-2 rounded-full"
  onClick={clickHandler}
  >
  Start Reading
</button>

  );
};
