import { useQuery } from "@tanstack/react-query";
import DashboardContainer from "../shared/DashboardContainer";
import RiderTable from "./RiderTable/RiderTable";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  ArrowUpDown,
  RotateCcw,
  Search,
  SkipBack,
  SkipForward,
} from "lucide-react";
import { useState } from "react";
import RiderTableLoader from "../AssignRiders/RiderTableLoader";
import { ApproveRiderTableSkeleton } from "../../../components/skeletons";

const ApproveRider = () => {
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  const [totalRiders, setTotalRiders] = useState(0);
  const limit = 5;

  const {
    data: riders,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["riders", "pending", page],
    queryFn: async () => {
      const skip = limit * (page - 1);
      const { data } = await axiosSecure.get(
        `/riders?limit=${limit}&skip=${skip}`
      );
      setTotalRiders(data.count);
      return data.result;
    },
  });
  const totalPages = Math.ceil((totalRiders || 0) / limit);

  return (
    <DashboardContainer>
      <div className="flex items-center justify-between">
        <h3 className="heading">Approve Rider</h3>
        <div className="flex items-center gap-6">
          {/* Search */}
          <div>
            <label className="input">
              <Search size={16} />
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
        <ApproveRiderTableSkeleton />
      ) : (
        <RiderTable
          riders={riders}
          refetch={refetch}
          page={page}
          limit={limit}
        />
      )}
      <div className="flex items-center gap-3 justify-center py-6">
        <button
          disabled={page <= 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="pagination-btn"
        >
          <SkipBack size={18} />
        </button>
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            onClick={() => setPage(i + 1)}
            className={`pagination-btn ${page - 1 === i && "btn-info"}`}
          >
            {i + 1}
          </button>
        ))}
        <button
          disabled={page >= totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className="pagination-btn"
        >
          {console.log(totalPages, page)}
          <SkipForward size={18} />
        </button>
      </div>
    </DashboardContainer>
  );
};

export default ApproveRider;
