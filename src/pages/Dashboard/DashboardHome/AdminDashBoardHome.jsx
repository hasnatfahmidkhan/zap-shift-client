import React from "react";
import { Truck } from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Spinner from "../../../components/Spinner/Spinner";

const RADIAN = Math.PI / 180;
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const CustomToolTip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, value } = payload[0];
    return (
      <div className="bg-white shadow-xl p-3 rounded-xl border text-sm">
        <p className="font-semibold capitalize">{name.replace("-", " ")}</p>

        <p className="text-gray-700">
          Parcels: <span className="font-semibold">{value}</span>
        </p>
      </div>
    );
  }
  return null;
};

const AdminDashBoardHome = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: deliveryStats = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["parcels-delivery-stats"],
    queryFn: async () =>
      (await axiosSecure.get("/parcels/delivery-stats")).data,
  });
  console.log(deliveryStats);
  const transformedData = React.useMemo(() => {
    return deliveryStats.map((item) => ({
      name: item.status,
      value: item.count,
    }));
  }, [deliveryStats]);

  if (isLoading) return <Spinner />;
  if (isError) return <p>Error loading stats.</p>;

  return (
    <div className="p-5">
      <h3 className="text-2xl font-bold mb-5">Delivery Statistics</h3>

      <div className="mt-7 flex flex-wrap items-center gap-5">
        {deliveryStats.map((stat) => (
          <div
            key={stat.status}
            className="flex items-center px-10 gap-7 h-32 rounded-2xl bg-base-100"
          >
            <div className="border rounded-full p-3 border-gray-300">
              <Truck size={30} />
            </div>
            <div className="space-y-1">
              <p className="text-xl text-secondary font-medium">
                {stat.status}
              </p>
              <h2 className="text-3xl font-semibold tracking-wide">
                {stat.count}
              </h2>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full max-w-md mt-10">
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={transformedData}
              labelLine={false}
              label={renderCustomizedLabel}
              fill="#8884d8"
              dataKey="value"
              isAnimationActive
            >
              {transformedData.map((entry, index) => (
                <Cell
                  key={`cell-${entry.name}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomToolTip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminDashBoardHome;
