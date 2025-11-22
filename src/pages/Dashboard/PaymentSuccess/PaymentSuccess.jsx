import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

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

  return (
    <div>
      <h1>Payment Sucess</h1>
      <p>Transaction ID: {paymentInfo.transactionId}</p>
      <p>Tracking ID: {paymentInfo.trackingId}</p>
    </div>
  );
};

export default PaymentSuccess;
