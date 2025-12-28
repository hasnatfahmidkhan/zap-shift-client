import React, { useState, useMemo } from "react";
import { Link } from "react-router";
import {
  Package,
  Truck,
  Users,
  Search,
  Calendar,
  ChevronDown,
  Bell,
  Download,
  TrendingUp,
  TrendingDown,
  Clock,
  Smile,
  DollarSign,
  RefreshCw,
  UserCheck,
  PackageCheck,
  Bike,
  Motorbike,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Spinner from "../../../components/Spinner/Spinner";
import NotificationDropdown from "./Notification";

// Chart constants
const RADIAN = Math.PI / 180;
const STATUS_COLORS = {
  pending: "#f59e0b",
  "parcel-paid": "#8b5cf6",
  "rider-assigned": "#06b6d4",
  "picked-up": "#3b82f6",
  "in-transit": "#6366f1",
  delivered: "#22c55e",
  cancelled: "#ef4444",
  returned: "#f97316",
};

// Custom label for pie chart
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

  if (percent < 0.05) return null; // Don't show label for small slices

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      className="text-xs font-semibold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

// Custom tooltip for pie chart
const PieChartTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, value } = payload[0];
    return (
      <div className="bg-white border border-gray-200 shadow-xl p-3 rounded-xl text-sm">
        <p className="font-semibold capitalize text-gray-900">
          {name.replace(/-/g, " ")}
        </p>
        <p className="text-gray-600">
          Parcels: <span className="font-semibold text-lime-600">{value}</span>
        </p>
      </div>
    );
  }
  return null;
};

// Custom tooltip for area chart
const AreaChartTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 p-3 rounded-xl shadow-xl">
        <p className="text-gray-500 text-xs mb-2 font-medium">{label}</p>
        {payload.map((entry, index) => (
          <p
            key={index}
            className="text-gray-900 text-sm font-bold flex items-center gap-2"
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            {entry.name === "revenue"
              ? `৳${entry.value.toLocaleString()}`
              : `${entry.value} orders`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Custom legend for pie chart
const CustomLegend = ({ payload }) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 mt-4">
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center gap-1.5">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-gray-600 text-xs capitalize">
            {entry.value.replace(/-/g, " ")}
          </span>
        </div>
      ))}
    </div>
  );
};

// Format currency
const formatCurrency = (amount) => {
  if (amount >= 1000000) {
    return `৳${(amount / 1000000).toFixed(1)}M`;
  } else if (amount >= 1000) {
    return `৳${(amount / 1000).toFixed(1)}K`;
  }
  return `৳${amount.toLocaleString()}`;
};

