import { useFetchMe } from "api/hooks";

/** A hook to simplify getting specific data from useMeQuery */
export const useMe = () => {
  const fetchMe = useFetchMe();
  const data = fetchMe?.data?.data?.data;

  return {
    departmentId: data?.userDepartments[0]?.department?.id,
    email: data?.email,
  };
};
