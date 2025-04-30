import { useNavigate } from "react-router-dom";


export const StartWritingButton = () => {
  const navigate = useNavigate();
  const clickHandler = ()=>{
    navigate("/signup")
  }
  return (
    <button className="bg-white text-black border border-black px-5 py-2 rounded-full hover:bg-[#FF8205] hover:text-white"
    onClick={clickHandler}
    >
    Start Writing
  </button>
  
  );
};