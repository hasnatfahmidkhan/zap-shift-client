import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import DashboardContainer from "../shared/DashboardContainer";
import TableLoader from "../shared/TableLoader";
import PaymentTable from "./PaymentTable/PaymentTable";
import { useQuery } from "@tanstack/react-query";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    data: payments,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/payment-history?email=${user.email}`
      );
      return data;
    },
    retry: 3,
  });

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <DashboardContainer>
      <h3 className="heading">Payment History</h3>
      {isPending ? <TableLoader /> : <PaymentTable payments={payments} />}
    </DashboardContainer>
  );
};

export default PaymentHistory;
