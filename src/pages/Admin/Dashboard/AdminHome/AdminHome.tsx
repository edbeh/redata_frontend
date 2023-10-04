import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { AdminBaseLayout } from "wrapper-components";

import { Button, Modal, Table } from "components";
import { useFetchPendingUsersByAdmin, useFetchUsersByAdmin } from "api/hooks";
import { USERS_BY_ADMIN_API_KEY } from "api/keys";

import {
  generateActiveUsersColumns,
  generatePendingUsersColumns,
} from "./AdminHome.util";
import InviteNewUserForm from "./components/InviteNewUserForm/InviteNewUserForm";

const AdminHome = () => {
  const navigate = useNavigate();
  const [isInvitationFormVisible, setIsInvitationFormVisible] =
    useState<boolean>(false);

  // *Queries
  const queryClient = useQueryClient();
  const fetchUsersByAdmin = useFetchUsersByAdmin();
  const fetchPendingUsersByAdmin = useFetchPendingUsersByAdmin();

  // *Methods
  const handleClickCell = (cell: any) => {
    navigate(`/users/${cell?.row?.original?.id}`);
  };

  const handleToggleInvitationForm = () => {
    setIsInvitationFormVisible(!isInvitationFormVisible);
  };

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
          Users who have logged into their account and changed their passwords
        </p>
        <Table
          columns={generateActiveUsersColumns()}
          data={
            fetchUsersByAdmin?.data?.data?.data?.filter(
              (user) => user.role === "user"
            ) || []
          }
          isLoading={fetchUsersByAdmin?.isLoading}
          handleClickCell={handleClickCell}
        />
      </div>

      <div className="flex flex-col mt-10">
        <h2 className="font-bold text-sm">Pending Users</h2>
        <p className="my-4 text-sm">
          Users who have been invited but have yet to log into their accounts
        </p>
        <Table
          columns={generatePendingUsersColumns()}
          data={
            fetchPendingUsersByAdmin?.data?.data?.data?.filter(
              (user) => user.role === "user"
            ) || []
          }
          isLoading={fetchPendingUsersByAdmin?.isLoading}
          handleClickCell={handleClickCell}
        />

        <div className="mt-6 max-w-[300px] self-end">
          <Button onClick={handleToggleInvitationForm}>Invite new user</Button>
        </div>
      </div>

      <Modal
        isVisible={isInvitationFormVisible}
        content={<InviteNewUserForm />}
        onDismiss={handleToggleInvitationForm}
      />
    </AdminBaseLayout>
  );
};

export default AdminHome;
