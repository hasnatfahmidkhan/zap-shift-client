import {
  Package,
  Receipt,
  Calendar,
  MapPin,
  CheckCircle,
  Eye,
  Copy,
  CreditCard,
} from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";

const PaymentTable = ({ payments }) => {
  const [copiedId, setCopiedId] = useState(null);

  // Copy to clipboard function
  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      time: date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  return (
    <div className="mt-6">
      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {payments?.map((payment, i) => {
          const { date, time } = formatDate(payment.paidAt);

          return (
            <div
              key={payment._id}
              className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden"
            >
              {/* Card Header */}
              <div className="bg-linear-to-r from-emerald-500 to-teal-600 px-4 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-white" />
                    <span className="text-white font-semibold truncate max-w-[200px]">
                      {payment.parcelName}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-200" />
                    <span className="text-emerald-100 text-sm font-medium">
                      #{i + 1}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 space-y-4">
                {/* Amount & Status Row */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Amount Paid</p>
                    <p className="text-2xl font-bold text-gray-800">
                      ৳{payment.amount}
                    </p>
                  </div>
                  <span className="px-4 py-2 rounded-full text-sm font-semibold bg-green-100 text-green-700 flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4" />
                    {payment.paymentStatus === "paid" ? "Paid" : "Unpaid"}
                  </span>
                </div>

                {/* IDs Section */}
                <div className="space-y-3 py-3 border-y border-gray-100">
                  {/* Tracking ID */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-indigo-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Tracking ID</p>
                        <p className="text-sm font-mono font-semibold text-gray-800">
                          {payment.trackingId}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          payment.trackingId,
                          `tracking-${payment._id}`
                        )
                      }
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      {copiedId === `tracking-${payment._id}` ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                  </div>

                  {/* Transaction ID */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Receipt className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Transaction ID</p>
                        <p className="text-sm font-mono font-semibold text-gray-800 max-w-[180px] truncate">
                          {payment.transactionId}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          payment.transactionId,
                          `txn-${payment._id}`
                        )
                      }
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      {copiedId === `txn-${payment._id}` ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Date & Action Row */}
                <div className="flex items-center justify-between">
                  {/* Date */}
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Paid At</p>
                      <p className="text-sm font-semibold text-gray-800">
                        {date}
                      </p>
                      <p className="text-xs text-gray-500">{time}</p>
                    </div>
                  </div>

                  {/* View Button */}
                  <Link
                    to={`/track-parcel/${payment.trackingId}`}
                    className="flex items-center gap-2 px-4 py-2.5 bg-linear-to-r bg-primary rounded-xl font-medium text-sm transition-all active:scale-95 shadow-md"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </Link>
                </div>
              </div>
            </div>
          );
        })}

        {/* Empty State */}
        {(!payments || payments.length === 0) && (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Receipt className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-600">
              No payments found
            </h3>
            <p className="text-gray-400 text-sm mt-1">
              Your payment history will appear here
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
              <th>Tracking Id</th>
              <th>Transaction Id</th>
              <th>Amount</th>
              <th>Payment</th>
              <th>Paid At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-sm font-medium tracking-wide">
            {payments?.map((payment, i) => (
              <tr key={payment._id}>
                <td>{i + 1}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-gray-500" />
                    <span className="max-w-[150px] truncate">
                      {payment.parcelName}
                    </span>
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-indigo-600">
                      {payment.trackingId}
                    </span>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          payment.trackingId,
                          `tracking-desk-${payment._id}`
                        )
                      }
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                    >
                      {copiedId === `tracking-desk-${payment._id}` ? (
                        <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-purple-600 max-w-[120px] truncate">
                      {payment.transactionId}
                    </span>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          payment.transactionId,
                          `txn-desk-${payment._id}`
                        )
                      }
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                    >
                      {copiedId === `txn-desk-${payment._id}` ? (
                        <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </td>
                <td>
                  <span className="font-semibold text-gray-800">
                    ৳{payment.amount}
                  </span>
                </td>
                <td>
                  <span className="badge badge-success gap-1">
                    <CheckCircle className="w-3 h-3" />
                    {payment.paymentStatus === "paid" ? "Paid" : "Unpaid"}
                  </span>
                </td>
                <td>
                  <div className="text-gray-600">
                    {new Date(payment.paidAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/track-parcel/${payment.trackingId}`}
                      className="btn btn-sm btn-ghost tooltip"
                      data-tip="View Details"
                    >
                      <Eye className="w-5 h-5 text-indigo-600" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State for Desktop */}
        {(!payments || payments.length === 0) && (
          <div className="text-center py-12">
            <Receipt className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600">
              No payments found
            </h3>
            <p className="text-gray-400 text-sm mt-1">
              Your payment history will appear here
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentTable;
