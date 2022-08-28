import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface AxiosErrorInterceptorProps {
  children: React.ReactNode;
}

const AxiosErrorInterceptor: React.FC<AxiosErrorInterceptorProps> = ({
  children,
}) => {
  return (
    <>
      <ToastContainer theme="colored" position="top-center" />
      {children}
    </>
  );
};

export default AxiosErrorInterceptor;
