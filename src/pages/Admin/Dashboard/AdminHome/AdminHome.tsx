import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

import { AdminBaseLayout } from "wrapper-components";
import { useFetchUsersByAdmin } from "api/hooks";
import { USERS_BY_ADMIN_API_KEY } from "api/keys";

const AdminHome = () => {
  const navigate = useNavigate();

  // *Queries
  const queryClient = useQueryClient();
  const fetchUsersByAdmin = useFetchUsersByAdmin();

  // *Effects
  useEffect(() => {
    queryClient.invalidateQueries(USERS_BY_ADMIN_API_KEY);
  }, [queryClient]);

  console.log(
    "fetchUsersByAdmin?.data?.data?.data",
    fetchUsersByAdmin?.data?.data?.data
  );

  // *JSX
  return (
    <AdminBaseLayout title="Home">
      <div></div>
    </AdminBaseLayout>
  );
};

export default AdminHome;
