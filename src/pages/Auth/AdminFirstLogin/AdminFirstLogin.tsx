import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { FullScreenLoader } from "components";
import { setJwtTokenLocalStorage } from "utils";

// first login of admin right after changing password
// to get the token from url param, set it to local storage, and redirect to admin home page
const AdminFirstLogin = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  useEffect(() => {
    if (token) {
      setJwtTokenLocalStorage(token);
      navigate("/home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return <FullScreenLoader />;
};

export default AdminFirstLogin;
