import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import PaymentTable from "./PaymentTable/PaymentTable";
import { useQuery } from "@tanstack/react-query";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    data: payments,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/payment-history?email=${user.email}`
      );
      return data;
    },
    // retry: 3,
  });

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <section className="bg-base-100 rounded-2xl p-6 min-h-[calc(100vh-116px)]">
      <h3 className="heading">Payment History</h3>
      {isLoading ? (
        <div className="flex items-center justify-center h-[40vh]">
          <span className="loading loading-bars loading-xl"></span>
        </div>
      ) : (
        <PaymentTable payments={payments} />
      )}
    </section>
  );
};

export default PaymentHistory;
