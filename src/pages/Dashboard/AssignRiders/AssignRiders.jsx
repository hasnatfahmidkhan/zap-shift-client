import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import AssignRidersTable from "./AssignRidersTable";

const AssignRiders = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: parcels,
    isLoading,
    // refetch,
  } = useQuery({
    queryKey: ["parcels", "pending-pickup"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/parcels?deliveryStatus=pending-pickup`
      );
      console.log(data);
      return data;
    },
  });
  return (
    <div>
      <h3 className="heading">Assign Riders {parcels?.length}</h3>
      <AssignRidersTable parcels={parcels} isLoading={isLoading} />
    </div>
  );
};

export default AssignRiders;
