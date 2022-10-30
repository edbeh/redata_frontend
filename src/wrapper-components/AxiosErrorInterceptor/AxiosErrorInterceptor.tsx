// @ts-nocheck
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AxiosErrorInterceptor.css";

interface AxiosErrorInterceptorProps {
  children: React.ReactNode;
}

const AxiosErrorInterceptor: React.FC<AxiosErrorInterceptorProps> = ({
  children,
}) => {
  const contextClass = {
    success: "bg-white border-l-green-500",
    error: "bg-white border-l-red-500",
    info: "bg-white",
    warning: "bg-white border-l-yellow-500",
    default: "bg-white",
  };

  return (
    <>
      <ToastContainer
        position="bottom-center"
        toastClassName={({ type }) =>
          contextClass[type || "default"] +
          " relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer min-w-[350px] shadow-lg border-[1px] border-bordergray border-l-[6px]"
        }
        bodyClassName={() => "flex text-black block p-3"}
        progressClassName="ml-[2px]"
      />
      {children}
    </>
  );
};

export default AxiosErrorInterceptor;
