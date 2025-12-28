import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit3,
  Lock,
  Camera,
  Shield,
  Package,
  Truck,
  Clock,
  CheckCircle,
  ChevronRight,
  Bell,
  CreditCard,
  LogOut,
  Settings,
  Star,
  TrendingUp,
  Activity,
} from "lucide-react";
import useAuth from "../../hooks/useAuth";

const Profile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    { label: "Total Deliveries", value: "156", icon: Package, trend: "+12%" },
    { label: "In Transit", value: "3", icon: Truck, trend: null },
    { label: "Completed", value: "148", icon: CheckCircle, trend: "+8%" },
    { label: "Avg. Rating", value: "4.9", icon: Star, trend: "+0.2" },
  ];

  const recentActivity = [
    {
      id: 1,
      type: "delivery",
      title: "Package Delivered",
      description: "Order #ZS-38291 delivered successfully",
      time: "2 hours ago",
      status: "completed",
    },
    {
      id: 2,
      type: "pickup",
      title: "Pickup Scheduled",
      description: "Order #ZS-38294 pickup confirmed",
      time: "5 hours ago",
      status: "pending",
    },
    {
      id: 3,
      type: "delivery",
      title: "Package In Transit",
      description: "Order #ZS-38290 on the way",
      time: "1 day ago",
      status: "transit",
    },
  ];

  const menuItems = [
    { icon: User, label: "Personal Info", tab: "personal" },
    { icon: MapPin, label: "Addresses", tab: "addresses" },
    { icon: CreditCard, label: "Payment Methods", tab: "payment" },
    { icon: Bell, label: "Notifications", tab: "notifications" },
    { icon: Shield, label: "Security", tab: "security" },
    { icon: Settings, label: "Preferences", tab: "preferences" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400";
      case "pending":
        return "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "transit":
        return "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400";
      default:
        return "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400";
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 md:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="relative mb-8">
          {/* Cover Image */}
          <div className="h-48 md:h-64 rounded-2xl overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-900 via-teal-800 to-emerald-900">
              {/* Pattern Overlay */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
                  backgroundSize: "24px 24px",
                }}
              />
              {/* Decorative Blobs */}
              <div className="absolute top-10 right-10 w-32 h-32 bg-lime-400/20 rounded-full blur-3xl" />
              <div className="absolute bottom-10 left-20 w-48 h-48 bg-teal-400/20 rounded-full blur-3xl" />
            </div>

            {/* Edit Cover Button */}
            <button className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-white/30 transition-colors flex items-center gap-2">
              <Camera className="w-4 h-4" />
              Edit Cover
            </button>
          </div>

          {/* Profile Card */}
          <div className="relative mx-4 md:mx-8 -mt-20">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-6 items-center md:items-end">
                {/* Avatar */}
                <div className="relative group">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl bg-gradient-to-br from-lime-400 to-lime-500">
                    {user?.photoURL ? (
                      <img
                        className="w-full h-full object-cover"
                        src={user.photoURL}
                        alt={user.displayName || "User"}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User className="w-16 h-16 text-teal-900" />
                      </div>
                    )}
                  </div>
                  <button className="absolute bottom-2 right-2 w-10 h-10 bg-lime-400 hover:bg-lime-500 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0">
                    <Camera className="w-5 h-5 text-teal-900" />
                  </button>
                  {/* Online Status */}
                  <div className="absolute top-2 right-2 w-5 h-5 bg-green-500 border-3 border-white dark:border-gray-800 rounded-full shadow-md" />
                </div>

                {/* User Info */}
                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
                    <h1 className="text-2xl md:text-3xl font-bold text-teal-900 dark:text-white">
                      {user?.displayName || "John Doe"}
                    </h1>
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-lime-100 dark:bg-lime-900/30 text-lime-700 dark:text-lime-400 text-sm font-medium rounded-full w-fit mx-auto md:mx-0">
                      <CheckCircle className="w-4 h-4" />
                      Verified
                    </span>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    {user?.email || "john.doe@example.com"}
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      New York, USA
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Member since Jan 2024
                    </span>
                    <span className="flex items-center gap-1">
                      <Package className="w-4 h-4" />
                      156 Deliveries
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button className="flex items-center gap-2 bg-teal-900 dark:bg-lime-400 text-white dark:text-teal-900 font-semibold py-3 px-6 rounded-xl hover:bg-teal-800 dark:hover:bg-lime-500 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                    <Edit3 className="w-4 h-4" />
                    Edit Profile
                  </button>
                  <button className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold py-3 px-6 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300">
                    <Lock className="w-4 h-4" />
                    Security
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-lime-100 dark:bg-lime-900/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-lime-600 dark:text-lime-400" />
                  </div>
                  {stat.trend && (
                    <span className="flex items-center gap-1 text-green-500 text-sm font-medium">
                      <TrendingUp className="w-4 h-4" />
                      {stat.trend}
                    </span>
                  )}
                </div>
                <p className="text-3xl font-bold text-teal-900 dark:text-white mb-1">
                  {stat.value}
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Menu */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                <h2 className="text-lg font-bold text-teal-900 dark:text-white">
                  Account Settings
                </h2>
              </div>
              <div className="p-2">
                {menuItems.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveTab(item.tab)}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-200 group ${
                        activeTab === item.tab
                          ? "bg-lime-50 dark:bg-lime-900/20 text-lime-700 dark:text-lime-400"
                          : "hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                          activeTab === item.tab
                            ? "bg-lime-400 text-teal-900"
                            : "bg-gray-100 dark:bg-gray-700 group-hover:bg-lime-100 dark:group-hover:bg-lime-900/30"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="flex-1 text-left font-medium">
                        {item.label}
                      </span>
                      <ChevronRight
                        className={`w-5 h-5 transition-transform ${
                          activeTab === item.tab ? "rotate-90" : ""
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Logout Button */}
              <div className="p-4 border-t border-gray-100 dark:border-gray-700">
                <button className="w-full flex items-center gap-4 p-4 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors group">
                  <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center group-hover:bg-red-200 dark:group-hover:bg-red-900/50 transition-colors">
                    <LogOut className="w-5 h-5" />
                  </div>
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Content - Activity & Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Personal Information Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                <h2 className="text-lg font-bold text-teal-900 dark:text-white">
                  Personal Information
                </h2>
                <button className="text-lime-600 hover:text-lime-700 dark:text-lime-400 dark:hover:text-lime-300 font-medium text-sm flex items-center gap-1">
                  <Edit3 className="w-4 h-4" />
                  Edit
                </button>
              </div>
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Full Name
                    </label>
                    <p className="text-teal-900 dark:text-white font-medium text-lg">
                      {user?.displayName || "John Doe"}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email Address
                    </label>
                    <p className="text-teal-900 dark:text-white font-medium text-lg">
                      {user?.email || "john.doe@example.com"}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Phone Number
                    </label>
                    <p className="text-teal-900 dark:text-white font-medium text-lg">
                      +1 (555) 123-4567
                    </p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Location
                    </label>
                    <p className="text-teal-900 dark:text-white font-medium text-lg">
                      New York, NY, USA
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                <h2 className="text-lg font-bold text-teal-900 dark:text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-lime-500" />
                  Recent Activity
                </h2>
                <button className="text-lime-600 hover:text-lime-700 dark:text-lime-400 dark:hover:text-lime-300 font-medium text-sm">
                  View All
                </button>
              </div>
              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${getStatusColor(
                          activity.status
                        )}`}
                      >
                        {activity.type === "delivery" ? (
                          <Package className="w-6 h-6" />
                        ) : (
                          <Truck className="w-6 h-6" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <h3 className="font-semibold text-teal-900 dark:text-white">
                            {activity.title}
                          </h3>
                          <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {activity.time}
                          </span>
                        </div>
                        <p className="text-gray-500 dark:text-gray-400">
                          {activity.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-r from-teal-900 to-teal-800 rounded-2xl p-8 text-white relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)`,
                    backgroundSize: "20px 20px",
                  }}
                />
              </div>
              <div className="absolute top-0 right-0 w-40 h-40 bg-lime-400/20 rounded-full blur-3xl" />

              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-2">Need Help?</h3>
                <p className="text-teal-200 mb-6 max-w-md">
                  Our support team is available 24/7 to assist you with any
                  questions or issues.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button className="bg-lime-400 hover:bg-lime-500 text-teal-900 font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Track Package
                  </button>
                  <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 border border-white/20 flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    Contact Support
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
