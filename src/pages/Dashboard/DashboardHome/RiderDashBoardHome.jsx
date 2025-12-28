import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import Spinner from "../../../components/Spinner/Spinner";

const RiderDashBoardHome = () => {
  const axiosSecure = useAxiosSecure();
  const { user, authLoading } = useAuth();
  const {
    data: deliveryStats = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["rider-delivery-per-day"],
    queryFn: async () =>
      (await axiosSecure.get(`/rider/delivery-per-day?email=${user?.email}`))
        .data,
  });

  if (isLoading || authLoading) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <div className="p-8 text-center text-lg text-red-500">
        Error loading data
      </div>
    );
  }

  const totalDeliveries = deliveryStats.reduce(
    (sum, item) => sum + item.deliveredCount,
    0
  );

  return (
    <div className="p-8 bg-gray-50 min-h-[80vh] rounded-xl">
      {/* Header */}
      <div className="mb-8">
        <h3 className="text-3xl font-bold text-gray-800">
          Delivery Statistics
        </h3>
        <p className="text-gray-600 mt-2">
          Total Deliveries: {totalDeliveries}
        </p>
      </div>

      {/* Bar Chart */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h4 className="text-xl font-semibold text-gray-700 mb-4">
          Daily Deliveries
        </h4>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={deliveryStats}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: "#f9fafb",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
              }}
              formatter={(value) => [value, "Deliveries"]}
            />
            <Legend />
            <Bar
              dataKey="deliveredCount"
              fill="#3b82f6"
              name="Delivered"
              isAnimationActive={true}
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RiderDashBoardHome;
