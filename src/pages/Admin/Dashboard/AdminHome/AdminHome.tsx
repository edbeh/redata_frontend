import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { AdminBaseLayout } from "wrapper-components";

import { Table } from "components";
import { useFetchPendingUsersByAdmin, useFetchUsersByAdmin } from "api/hooks";
import { USERS_BY_ADMIN_API_KEY } from "api/keys";

import {
  generateActiveUsersColumns,
  generatePendingUsersColumns,
} from "./AdminHome.util";

const AdminHome = () => {
  const navigate = useNavigate();

  // *Queries
  const queryClient = useQueryClient();
  const fetchUsersByAdmin = useFetchUsersByAdmin();
  const fetchPendingUsersByAdmin = useFetchPendingUsersByAdmin();

  // *Effects
  useEffect(() => {
    queryClient.invalidateQueries(USERS_BY_ADMIN_API_KEY);
  }, [queryClient]);

  // *JSX
  return (
    <AdminBaseLayout title="Home">
      <div>
        <h2 className="font-bold text-sm">Active Users</h2>
        <p className="my-4 text-sm">
          Users who have logged into their account and complete onboarding
        </p>
        <Table
          columns={generateActiveUsersColumns()}
          data={fetchUsersByAdmin?.data?.data?.data || []}
          isLoading={fetchUsersByAdmin?.isLoading}
        />
      </div>

      <div className="mt-10">
        <h2 className="font-bold text-sm">Pending Users</h2>
        <p className="my-4 text-sm">
          Users who have been invited but have yet to complete onboarding
        </p>
        <Table
          columns={generatePendingUsersColumns()}
          data={fetchPendingUsersByAdmin?.data?.data?.data || []}
          isLoading={fetchPendingUsersByAdmin?.isLoading}
        />
      </div>
    </AdminBaseLayout>
  );
};

export default AdminHome;
