import Spinner from "../../../components/Spinner/Spinner";

const AssignRiderModal = ({ riderModalRef, riderLoading, riders, mutate }) => {
  return (
    <dialog ref={riderModalRef} className="modal">
      <div className="modal-box max-w-2xl">
        {riderLoading ? (
          <div className="flex justify-center py-10">
            <Spinner />
          </div>
        ) : (
          <>
            <h3 className="font-bold text-xl mb-4">
              Available Riders: {riders?.length}
            </h3>

            {riders?.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="table table-zebra ">
                  <thead>
                    <tr className="text-sm">
                      <th>Name</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {riders.map((rider) => (
                      <tr key={rider?._id}>
                        <td>{rider?.name}</td>
                        <td>{rider?.phone}</td>
                        <td>{rider?.email}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-primary text-secondary"
                            onClick={() => mutate(rider)}
                          >
                            Assign
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="py-6 text-center text-gray-500">
                No riders available.
              </p>
            )}

            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>
          </>
        )}
      </div>
    </dialog>
  );
};

export default AssignRiderModal;
