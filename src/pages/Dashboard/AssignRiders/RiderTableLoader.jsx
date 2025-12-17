import React from "react";

const RiderTableLoader = ({ col = 5 }) => {
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
          {/* Skeleton rows */}
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
};

export default RiderTableLoader;
