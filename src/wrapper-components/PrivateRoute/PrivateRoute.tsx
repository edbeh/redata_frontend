import { useLayoutEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

import { getJwtTokenLocalStorage } from "utils";

const PrivateRoute = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  useLayoutEffect(() => {
    const token = getJwtTokenLocalStorage();
    if (!token) setIsLoggedIn(false);
  }, []);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
