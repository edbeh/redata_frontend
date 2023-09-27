import { useLayoutEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { AssumeAccountFooter, SampleFooter } from "components";
import { useMe } from "hooks";
import { getJwtTokenLocalStorage } from "utils";
import RequireAcknowledgeFooter from "components/RequireAcknowledgeFooter/RequireAcknowledgeFooter";

const PrivateRoute = () => {
  const { email } = useMe();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  const isSampleProfile = (email: string | undefined) => {
    if (!email) return;

    const regex = /sample.+@getredata.com/;
    return email.match(regex);
  };

  useLayoutEffect(() => {
    const token = getJwtTokenLocalStorage();
    if (!token) setIsLoggedIn(false);
  }, []);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Outlet />
      {isSampleProfile(email) ? (
        <>
          <div className="h-[60px] sm:h-[40px]" />
          <SampleFooter />
        </>
      ) : null}
      <>
        <div className="h-[60px] sm:h-[40px]" />
        <AssumeAccountFooter />
        <RequireAcknowledgeFooter />
      </>
    </>
  );
};

export default PrivateRoute;
