import {
  LayoutList,
  Trash2,
  WalletCards,
  Package,
  MapPin,
  CreditCard,
  ChevronRight,
} from "lucide-react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { Link } from "react-router";

const ParcelsTable = ({ parcels, refetch }) => {
  const axiosSecure = useAxiosSecure();

  // delete parcel
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/parcels/${id}`).then(({ data }) => {
          if (data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your parcel has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  // pay parcel
  const handlePay = async (parcel) => {
    const parcelInfo = {
      amount: parcel.amount,
      parcelName: parcel.parcelName,
      parcelId: parcel._id,
      senderEmail: parcel.senderEmail,
      trackingId: parcel.trackingId,
    };

    const { data } = await axiosSecure.post(
      "/create-checkout-session",
      parcelInfo
    );
    const url = data.url;
    window.location.assign(url);
  };

  // Status badge styling
  const getStatusStyle = (status) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      confirmed: "bg-blue-100 text-blue-800 border-blue-200",
      "in-transit": "bg-purple-100 text-purple-800 border-purple-200",
      delivered: "bg-green-100 text-green-800 border-green-200",
      cancelled: "bg-red-100 text-red-800 border-red-200",
    };
    return (
      styles[status?.toLowerCase()] ||
      "bg-gray-100 text-gray-800 border-gray-200"
    );
  };

  return (
    <div className="mt-6">
      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {parcels?.map((parcel, i) => (
          <div
            key={parcel._id}
            className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden"
          >
            {/* Card Header */}
            <div className="bg-primary text-gray-800 px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  <span className="font-semibold truncate max-w-[180px]">
                    {parcel.parcelName}
                  </span>
                </div>
                <span className="text-sm">#{i + 1}</span>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-4 space-y-4">
              {/* Status Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 text-sm">Status:</span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusStyle(
                      parcel.deliveryStatus
                    )}`}
                  >
                    {parcel.deliveryStatus}
                  </span>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    parcel.paymentStatus === "paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {parcel.paymentStatus === "paid" ? "💰 Paid" : "⏳ Unpaid"}
                </span>
              </div>

              {/* Amount */}
              <div className="flex items-center justify-between py-2 border-y border-gray-100">
                <span className="text-gray-500 text-sm">Amount</span>
                <span className="text-xl font-bold text-gray-800">
                  ৳{parcel.amount}
                </span>
              </div>

              {/* Tracking ID - Tappable */}
              <Link
                to={`/track-parcel/${parcel.trackingId}`}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Tracking ID</p>
                    <p className="text-sm font-mono font-semibold text-indigo-600">
                      {parcel.trackingId}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-colors" />
              </Link>

              {/* Action Buttons */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                {/* Pay Button */}
                <button
                  disabled={parcel.paymentStatus === "paid"}
                  onClick={() => handlePay(parcel)}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all ${
                    parcel.paymentStatus === "paid"
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-green-50 text-green-600 hover:bg-green-100 active:scale-95"
                  }`}
                >
                  <WalletCards className="w-6 h-6 mb-1" />
                  <span className="text-xs font-medium">Pay</span>
                </button>

                {/* Track Button */}
                <Link
                  to={`/track-parcel/${parcel.trackingId}`}
                  className="flex flex-col items-center justify-center p-3 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all active:scale-95"
                >
                  <LayoutList className="w-6 h-6 mb-1" />
                  <span className="text-xs font-medium">Track</span>
                </Link>

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(parcel._id)}
                  className="flex flex-col items-center justify-center p-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-all active:scale-95"
                >
                  <Trash2 className="w-6 h-6 mb-1" />
                  <span className="text-xs font-medium">Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Empty State */}
        {(!parcels || parcels.length === 0) && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600">
              No parcels found
            </h3>
            <p className="text-gray-400 text-sm mt-1">
              Your parcels will appear here
            </p>
          </div>
        )}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto border border-gray-200 rounded-xl">
        <table className="table table-zebra">
          <thead>
            <tr className="bg-base-200 text-black tracking-wide">
              <th>Serial</th>
              <th>Parcel Name</th>
              <th>Delivery Status</th>
              <th>Amount</th>
              <th>Payment</th>
              <th>Tracking Id</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-sm font-medium tracking-wide">
            {parcels?.map((parcel, i) => (
              <tr key={parcel._id}>
                <td>{i + 1}</td>
                <td>{parcel.parcelName}</td>
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusStyle(
                      parcel.deliveryStatus
                    )}`}
                  >
                    {parcel.deliveryStatus}
                  </span>
                </td>
                <td>৳{parcel.amount}</td>
                <td>
                  <span
                    className={`badge ${
                      parcel.paymentStatus === "paid"
                        ? "badge-success"
                        : "badge-warning"
                    }`}
                  >
                    {parcel.paymentStatus === "paid" ? "Paid" : "Unpaid"}
                  </span>
                </td>
                <td>
                  <Link
                    to={`/track-parcel/${parcel.trackingId}`}
                    className="font-mono text-indigo-600 hover:underline"
                  >
                    {parcel.trackingId}
                  </Link>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <button
                      disabled={parcel.paymentStatus === "paid"}
                      onClick={() => handlePay(parcel)}
                      className={`btn btn-sm btn-ghost tooltip ${
                        parcel.paymentStatus === "paid" &&
                        "cursor-not-allowed opacity-50"
                      }`}
                      data-tip="Pay"
                    >
                      <WalletCards className="w-5 h-5 text-green-600" />
                    </button>
                    <Link
                      to={`/track-parcel/${parcel.trackingId}`}
                      className="btn btn-sm btn-ghost tooltip"
                      data-tip="Track Parcel"
                    >
                      <LayoutList className="w-5 h-5 text-blue-600" />
                    </Link>
                    <button
                      onClick={() => handleDelete(parcel._id)}
                      className="btn btn-sm btn-ghost tooltip"
                      data-tip="Delete"
                    >
                      <Trash2 className="w-5 h-5 text-red-500" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Empty State */}
        {(!parcels || parcels.length === 0) && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600">
              No parcels found
            </h3>
            <p className="text-gray-400 text-sm mt-1">
              Your parcels will appear here
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ParcelsTable;
