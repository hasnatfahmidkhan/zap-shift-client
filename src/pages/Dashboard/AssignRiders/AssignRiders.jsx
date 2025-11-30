import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
    queryKey: ["parcels", "parcel-paid"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/parcels?deliveryStatus=parcel-paid`
      );
      return data;
    },
  });

  const { data: riders, isLoading: riderLoading } = useQuery({
    queryKey: ["riders", "available", selectedParcel.senderDistrict],
    enabled: !!selectedParcel,
    queryFn: async () => {
      // invalidate query
      queryClient.invalidateQueries({
        queryKey: ["riders", "available", selectedParcel.senderDistrict],
      });
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

  const { mutate } = useMutation({
    mutationFn: async (rider) => {
      const riderAssignInfo = {
        riderId: rider._id,
        riderName: rider.name,
        riderEmail: rider.email,
        parcelId: selectedParcel._id,
        trackingId: selectedParcel.trackingId,
      };

      const { data } = await axiosSecure.patch(
        `/parcels/${selectedParcel._id}/assign`,
        riderAssignInfo
      );
      return data;
    },

    onSuccess: (data) => {
      console.log(data);

      if (
        data?.parcelInfo?.modifyParcel?.modifiedCount &&
        data?.riderInfo?.modifyParcel?.modifiedCount
      ) {
        toast.success("Rider Assigned Successfully");
        riderModalRef.current?.close();
      }

      // refetch parcels list
      queryClient.invalidateQueries([
        "riders",
        "available",
        selectedParcel.senderDistrict,
      ]);
    },

    onError: () => {
      toast.error("Failed to assign rider");
    },
  });
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
        mutate={mutate}
      />
    </div>
  );
};

export default AssignRiders;
