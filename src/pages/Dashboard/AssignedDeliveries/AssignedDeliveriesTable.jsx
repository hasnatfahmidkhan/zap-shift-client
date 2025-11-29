import toast from "react-hot-toast";
import Spinner from "../../../components/Spinner/Spinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const AssignedDeliveriesTable = ({ isLoading, parcels, refetch }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Accept/Reject functions remain unchanged
  const handleAcceptDelivery = async (parcelId) => {
    try {
      const updateStatusInfo = { deliveryStatus: "confirm" };
      const { data } = await axiosSecure.patch(
        `/parcels/${parcelId}/deliveryStatus`,
        updateStatusInfo
      );
      if (data.modifiedCount) {
        toast.success("Parcel accepted successfully");
        refetch();
      }
    } catch (error) {
      toast.error("Failed to update delivery status");
    }
  };

  const handleRejectDelivery = async (parcelId) => {
    try {
      const updateStatusInfo = {
        deliveryStatus: "pending-pickup",
        workStatus: "available",
        email: user?.email,
      };
      const { data } = await axiosSecure.patch(
        `/parcels/${parcelId}/deliveryStatus`,
        updateStatusInfo
      );
      if (data.modifiedCount) {
        toast.success("Parcel rejected successfully");
        refetch();
      }
    } catch (error) {
      toast.error("Failed to update delivery status");
    }
  };

  // Mutation to update delivery status from select dropdown
  const statusMutation = useMutation({
    mutationFn: async ({ parcelId, newStatus }) => {
      const workStatus =
        newStatus === "delivered" ? "available" : "in-delivery";
      const { data } = await axiosSecure.patch(
        `/parcels/${parcelId}/deliveryStatus`,
        { deliveryStatus: newStatus, workStatus, email: user?.email }
      );
      return data;
    },
    onSuccess: (data, variables) => {
      if (data.modifiedCount) {
        toast.success("Delivery status updated");
        refetch(); // refresh table data
      }
    },
    onError: () => {
      toast.error("Failed to update delivery status");
    },
  });

  if (isLoading) return <Spinner />;

  return (
    <div className="overflow-x-auto mt-6 border border-gray-300 rounded-md">
      <table className="table table-zebra w-full">
        <thead>
          <tr className="bg-base-200 text-black">
            <th>#</th>
            <th>Parcel Name</th>
            <th>Pickup Address</th>
            <th>Delivery Address</th>
            <th>Status</th>
            <th>Action</th>
            <th>Other Action</th>
          </tr>
        </thead>
        <tbody>
          {parcels.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center py-4">
                No assigned deliveries.
              </td>
            </tr>
          ) : (
            parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <td>{index + 1}</td>
                <td>{parcel.parcelName}</td>
                <td>{parcel.senderAddress}</td>
                <td>{parcel.receiverAddress}</td>
                <td>
                  <span
                    className={`badge ${
                      parcel.deliveryStatus === "delivered"
                        ? "badge-success"
                        : "badge-warning"
                    }`}
                  >
                    {parcel.deliveryStatus}
                  </span>
                </td>
                <td>
                  <span className="flex flex-wrap items-center gap-3">
                    {parcel.deliveryStatus === "rider-assigned" ? (
                      <>
                        <button
                          onClick={() => handleAcceptDelivery(parcel._id)}
                          className="btn btn-xs btn-primary text-secondary"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleRejectDelivery(parcel._id)}
                          className="btn btn-xs btn-error"
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span className="badge badge-success">Accepted</span>
                    )}
                  </span>
                </td>
                <td>
                  {" "}
                  <select
                    className="select select-sm select-bordered w-fit"
                    defaultValue={parcel.deliveryStatus}
                    disabled={
                      parcel.deliveryStatus === "delivered" ||
                      parcel.deliveryStatus === "rider-assigned"
                    }
                    onChange={(e) =>
                      statusMutation.mutate({
                        parcelId: parcel._id,
                        newStatus: e.target.value,
                      })
                    }
                  >
                    <option disabled={true}>{parcel.deliveryStatus}</option>{" "}
                    <option value="pick-up">Pick-Up</option>{" "}
                    <option value="in-transit">In-Transit</option>{" "}
                    <option value="delivered">Delivered</option>{" "}
                  </select>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AssignedDeliveriesTable;
