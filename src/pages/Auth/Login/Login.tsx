import LoginForm from "./LoginForm/LoginForm";
import Splash from "../Splash/Splash";
import { LoginUserTypes } from "./Login.model";

interface LoginProps {
  userType: LoginUserTypes;
}

const Login = ({ userType }: LoginProps) => {
  return (
    <div className="flex w-[100vw] h-[100vh]">
      <LoginForm userType={userType} />
      <Splash />
    </div>
  );
};

export default Login;
