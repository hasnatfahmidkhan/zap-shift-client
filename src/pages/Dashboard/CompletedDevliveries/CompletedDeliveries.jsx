import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const CompletedDeliveries = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: parcels = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user?.email}&deliveryStatus=delivered`
      );
      return data;
    },
  });
  console.log(parcels);

  const calculatePayOut = (parcel) => {
    if (parcel.senderDistrict === parcel.receiverDistrict) {
      return parcel.amount * 0.3;
    } else {
      return parcel.amount * 0.5;
    }
  };
  return (
    <div>
      <h3 className="heading">Completed Delivery: {parcels?.length}</h3>
      <div className="overflow-x-auto mt-6 border border-gray-300 rounded-md">
        <table className="table table-zebra w-full">
          <thead>
            <tr className="bg-base-200 text-black">
              <th>#</th>
              <th>Parcel Name</th>
              <th>Pickup Address</th>
              <th>Delivery Address</th>
              <th>Amount</th>
              <th>Payout</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-4">
                  No completed deliveries.
                </td>
              </tr>
            ) : (
              parcels.map((parcel, index) => (
                <tr key={parcel._id}>
                  <td>{index + 1}</td>
                  <td>{parcel.parcelName}</td>
                  <td>{parcel.senderAddress}</td>
                  <td>{parcel.receiverAddress}</td>
                  <td>{parcel.amount}TK.</td>
                  <td>{calculatePayOut(parcel)}TK.</td>
                  <td>
                    <span className="btn btn-primary text-secondary btn-sm">
                      Cash Out
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompletedDeliveries;
