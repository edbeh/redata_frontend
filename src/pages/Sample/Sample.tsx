import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { FullScreenLoader } from "components";
import { useSubmitSession } from "api/hooks";
import { setJwtTokenLocalStorage } from "utils";

const Sample = () => {
  const navigate = useNavigate();

  // *Queries
  const submitSession = useSubmitSession();

  // *Effects
  useEffect(() => {
    const email = process.env.REACT_APP_SAMPLE_PROFILE_EMAIL || "";
    const password = process.env.REACT_APP_SAMPLE_PROFILE_PASS || "";
    const payload = { email, password };
    submitSession.mutate(payload);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (submitSession?.data?.status === 200) {
      const jwt = submitSession?.data?.data?.jwt;
      setJwtTokenLocalStorage(jwt);
      navigate("/home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitSession.data]);

  return <FullScreenLoader />;
};

export default Sample;
