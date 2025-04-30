import { useSetRecoilState, useResetRecoilState } from "recoil";
import { isLoggedInState, userState } from "../store/RecoilStore";
import { loginType } from "../../../common/schemas/authSchema";
import { signupType } from "../../../common/schemas/authSchema";
import axios from "axios";

export const useAuth = () => {
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const setUser = useSetRecoilState(userState);
  const resetIsLoggedIn = useResetRecoilState(isLoggedInState);
  const resetUser = useResetRecoilState(userState);

  const login = async (inputData: loginType) => {
    const response = await axios.post(
      "http://127.0.0.1:8787/app/v1/auth/signin",
      inputData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = response.data;
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("isLoggedInState","true");

    setIsLoggedIn(true);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.clear();
    resetIsLoggedIn();
    resetUser();
  };

  const signup = async (details: signupType) => {
    const response = await axios.post(
      "http://127.0.0.1:8787/app/v1/auth/signup",
      details,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  };

  return { login, logout, signup };
};
