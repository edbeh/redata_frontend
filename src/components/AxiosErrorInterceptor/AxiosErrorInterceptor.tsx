import axios from "axios";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface AxiosErrorInterceptorProps {
  children: React.ReactNode;
}

const AxiosErrorInterceptor: React.FC<AxiosErrorInterceptorProps> = ({
  children,
}) => {
  useEffect(() => {
    axios.interceptors.request.use(
      (request: any) => {
        // const token = getTokenLocalStorage();
        // request.headers["Authorization"] = `Bearer ${token}`;
        return request;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status > 300) {
          const errorMessage =
            // handle different ways the errors are returned
            error?.response?.data?.error?.message ||
            error?.response?.data?.message;

          if (errorMessage) {
            toast(errorMessage);
          }

          throw error;
        }
      }
    );
  }, []);

  // *JSX
  return (
    <>
      <ToastContainer />
      {children}
    </>
  );
};

export default AxiosErrorInterceptor;
