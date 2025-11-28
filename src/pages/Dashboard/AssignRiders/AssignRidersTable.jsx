import { Shield, ShieldOff, Trash2, UserX } from "lucide-react";
import Spinner from "../../../components/Spinner/Spinner";

const AssignRidersTable = ({
  parcels,
  handleAdmin,
  handleBan,
  handleDelete,
  isLoading,
}) => {
  return (
    <div className="overflow-x-auto mt-6 border border-gray-200 rounded-md">
      <table className="table table-zebra">
        <thead>
          <tr className="bg-base-200 text-black tracking-wide">
            <th>#</th>
            <th>User Info</th>
            <th>Role</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody className="text-sm font-medium tracking-wide">
          {isLoading ? (
            <Spinner />
          ) : (
            parcels?.map((user, i) => (
              <tr key={user._id}>
                <td>{i + 1}</td>

                {/* USER INFO */}
                <td className="flex items-center gap-3">
                  <img
                    src={user.photoURL}
                    alt="user"
                    className="w-10 h-10 rounded-full border"
                  />
                  <div className="flex flex-col">
                    <span>Name: {user.displayName}</span>
                    <span>Email: {user.email}</span>
                  </div>
                </td>

                {/* ROLE */}
                <td>
                  <span
                    className={`badge ${
                      user.role === "admin" ? "badge-success" : "badge-warning"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>

                {/* CREATED AT */}
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>

                {/* ACTIONS */}
                <td className="flex items-center gap-2">
                  {/* Make Admin OR Remove Admin */}
                  {user.role === "admin" ? (
                    <button
                      onClick={() => handleAdmin(user)}
                      className="action-btn"
                      data-tip="Remove Admin"
                    >
                      <ShieldOff className="text-red-500" />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAdmin(user)}
                      className="action-btn"
                      data-tip="Make Admin"
                    >
                      <Shield className="text-green-600" />
                    </button>
                  )}

                  {/* Ban User */}
                  <button
                    onClick={() => handleBan(user)}
                    className="action-btn"
                    data-tip="Ban User"
                  >
                    <UserX className="text-yellow-700" />
                  </button>

                  {/* Delete User */}
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="action-btn"
                    data-tip="Delete User"
                  >
                    <Trash2 className="text-red-500" />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AssignRidersTable;
