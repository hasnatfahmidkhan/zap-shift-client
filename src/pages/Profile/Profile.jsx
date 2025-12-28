// pages/Profile/Profile.jsx
import React, { useState, useRef } from "react";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Shield,
  CheckCircle,
  Clock,
  AlertCircle,
  Settings,
  Edit3,
  Camera,
  Globe,
  Fingerprint,
  Activity,
  Loader2,
  X,
  Save,
  Upload,
} from "lucide-react";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { uploadImage } from "../../utils";

const Profile = () => {
  const { user, authLoading, updateProfileFunc } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    displayName: "",
  });
  const fileInputRef = useRef(null);

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Format time ago
  const formatTimeAgo = (dateString) => {
    if (!dateString) return "N/A";
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInHours < 48) return "Yesterday";
    return formatDate(dateString);
  };

  // Start editing
  const handleStartEditing = () => {
    setFormData({
      displayName: user?.displayName || "",
    });
    setPreviewImage(null);
    setImageFile(null);
    setIsEditing(true);
  };

  // Cancel editing
  const handleCancelEditing = () => {
    setIsEditing(false);
    setPreviewImage(null);
    setImageFile(null);
    setFormData({ displayName: "" });
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      setImageFile(file);
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.displayName.trim() && !imageFile) {
      toast.error("Please provide a name or select a new photo");
      return;
    }

    setIsUpdating(true);

    try {
      let photoURL = null;

      // Upload new image if selected
      if (imageFile) {
        toast.loading("Uploading image...", { id: "upload" });
        photoURL = await uploadImage(imageFile);
        toast.success("Image uploaded!", { id: "upload" });
      }

      // Update profile
      await updateProfileFunc(
        formData.displayName.trim() || user?.displayName,
        photoURL || user?.photoURL
      );

      toast.success("Profile updated successfully!");
      setIsEditing(false);
      setPreviewImage(null);
      setImageFile(null);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setIsUpdating(false);
    }
  };

  // Loading state
  if (authLoading || !user || isUpdating) {
    return (
      <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-gray-200 border-t-indigo-600 animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <User className="w-6 h-6 md:w-8 md:h-8 text-indigo-600" />
          </div>
        </div>
        <p className="mt-4 text-gray-600 font-medium">Loading profile...</p>
      </div>
    );
  }

  // No user state
  if (!user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <p className="text-gray-600 font-medium">No user found</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 lg:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
              My Profile
            </h1>
            <p className="text-gray-500 mt-1 text-sm sm:text-base">
              Manage your account information and settings
            </p>
          </div>
          {/* Desktop Edit Button */}
          {!isEditing && (
            <button
              onClick={handleStartEditing}
              className="hidden sm:flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-5 rounded-xl transition-colors shadow-sm cursor-pointer"
            >
              <Edit3 className="w-4 h-4" />
              Edit Profile
            </button>
          )}
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-6">
              {/* Cover */}
              <div className="h-24 sm:h-32 lg:h-28 xl:h-32 bg-primary relative">
                <div className="absolute inset-0 bg-black/10"></div>
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `radial-linear(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
                    backgroundSize: "20px 20px",
                  }}
                />
              </div>

              {/* Avatar & Info */}
              <div className="relative px-4 sm:px-6 pb-6 text-center">
                {/* Avatar */}
                <div className="-mt-12 sm:-mt-14 lg:-mt-12 xl:-mt-14 mb-4 inline-block">
                  <div className="relative">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-24 lg:h-24 xl:w-28 xl:h-28 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-100">
                      {isEditing && previewImage ? (
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : user?.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt={user.displayName || "Profile"}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-full h-full bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                          <span className="text-3xl sm:text-4xl lg:text-3xl xl:text-4xl font-bold text-white">
                            {user?.displayName?.charAt(0)?.toUpperCase() ||
                              user?.email?.charAt(0)?.toUpperCase() ||
                              "U"}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Camera Button for Edit */}
                    {isEditing && (
                      <>
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleImageChange}
                          accept="image/*"
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="absolute bottom-0 right-0 w-8 h-8 sm:w-10 sm:h-10 bg-indigo-600 hover:bg-indigo-700 rounded-full flex items-center justify-center shadow-lg transition-colors"
                        >
                          <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        </button>
                      </>
                    )}

                    {/* Online indicator - Only show when not editing */}
                    {!isEditing && (
                      <div className="absolute bottom-1 right-1 w-5 h-5 sm:w-6 sm:h-6 bg-green-500 border-3 border-white rounded-full shadow-md"></div>
                    )}
                  </div>
                </div>

                {/* Edit Form or Display */}
                {isEditing ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name Input */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                        Display Name
                      </label>
                      <input
                        type="text"
                        value={formData.displayName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            displayName: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        placeholder="Enter your name"
                      />
                    </div>

                    {/* Email (Read Only) */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={user?.email || ""}
                        disabled
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50 text-gray-500 cursor-not-allowed"
                      />
                      <p className="text-xs text-gray-400 mt-1 text-left">
                        Email cannot be changed
                      </p>
                    </div>

                    {/* Image Preview Info */}
                    {imageFile && (
                      <div className="flex items-center gap-2 p-3 bg-green-50 rounded-xl text-left">
                        <Upload className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-green-700 truncate flex-1">
                          {imageFile.name}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setImageFile(null);
                            setPreviewImage(null);
                          }}
                          className="text-green-600 hover:text-green-800"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-2">
                      <button
                        type="submit"
                        disabled={isUpdating}
                        className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                      >
                        {isUpdating ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <Save className="w-5 h-5" />
                        )}
                        {isUpdating ? "Saving..." : "Save"}
                      </button>
                      <button
                        type="button"
                        onClick={handleCancelEditing}
                        disabled={isUpdating}
                        className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium cursor-pointer py-2.5 px-4 rounded-xl transition-colors disabled:opacity-50"
                      >
                        <X className="w-5 h-5" />
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    {/* Name */}
                    <h2 className="text-xl sm:text-2xl lg:text-xl xl:text-2xl font-bold text-gray-800 mb-1">
                      {user?.displayName || "User"}
                    </h2>

                    {/* Email */}
                    <p className="text-gray-500 text-sm sm:text-base lg:text-sm xl:text-base mb-3 truncate px-2">
                      {user?.email}
                    </p>

                    {/* Badges */}
                    <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
                      {user?.emailVerified && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                          <CheckCircle className="w-3.5 h-3.5" />
                          Verified
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
                        <Shield className="w-3.5 h-3.5" />
                        Active
                      </span>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100">
                      <div className="text-center">
                        <p className="text-lg sm:text-xl font-bold text-gray-800">
                          {user?.providerData?.length || 1}
                        </p>
                        <p className="text-xs text-gray-500">Sign-in Methods</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg sm:text-xl font-bold text-gray-800">
                          {user?.emailVerified ? "Yes" : "No"}
                        </p>
                        <p className="text-xs text-gray-500">Email Verified</p>
                      </div>
                    </div>

                    {/* Mobile Edit Button */}
                    <button
                      onClick={handleStartEditing}
                      className="sm:hidden w-full mt-4 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-5 rounded-xl transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                      Edit Profile
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Sign-in Methods Card - Desktop */}
            {user?.providerData &&
              user.providerData.length > 0 &&
              !isEditing && (
                <div className="hidden lg:block mt-6 bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                  <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Fingerprint className="w-5 h-5 text-indigo-600" />
                    Sign-in Methods
                  </h3>
                  <div className="space-y-3">
                    {user.providerData.map((provider, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                      >
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                          {provider.providerId === "google.com" ? (
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                              <path
                                fill="#4285F4"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                              />
                              <path
                                fill="#34A853"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                              />
                              <path
                                fill="#FBBC05"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                              />
                              <path
                                fill="#EA4335"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                              />
                            </svg>
                          ) : provider.providerId === "password" ? (
                            <Mail className="w-5 h-5 text-indigo-600" />
                          ) : (
                            <User className="w-5 h-5 text-indigo-600" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800">
                            {provider.providerId === "google.com"
                              ? "Google"
                              : provider.providerId === "password"
                              ? "Email & Password"
                              : provider.providerId}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {provider.email}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Account Details Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <User className="w-5 h-5 text-indigo-600" />
                  Account Details
                </h3>
                <button className="hidden sm:flex items-center gap-1 text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                  <Settings className="w-4 h-4" />
                  Settings
                </button>
              </div>

              <div className="p-4 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Display Name */}
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center shrink-0">
                      <User className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm text-gray-500">
                        Full Name
                      </p>
                      <p className="text-gray-800 font-medium truncate">
                        {user?.displayName || "Not set"}
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center shrink-0">
                      <Mail className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm text-gray-500">
                        Email Address
                      </p>
                      <p className="text-gray-800 font-medium truncate">
                        {user?.email}
                      </p>
                    </div>
                    {user?.emailVerified && (
                      <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    )}
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
                      <Phone className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm text-gray-500">
                        Phone Number
                      </p>
                      <p className="text-gray-800 font-medium">
                        {user?.phoneNumber || "Not set"}
                      </p>
                    </div>
                  </div>

                  {/* User ID */}
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center shrink-0">
                      <Fingerprint className="w-6 h-6 text-rose-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm text-gray-500">
                        User ID
                      </p>
                      <p className="text-gray-800 font-medium text-sm truncate font-mono">
                        {user?.uid}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Activity & Dates Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-gray-100">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-indigo-600" />
                  Account Activity
                </h3>
              </div>

              <div className="p-4 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Member Since */}
                  <div className="flex items-center gap-4 p-4 bg-linear-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-100">
                    <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
                      <Calendar className="w-6 h-6 text-amber-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm text-gray-500">
                        Member Since
                      </p>
                      <p className="text-gray-800 font-medium text-sm sm:text-base">
                        {formatDate(user?.metadata?.creationTime)}
                      </p>
                    </div>
                  </div>

                  {/* Last Sign In */}
                  <div className="flex items-center gap-4 p-4 bg-linear-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                      <Clock className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm text-gray-500">
                        Last Sign In
                      </p>
                      <p className="text-gray-800 font-medium text-sm sm:text-base">
                        {formatTimeAgo(user?.metadata?.lastSignInTime)}
                      </p>
                    </div>
                  </div>

                  {/* Account Age */}
                  <div className="flex items-center gap-4 p-4 bg-linear-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100 sm:col-span-2 lg:col-span-1">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
                      <Globe className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm text-gray-500">
                        Account Age
                      </p>
                      <p className="text-gray-800 font-medium text-sm sm:text-base">
                        {user?.metadata?.creationTime
                          ? `${Math.floor(
                              (new Date() -
                                new Date(user.metadata.creationTime)) /
                                (1000 * 60 * 60 * 24)
                            )} days`
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Status Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-gray-100">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-indigo-600" />
                  Account Status
                </h3>
              </div>

              <div className="p-4 sm:p-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Email Verification */}
                  <div
                    className={`p-4 rounded-xl text-center ${
                      user?.emailVerified
                        ? "bg-green-50 border border-green-100"
                        : "bg-yellow-50 border border-yellow-100"
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 ${
                        user?.emailVerified ? "bg-green-100" : "bg-yellow-100"
                      }`}
                    >
                      {user?.emailVerified ? (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      ) : (
                        <AlertCircle className="w-6 h-6 text-yellow-600" />
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mb-1">Email</p>
                    <p
                      className={`font-semibold text-sm ${
                        user?.emailVerified
                          ? "text-green-700"
                          : "text-yellow-700"
                      }`}
                    >
                      {user?.emailVerified ? "Verified" : "Not Verified"}
                    </p>
                  </div>

                  {/* Account Status */}
                  <div className="p-4 rounded-xl bg-green-50 border border-green-100 text-center">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 bg-green-100">
                      <Shield className="w-6 h-6 text-green-600" />
                    </div>
                    <p className="text-xs text-gray-500 mb-1">Account</p>
                    <p className="font-semibold text-sm text-green-700">
                      Active
                    </p>
                  </div>

                  {/* Phone Status */}
                  <div
                    className={`p-4 rounded-xl text-center ${
                      user?.phoneNumber
                        ? "bg-green-50 border border-green-100"
                        : "bg-gray-50 border border-gray-100"
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 ${
                        user?.phoneNumber ? "bg-green-100" : "bg-gray-100"
                      }`}
                    >
                      <Phone
                        className={`w-6 h-6 ${
                          user?.phoneNumber ? "text-green-600" : "text-gray-400"
                        }`}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mb-1">Phone</p>
                    <p
                      className={`font-semibold text-sm ${
                        user?.phoneNumber ? "text-green-700" : "text-gray-500"
                      }`}
                    >
                      {user?.phoneNumber ? "Added" : "Not Added"}
                    </p>
                  </div>

                  {/* 2FA Status */}
                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 text-center">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 bg-gray-100">
                      <Fingerprint className="w-6 h-6 text-gray-400" />
                    </div>
                    <p className="text-xs text-gray-500 mb-1">2FA</p>
                    <p className="font-semibold text-sm text-gray-500">
                      Not Enabled
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sign-in Methods Card - Mobile/Tablet Only */}
            {user?.providerData && user.providerData.length > 0 && (
              <div className="lg:hidden bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 sm:p-6 border-b border-gray-100">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 flex items-center gap-2">
                    <Fingerprint className="w-5 h-5 text-indigo-600" />
                    Sign-in Methods
                  </h3>
                </div>
                <div className="p-4 sm:p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {user.providerData.map((provider, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl"
                      >
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                          {provider.providerId === "google.com" ? (
                            <svg className="w-6 h-6" viewBox="0 0 24 24">
                              <path
                                fill="#4285F4"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                              />
                              <path
                                fill="#34A853"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                              />
                              <path
                                fill="#FBBC05"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                              />
                              <path
                                fill="#EA4335"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                              />
                            </svg>
                          ) : provider.providerId === "password" ? (
                            <Mail className="w-6 h-6 text-indigo-600" />
                          ) : (
                            <User className="w-6 h-6 text-indigo-600" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-800">
                            {provider.providerId === "google.com"
                              ? "Google"
                              : provider.providerId === "password"
                              ? "Email & Password"
                              : provider.providerId}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {provider.email}
                          </p>
                        </div>
                        <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Security Notice */}
            {/* <div className="bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl p-4 sm:p-6 text-white relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `radial-linear(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)`,
                  backgroundSize: "20px 20px",
                }}
              />
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>

              <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-lg mb-1">
                    Keep Your Account Secure
                  </h4>
                  <p className="text-white/80 text-sm">
                    Enable two-factor authentication and use a strong password
                    to protect your account from unauthorized access.
                  </p>
                </div>
                <button className="w-full sm:w-auto bg-white text-indigo-600 font-medium py-2.5 px-5 rounded-xl hover:bg-white/90 transition-colors shrink-0">
                  Enable 2FA
                </button>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
