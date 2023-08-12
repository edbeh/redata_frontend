import AdminLoginForm from "./AdminLoginForm/AdminLoginForm";
import Splash from "../Splash/Splash";

const AdminLogin = () => {
  return (
    <div className="flex w-[100vw] h-[100vh]">
      <AdminLoginForm />
      <Splash />
    </div>
  );
};

export default AdminLogin;
