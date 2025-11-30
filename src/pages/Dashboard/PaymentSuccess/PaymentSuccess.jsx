import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { CheckCircle } from "lucide-react";
const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const axiosSecure = useAxiosSecure();
  const session_id = searchParams.get("session_id");
  const [paymentInfo, setPaymentInfo] = useState({});

  useEffect(() => {
    if (session_id) {
      axiosSecure
        .patch(`/payment-success?session_id=${session_id}`)
        .then(({ data }) => {
          console.log(data);
          setPaymentInfo(data);
          // window.location.href = "/dashboard/my-parcels";
        });
    }
  }, [session_id, axiosSecure]);
  const { trackingId, transactionId, amount = 0, paidAt } = paymentInfo || {};
  return (
    <div className="min-h-[calc(100vh-124px)] flex items-center justify-center bg-base-200 px-4">
      <div className="max-w-md w-full bg-base-100 shadow-xl rounded-xl p-8 text-center">
        {/* Success Icon */}
        <CheckCircle size={60} className="text-green-600 mx-auto mb-4" />

        <h2 className="text-2xl font-bold">Payment Successful!</h2>
        <p className="text-gray-500 mt-1">
          Your payment has been processed successfully.
        </p>

        {/* Details Card */}
        <div className="bg-base-100 mt-6 p-5 rounded-lg border border-gray-200 text-left space-y-3">
          <div className="flex flex-wrap justify-between">
            <span className="font-medium">Transaction ID:</span>
            <span className="text-gray-700">{transactionId}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Tracking ID:</span>
            <span className="text-gray-700">{trackingId}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-medium">Amount Paid:</span>
            <span className="text-gray-700">৳{amount}</span>
          </div>

          {/* Payment Method (commented as requested) */}
          {/*
          <div className="flex justify-between">
            <span className="font-medium">Payment Method:</span>
            <span className="text-gray-700">{paymentMethod}</span>
          </div>
          */}

          <div className="flex justify-between">
            <span className="font-medium">Date:</span>
            <span className="text-gray-700">
              {new Date(paidAt).toLocaleString()}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col gap-3">
          <Link
            to={`/track-parcel/${trackingId}`}
            className="btn btn-primary text-secondary w-full"
          >
            Track Parcel
          </Link>

          <Link to="/dashboard" className="btn w-full">
            Go to Dashboard
          </Link>
        </div>

        <p className="mt-4 text-xs text-gray-400">
          A confirmation email has been sent to your inbox.
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
