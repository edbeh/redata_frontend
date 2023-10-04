import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  ImgCircleLoadingOutline,
  imgClipboardDocument,
  imgNoProfilePic,
} from "assets";
import { AdminBaseLayout } from "wrapper-components";
import { AdminCard, AdminRow } from "components";
import {
  useFetchPendingUsersByAdmin,
  useFetchUserByAdminById,
} from "api/hooks";
import { copyToClipboard } from "utils";

const AdminUserDetails = () => {
  const { id } = useParams();
  const [token, setToken] = useState<string>("");
  const [shouldShowFirstLoginLink, setShouldShowFirstLoginLink] =
    useState<boolean>(false);

  // *Queries
  const fetchPendingUsersByAdmin = useFetchPendingUsersByAdmin();
  const fetchUserByAdminById = useFetchUserByAdminById(id as string, !!id);

  // *Methods
  const copyLoginLinkToClipboard = async () => {
    copyToClipboard(`${process.env.REACT_APP_APP_URL}login/first/${token}`);
  };

  // *Effects
  useEffect(() => {
    if (fetchUserByAdminById?.data?.data?.data) {
      const assumeAccountLink =
        fetchUserByAdminById.data.data.data.assumeAccountLink;
      const token = assumeAccountLink.split("token=")[1];
      setToken(token);
    }
  }, [fetchUserByAdminById]);

  useEffect(() => {
    if (
      fetchUserByAdminById?.data?.data?.data &&
      fetchPendingUsersByAdmin?.data?.data?.data
    ) {
      const user = fetchUserByAdminById.data.data.data;
      const pendingUsers = fetchPendingUsersByAdmin.data.data.data;
      const userIsPending = pendingUsers.some(
        (pendingUser) => pendingUser.id === user.id
      );
      setShouldShowFirstLoginLink(userIsPending);
    }
  }, [fetchUserByAdminById, fetchPendingUsersByAdmin]);

  // *JSX
  if (fetchUserByAdminById?.isLoading)
    return (
      <AdminBaseLayout title="Admins" withBackNavigation>
        <div className="flex h-full justify-center items-center">
          <ImgCircleLoadingOutline
            width={40}
            height={40}
            className="animate-spin text-primary-500"
          />
        </div>
      </AdminBaseLayout>
    );

  const data = fetchUserByAdminById?.data?.data?.data;

  return (
    <AdminBaseLayout title="Users" withBackNavigation>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <div className="flex flex-col sm:flex-row sm:justify-between items-center space-x-5 space-y-2 sm:space-y-0">
          <img
            src={data?.image || imgNoProfilePic}
            alt="profile"
            className="object-cover min-h-[80px] min-w-[80px] max-h-[80px] max-w-[80px] border-2 border-white rounded-full ring-cyan-500 ring-2"
          />
          <h1 className="text-2xl font-semibold">{data?.name}</h1>
        </div>
      </div>

      {/* only show this section for pending users who haven't logged in before */}
      {shouldShowFirstLoginLink && (
        <div className="mt-6 max-w-[600px]">
          <AdminCard title="First Login">
            <p className="text-sm">
              Copy the first login link below and send it to the researcher when
              this profile is ready to be reviewed and acknowledged.
            </p>
            <div
              className="flex space-x-1 text-blue-500 items-center cursor-pointer"
              onClick={copyLoginLinkToClipboard}
            >
              <img
                src={imgClipboardDocument}
                alt="copy"
                width={20}
                height={20}
                className="self-center text-blue-500"
              />
              <p className="text-sm">Copy link</p>
            </div>
          </AdminCard>
        </div>
      )}

      <div className="mt-6 max-w-[600px]">
        <AdminCard title="User details">
          <AdminRow title="Insitution" value={data?.institution?.name} />
          <AdminRow title="Department" value={data?.department?.name} />
          <AdminRow title="Email" value={data?.email} />
        </AdminCard>
      </div>
    </AdminBaseLayout>
  );
};

export default AdminUserDetails;
