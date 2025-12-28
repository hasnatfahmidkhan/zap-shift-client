import { Package, MapPin, Calendar, DollarSign, Search } from "lucide-react";

// Skeleton Row Component - Moved OUTSIDE the main component
const SkeletonRow = () => (
  <tr>
    <td>
      <div className="skeleton h-7 w-7 rounded-lg"></div>
    </td>
    <td>
      <div className="flex items-center gap-3">
        <div className="skeleton w-8 h-8 rounded-lg"></div>
        <div className="skeleton h-4 w-28 sm:w-36"></div>
      </div>
    </td>
    <td>
      <div className="skeleton h-6 w-16 rounded-full"></div>
    </td>
    <td>
      <div className="skeleton h-4 w-20 sm:w-24"></div>
    </td>
    <td>
      <div className="skeleton h-4 w-24 sm:w-32"></div>
    </td>
    <td>
      <div className="skeleton h-8 w-24 sm:w-28 rounded-lg"></div>
    </td>
  </tr>
);

// Mobile Card Skeleton - Moved OUTSIDE the main component
const MobileSkeletonCard = () => (
  <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-4">
    {/* Header */}
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="skeleton w-10 h-10 rounded-lg"></div>
        <div className="space-y-2">
          <div className="skeleton h-4 w-32"></div>
          <div className="skeleton h-3 w-20"></div>
        </div>
      </div>
      <div className="skeleton h-6 w-16 rounded-full"></div>
    </div>

    {/* Details */}
    <div className="grid grid-cols-2 gap-3">
      <div className="space-y-1">
        <div className="skeleton h-3 w-16"></div>
        <div className="skeleton h-4 w-24"></div>
      </div>
      <div className="space-y-1">
        <div className="skeleton h-3 w-16"></div>
        <div className="skeleton h-4 w-28"></div>
      </div>
    </div>

    {/* Button */}
    <div className="skeleton h-10 w-full rounded-xl"></div>
  </div>
);

// Main Component
const AssignRidersTable = ({ parcels, OpenAssignRiderModal, isLoading }) => {
  return (
    <div className="mt-6">
      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {isLoading ? (
          <>
            <MobileSkeletonCard />
            <MobileSkeletonCard />
            <MobileSkeletonCard />
            <MobileSkeletonCard />
            <MobileSkeletonCard />
            <MobileSkeletonCard />
          </>
        ) : parcels?.length > 0 ? (
          parcels.map((parcel, i) => (
            <div
              key={parcel._id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            >
              {/* Card Header */}
              <div className="bg-linear-to-r from-indigo-500 to-purple-600 px-4 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-white" />
                    <span className="text-white font-semibold truncate max-w-[180px]">
                      {parcel.parcelName}
                    </span>
                  </div>
                  <span className="text-white/80 text-sm">#{i + 1}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 space-y-4">
                {/* Cost Badge */}
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-100 text-green-700 text-sm font-semibold rounded-full">
                    <DollarSign className="w-4 h-4" />৳{parcel.amount}
                  </span>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(parcel.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {/* District */}
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Pickup District</p>
                    <p className="text-sm font-medium text-gray-800">
                      {parcel.senderDistrict}
                    </p>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => OpenAssignRiderModal(parcel)}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors cursor-pointer"
                >
                  <Search className="w-5 h-5" />
                  Find Riders
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-600 font-medium">No parcels found</p>
            <p className="text-gray-400 text-sm mt-1">
              Parcels waiting for rider assignment will appear here
            </p>
          </div>
        )}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto border border-gray-200 rounded-xl bg-white shadow-sm">
        <table className="table table-zebra w-full">
          <thead>
            <tr className="bg-gray-50 text-gray-700">
              <th className="font-semibold">#</th>
              <th className="font-semibold">Parcel Name</th>
              <th className="font-semibold">Cost</th>
              <th className="font-semibold">Created At</th>
              <th className="font-semibold">Pickup District</th>
              <th className="font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody className="text-sm font-medium">
            {isLoading ? (
              <>
                <SkeletonRow />
                <SkeletonRow />
                <SkeletonRow />
                <SkeletonRow />
                <SkeletonRow />
              </>
            ) : parcels?.length > 0 ? (
              parcels.map((parcel, i) => (
                <tr key={parcel._id} className="hover:bg-gray-50">
                  <td>
                    <span className="w-7 h-7 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 font-semibold text-xs">
                      {i + 1}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Package className="w-4 h-4 text-purple-600" />
                      </div>
                      <span className="font-medium text-gray-800">
                        {parcel.parcelName}
                      </span>
                    </div>
                  </td>
                  <td>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                      <DollarSign className="w-3 h-3" />
                      {parcel.amount}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      {new Date(parcel.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      {parcel.senderDistrict}
                    </div>
                  </td>
                  <td>
                    <button
                      onClick={() => OpenAssignRiderModal(parcel)}
                      className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium rounded-lg transition-colors cursor-pointer"
                    >
                      <Search className="w-3.5 h-3.5" />
                      Find Riders
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-12">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                      <Package className="w-8 h-8 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-gray-600 font-medium">
                        No parcels found
                      </p>
                      <p className="text-gray-400 text-sm mt-1">
                        Parcels waiting for rider assignment will appear here
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignRidersTable;
