import LoginForm from "./components/LoginForm/LoginForm";
import LoginSplash from "./components/LoginSplash/LoginSplash";

const Login = () => {
  return (
    <div className="flex w-[100vw] h-[100vh]">
      <LoginForm />
      <LoginSplash />
    </div>
  );
};

export default Login;
