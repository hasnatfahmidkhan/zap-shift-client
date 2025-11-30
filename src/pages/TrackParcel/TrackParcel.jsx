import { useQuery } from "@tanstack/react-query";
import {
  MapPin,
  Package,
  Truck,
  Home,
  CheckCircle,
  Clock,
  MapPinCheck,
  User,
} from "lucide-react";
import { useParams } from "react-router";
import useAxios from "../../hooks/useAxios";

export default function ParcelTracker() {
  const axiosInstance = useAxios();
  const { id } = useParams();

  const {
    data: trackingData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tracking", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/trackings/${id}`);
      return data;
    },
    refetchInterval: 5000,
  });
  console.log(trackingData);
  // Status to icon mapping
  const statusIconMap = {
    "parcel-paid": Package,
    "rider-assigned": User,
    confirm: CheckCircle,
    "pick-up": Truck,
    "in-transit": MapPin,
    delivered: Home,
  };

  // Status to label mapping
  const statusLabelMap = {
    "parcel-paid": "Parcel Paid",
    "rider-assigned": "Rider Assigned",
    confirm: "Confirmed",
    "pick-up": "Picked Up",
    "in-transit": "In Transit",
    delivered: "Delivered",
  };

  // Check if a status is completed
  const getCompletedStatuses = () => {
    if (!trackingData || trackingData.length === 0) return [];

    const allStatuses = [
      "parcel-paid",
      "rider-assigned",
      "confirm",
      "pick-up",
      "in-transit",
      "delivered",
    ];

    const currentStatuses = trackingData.map((t) => t.status);

    // find the LAST completed status
    const lastStatusIndex = allStatuses.findLastIndex((s) =>
      currentStatuses.includes(s)
    );

    return allStatuses.slice(0, lastStatusIndex + 1);
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loading loading-spinner loading-lg text-indigo-600"></div>
      </div>
    );
  }

  if (error || !trackingData || trackingData.length === 0) {
    return (
      <div className="alert alert-error">
        <span>Failed to load tracking information</span>
      </div>
    );
  }

  const completedStatuses = getCompletedStatuses();
  const currentStatus = trackingData[trackingData.length - 1]?.status;
  const progressPercentage = (completedStatuses.length / 6) * 100;

  const allStatuses = [
    "parcel-paid",
    "rider-assigned",
    "confirm",
    "pick-up",
    "in-transit",
    "delivered",
  ];

  // Create data map by status
  const dataByStatus = {};
  trackingData.forEach((item) => {
    dataByStatus[item.status] = item;
  });

  return (
    <div>
      {/* Header */}
      <div className="mb-12">
        <div className="inline-block">
          <h1 className="text-4xl font-bold mb-2">Track Your Parcel</h1>
          <p className="text-secondary">
            Tracking ID: {trackingData[0]?.trackingId}
          </p>
        </div>
      </div>

      {/* Main Card */}
      <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Top accent bar */}
        <div className="h-2 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

        <div className="p-8">
          {/* Status Summary */}
          <div className="grid grid-cols-3 gap-6 mb-12">
            <div className="bg-linear-to-br from-indigo-50 to-blue-50 rounded-xl p-6 border border-indigo-100">
              <p className="text-gray-600 text-sm font-medium mb-1">
                Current Status
              </p>
              <p className="text-2xl font-bold text-indigo-600 capitalize">
                {statusLabelMap[currentStatus]}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                {dataByStatus[currentStatus]?.details}
              </p>
            </div>
            <div className="bg-linear-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
              <p className="text-gray-600 text-sm font-medium mb-1">
                Last Updated
              </p>
              <p className="text-lg font-bold text-green-600">
                {formatDate(dataByStatus[currentStatus]?.createdAt)}
              </p>
              <p className="text-xs text-gray-500 mt-2">Just now</p>
            </div>
            <div className="bg-linear-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
              <p className="text-gray-600 text-sm font-medium mb-1">Progress</p>
              <p className="text-2xl font-bold text-purple-600">
                {Math.round(progressPercentage)}%
              </p>
              <p className="text-xs text-gray-500 mt-2">
                {completedStatuses.length} of 6 steps
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Background progress bar */}
            <div className="absolute top-8 left-8 right-8 h-1 bg-gray-200 rounded-full"></div>
            <div
              className="absolute top-8 left-8 h-1 bg-linear-to-r from-green-400 via-indigo-500 to-indigo-500 rounded-full transition-all duration-500"
              style={{ width: `calc(${progressPercentage}% - 32px)` }}
            ></div>

            {/* Steps */}
            <div className="relative flex justify-between">
              {allStatuses?.map((status) => {
                const IconComponent = statusIconMap[status];
                const isCompleted = completedStatuses.includes(status);
                const isCurrent = status === currentStatus;
                const data = dataByStatus[status];

                return (
                  <div
                    key={status}
                    className="flex flex-col items-center flex-1"
                  >
                    {/* Icon Circle */}
                    <div className="relative mb-6 z-10">
                      <div
                        className={`relative w-16 h-16 rounded-full flex items-center justify-center font-bold text-white text-lg transition-all duration-300 transform hover:scale-110 ${
                          isCompleted
                            ? "bg-linear-to-br from-green-400 to-green-600 shadow-lg shadow-green-400/50"
                            : isCurrent
                            ? "bg-linear-to-br from-indigo-500 to-indigo-700 shadow-lg shadow-indigo-500/50 animate-pulse"
                            : "bg-gray-300 shadow-md"
                        }`}
                      >
                        <IconComponent size={28} />
                      </div>
                      {isCompleted && !isCurrent && (
                        <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1 shadow-lg">
                          <CheckCircle
                            size={20}
                            className="text-white"
                            fill="white"
                          />
                        </div>
                      )}
                      {isCurrent && (
                        <div className="absolute -top-3 -right-3 flex items-center gap-1 bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                          <span className="inline-block w-2 h-2 bg-white rounded-full animate-pulse"></span>
                          Now
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="text-center">
                      <h3
                        className={`font-bold text-sm transition-colors ${
                          isCompleted
                            ? "text-green-600"
                            : isCurrent
                            ? "text-indigo-600"
                            : "text-gray-400"
                        }`}
                      >
                        {statusLabelMap[status]}
                      </h3>
                      <p
                        className={`text-xs mt-1 capitalize transition-colors ${
                          isCompleted || isCurrent
                            ? "text-gray-600 font-semibold"
                            : "text-gray-400"
                        }`}
                      >
                        {data?.details}
                      </p>
                      <p
                        className={`text-xs mt-2 transition-colors ${
                          isCompleted || isCurrent
                            ? "text-gray-600 font-semibold"
                            : "text-gray-400"
                        }`}
                      >
                        {data ? formatDate(data.createdAt) : "-"}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Details Section */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 mb-6">
              Event History
            </h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {trackingData.map((item, idx) => (
                <div
                  key={item._id}
                  className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center shrink-0 mt-1">
                    {idx === trackingData.length - 1 ? (
                      <MapPinCheck className="text-indigo-600" size={20} />
                    ) : (
                      <CheckCircle className="text-green-600" size={20} />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-800 capitalize">
                      {statusLabelMap[item.status]}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">{item.details}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {formatDate(item.createdAt)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="mt-6 bg-linear-to-r from-teal-500/20 to-teal-500/20 border border-indigo-400/30 rounded-xl p-4 backdrop-blur-sm">
        <p className="text-secondary text-sm">
          ✨ Your parcel is on its way! You'll receive real-time updates as it
          progresses through each stage of delivery.
        </p>
      </div>
    </div>
  );
}
