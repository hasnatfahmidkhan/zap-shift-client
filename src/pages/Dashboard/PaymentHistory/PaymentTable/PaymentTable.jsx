import { LayoutList, Trash2, WalletCards } from "lucide-react";

const PaymentTable = ({ payments }) => {
  return (
    <div className="overflow-x-auto mt-6 border border-gray-200 rounded-md">
      <table className="table table-zebra">
        {/* head */}
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
          {/* row 1 */}
          {payments?.map((payment, i) => (
            <tr key={payment._id}>
              <td>{i + 1}</td>
              <td>{payment.parcelName}</td>
              <td>{payment.trackingId}</td>
              <td>{payment.transactionId}</td>
              <td>{payment.amount}</td>
              <td>{payment.paymentStatus === "paid" ? "Paid" : "Unpaid"}</td>
              <td>{new Date(payment.paidAt).toDateString()}</td>
              <td className="space-x-2">
                <button className="action-btn" data-tip="view">
                  <WalletCards color="#03373d" />
                </button>
                {/* <button className="action-btn" data-tip="view">
                  <LayoutList color="#03373d" />
                </button>
                <button className="action-btn" data-tip="delete">
                  <Trash2 color="#fb2c36" />
                </button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentTable;
