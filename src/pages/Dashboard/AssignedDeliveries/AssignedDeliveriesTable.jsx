import toast from "react-hot-toast";
import Spinner from "../../../components/Spinner/Spinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import {
  Package,
  MapPin,
  Navigation,
  CheckCircle,
  XCircle,
  Truck,
  Clock,
  ChevronRight,
  Phone,
  Copy,
  MapPinned,
  PackageCheck,
  CircleDot,
  Home,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

const AssignedDeliveriesTable = ({ isLoading, parcels, refetch }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [copiedId, setCopiedId] = useState(null);

  // Copy address to clipboard
  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success("Address copied!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Open address in Google Maps
  const openInMaps = (address) => {
    const encodedAddress = encodeURIComponent(address);
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`,
      "_blank"
    );
  };

  // Accept/Reject functions
  const handleAcceptDelivery = async (parcel) => {
    try {
      const updateStatusInfo = {
        deliveryStatus: "confirm",
        trackingId: parcel.trackingId,
      };
      const { data } = await axiosSecure.patch(
        `/parcels/${parcel._id}/deliveryStatus`,
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

  const handleRejectDelivery = async (parcel) => {
    try {
      const updateStatusInfo = {
        deliveryStatus: "parcel-paid",
        email: user?.email,
        trackingId: parcel.trackingId,
      };
      const { data } = await axiosSecure.patch(
        `/parcels/${parcel._id}/deliveryStatus`,
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

  // Mutation to update delivery status
  const statusMutation = useMutation({
    mutationFn: async ({ parcelId, newStatus, trackingId }) => {
      const statusUpdateInfo = {
        deliveryStatus: newStatus,
        email: user?.email,
        trackingId,
      };
      const { data } = await axiosSecure.patch(
        `/parcels/${parcelId}/deliveryStatus`,
        statusUpdateInfo
      );
      return data;
    },
    onSuccess: (data) => {
      if (data.modifiedCount) {
        toast.success("Delivery status updated");
        refetch();
      }
    },
    onError: () => {
      toast.error("Failed to update delivery status");
    },
  });

  // Status styling
  const getStatusStyle = (status) => {
    const styles = {
      "rider-assigned": {
        bg: "bg-amber-100",
        text: "text-amber-700",
        border: "border-amber-200",
        icon: Clock,
      },
      confirm: {
        bg: "bg-blue-100",
        text: "text-blue-700",
        border: "border-blue-200",
        icon: CheckCircle,
      },
      "pick-up": {
        bg: "bg-indigo-100",
        text: "text-indigo-700",
        border: "border-indigo-200",
        icon: PackageCheck,
      },
      "in-transit": {
        bg: "bg-purple-100",
        text: "text-purple-700",
        border: "border-purple-200",
        icon: Truck,
      },
      delivered: {
        bg: "bg-green-100",
        text: "text-green-700",
        border: "border-green-200",
        icon: Home,
      },
    };
    return (
      styles[status] || {
        bg: "bg-gray-100",
        text: "text-gray-700",
        border: "border-gray-200",
        icon: CircleDot,
      }
    );
  };

  // Status label mapping
  const statusLabels = {
    "rider-assigned": "Pending Accept",
    confirm: "Confirmed",
    "pick-up": "Picked Up",
    "in-transit": "In Transit",
    delivered: "Delivered",
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="mt-6">
      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4 min-h-[calc(100vh-190px)]">
        {parcels.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-600">
              No deliveries assigned
            </h3>
            <p className="text-gray-400 text-sm mt-1">
              New assignments will appear here
            </p>
          </div>
        ) : (
          parcels.map((parcel, index) => {
            const statusStyle = getStatusStyle(parcel.deliveryStatus);
            const StatusIcon = statusStyle.icon;
            const isNewAssignment = parcel.deliveryStatus === "rider-assigned";
            const isDelivered = parcel.deliveryStatus === "delivered";

            return (
              <div
                key={parcel._id}
                className={`bg-white rounded-xl shadow-md border overflow-hidden ${
                  isNewAssignment
                    ? "border-amber-300 ring-2 ring-amber-100"
                    : "border-gray-100"
                }`}
              >
                {/* New Assignment Banner */}
                {isNewAssignment && (
                  <div className="bg-linear-to-r from-amber-400 to-orange-500 px-4 py-2 flex items-center justify-center gap-2">
                    <Clock className="w-4 h-4 text-white animate-pulse" />
                    <span className="text-white text-sm font-semibold">
                      New Assignment - Action Required
                    </span>
                  </div>
                )}

                {/* Card Header */}
                <div
                  className={`px-4 py-3 ${
                    isNewAssignment
                      ? "bg-amber-50"
                      : isDelivered
                      ? "bg-linear-to-r from-green-500 to-emerald-600"
                      : "bg-linear-to-r from-indigo-500 to-purple-600"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Package
                        className={`w-5 h-5 ${
                          isNewAssignment ? "text-amber-600" : "text-white"
                        }`}
                      />
                      <span
                        className={`font-semibold truncate max-w-[200px] ${
                          isNewAssignment ? "text-amber-800" : "text-white"
                        }`}
                      >
                        {parcel.parcelName}
                      </span>
                    </div>
                    <span
                      className={`text-sm font-medium ${
                        isNewAssignment ? "text-amber-600" : "text-white/80"
                      }`}
                    >
                      #{index + 1}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 space-y-4">
                  {/* Status Badge */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold border ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}
                    >
                      <StatusIcon className="w-4 h-4" />
                      {statusLabels[parcel.deliveryStatus] ||
                        parcel.deliveryStatus}
                    </span>

                    {/* Tracking Link */}
                    <Link
                      to={`/track-parcel/${parcel.trackingId}`}
                      className="text-xs text-indigo-600 font-medium hover:underline flex items-center gap-1"
                    >
                      Track
                      <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>

                  {/* Addresses Section */}
                  <div className="space-y-3">
                    {/* Pickup Address */}
                    <div className="bg-green-50 rounded-xl p-3 border border-green-100">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-3 flex-1">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                            <MapPin className="w-5 h-5 text-green-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-green-600 uppercase tracking-wide">
                              Pickup From
                            </p>
                            <p className="text-sm text-gray-800 font-medium mt-1 leading-relaxed">
                              {parcel.senderAddress}
                            </p>
                            {parcel.senderPhone && (
                              <a
                                href={`tel:${parcel.senderPhone}`}
                                className="inline-flex items-center gap-1 text-xs text-green-600 mt-2 hover:underline"
                              >
                                <Phone className="w-3 h-3" />
                                {parcel.senderPhone}
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                      {/* Address Actions */}
                      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-green-100">
                        <button
                          onClick={() => openInMaps(parcel.senderAddress)}
                          className="flex-1 flex items-center justify-center gap-2 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 active:scale-98 transition-all"
                        >
                          <Navigation className="w-4 h-4" />
                          Navigate
                        </button>
                        <button
                          onClick={() =>
                            copyToClipboard(
                              parcel.senderAddress,
                              `pickup-${parcel._id}`
                            )
                          }
                          className="p-2 bg-green-100 rounded-lg hover:bg-green-200 transition-colors"
                        >
                          {copiedId === `pickup-${parcel._id}` ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : (
                            <Copy className="w-5 h-5 text-green-600" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Arrow Indicator */}
                    <div className="flex justify-center">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <ChevronRight className="w-5 h-5 text-gray-400 rotate-90" />
                      </div>
                    </div>

                    {/* Delivery Address */}
                    <div className="bg-blue-50 rounded-xl p-3 border border-blue-100">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-3 flex-1">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                            <MapPinned className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                              Deliver To
                            </p>
                            <p className="text-sm text-gray-800 font-medium mt-1 leading-relaxed">
                              {parcel.receiverAddress}
                            </p>
                            {parcel.receiverPhone && (
                              <a
                                href={`tel:${parcel.receiverPhone}`}
                                className="inline-flex items-center gap-1 text-xs text-blue-600 mt-2 hover:underline"
                              >
                                <Phone className="w-3 h-3" />
                                {parcel.receiverPhone}
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                      {/* Address Actions */}
                      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-blue-100">
                        <button
                          onClick={() => openInMaps(parcel.receiverAddress)}
                          className="flex-1 flex items-center justify-center gap-2 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 active:scale-98 transition-all"
                        >
                          <Navigation className="w-4 h-4" />
                          Navigate
                        </button>
                        <button
                          onClick={() =>
                            copyToClipboard(
                              parcel.receiverAddress,
                              `delivery-${parcel._id}`
                            )
                          }
                          className="p-2 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors"
                        >
                          {copiedId === `delivery-${parcel._id}` ? (
                            <CheckCircle className="w-5 h-5 text-blue-600" />
                          ) : (
                            <Copy className="w-5 h-5 text-blue-600" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Action Section */}
                  <div className="pt-4 border-t border-gray-100">
                    {isNewAssignment ? (
                      /* Accept/Reject Buttons for New Assignments */
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => handleAcceptDelivery(parcel)}
                          className="flex items-center justify-center gap-2 py-3 bg-linear-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold text-sm hover:from-green-600 hover:to-emerald-700 active:scale-98 transition-all shadow-md"
                        >
                          <CheckCircle className="w-5 h-5" />
                          Accept
                        </button>
                        <button
                          onClick={() => handleRejectDelivery(parcel)}
                          className="flex items-center justify-center gap-2 py-3 bg-linear-to-r from-red-500 to-rose-600 text-white rounded-xl font-semibold text-sm hover:from-red-600 hover:to-rose-700 active:scale-98 transition-all shadow-md"
                        >
                          <XCircle className="w-5 h-5" />
                          Reject
                        </button>
                      </div>
                    ) : (
                      /* Status Update Dropdown for Accepted Deliveries */
                      <div className="space-y-3">
                        <p className="text-xs text-gray-500 font-medium">
                          Update Delivery Status
                        </p>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            {
                              value: "pick-up",
                              label: "Pick Up",
                              icon: PackageCheck,
                              color: "indigo",
                            },
                            {
                              value: "in-transit",
                              label: "In Transit",
                              icon: Truck,
                              color: "purple",
                            },
                            {
                              value: "delivered",
                              label: "Delivered",
                              icon: Home,
                              color: "green",
                            },
                          ].map((status) => {
                            const isActive =
                              parcel.deliveryStatus === status.value;
                            const isPast =
                              ["pick-up", "in-transit", "delivered"].indexOf(
                                parcel.deliveryStatus
                              ) >
                              ["pick-up", "in-transit", "delivered"].indexOf(
                                status.value
                              );
                            const isDisabled = isDelivered || isPast;

                            return (
                              <button
                                key={status.value}
                                disabled={isDisabled}
                                onClick={() =>
                                  statusMutation.mutate({
                                    parcelId: parcel._id,
                                    newStatus: status.value,
                                    trackingId: parcel.trackingId,
                                  })
                                }
                                className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all ${
                                  isActive
                                    ? `bg-${status.color}-100 border-2 border-${status.color}-500 text-${status.color}-700`
                                    : isDisabled
                                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                    : `bg-gray-50 border border-gray-200 text-gray-600 hover:bg-${status.color}-50 hover:border-${status.color}-200 active:scale-95`
                                }`}
                              >
                                <status.icon
                                  className={`w-6 h-6 mb-1 ${
                                    isActive
                                      ? `text-${status.color}-600`
                                      : isDisabled
                                      ? "text-gray-400"
                                      : "text-gray-500"
                                  }`}
                                />
                                <span className="text-xs font-medium">
                                  {status.label}
                                </span>
                                {isActive && (
                                  <CheckCircle className="w-4 h-4 mt-1 text-green-500" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto border border-gray-200 rounded-xl">
        <table className="table table-zebra w-full">
          <thead>
            <tr className="bg-base-200 text-black">
              <th>#</th>
              <th>Parcel Name</th>
              <th>Pickup Address</th>
              <th>Delivery Address</th>
              <th>Status</th>
              <th>Action</th>
              <th>Update Status</th>
            </tr>
          </thead>
          <tbody>
            {parcels.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center bg-white py-8">
                  <div className="flex flex-col items-center gap-2">
                    <Truck className="w-12 h-12 text-gray-300" />
                    <span className="text-gray-500">
                      No assigned deliveries.
                    </span>
                  </div>
                </td>
              </tr>
            ) : (
              parcels.map((parcel, index) => {
                const statusStyle = getStatusStyle(parcel.deliveryStatus);
                const StatusIcon = statusStyle.icon;

                return (
                  <tr
                    key={parcel._id}
                    className={
                      parcel.deliveryStatus === "rider-assigned"
                        ? "bg-amber-50"
                        : ""
                    }
                  >
                    <td>{index + 1}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-gray-500" />
                        <span className="font-medium">{parcel.parcelName}</span>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2 max-w-[200px]">
                        <span className="truncate">{parcel.senderAddress}</span>
                        <button
                          onClick={() => openInMaps(parcel.senderAddress)}
                          className="btn btn-xs btn-ghost"
                          title="Open in Maps"
                        >
                          <Navigation className="w-3 h-3 text-green-600" />
                        </button>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2 max-w-[200px]">
                        <span className="truncate">
                          {parcel.receiverAddress}
                        </span>
                        <button
                          onClick={() => openInMaps(parcel.receiverAddress)}
                          className="btn btn-xs btn-ghost"
                          title="Open in Maps"
                        >
                          <Navigation className="w-3 h-3 text-blue-600" />
                        </button>
                      </div>
                    </td>
                    <td>
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${statusStyle.bg} ${statusStyle.text}`}
                      >
                        <StatusIcon className="w-3 h-3" />
                        {statusLabels[parcel.deliveryStatus] ||
                          parcel.deliveryStatus}
                      </span>
                    </td>
                    <td>
                      {parcel.deliveryStatus === "rider-assigned" ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleAcceptDelivery(parcel)}
                            className="btn btn-xs btn-success text-white"
                          >
                            <CheckCircle className="w-3 h-3" />
                            Accept
                          </button>
                          <button
                            onClick={() => handleRejectDelivery(parcel)}
                            className="btn btn-xs btn-error text-white"
                          >
                            <XCircle className="w-3 h-3" />
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="badge badge-success gap-1">
                          <CheckCircle className="w-3 h-3" />
                          Accepted
                        </span>
                      )}
                    </td>
                    <td>
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
                            trackingId: parcel.trackingId,
                          })
                        }
                      >
                        <option disabled>{parcel.deliveryStatus}</option>
                        <option value="pick-up">Pick-Up</option>
                        <option value="in-transit">In-Transit</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignedDeliveriesTable;
