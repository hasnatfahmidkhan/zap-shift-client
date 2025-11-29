import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import AssignRidersTable from "./AssignRidersTable";
import { useRef, useState } from "react";
import AssignRiderModal from "./AssignRiderModal";
import toast from "react-hot-toast";

const AssignRiders = () => {
  const [selectedParcel, setSelectedParcel] = useState("");
  const riderModalRef = useRef();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
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
      return data;
    },
  });

  const { data: riders, isLoading: riderLoading } = useQuery({
    queryKey: ["riders", "available", selectedParcel.senderDistrict],
    enabled: !!selectedParcel,
    queryFn: async () => {
      // invalidate query
      // queryClient.invalidateQueries({
      //   queryKey: ["riders", "available", selectedParcel.senderDistrict],
      // });
      const { data } = await axiosSecure.get(
        `/riders?status=approved&workStatus=available&district=${selectedParcel.senderDistrict}`
      );
      return data;
    },
  });

  const OpenAssignRiderModal = (parcel) => {
    setSelectedParcel(parcel);
    riderModalRef.current?.showModal();
  };

  const handleAssignRider = async (rider) => {
    const riderAssignInfo = {
      riderId: rider._id,
      riderName: rider.name,
      riderEmail: rider.email,
      parcelId: selectedParcel._id,
    };
    const { data } = await axiosSecure.patch(
      `/parcels/${selectedParcel._id}/assign`,
      riderAssignInfo
    );
    console.log(data);
    if (data) {
      toast.success("Rider Assign Successfully");
      riderModalRef.current?.close();
    }
  };
  return (
    <div>
      <h3 className="heading">Assign Riders {parcels?.length}</h3>
      <AssignRidersTable
        OpenAssignRiderModal={OpenAssignRiderModal}
        parcels={parcels}
        riders={riders}
        isLoading={isLoading}
        riderModalRef
      />
      <AssignRiderModal
        riderModalRef={riderModalRef}
        riderLoading={riderLoading}
        riders={riders}
        handleAssignRider={handleAssignRider}
      />
    </div>
  );
};

export default AssignRiders;
