import { useQuery } from "@tanstack/react-query";
import DashboardContainer from "../shared/DashboardContainer";
import RiderTable from "./RiderTable/RiderTable";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Search, SkipBack, SkipForward } from "lucide-react";
import { useState } from "react";
import { ApproveRiderTableSkeleton } from "../../../components/skeletons";
import useDebounce from "../../../hooks/useDebounce";

const ApproveRider = () => {
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  const [totalRiders, setTotalRiders] = useState(0);
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search, 500);

  const limit = 5;

  const {
    data: riders,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["riders", "pending", page, debounceSearch],
    queryFn: async () => {
      const skip = limit * (page - 1);
      const { data } = await axiosSecure.get(
        `/riders?limit=${limit}&skip=${skip}&search=${search}`
      );
      setTotalRiders(data.count);
      return data.result;
    },
  });
  const totalPages = Math.ceil((totalRiders || 0) / limit);

  return (
    <DashboardContainer>
      <div className="flex items-center flex-wrap gap-y-4 md:justify-between">
        <h3 className="heading">Approve Rider</h3>
        <div className="flex items-center gap-6">
          {/* Search */}
          <div className="flex items-center bg-gray-100 rounded-xl px-4 py-2.5 focus-within:ring-2 focus-within:ring-lime-500/50 transition-all w-full md:w-72">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              onChange={(e) =>
                setSearch(e.target.value.trim().toLocaleLowerCase())
              }
              type="search"
              placeholder="Search riders..."
              className="bg-transparent border-none text-sm text-gray-900 placeholder-gray-400 focus:ring-0 focus:outline-none w-full ml-3"
            />
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
      <div className="flex flex-wrap items-center gap-3 justify-center py-6">
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
