import { Truck } from "lucide-react";
import ParcelsTable from "./ParclesTable/ParcelsTable";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import DashboardContainer from "../shared/DashboardContainer";
import { MyParcelTableSkeleton } from "../../../components/skeletons";

const Myparcels = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    data: parcels = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["parcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
      // const res =
      return res.data;
    },
    enabled: !!user?.email, // when user email has value true then it fetch the data
  });

  return (
    <DashboardContainer>
      <h2 className="heading">My Parcel</h2>

      
      {isLoading ? (
        <MyParcelTableSkeleton />
      ) : (
        <ParcelsTable parcels={parcels} refetch={refetch} />
      )}
    </DashboardContainer>
  );
};

export default Myparcels;
