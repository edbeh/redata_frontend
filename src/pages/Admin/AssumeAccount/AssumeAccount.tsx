import { FullScreenLoader } from "components";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AssumeAccount = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const admin = searchParams.get("admin");

  //* Effects
  useEffect(() => {
    if (token) {
      sessionStorage.setItem("assume_as", admin || "");
      localStorage.setItem("token", token);
      navigate("/home");
    }
  }, [navigate, token, admin]);

  //* JSX
  return <FullScreenLoader />;
};

export default AssumeAccount;
