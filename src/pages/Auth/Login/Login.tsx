import LoginForm from "./components/LoginForm/LoginForm";
import Splash from "../components/Splash/Splash";

const Login = () => {
  return (
    <div className="flex w-[100vw] h-[100vh]">
      <LoginForm />
      <Splash />
    </div>
  );
};

export default Login;
