import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import {
  Bell,
  Package,
  CreditCard,
  Bike,
  CheckCircle,
  Trash2,
  CheckCheck,
  X,
  Clock,
  ChevronRight,
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { formatDistanceToNow } from "date-fns";

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch notifications
  const {
    data: notificationData = { notifications: [], unreadCount: 0 },
    isLoading,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () =>
      (await axiosSecure.get("/notifications?limit=10")).data,
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  const { notifications, unreadCount } = notificationData;

  // Mark as read mutation
  const markAsReadMutation = useMutation({
    mutationFn: async (id) => {
      return (await axiosSecure.patch(`/notifications/${id}/read`)).data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
    },
  });

  // Mark all as read mutation
  const markAllAsReadMutation = useMutation({
    mutationFn: async () => {
      return (await axiosSecure.patch("/notifications/read-all")).data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
    },
  });

  // Delete notification mutation
  const deleteNotificationMutation = useMutation({
    mutationFn: async (id) => {
      return (await axiosSecure.delete(`/notifications/${id}`)).data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
    },
  });

  // Get icon based on notification type
  const getNotificationIcon = (type) => {
    switch (type) {
      case "new-order":
        return { icon: Package, bg: "bg-blue-100", color: "text-blue-600" };
      case "payment-received":
        return {
          icon: CreditCard,
          bg: "bg-green-100",
          color: "text-green-600",
        };
      case "rider-application":
        return { icon: Bike, bg: "bg-purple-100", color: "text-purple-600" };
      case "delivery-completed":
        return { icon: CheckCircle, bg: "bg-lime-100", color: "text-lime-600" };
      default:
        return { icon: Bell, bg: "bg-gray-100", color: "text-gray-600" };
    }
  };

  // Format time
  const formatTime = (dateString) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch {
      return "Just now";
    }
  };

  // Handle notification click
  const handleNotificationClick = (notification) => {
    if (!notification.isRead) {
      markAsReadMutation.mutate(notification._id);
    }
  };

  // Get link based on notification type
  const getNotificationLink = (notification) => {
    switch (notification.type) {
      case "new-order":
      case "payment-received":
      case "delivery-completed":
        return `/admin/orders`;
      case "rider-application":
        return `/admin/riders`;
      default:
        return "#";
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Notification Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          relative w-10 h-10 rounded-xl border flex items-center justify-center transition-all
          ${
            isOpen
              ? "bg-lime-50 border-lime-300 text-lime-600"
              : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-lime-500/50"
          }
        `}
      >
        <Bell className={`w-5 h-5 ${unreadCount > 0 ? "animate-pulse" : ""}`} />

        {/* Unread Badge */}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center px-1.5 font-bold animate-bounce">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-gray-700" />
              <h3 className="font-semibold text-gray-900">Notifications</h3>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs font-medium rounded-full">
                  {unreadCount} new
                </span>
              )}
            </div>
            <div className="flex items-center gap-1">
              {unreadCount > 0 && (
                <button
                  onClick={() => markAllAsReadMutation.mutate()}
                  className="p-1.5 text-gray-500 hover:text-lime-600 hover:bg-lime-50 rounded-lg transition-colors"
                  title="Mark all as read"
                >
                  <CheckCheck className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="w-6 h-6 border-2 border-lime-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : notifications.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {notifications.map((notification) => {
                  const {
                    icon: Icon,
                    bg,
                    color,
                  } = getNotificationIcon(notification.type);
                  return (
                    <div
                      key={notification._id}
                      className={`
                        relative flex gap-3 p-4 hover:bg-gray-50 transition-colors cursor-pointer group
                        ${!notification.isRead ? "bg-lime-50/50" : ""}
                      `}
                      onClick={() => handleNotificationClick(notification)}
                    >
                      {/* Unread indicator */}
                      {!notification.isRead && (
                        <span className="absolute left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-lime-500 rounded-full" />
                      )}

                      {/* Icon */}
                      <div
                        className={`w-10 h-10 rounded-xl ${bg} ${color} flex items-center justify-center shrink-0`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <Link
                          to={getNotificationLink(notification)}
                          onClick={() => setIsOpen(false)}
                          className="block"
                        >
                          <p
                            className={`text-sm font-medium text-gray-900 truncate ${
                              !notification.isRead ? "font-semibold" : ""
                            }`}
                          >
                            {notification.title}
                          </p>
                          <p className="text-sm text-gray-500 line-clamp-2 mt-0.5">
                            {notification.message}
                          </p>
                          <div className="flex items-center gap-2 mt-1.5">
                            <Clock className="w-3 h-3 text-gray-400" />
                            <span className="text-xs text-gray-400">
                              {formatTime(notification.createdAt)}
                            </span>
                            {notification.trackingId && (
                              <>
                                <span className="text-gray-300">•</span>
                                <span className="text-xs text-lime-600 font-medium">
                                  {notification.trackingId}
                                </span>
                              </>
                            )}
                          </div>
                        </Link>
                      </div>

                      {/* Delete Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNotificationMutation.mutate(notification._id);
                        }}
                        className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                <Bell className="w-12 h-12 mb-3 opacity-50" />
                <p className="font-medium">No notifications</p>
                <p className="text-sm">You're all caught up!</p>
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="border-t border-gray-100 p-3 bg-gray-50">
              <Link
                to="/admin/notifications"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2 text-sm font-medium text-lime-600 hover:text-lime-700 hover:bg-lime-50 rounded-lg transition-colors"
              >
                View all notifications
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
