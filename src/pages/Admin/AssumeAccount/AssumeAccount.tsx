import { FullScreenLoader } from "components";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { setAssumeAsSessionStorage } from "utils";

const AssumeAccount = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const admin = searchParams.get("admin");
  const onboardingComplete = searchParams.get("onboarding_complete");

  //* Effects
  useEffect(() => {
    if (token) {
      setAssumeAsSessionStorage(admin || "");
      localStorage.setItem("token", token);
      if (onboardingComplete === "true") {
        navigate("/home");
      } else {
        navigate("/onboarding");
      }
    }
  }, [navigate, token, admin, onboardingComplete]);

  //* JSX
  return <FullScreenLoader />;
};

export default AssumeAccount;
