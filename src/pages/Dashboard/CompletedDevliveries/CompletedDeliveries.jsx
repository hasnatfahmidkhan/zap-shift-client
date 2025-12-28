import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import {
  Package,
  MapPin,
  MapPinned,
  Wallet,
  TrendingUp,
  CheckCircle,
  Banknote,
  Truck,
  ArrowRight,
  Receipt,
  BadgePercent,
  CircleDollarSign,
  Loader2,
} from "lucide-react";
import { Link } from "react-router";

const CompletedDeliveries = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: parcels = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["completedDeliveries", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user?.email}&deliveryStatus=delivered`
      );
      return data;
    },
  });

  const calculatePayOut = (parcel) => {
    if (parcel.senderDistrict === parcel.receiverDistrict) {
      return parcel.amount * 0.3;
    } else {
      return parcel.amount * 0.5;
    }
  };

  // Calculate totals
  const totalEarnings = parcels.reduce(
    (sum, parcel) => sum + calculatePayOut(parcel),
    0
  );
  const totalDeliveryValue = parcels.reduce(
    (sum, parcel) => sum + parcel.amount,
    0
  );

  // Check if same district delivery
  const isSameDistrict = (parcel) =>
    parcel.senderDistrict === parcel.receiverDistrict;

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-190px)] flex flex-col items-center justify-center">
        <div className="relative">
          {/* Outer rotating ring */}
          <div className="w-20 h-20 rounded-full border-4 border-gray-200 border-t-indigo-600 animate-spin"></div>
          {/* Inner icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Truck className="w-8 h-8 text-indigo-600 animate-pulse" />
          </div>
        </div>
        <p className="mt-4 text-gray-600 font-medium">
          Loading completed deliveries...
        </p>
        <p className="text-sm text-gray-400 mt-1">Please wait a moment</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Completed Deliveries
        </h3>
        <p className="text-gray-500 mt-1">
          {parcels?.length} {parcels?.length === 1 ? "delivery" : "deliveries"}{" "}
          completed
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {/* Total Deliveries */}
        <div className="bg-linear-to-br from-indigo-500 to-purple-600 rounded-xl p-4 sm:p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-100 text-sm font-medium">
                Total Deliveries
              </p>
              <p className="text-3xl sm:text-4xl font-bold mt-1">
                {parcels?.length}
              </p>
            </div>
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
          </div>
        </div>

        {/* Total Delivery Value */}
        <div className="bg-linear-to-br from-emerald-500 to-teal-600 rounded-xl p-4 sm:p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-100 text-sm font-medium">
                Delivery Value
              </p>
              <p className="text-3xl sm:text-4xl font-bold mt-1">
                ৳{totalDeliveryValue.toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-xl flex items-center justify-center">
              <Receipt className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
          </div>
        </div>

        {/* Total Earnings */}
        <div className="bg-linear-to-br from-amber-500 to-orange-600 rounded-xl p-4 sm:p-6 text-white shadow-lg sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-amber-100 text-sm font-medium">
                Your Earnings
              </p>
              <p className="text-3xl sm:text-4xl font-bold mt-1">
                ৳{totalEarnings.toLocaleString()}
              </p>
              <p className="text-amber-100 text-xs mt-2 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                30-50% commission
              </p>
            </div>
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-xl flex items-center justify-center">
              <Wallet className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {parcels.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-600">
              No completed deliveries yet
            </h3>
            <p className="text-gray-400 text-sm mt-1">
              Your completed deliveries will appear here
            </p>
          </div>
        ) : (
          parcels.map((parcel, index) => (
            <div
              key={parcel._id}
              className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden"
            >
              {/* Card Header */}
              <div className="bg-linear-to-r from-green-500 to-emerald-600 px-4 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-white" />
                    <span className="text-white font-semibold truncate max-w-[200px]">
                      {parcel.parcelName}
                    </span>
                  </div>
                  <span className="text-white/80 text-sm">#{index + 1}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 space-y-4">
                {/* Addresses */}
                <div className="space-y-3">
                  {/* Pickup */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 font-medium">From</p>
                      <p className="text-sm text-gray-800 truncate">
                        {parcel.senderAddress}
                      </p>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex items-center gap-2 pl-3">
                    <div className="w-0.5 h-4 bg-gray-200 ml-3.5"></div>
                  </div>

                  {/* Delivery */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <MapPinned className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 font-medium">To</p>
                      <p className="text-sm text-gray-800 truncate">
                        {parcel.receiverAddress}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Amount & Payout */}
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100">
                  {/* Delivery Amount */}
                  <div className="bg-gray-50 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Receipt className="w-4 h-4 text-gray-500" />
                      <span className="text-xs text-gray-500 font-medium">
                        Amount
                      </span>
                    </div>
                    <p className="text-lg font-bold text-gray-800">
                      ৳{parcel.amount}
                    </p>
                  </div>

                  {/* Your Payout */}
                  <div className="bg-green-50 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Wallet className="w-4 h-4 text-green-600" />
                      <span className="text-xs text-green-600 font-medium">
                        Your Payout
                      </span>
                    </div>
                    <p className="text-lg font-bold text-green-600">
                      ৳{calculatePayOut(parcel)}
                    </p>
                  </div>
                </div>

                {/* Commission Badge */}
                <div className="flex items-center justify-between pt-2">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
                      isSameDistrict(parcel)
                        ? "bg-blue-100 text-blue-700"
                        : "bg-purple-100 text-purple-700"
                    }`}
                  >
                    <BadgePercent className="w-3.5 h-3.5" />
                    {isSameDistrict(parcel)
                      ? "30% (Same District)"
                      : "50% (Different District)"}
                  </span>
                </div>

                {/* Cash Out Button */}
                <button className="w-full flex items-center justify-center gap-2 py-3 bg-linear-to-r rounded-xl font-semibold text-sm bg-primary">
                  <Banknote className="w-5 h-5" />
                  Cash Out
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto border border-gray-200 rounded-xl bg-white shadow-sm">
        <table className="table table-zebra w-full">
          <thead>
            <tr className="bg-gray-50 text-gray-700">
              <th className="font-semibold">#</th>
              <th className="font-semibold">Parcel Name</th>
              <th className="font-semibold">Pickup Address</th>
              <th className="font-semibold">Delivery Address</th>
              <th className="font-semibold">Amount</th>
              <th className="font-semibold">Commission</th>
              <th className="font-semibold">Payout</th>
              <th className="font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-12">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-gray-600 font-medium">
                        No completed deliveries yet
                      </p>
                      <p className="text-gray-400 text-sm mt-1">
                        Your completed deliveries will appear here
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              parcels.map((parcel, index) => (
                <tr key={parcel._id} className="hover:bg-gray-50">
                  <td>
                    <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-semibold text-sm">
                      {index + 1}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-gray-500" />
                      <span className="font-medium text-gray-800 max-w-[150px] truncate">
                        {parcel.parcelName}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2 max-w-[180px]">
                      <MapPin className="w-4 h-4 text-green-500 shrink-0" />
                      <span className="text-gray-600 truncate">
                        {parcel.senderAddress}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2 max-w-[180px]">
                      <MapPinned className="w-4 h-4 text-blue-500 shrink-0" />
                      <span className="text-gray-600 truncate">
                        {parcel.receiverAddress}
                      </span>
                    </div>
                  </td>
                  <td>
                    <span className="font-semibold text-gray-800">
                      ৳{parcel.amount}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                        isSameDistrict(parcel)
                          ? "bg-blue-100 text-blue-700"
                          : "bg-purple-100 text-purple-700"
                      }`}
                    >
                      <BadgePercent className="w-3 h-3" />
                      {isSameDistrict(parcel) ? "30%" : "50%"}
                    </span>
                  </td>
                  <td>
                    <span className="font-bold text-green-600 flex items-center gap-1">
                      <CircleDollarSign className="w-4 h-4" />৳
                      {calculatePayOut(parcel)}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-sm bg-linear-to-r bg-primary">
                      <Banknote className="w-4 h-4" />
                      Cash Out
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Total Payout Banner */}
      {parcels.length > 0 && (
        <div className="mt-6 bg-linear-to-r from-green-500 to-emerald-600 rounded-xl p-4 sm:p-6 text-white shadow-lg">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-green-100 text-sm font-medium">
                  Total Available for Cash Out
                </p>
                <p className="text-2xl sm:text-3xl font-bold">
                  ৳{totalEarnings.toLocaleString()}
                </p>
              </div>
            </div>
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-white text-green-600 rounded-xl font-semibold hover:bg-green-50 active:scale-[0.98] transition-all shadow-md">
              <Banknote className="w-5 h-5" />
              Cash Out All
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompletedDeliveries;
