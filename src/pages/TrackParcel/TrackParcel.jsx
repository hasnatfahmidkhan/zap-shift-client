import { useQuery } from "@tanstack/react-query";
import {
  MapPin,
  Truck,
  Home,
  CheckCircle,
  MapPinCheck,
  User,
  PackageCheck,
  CircleCheck,
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

  // Status to icon mapping
  const statusIconMap = {
    "parcel-created": PackageCheck,
    "parcel-paid": CircleCheck,
    "rider-assigned": User,
    confirm: CheckCircle,
    "pick-up": Truck,
    "in-transit": MapPin,
    delivered: Home,
  };

  // Status to label mapping
  const statusLabelMap = {
    "parcel-created": "Parcel Created",
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
      "parcel-created",
      "parcel-paid",
      "rider-assigned",
      "confirm",
      "pick-up",
      "in-transit",
      "delivered",
    ];

    const currentStatuses = trackingData.map((t) => t.status);

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
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="loading loading-spinner loading-lg text-indigo-600"></div>
      </div>
    );
  }

  if (error || !trackingData || trackingData.length === 0) {
    return (
      <div className="alert alert-error mx-4">
        <span>Failed to load tracking information</span>
      </div>
    );
  }

  const completedStatuses = getCompletedStatuses();
  const currentStatus = trackingData[trackingData.length - 1]?.status;
  const progressPercentage = (completedStatuses.length / 7) * 100;

  const allStatuses = [
    "parcel-created",
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
    <div className="lg:px-8 py-6">
      {/* Header */}
      <div className="mb-8 md:mb-12">
        <div className="inline-block">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
            Track Your Parcel
          </h1>
          <p className="text-secondary text-sm sm:text-base break-all">
            Tracking ID: {trackingData[0]?.trackingId}
          </p>
        </div>
      </div>

      {/* Main Card */}
      <div className="relative bg-white rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl overflow-hidden">
        {/* Top accent bar */}
        <div className="h-1.5 sm:h-2 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

        <div className="p-4 sm:p-6 lg:p-8">
          {/* Status Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 md:mb-12">
            <div className="bg-linear-to-br from-indigo-50 to-blue-50 rounded-xl p-4 sm:p-6 border border-indigo-100">
              <p className="text-gray-600 text-xs sm:text-sm font-medium mb-1">
                Current Status
              </p>
              <p className="text-xl sm:text-2xl font-bold text-indigo-600 capitalize">
                {statusLabelMap[currentStatus]}
              </p>
              <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                {dataByStatus[currentStatus]?.details}
              </p>
            </div>
            <div className="bg-linear-to-br from-green-50 to-emerald-50 rounded-xl p-4 sm:p-6 border border-green-100">
              <p className="text-gray-600 text-xs sm:text-sm font-medium mb-1">
                Last Updated
              </p>
              <p className="text-base sm:text-lg font-bold text-green-600">
                {formatDate(dataByStatus[currentStatus]?.createdAt)}
              </p>
              <p className="text-xs text-gray-500 mt-2">Just now</p>
            </div>
            <div className="bg-linear-to-br from-purple-50 to-pink-50 rounded-xl p-4 sm:p-6 border border-purple-100 sm:col-span-2 lg:col-span-1">
              <p className="text-gray-600 text-xs sm:text-sm font-medium mb-1">
                Progress
              </p>
              <p className="text-xl sm:text-2xl font-bold text-purple-600">
                {Math.round(progressPercentage)}%
              </p>
              <p className="text-xs text-gray-500 mt-2">
                {completedStatuses.length} of 7 steps
              </p>
            </div>
          </div>

          {/* Timeline - Horizontal for large screens */}
          <div className="hidden lg:block relative">
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
                        className={`relative w-14 h-14 xl:w-16 xl:h-16 rounded-full flex items-center justify-center font-bold text-white text-lg transition-all duration-300 transform hover:scale-110 ${
                          isCompleted
                            ? "bg-linear-to-br from-green-400 to-green-600 shadow-lg shadow-green-400/50"
                            : isCurrent
                            ? "bg-linear-to-br from-indigo-500 to-indigo-700 shadow-lg shadow-indigo-500/50 animate-pulse"
                            : "bg-gray-300 shadow-md"
                        }`}
                      >
                        <IconComponent size={24} className="xl:w-7 xl:h-7" />
                      </div>
                      {isCompleted && !isCurrent && (
                        <div className="absolute -top-1 -right-1 xl:-top-2 xl:-right-2 bg-green-500 rounded-full p-0.5 xl:p-1 shadow-lg">
                          <CheckCircle
                            size={16}
                            className="text-white xl:w-5 xl:h-5"
                            fill="white"
                          />
                        </div>
                      )}
                      {isCurrent && (
                        <div className="absolute -top-2 -right-2 xl:-top-3 xl:-right-3 flex items-center gap-1 bg-indigo-600 text-white text-[10px] xl:text-xs font-bold px-1.5 xl:px-2 py-0.5 xl:py-1 rounded-full shadow-lg">
                          <span className="inline-block w-1.5 h-1.5 xl:w-2 xl:h-2 bg-white rounded-full animate-pulse"></span>
                          Now
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="text-center px-1">
                      <h3
                        className={`font-bold text-xs xl:text-sm transition-colors ${
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
                        className={`text-[10px] xl:text-xs mt-1 capitalize transition-colors line-clamp-2 ${
                          isCompleted || isCurrent
                            ? "text-gray-600 font-semibold"
                            : "text-gray-400"
                        }`}
                      >
                        {data?.details}
                      </p>
                      <p
                        className={`text-[10px] xl:text-xs mt-2 transition-colors ${
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

          {/* Timeline - Vertical for mobile and tablet */}
          <div className="lg:hidden relative">
            <div className="space-y-0">
              {allStatuses?.map((status, index) => {
                const IconComponent = statusIconMap[status];
                const isCompleted = completedStatuses.includes(status);
                const isCurrent = status === currentStatus;
                const data = dataByStatus[status];
                const isLast = index === allStatuses.length - 1;

                return (
                  <div key={status} className="relative flex gap-4">
                    {/* Vertical Line */}
                    {!isLast && (
                      <div
                        className={`absolute left-5 sm:left-6 top-12 sm:top-14 w-0.5 h-full ${
                          isCompleted ? "bg-green-400" : "bg-gray-200"
                        }`}
                      ></div>
                    )}

                    {/* Icon */}
                    <div className="relative z-10 shrink-0">
                      <div
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-white transition-all duration-300 ${
                          isCompleted
                            ? "bg-linear-to-br from-green-400 to-green-600 shadow-md shadow-green-400/50"
                            : isCurrent
                            ? "bg-linear-to-br from-indigo-500 to-indigo-700 shadow-md shadow-indigo-500/50 animate-pulse"
                            : "bg-gray-300"
                        }`}
                      >
                        <IconComponent size={20} className="sm:w-6 sm:h-6" />
                      </div>
                      {isCompleted && !isCurrent && (
                        <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-0.5 shadow-lg">
                          <CheckCircle
                            size={14}
                            className="text-white"
                            fill="white"
                          />
                        </div>
                      )}
                      {isCurrent && (
                        <div className="absolute -top-1 -right-2 flex items-center gap-0.5 bg-indigo-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-lg">
                          <span className="inline-block w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                          Now
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-6 sm:pb-8">
                      <h3
                        className={`font-bold text-sm sm:text-base transition-colors ${
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
                        className={`text-xs sm:text-sm mt-1 capitalize transition-colors ${
                          isCompleted || isCurrent
                            ? "text-gray-600 font-medium"
                            : "text-gray-400"
                        }`}
                      >
                        {data?.details || "Pending"}
                      </p>
                      <p
                        className={`text-xs mt-1 transition-colors ${
                          isCompleted || isCurrent
                            ? "text-gray-500"
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
          <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-200">
            <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-4 sm:mb-6">
              Event History
            </h3>
            <div className="space-y-2 sm:space-y-3 max-h-64 overflow-y-auto">
              {trackingData.map((item, idx) => (
                <div
                  key={item._id}
                  className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-indigo-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5 sm:mt-1">
                    {idx === trackingData.length - 1 ? (
                      <MapPinCheck className="text-indigo-600" size={16} />
                    ) : (
                      <CheckCircle className="text-green-600" size={16} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-semibold text-gray-800 capitalize truncate">
                      {statusLabelMap[item.status]}
                    </p>
                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                      {item.details}
                    </p>
                    <p className="text-xs text-gray-500 mt-1 sm:mt-2">
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
      <div className="mt-4 sm:mt-6 bg-linear-to-r from-teal-500/20 to-teal-500/20 border border-indigo-400/30 rounded-lg sm:rounded-xl p-3 sm:p-4 backdrop-blur-sm">
        <p className="text-secondary text-xs sm:text-sm">
          ✨ Your parcel is on its way! You'll receive real-time updates as it
          progresses through each stage of delivery.
        </p>
      </div>
    </div>
  );
}
