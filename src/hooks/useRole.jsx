import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: role, isLoading: userRoleLoading } = useQuery({
    queryKey: ["user-role", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/users/${user?.email}/role`);
      return data.role;
    },
  });
  return { role, userRoleLoading };
};

export default useRole;
