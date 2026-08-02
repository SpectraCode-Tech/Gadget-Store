// src/pages/Profile.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { LogOut, CheckCircle, AlertCircle, Camera, Loader2 } from "lucide-react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import ProfileInfoView from "../Components/ProfileInfoView";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const userData = res.data;
      setProfile(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      setLoading(false);
    } catch (err) {
      console.error("Profile sync failed:", err);
      setMessage({
        type: "error",
        text: "Failed to sync profile specs with repository.",
      });
      setLoading(false);
    }
  };

  // Production-Ready implementation inside your parent Profile.jsx file
  const handleAvatarChange = async (fileInputEventOrObject) => {
    // 1. Cleanly resolve whether the data arrived as a raw object argument or standard DOM Change Event
    let targetFile = null;

    if (fileInputEventOrObject?.target?.files) {
      targetFile = fileInputEventOrObject.target.files[0];
    } else {
      targetFile = fileInputEventOrObject;
    }

    // Guard Clause: If no valid file structure is isolated, cancel processing
    if (!targetFile) return;

    setMessage({ type: "", text: "" });
    setUploadingAvatar(true);

    // 2. Instantiate data boundaries
    const data = new FormData();

    // CRITICAL: The first argument key MUST match uploadProfile.single("avatar") exactly
    data.append("avatar", targetFile);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `http://localhost:5000/users/upload-avatar/${profile._id}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setProfile(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setMessage({
        type: "success",
        text: "Avatar uploaded!",
      });
    } catch (err) {
      console.error("Avatar upload failure context log:", err);
      setMessage({
        type: "error",
        text:
          err.response?.data?.error ||
          err.response?.data?.message ||
          "Failed file asset provisioning.",
      });
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  if (loading && !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500 font-medium">
        <Loader2 size={30} className="animate-spin text-brand-orange" />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-12">
        {message.text && (
          <div
            className={`mb-6 p-4 border rounded-xl flex items-center gap-3 text-sm font-medium ${
              message.type === "success"
                ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                : "bg-red-50 border-red-200 text-red-700"
            }`}
          >
            {message.type === "success" ? (
              <CheckCircle size={18} />
            ) : (
              <AlertCircle size={18} />
            )}
            <span>{message.text}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Sidebar */}
          <div className="md:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 text-center space-y-6 shadow-sm">
            <div className="relative w-28 h-28 mx-auto">
              <div className="w-full h-full rounded-full border-4 border-slate-50 ring-2 ring-brand-orange overflow-hidden bg-slate-100 flex items-center justify-center font-bold text-3xl text-brand-orange shadow-inner">
                {profile?.avatar && profile.avatar !== "https://ibb.co" ? (
                  <img
                    src={profile.avatar}
                    alt="User profile blueprint"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  profile?.firstName?.charAt(0).toUpperCase()
                )}
              </div>

              <label className="absolute bottom-0 right-0 p-2 bg-brand-orange text-white rounded-full shadow-md hover:bg-orange-600 transition cursor-pointer border-2 border-white">
                <input
                  type="file"
                  accept="image/*"
                  disabled={uploadingAvatar}
                  onChange={handleAvatarChange}
                  className="hidden"
                />
                <Camera
                  size={14}
                  className={uploadingAvatar ? "animate-pulse" : ""}
                />
              </label>
            </div>

            <div>
              <h2 className="text-xl font-bold text-brand-black">
                {profile?.firstName} {profile?.lastName}
              </h2>
              <span className="inline-block px-3 py-1 bg-orange-50 border border-orange-100 rounded-full text-xs font-bold text-brand-orange uppercase tracking-wider mt-1.5">
                {profile?.role || "Customer"} Account
              </span>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={handleLogout}
                className="w-full py-2.5 bg-red-50 text-red-600 rounded-xl font-semibold text-sm hover:bg-red-100 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* Main Info Display with Inline Editing */}
          <div className="md:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
            <ProfileInfoView
              profile={profile}
              onProfileUpdated={(updatedUser) => {
                setProfile(updatedUser);
                localStorage.setItem("user", JSON.stringify(updatedUser));
                setMessage({
                  type: "success",
                  text: "Profile updated.",
                });
              }}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};;;

export default Profile;
