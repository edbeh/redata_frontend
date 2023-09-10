import { useFetchMe } from "api/hooks";
import { FullScreenLoader } from "components";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AssumeAccount = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");

  //* Queries
  const fetchMe = useFetchMe();

  //* Effects
  useEffect(() => {
    if (token && fetchMe?.data?.data?.data) {
      sessionStorage.setItem("assume_as", fetchMe?.data?.data?.data?.name);
      localStorage.setItem("token", token);
      navigate("/home");
    }
  }, [navigate, token, fetchMe.data]);

  //* JSX
  return <FullScreenLoader />;
};

export default AssumeAccount;
