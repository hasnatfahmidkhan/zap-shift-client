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
  AreaChart,
  Area,
} from "recharts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import {
  Truck,
  Package,
  TrendingUp,
  Calendar,
  Award,
  Target,
  Zap,
  Clock,
  CheckCircle2,
  BarChart3,
  Activity,
} from "lucide-react";

const RiderDashBoardHome = () => {
  const axiosSecure = useAxiosSecure();
  const { user, authLoading } = useAuth();

  const {
    data: deliveryStats = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["rider-delivery-per-day", user?.email],
    queryFn: async () =>
      (await axiosSecure.get(`/rider/delivery-per-day?email=${user?.email}`))
        .data,
    enabled: !!user?.email,
  });

  // Loading State
  if (isLoading || authLoading || !deliveryStats) {
    return (
      <div className="flex flex-col items-center justify-center px-4 min-h-[calc(100vh-124px)]">
        <div className="relative">
          <div className="w-20 h-20 rounded-full border-4 border-gray-200 border-t-indigo-600 animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <BarChart3 className="w-8 h-8 text-indigo-600 animate-pulse" />
          </div>
        </div>
        <p className="mt-4 text-gray-600 font-medium">Loading your stats...</p>
        <p className="text-sm text-gray-400 mt-1">
          Fetching delivery statistics
        </p>
      </div>
    );
  }

  // Error State
  if (isError) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <Activity className="w-10 h-10 text-red-500" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800">
          Error Loading Data
        </h3>
        <p className="text-gray-500 text-sm mt-1 text-center">
          Unable to fetch your delivery statistics. Please try again.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  // Calculate statistics
  const totalDeliveries = deliveryStats.reduce(
    (sum, item) => sum + item.deliveredCount,
    0
  );

  console.log(deliveryStats);

  const averagePerDay =
    deliveryStats.length > 0
      ? Math.round(totalDeliveries / deliveryStats.length)
      : 0;

  const maxDeliveryDay = deliveryStats.reduce(
    (max, item) => (item.deliveredCount > max.deliveredCount ? item : max),
    { deliveredCount: 0, date: "-" }
  );

  const todayDeliveries =
    deliveryStats.length > 0
      ? deliveryStats[deliveryStats.length - 1]?.deliveredCount || 0
      : 0;

  // Format date for mobile (shorter format)
  const formatDateForMobile = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  // Custom Tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-3">
          <p className="text-sm font-semibold text-gray-800">{label}</p>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
            <p className="text-sm text-gray-600">
              <span className="font-bold text-indigo-600">
                {payload[0].value}
              </span>{" "}
              deliveries
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 bg-gray-50 min-h-[calc(100vh-124px)] rounded-xl">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
            <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
              Delivery Dashboard
            </h3>
            <p className="text-gray-500 text-sm">
              Welcome back, {user?.displayName || "Rider"}!
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        {/* Total Deliveries */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500 text-xs sm:text-sm font-medium">
                Total Deliveries
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-800 mt-1">
                {totalDeliveries}
              </p>
              <p className="text-xs text-gray-400 mt-1 hidden sm:block">
                All time
              </p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-linear-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Package className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
          </div>
        </div>

        {/* Today's Deliveries */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500 text-xs sm:text-sm font-medium">
                Today
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-800 mt-1">
                {todayDeliveries}
              </p>
              <p className="text-xs text-green-500 mt-1 hidden sm:flex items-center gap-1">
                <Zap className="w-3 h-3" />
                Active
              </p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-linear-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
          </div>
        </div>

        {/* Average Per Day */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500 text-xs sm:text-sm font-medium">
                Daily Average
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-800 mt-1">
                {averagePerDay}
              </p>
              <p className="text-xs text-gray-400 mt-1 hidden sm:block">
                Per day
              </p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-linear-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/30">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
          </div>
        </div>

        {/* Best Day */}
        <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500 text-xs sm:text-sm font-medium">
                Best Day
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-800 mt-1">
                {maxDeliveryDay.deliveredCount}
              </p>
              <p className="text-xs text-gray-400 mt-1 hidden sm:block truncate max-w-[80px]">
                {formatDateForMobile(maxDeliveryDay.date)}
              </p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-linear-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg shadow-pink-500/30">
              <Award className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="space-y-6">
        {/* Bar Chart - Desktop */}
        <div className="hidden sm:block bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-lg sm:text-xl font-semibold text-gray-800">
                Daily Deliveries
              </h4>
              <p className="text-gray-500 text-sm mt-1">
                Your delivery performance over time
              </p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 rounded-lg">
              <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
              <span className="text-sm text-indigo-700 font-medium">
                Deliveries
              </span>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={deliveryStats} barCategoryGap="20%">
              <defs>
                <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e5e7eb"
                vertical={false}
              />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12, fill: "#6b7280" }}
                angle={-45}
                textAnchor="end"
                height={80}
                tickLine={false}
                axisLine={{ stroke: "#e5e7eb" }}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#6b7280" }}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
              />
              <Tooltip content={CustomTooltip} />
              <Bar
                dataKey="deliveredCount"
                fill="url(#colorBar)"
                name="Delivered"
                radius={[8, 8, 0, 0]}
                maxBarSize={60}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Area Chart - Mobile (Easier to read on small screens) */}
        <div className="sm:hidden bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-lg font-semibold text-gray-800">
                Daily Deliveries
              </h4>
              <p className="text-gray-500 text-xs mt-0.5">Performance trend</p>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 bg-indigo-50 rounded-lg">
              <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
              <span className="text-xs text-indigo-700 font-medium">
                Deliveries
              </span>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={deliveryStats}>
              <defs>
                <linearGradient id="colorArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e5e7eb"
                vertical={false}
              />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10, fill: "#6b7280" }}
                tickFormatter={formatDateForMobile}
                interval="preserveStartEnd"
                tickLine={false}
                axisLine={{ stroke: "#e5e7eb" }}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "#6b7280" }}
                tickLine={false}
                axisLine={false}
                width={30}
                allowDecimals={false}
              />
              <Tooltip content={CustomTooltip} />
              <Area
                type="monotone"
                dataKey="deliveredCount"
                stroke="#6366f1"
                strokeWidth={2}
                fill="url(#colorArea)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Deliveries Summary */}
        {deliveryStats.length > 0 && (
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              Recent Activity
            </h4>

            <div className="space-y-3">
              {deliveryStats
                .slice(-5)
                .reverse()
                .map((day, index) => (
                  <div
                    key={day.date}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          index === 0
                            ? "bg-indigo-100 text-indigo-600"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        <Calendar className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          {formatDateForMobile(day.date)}
                        </p>
                        <p className="text-xs text-gray-500">
                          {index === 0
                            ? "Most recent"
                            : `${index + 1} days ago`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-gray-800">
                        {day.deliveredCount}
                      </span>
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Performance Tips Card */}
        <div className="bg-linear-to-r from-indigo-500 to-purple-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-lg font-semibold">Daily Goal</h4>
              <p className="text-indigo-100 text-sm mt-1">
                You're averaging {averagePerDay} deliveries per day. Keep up the
                great work!
              </p>
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-indigo-100">Today's Progress</span>
                  <span className="font-semibold">
                    {todayDeliveries} / {Math.max(averagePerDay, 5)}
                  </span>
                </div>
                <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min(
                        (todayDeliveries / Math.max(averagePerDay, 5)) * 100,
                        100
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {deliveryStats.length === 0 && (
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">
            No delivery data yet
          </h3>
          <p className="text-gray-500 text-sm mt-1 max-w-sm mx-auto">
            Start completing deliveries to see your statistics here. Your
            performance data will appear once you make your first delivery.
          </p>
        </div>
      )}
    </div>
  );
};

export default RiderDashBoardHome;
