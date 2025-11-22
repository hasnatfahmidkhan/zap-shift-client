import { Truck } from "lucide-react";
import ParcelsTable from "./ParclesTable/ParcelsTable";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

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
    <section className="bg-base-100 rounded-2xl p-6 min-h-[calc(100vh-116px)]">
      <h2 className="heading">My Parcel</h2>

      <div className="mt-7 flex items-center gap-5">
        <div className="flex items-center px-10 gap-7 h-32 w-80 rounded-2xl bg-base-200">
          <div className="border rounded-full p-3 border-gray-300">
            <Truck size={30} />
          </div>
          <div className="space-y-1">
            <p className="text-xl text-secondary font-medium ">Total</p>
            <h2 className="text-3xl font-semibold tracking-wide">1208</h2>
          </div>
        </div>
        <div className="flex items-center px-10 gap-7 h-32 w-80 rounded-2xl bg-base-200">
          <div className="border rounded-full p-3 border-gray-300">
            <Truck size={30} />
          </div>
          <div className="space-y-1">
            <p className="text-xl text-secondary font-medium ">Total</p>
            <h2 className="text-3xl font-semibold tracking-wide">1208</h2>
          </div>
        </div>
        <div className="flex items-center px-10 gap-7 h-32 w-80 rounded-2xl bg-base-200">
          <div className="border rounded-full p-3 border-gray-300">
            <Truck size={30} />
          </div>
          <div className="space-y-1">
            <p className="text-xl text-secondary font-medium ">Total</p>
            <h2 className="text-3xl font-semibold tracking-wide">1208</h2>
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center h-[40vh]">
          <span className="loading loading-bars loading-xl"></span>
        </div>
      ) : (
        <ParcelsTable parcels={parcels} refetch={refetch} />
      )}
    </section>
  );
};

export default Myparcels;
