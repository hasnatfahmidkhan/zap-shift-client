import { useQuery } from "@tanstack/react-query";
import DashboardContainer from "../shared/DashboardContainer";
import RiderTable from "./RiderTable/RiderTable";
import TableLoader from "../shared/TableLoader";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ApproveRider = () => {
  const axiosSecure = useAxiosSecure();
  const { data: riders, isPending, refetch } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/riders");
      return data;
    },
  });

  return (
    <DashboardContainer>
      <h3 className="heading">Approve Rider</h3>
      {isPending ? <TableLoader /> : <RiderTable riders={riders} refetch={refetch}/>}
    </DashboardContainer>
  );
};

export default ApproveRider;
