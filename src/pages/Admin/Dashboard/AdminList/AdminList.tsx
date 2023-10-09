import { useEffect } from "react";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

import { Table } from "components";
import { getAdminDeptLocalStorage } from "utils";
import { AdminBaseLayout } from "wrapper-components";
import { useFetchPendingUsersByAdmin, useFetchUsersByAdmin } from "api/hooks";
import { USERS_BY_ADMIN_API_KEY } from "api/keys";

import {
  generateActiveAdminsColumns,
  generatePendingAdminsColumns,
} from "./AdminList.util";

const AdminList = () => {
  const navigate = useNavigate();

  // *Queries
  const queryClient = useQueryClient();
  const fetchUsersByAdmin = useFetchUsersByAdmin();
  const fetchPendingUsersByAdmin = useFetchPendingUsersByAdmin();

  // *Methods
  const handleClickCell = (cell: any) => {
    navigate(`/admins/${cell?.row?.original?.id}`);
  };

  // *Effects
  useEffect(() => {
    queryClient.invalidateQueries(USERS_BY_ADMIN_API_KEY);
  }, [queryClient]);

  // *JSX
  return (
    <AdminBaseLayout title="Home">
      <div>
        <h2 className="font-bold text-sm">Active Admins</h2>
        <p className="my-4 text-sm">
          Admins who have logged into their account and changed their passwords
        </p>
        <Table
          columns={generateActiveAdminsColumns()}
          data={
            fetchUsersByAdmin?.data?.data?.data?.filter(
              (user) =>
                user.role === "admin" &&
                user.departments[0].id === getAdminDeptLocalStorage()?.id
            ) || []
          }
          isLoading={fetchUsersByAdmin?.isLoading}
        />
      </div>

      <div className="flex flex-col mt-10">
        <h2 className="font-bold text-sm">Pending Admins</h2>
        <p className="my-4 text-sm">
          Admins who have been invited but have yet to log into their accounts
        </p>
        <Table
          handleClickCell={handleClickCell}
          columns={generatePendingAdminsColumns()}
          data={
            fetchPendingUsersByAdmin?.data?.data?.data?.filter(
              (user) =>
                user.role === "admin" &&
                user.departments[0].id === getAdminDeptLocalStorage()?.id
            ) || []
          }
          isLoading={fetchPendingUsersByAdmin?.isLoading}
        />
      </div>
    </AdminBaseLayout>
  );
};

export default AdminList;
