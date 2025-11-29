import Spinner from "../../../components/Spinner/Spinner";

const AssignRidersTable = ({ parcels, OpenAssignRiderModal, isLoading }) => {
  return (
    <div className="overflow-x-auto mt-6 border border-gray-300 rounded-md">
      <table className="table table-zebra">
        <thead>
          <tr className="bg-base-200 text-black tracking-wide">
            <th>#</th>
            <th>Parcel Name</th>
            <th>Cost</th>
            <th>Created At</th>
            <th>Pickup District</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody className="text-sm font-medium tracking-wide">
          {isLoading ? (
            <tr>
              <td colSpan={6} className="flex justify-center py-10">
                <Spinner />
              </td>
            </tr>
          ) : parcels?.length > 0 ? (
            parcels.map((parcel, i) => (
              <tr key={parcel._id}>
                <td>{i + 1}</td>
                <td className="flex items-center gap-3">{parcel.parcelName}</td>
                <td>
                  <span className="badge badge-info">{parcel.amount}</span>
                </td>
                <td>{new Date(parcel.createdAt).toLocaleDateString()}</td>
                <td>{parcel.senderDistrict}</td>
                <td className="flex items-center gap-2">
                  <button
                    onClick={() => OpenAssignRiderModal(parcel)}
                    className="btn btn-sm btn-primary text-black"
                    data-tip="Find Riders"
                  >
                    Find Riders
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center py-10">
                No parcels found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AssignRidersTable;
