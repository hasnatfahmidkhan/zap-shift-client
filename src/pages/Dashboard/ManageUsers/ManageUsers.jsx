import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import UsersTable from "./UsersTable";
import Swal from "sweetalert2";
import { useState } from "react";
import { Search, SkipBack, SkipForward } from "lucide-react";
import useDebounce from "../../../hooks/useDebounce";
import DashboardContainer from "../shared/DashboardContainer";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search, 500);
  const limit = 5;
  const {
    data: users,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["users", page, debounceSearch],
    queryFn: async () => {
      const skip = (page - 1) * limit;
      const { data } = await axiosSecure.get(
        `/users?limit=${limit}&skip=${skip}&search=${search}`
      );
      console.log(data);
      return data;
    },
  });
  const totalUsers = users?.total;
  const totalPages = Math.ceil((totalUsers || 0) / limit);

  const handleAdmin = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to make him as ${
        user?.role !== "admin" ? "an admin" : "a user"
      }`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `${
        user?.role !== "admin" ? "Make Admin!" : "Make User!"
      }`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const userInfo = {
          role: user?.role !== "admin" ? "admin" : "user",
        };
        const { data } = await axiosSecure.patch(
          `/users/${user?._id}/role`,
          userInfo
        );
        if (data.modifiedCount) {
          refetch();

          Swal.fire({
            title: user?.displayName,
            text: `make as ${user?.role !== "admin" ? "an admin" : "a user"}`,
            icon: "success",
          });
        }
      }
    });
  };
  return (
    <DashboardContainer>
      <div className="py-5 flex items-center justify-between">
        <h2 className="heading">Manage Users: {totalUsers}</h2>
        <label className="input focus-within:input-accent">
          <Search size={16} />
          <input
            onChange={(e) =>
              setSearch(e.target.value.trim().toLocaleLowerCase())
            }
            type="search"
            required
            placeholder="Search"
          />
        </label>
      </div>
      <UsersTable
        users={users?.users}
        handleAdmin={handleAdmin}
        isPending={isPending}
      />
      <div className="flex flex-wrap items-center justify-center py-6 gap-3">
        <button
          disabled={page <= 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="pagination-btn"
        >
          <SkipBack size={18} />
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <button
            onClick={() => setPage(num)}
            key={num}
            className={`pagination-btn ${num === page ? "btn-info" : ""}`}
          >
            {num}
          </button>
        ))}
        <button
          disabled={page >= totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className="pagination-btn"
        >
          <SkipForward size={18} />
        </button>
      </div>
    </DashboardContainer>
  );
};

export default ManageUsers;
