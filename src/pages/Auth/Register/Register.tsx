import RegisterForm from "./RegisterForm/RegisterForm";
import Splash from "../Splash/Splash";

const Register = () => {
  return (
    <div className="flex w-[100vw] h-[100vh]">
      <RegisterForm />
      <Splash />
    </div>
  );
};

export default Register;
