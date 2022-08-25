import LoginForm from "./LoginForm/LoginForm";
import Splash from "../Splash/Splash";

const Login = () => {
  return (
    <div className="flex w-[100vw] h-[100vh]">
      <LoginForm />
      <Splash />
    </div>
  );
};

export default Login;
