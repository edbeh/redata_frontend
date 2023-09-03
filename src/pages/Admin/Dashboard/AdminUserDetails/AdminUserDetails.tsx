import { useFetchUserByAdminById } from "api/hooks";
import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";

const AdminUserDetails = () => {
  const { id } = useParams();

  // *Queries
  const queryClient = useQueryClient();
  const fetchUserByAdminById = useFetchUserByAdminById(id as string, !!id);

  console.log("fetchUserByAdminById", fetchUserByAdminById?.data?.data?.data);

  return <span>User details</span>;
};

export default AdminUserDetails;
