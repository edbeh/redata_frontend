import LoginForm from "./LoginForm/LoginForm";
import Splash from "../Splash/Splash";
import { getJwtTokenLocalStorage } from "utils";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const isLoggedIn = () => {
    return !!getJwtTokenLocalStorage();
  };

  // useEffect(() => {
  //   if (isLoggedIn()) {
  //     navigate("/home");
  //   }
  // }, [navigate]);

  return (
    <div className="flex w-[100vw] h-[100vh]">
      <LoginForm />
      <Splash />
    </div>
  );
};

export default Login;
