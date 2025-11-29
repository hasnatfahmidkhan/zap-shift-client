import { Eye, Trash2, UserCheck, UserX } from "lucide-react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import RiderDetailsModal from "./RiderDetailsModal";
import { useRef, useState } from "react";

const RiderTable = ({ riders, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const modalRef = useRef();
  const [riderDetails, setRiderDetails] = useState(null);
  const updateStatus = async (rider, status) => {
    const updateInfo = { status, email: rider.email };
    const { data } = await axiosSecure.patch(
      `/riders/${rider._id}`,
      updateInfo
    );

    if (data.modifiedCount) {
      toast.success(`Rider status is set to ${status}!`);
      refetch();
    }
  };

  const handleApprove = (rider) => {
    updateStatus(rider, "approved");
  };
  const handleReject = (rider) => {
    updateStatus(rider, "rejected");
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axiosSecure.delete(`/riders/${id}`);
        if (data.deletedCount) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Rider has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };

  const handleRiderModal = (rider) => {
    modalRef.current?.showModal();
    setRiderDetails(rider);
  };

  return (
    <div className="overflow-x-auto mt-6 border border-gray-200 rounded-md">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr className="bg-base-200 text-black tracking-wide">
            <th>Serial</th>
            <th>Rider Info</th>
            <th>Nid</th>
            <th>Driving License</th>
            <th>Rider Location</th>
            <th>Bike</th>
            <th>Application Status</th>
            <th>Work Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="text-sm font-medium tracking-wide">
          {/* row 1 */}
          {riders?.map((rider, i) => (
            <tr key={rider._id}>
              <td>{i + 1}</td>
              <td className="flex flex-col gap-1">
                <span>Name: {rider.name}</span>
                <span>Phone: {rider.phone}</span>
                <span>Email: {rider.email}</span>
              </td>
              <td>{rider.nid}</td>
              <td>{rider.drivingLicense}</td>
              <td className="flex flex-col gap-1">
                <span>Region: {rider.riderRegion}</span>
                <span>District: {rider.riderDistrict}</span>
              </td>
              <td>{rider.bikeBrand}</td>
              <td>
                <span
                  className={`badge ${
                    rider.status === "rejected"
                      ? "badge-error"
                      : rider.status === "approved"
                      ? "badge-success text-green-100"
                      : "badge-warning"
                  }`}
                >
                  {rider.status}
                </span>
              </td>
              <td>
                <span
                  className={`badge ${
                    rider.workStatus === "unavailabel"
                      ? "badge-error"
                      : rider.workStatus === "available"
                      ? "badge-success text-green-100"
                      : "badge-warning"
                  }`}
                >
                  {rider.workStatus}
                </span>
              </td>
              <td className="flex items-center gap-1 ">
                <button
                  onClick={() => handleRiderModal(rider)}
                  className="action-btn"
                  data-tip="view details"
                >
                  <Eye />
                </button>
                <button
                  onClick={() => handleApprove(rider)}
                  className="action-btn"
                  data-tip="approve"
                >
                  <UserCheck color="#03373d" />
                </button>
                <button
                  onClick={() => handleReject(rider)}
                  className="action-btn"
                  data-tip="reject"
                >
                  <UserX color="#03373d" />
                </button>
                <button
                  onClick={() => handleDelete(rider._id)}
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
      <RiderDetailsModal modalRef={modalRef} riderDetails={riderDetails} />
    </div>
  );
};

export default RiderTable;
