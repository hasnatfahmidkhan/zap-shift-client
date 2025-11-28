import { LayoutList, Trash2, WalletCards } from "lucide-react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const ParcelsTable = ({ parcels, refetch }) => {
  const axiosSecure = useAxiosSecure();

  // delete parcel
  const handleDelete = (id) => {
    console.log(id);
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
    const paymentInfo = {
      amount: parcel.amount,
      parcelName: parcel.parcelName,
      parcelId: parcel._id,
      senderEmail: parcel.senderEmail,
    };

    const { data } = await axiosSecure.post(
      "/create-checkout-session",
      paymentInfo
    );
    const url = data.url;
    window.location.assign(url);
  };

  return (
    <div className="overflow-x-auto mt-6 border border-gray-200 rounded-md">
      <table className="table table-zebra">
        {/* head */}
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
          {/* row 1 */}
          {parcels?.map((parcel, i) => (
            <tr key={parcel._id}>
              <td>{i + 1}</td>
              <td>{parcel.parcelName}</td>
              <td>{parcel.deliveryStatus}</td>
              <td>{parcel.amount}</td>
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
              <td>{parcel.trackingId}</td>
              <td className="space-x-2">
                <button
                  onClick={() => handlePay(parcel)}
                  className="action-btn"
                  data-tip="payment"
                >
                  <WalletCards color="#03373d" />
                </button>
                <button className="action-btn" data-tip="view">
                  <LayoutList color="#03373d" />
                </button>
                <button
                  onClick={() => handleDelete(parcel._id)}
                  className="action-btn"
                  data-tip="delete"
                >
                  <Trash2 color="#fb2c36" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ParcelsTable;
