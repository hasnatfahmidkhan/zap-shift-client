import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import AssignedDeliveriesTable from "./AssignedDeliveriesTable";
import DashboardContainer from "../shared/DashboardContainer";

const AssignedDeliveries = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: parcels,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["parcels", user?.email, "rider-assigned", "confirm"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user?.email}&deliveryStatus=rider-assigned`
      );
      return data;
    },
  });
  return (
    <DashboardContainer>
      <h3 className="heading">Assign Deliveries</h3>
      <AssignedDeliveriesTable
        refetch={refetch}
        isLoading={isLoading}
        parcels={parcels}
      />
    </DashboardContainer>
  );
};

export default AssignedDeliveries;
