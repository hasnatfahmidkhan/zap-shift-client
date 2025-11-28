import { useQuery } from "@tanstack/react-query";
import DashboardContainer from "../shared/DashboardContainer";
import RiderTable from "./RiderTable/RiderTable";
import TableLoader from "../shared/TableLoader";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { ArrowUpDown, RotateCcw, Search } from "lucide-react";

const ApproveRider = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: riders,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/riders");
      return data;
    },
  });

  return (
    <DashboardContainer>
      <div className="flex items-center justify-between">
        <h3 className="heading">Approve Rider</h3>
        <div className="flex items-center gap-6">
          {/* Search */}
          <div>
            <label className="input">
              <Search size={16}/>
              <input type="search" required placeholder="Search" />
            </label>
          </div>

          {/* Filter */}
          <div>
            <select defaultValue="Pick a color" className="select">
              <option disabled={true}>Pick a color</option>
              <option>Crimson</option>
              <option>Amber</option>
              <option>Velvet</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <select defaultValue="Pick a color" className="select">
              <option disabled={true}>Pick a color</option>
              <option>Crimson</option>
              <option>Amber</option>
              <option>Velvet</option>
            </select>
          </div>

          {/* Asc Or Dsc */}
          <div>
            <ArrowUpDown />
          </div>

          {/* Reset */}
          <div>
            <RotateCcw />
          </div>
        </div>
      </div>
      {isPending ? (
        <TableLoader />
      ) : (
        <RiderTable riders={riders} refetch={refetch} />
      )}
    </DashboardContainer>
  );
};

export default ApproveRider;