const AnalyticsDashboard = () => {
  const [dateRange, setDateRange] = useState("Last 7 days");
  const [days, setDays] = useState(7);
  const axiosSecure = useAxiosSecure();

  // Fetch delivery statistics
  const {
    data: deliveryStats = [],
    isLoading: isStatsLoading,
    isError: isStatsError,
    refetch: refetchStats,
  } = useQuery({
    queryKey: ["parcels-delivery-stats"],
    queryFn: async () =>
      (await axiosSecure.get("/parcels/delivery-stats")).data,
  });

  // Fetch dashboard analytics
  const {
    data: dashboardData = {},
    isLoading: isDashboardLoading,
    refetch: refetchDashboard,
  } = useQuery({
    queryKey: ["dashboard-analytics"],
    queryFn: async () => (await axiosSecure.get("/admin/dashboard-stats")).data,
  });

  // Fetch revenue data for chart
  const {
    data: revenueData = [],
    isLoading: isRevenueLoading,
    refetch: refetchRevenue,
  } = useQuery({
    queryKey: ["revenue-stats", days],
    queryFn: async () =>
      (await axiosSecure.get(`/admin/revenue-stats?days=${days}`)).data,
  });

  // Fetch monthly comparison
  const { data: monthlyComparison = {} } = useQuery({
    queryKey: ["monthly-comparison"],
    queryFn: async () =>
      (await axiosSecure.get("/admin/monthly-comparison")).data,
  });

  // Fetch top riders
  const { data: topRiders = [] } = useQuery({
    queryKey: ["top-riders"],
    queryFn: async () =>
      (await axiosSecure.get("/admin/top-riders?limit=5")).data,
  });

  // Transform delivery stats for pie chart
  const pieChartData = useMemo(() => {
    return deliveryStats.map((item) => ({
      name: item.status,
      value: item.count,
    }));
  }, [deliveryStats]);

  // Calculate total parcels
  const totalParcels = useMemo(() => {
    return deliveryStats.reduce((sum, item) => sum + item.count, 0);
  }, [deliveryStats]);

  // Stats cards configuration with dynamic data
  const statsConfig = useMemo(
    () => [
      {
        label: "Total Parcels",
        value: dashboardData.totalParcels || totalParcels,
        icon: Package,
        trend: monthlyComparison.changes?.parcels
          ? `${monthlyComparison.changes.parcels > 0 ? "+" : ""}${
              monthlyComparison.changes.parcels
            }%`
          : "+0%",
        trendUp: (monthlyComparison.changes?.parcels || 0) >= 0,
        iconBg: "bg-blue-50",
        iconColor: "text-blue-600",
      },
      {
        label: "Delivered",
        value: dashboardData.totalDelivered || 0,
        icon: PackageCheck,
        trend: monthlyComparison.changes?.delivered
          ? `${monthlyComparison.changes.delivered > 0 ? "+" : ""}${
              monthlyComparison.changes.delivered
            }%`
          : "+0%",
        trendUp: (monthlyComparison.changes?.delivered || 0) >= 0,
        iconBg: "bg-green-50",
        iconColor: "text-green-600",
      },
      {
        label: "Total Users",
        value: dashboardData.totalUsers || 0,
        icon: Users,
        trend: "+5%",
        trendUp: true,
        iconBg: "bg-purple-50",
        iconColor: "text-purple-600",
      },
      {
        label: "Active Riders",
        value: dashboardData.totalRiders || 0,
        icon: Bike,
        trend: "+3%",
        trendUp: true,
        iconBg: "bg-cyan-50",
        iconColor: "text-cyan-600",
      },
    ],
    [dashboardData, totalParcels, monthlyComparison]
  );

  // KPI Stats
  const kpiStats = useMemo(
    () => [
      {
        label: "Total Revenue",
        value: formatCurrency(dashboardData.totalRevenue || 0),
        icon: DollarSign,
        trend: "+12%",
        trendUp: true,
        iconBg: "bg-emerald-50",
        iconColor: "text-emerald-600",
      },
      {
        label: "Avg. Delivery Time",
        value: dashboardData.avgDeliveryTime || 28,
        unit: "min",
        icon: Clock,
        trend: "-5%",
        trendUp: true,
        iconBg: "bg-amber-50",
        iconColor: "text-amber-600",
      },
      {
        label: "Pending Orders",
        value: dashboardData.pendingParcels || 0,
        icon: Package,
        trend:
          dashboardData.pendingParcels > 10
            ? `${dashboardData.pendingParcels} waiting`
            : "Low",
        trendUp: dashboardData.pendingParcels <= 10,
        iconBg: "bg-orange-50",
        iconColor: "text-orange-600",
      },
      {
        label: "In Transit",
        value: dashboardData.inTransitParcels || 0,
        icon: Truck,
        trend: "Active",
        trendUp: true,
        iconBg: "bg-indigo-50",
        iconColor: "text-indigo-600",
      },
    ],
    [dashboardData]
  );

  const getStatusColor = (status) => {
    return STATUS_COLORS[status?.toLowerCase()] || "#6b7280";
  };

  const handleRefresh = () => {
    refetchStats();
    refetchDashboard();
    refetchRevenue();
  };

  const handleDateRangeChange = (newDays, label) => {
    setDays(newDays);
    setDateRange(label);
  };

  const isLoading = isStatsLoading || isDashboardLoading;

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] w-full bg-gray-50 items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (isStatsError) {
    return (
      <div className="flex min-h-[60vh] w-full bg-gray-50 items-center justify-center flex-col gap-4">
        <div className="text-center">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-red-500 text-lg font-medium">
            Error loading dashboard data
          </p>
          <p className="text-gray-500 text-sm mt-1">
            Please check your connection and try again
          </p>
        </div>
        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 px-5 py-2.5 bg-lime-500 text-white rounded-xl font-semibold hover:bg-lime-600 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-100px)] bg-gray-50 rounded-xl">
      {/* Top Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 md:px-6 py-4">
          <div>
            <h2 className="text-gray-900 text-xl font-bold">
              Analytics Dashboard
            </h2>
            <p className="text-gray-500 text-sm mt-0.5">
              Real-time delivery operations overview
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Date Filter Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-2 bg-white rounded-xl px-4 py-2.5 border border-gray-200 hover:border-lime-500/50 hover:bg-gray-50 transition-colors">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700 font-medium hidden sm:inline">
                  {dateRange}
                </span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-30">
                <div className="py-2">
                  {[
                    { days: 7, label: "Last 7 days" },
                    { days: 14, label: "Last 14 days" },
                    { days: 30, label: "Last 30 days" },
                    { days: 90, label: "Last 3 months" },
                  ].map((option) => (
                    <button
                      key={option.days}
                      onClick={() =>
                        handleDateRangeChange(option.days, option.label)
                      }
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                        days === option.days
                          ? "text-lime-600 font-medium bg-lime-50"
                          : "text-gray-700"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Refresh */}
            <button
              onClick={handleRefresh}
              className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:border-lime-500/50 hover:text-lime-600 transition-all"
              title="Refresh data"
            >
              <RefreshCw className="w-5 h-5" />
            </button>

            {/* Notifications */}
            {/* <button className="relative w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:border-lime-500/50 transition-all">
              <Bell className="w-5 h-5" />
              {dashboardData.pendingParcels > 0 && (
                <span className="absolute -top-1 -right-1 min-w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center px-1.5 font-medium">
                  {dashboardData.pendingParcels > 99
                    ? "99+"
                    : dashboardData.pendingParcels}
                </span>
              )}
            </button> */}
            <NotificationDropdown />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-4 md:p-6 lg:p-8 space-y-6">
        {/* Quick Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-gray-900 text-2xl font-bold">Overview</h3>
            <p className="text-gray-500 text-sm mt-1">
              Monitor your delivery performance and track key metrics
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/dashboard/assign-riders"
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all text-sm"
            >
              <Package className="w-4 h-4" />
              Assign Parcel
            </Link>
            <Link
              to={"/dashboard/approve-rider"}
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-lime-500 hover:bg-lime-600 text-white font-semibold rounded-xl text-sm transition-all hover:shadow-lg hover:shadow-lime-500/25 cursor-pointer"
            >
              <Motorbike className="w-4 h-4" />
              Approve Rider
            </Link>
          </div>
        </div>

        {/* Main Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statsConfig.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-lime-200 transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="flex items-start justify-between mb-3">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center ${stat.iconBg}`}
                  >
                    <Icon className={`w-5 h-5 ${stat.iconColor}`} />
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 font-medium ${
                      stat.trendUp
                        ? "bg-green-50 text-green-600"
                        : "bg-red-50 text-red-600"
                    }`}
                  >
                    {stat.trendUp ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    {stat.trend}
                  </span>
                </div>
                <p className="text-gray-500 text-sm font-medium">
                  {stat.label}
                </p>
                <p className="text-gray-900 text-2xl font-bold mt-1">
                  {typeof stat.value === "number"
                    ? stat.value.toLocaleString()
                    : stat.value}
                </p>
              </div>
            );
          })}
        </div>

        {/* KPI Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpiStats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-linear-to-br from-white to-gray-50 p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.iconBg}`}
                  >
                    <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-500 text-xs font-medium">
                      {stat.label}
                    </p>
                    <div className="flex items-end gap-1">
                      <p className="text-gray-900 text-xl font-bold">
                        {stat.value}
                      </p>
                      {stat.unit && (
                        <span className="text-sm text-gray-400 mb-0.5">
                          {stat.unit}
                        </span>
                      )}
                    </div>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${
                      stat.trendUp
                        ? "bg-green-50 text-green-600"
                        : "bg-amber-50 text-amber-600"
                    }`}
                  >
                    {stat.trend}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Delivery Status Cards */}
        {deliveryStats.length > 0 && (
          <div>
            <h4 className="text-gray-900 font-semibold text-lg mb-4">
              Delivery Status Breakdown
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {deliveryStats.map((stat) => (
                <div
                  key={stat.status}
                  className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-lime-200 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110"
                      style={{
                        backgroundColor: `${getStatusColor(stat.status)}15`,
                      }}
                    >
                      <Package
                        className="w-5 h-5"
                        style={{ color: getStatusColor(stat.status) }}
                      />
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs font-medium capitalize">
                        {stat.status.replace(/-/g, " ")}
                      </p>
                      <p className="text-gray-900 text-xl font-bold">
                        {stat.count}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pie Chart */}
          <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6">
            <h4 className="text-gray-900 font-bold text-lg mb-2">
              Order Distribution
            </h4>
            <p className="text-gray-500 text-sm mb-4">
              Breakdown by delivery status
            </p>

            {pieChartData.length > 0 ? (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={90}
                      innerRadius={50}
                      dataKey="value"
                      isAnimationActive
                    >
                      {pieChartData.map((entry) => (
                        <Cell
                          key={`cell-${entry.name}`}
                          fill={getStatusColor(entry.name)}
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<PieChartTooltip />} />
                    <Legend content={<CustomLegend />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <Package className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No data available</p>
                </div>
              </div>
            )}

            {/* Total */}
            <div className="text-center mt-4 pt-4 border-t border-gray-100">
              <p className="text-gray-500 text-sm">Total Parcels</p>
              <p className="text-gray-900 text-3xl font-bold">{totalParcels}</p>
            </div>
          </div>

          {/* Area Chart */}
          <div className="lg:col-span-2 bg-white border border-gray-100 shadow-sm rounded-2xl p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
              <div>
                <h4 className="text-gray-900 font-bold text-lg">
                  Revenue & Orders
                </h4>
                <p className="text-gray-500 text-sm">{dateRange} performance</p>
              </div>
              <div className="flex gap-4">
                <span className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="w-3 h-3 rounded-full bg-lime-500" />
                  Revenue (৳)
                </span>
                <span className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="w-3 h-3 rounded-full bg-blue-500" />
                  Orders
                </span>
              </div>
            </div>

            <div className="h-72">
              {isRevenueLoading ? (
                <div className="h-full flex items-center justify-center">
                  <Spinner />
                </div>
              ) : revenueData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient
                        id="revenueGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#84cc16"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#84cc16"
                          stopOpacity={0}
                        />
                      </linearGradient>
                      <linearGradient
                        id="volumeGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#3b82f6"
                          stopOpacity={0.2}
                        />
                        <stop
                          offset="95%"
                          stopColor="#3b82f6"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#e5e7eb"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="date"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#6b7280", fontSize: 12 }}
                    />
                    <YAxis
                      yAxisId="left"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#6b7280", fontSize: 12 }}
                      tickFormatter={(value) =>
                        value >= 1000 ? `৳${value / 1000}k` : `৳${value}`
                      }
                    />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#6b7280", fontSize: 12 }}
                    />
                    <Tooltip content={<AreaChartTooltip />} />
                    <Area
                      yAxisId="left"
                      type="monotone"
                      dataKey="revenue"
                      stroke="#84cc16"
                      strokeWidth={2}
                      fill="url(#revenueGradient)"
                    />
                    <Area
                      yAxisId="right"
                      type="monotone"
                      dataKey="volume"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      fill="url(#volumeGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <TrendingUp className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>No revenue data for this period</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Top Riders Section */}
        {topRiders.length > 0 && (
          <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h4 className="text-gray-900 font-bold text-lg">
                  Top Performing Riders
                </h4>
                <p className="text-gray-500 text-sm">
                  Based on completed deliveries
                </p>
              </div>
              <Link
                to="/dashboard/approve-rider"
                className="text-lime-600 text-sm font-medium hover:text-lime-700 transition-colors"
              >
                View All →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {topRiders.map((rider, idx) => (
                <div
                  key={rider.email}
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-lime-50 transition-colors"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                      idx === 0
                        ? "bg-yellow-100 text-yellow-700"
                        : idx === 1
                        ? "bg-gray-200 text-gray-700"
                        : idx === 2
                        ? "bg-orange-100 text-orange-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-900 font-medium text-sm truncate">
                      {rider.name || "Unknown"}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {rider.deliveries} deliveries
                    </p>
                  </div>
                  <PackageCheck className="w-5 h-5 text-green-500" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
