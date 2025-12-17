// MyParcelTableSkeleton.jsx
export const MyParcelTableSkeleton = () => (
  <div className="overflow-x-auto mt-6 border border-gray-200 rounded-md">
    <table className="table table-zebra">
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
        {[...Array(8)].map((_, i) => (
          <tr key={i}>
            <td>
              <div className="skeleton h-4 w-6"></div>
            </td>
            <td>
              <div className="skeleton h-4 w-28"></div>
            </td>
            <td>
              <div className="skeleton h-6 w-20 rounded-full"></div>
            </td>
            <td>
              <div className="skeleton h-4 w-16"></div>
            </td>
            <td>
              <div className="skeleton h-6 w-16 rounded-full"></div>
            </td>
            <td>
              <div className="skeleton h-4 w-24"></div>
            </td>
            <td className="flex items-center gap-2">
              <div className="skeleton h-8 w-8 rounded"></div>
              <div className="skeleton h-8 w-8 rounded"></div>
              <div className="skeleton h-8 w-8 rounded"></div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// PaymentHistoryTableSkeleton.jsx
export const PaymentHistoryTableSkeleton = () => (
  <div className="overflow-x-auto mt-6 border border-gray-200 rounded-md">
    <table className="table table-zebra">
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
        {[...Array(8)].map((_, i) => (
          <tr key={i}>
            <td>
              <div className="skeleton h-4 w-6"></div>
            </td>
            <td>
              <div className="skeleton h-4 w-28"></div>
            </td>
            <td>
              <div className="skeleton h-4 w-24"></div>
            </td>
            <td>
              <div className="skeleton h-4 w-28"></div>
            </td>
            <td>
              <div className="skeleton h-4 w-16"></div>
            </td>
            <td>
              <div className="skeleton h-6 w-16 rounded-full"></div>
            </td>
            <td>
              <div className="skeleton h-4 w-24"></div>
            </td>
            <td className="flex items-center gap-2">
              <div className="skeleton h-8 w-8 rounded"></div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// AssignRiderTableSkeleton.jsx
export const AssignRiderTableSkeleton = () => (
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
        {[...Array(8)].map((_, i) => (
          <tr key={i}>
            <td>
              <div className="skeleton h-4 w-6"></div>
            </td>
            <td>
              <div className="skeleton h-4 w-28"></div>
            </td>
            <td>
              <div className="skeleton h-6 w-16 rounded-full"></div>
            </td>
            <td>
              <div className="skeleton h-4 w-24"></div>
            </td>
            <td>
              <div className="skeleton h-4 w-28"></div>
            </td>
            <td>
              <div className="skeleton h-10 w-28"></div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// ApproveRiderTableSkeleton.jsx
export const ApproveRiderTableSkeleton = ({ col = 5 }) => (
  <div className="overflow-x-auto mt-6 border border-gray-200 rounded-md">
    <table className="table table-zebra">
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
        {[...Array(col)].map((_, i) => (
          <tr key={i}>
            <td>
              <div className="skeleton h-4 w-8"></div>
            </td>
            <td className="flex flex-col gap-3">
              <div className="skeleton h-3 w-24"></div>
              <div className="skeleton h-3 w-32"></div>
              <div className="skeleton h-3 w-40"></div>
            </td>
            <td>
              <div className="skeleton h-4 w-20"></div>
            </td>
            <td>
              <div className="skeleton h-4 w-20"></div>
            </td>
            <td className="flex flex-col gap-3">
              <div className="skeleton h-3 w-24"></div>
              <div className="skeleton h-3 w-28"></div>
            </td>
            <td>
              <div className="skeleton h-4 w-20"></div>
            </td>
            <td>
              <div className="skeleton h-6 w-20 rounded-full"></div>
            </td>
            <td>
              <div className="skeleton h-6 w-20 rounded-full"></div>
            </td>
            <td className="flex items-center gap-2">
              <div className="skeleton h-8 w-8 rounded"></div>
              <div className="skeleton h-8 w-8 rounded"></div>
              <div className="skeleton h-8 w-8 rounded"></div>
              <div className="skeleton h-8 w-8 rounded"></div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// ManageUserTableSkeleton.jsx
export const ManageUserTableSkeleton = () => (
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
        {[...Array(8)].map((_, i) => (
          <tr key={i}>
            <td>
              <div className="skeleton h-4 w-6"></div>
            </td>
            <td className="flex items-center gap-3">
              <div className="skeleton h-10 w-10 rounded-full"></div>
              <div className="flex flex-col gap-2 w-40">
                <div className="skeleton h-3 w-28"></div>
                <div className="skeleton h-3 w-32"></div>
              </div>
            </td>
            <td>
              <div className="skeleton h-6 w-20 rounded-full"></div>
            </td>
            <td>
              <div className="skeleton h-4 w-24"></div>
            </td>
            <td className="flex items-center gap-2">
              <div className="skeleton h-8 w-8 rounded"></div>
              <div className="skeleton h-8 w-8 rounded"></div>
              <div className="skeleton h-8 w-8 rounded"></div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
