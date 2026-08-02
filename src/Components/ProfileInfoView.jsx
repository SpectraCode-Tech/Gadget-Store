import React, { useState } from "react";
import axios from "axios";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Pencil,
  Check,
  X,
  Loader2,
} from "lucide-react";

const ProfileInfoView = ({ profile, onProfileUpdated }) => {
  // Track which field is currently being edited (e.g., "firstName", "phone", "address")
  const [editingField, setEditingField] = useState(null);
  const [loading, setLoading] = useState(false);

  // Temporary field-specific values
  const [fieldValue, setFieldValue] = useState("");
  const [addressData, setAddressData] = useState({
    street: "",
    city: "",
    state: "",
    postalCode: "",
  });

  const handleStartEdit = (field, currentValue) => {
    setEditingField(field);
    if (field === "address") {
      setAddressData({
        street: currentValue?.street || "",
        city: currentValue?.city || "",
        state: currentValue?.state || "",
        postalCode: currentValue?.postalCode || "",
      });
    } else {
      setFieldValue(currentValue || "");
    }
  };

  const handleCancelEdit = () => {
    setEditingField(null);
  };

  const handleSaveField = async (field) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      let updatePayload = {};

      if (field === "address") {
        updatePayload = {
          firstName: profile.firstName,
          lastName: profile.lastName,
          phone: profile.phone || "",
          address: {
            street: addressData.street.trim(),
            city: addressData.city.trim(),
            state: addressData.state.trim(),
            postalCode: addressData.postalCode.trim(),
          },
        };
      } else {
        // Prepare full payload keeping other fields intact
        updatePayload = {
          firstName:
            field === "firstName" ? fieldValue.trim() : profile.firstName,
          lastName: field === "lastName" ? fieldValue.trim() : profile.lastName,
          phone: field === "phone" ? fieldValue.trim() : profile.phone || "",
          address: profile.address || {},
        };
      }

      const res = await axios.patch(
        "http://localhost:5000/users/update-profile",
        updatePayload,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (onProfileUpdated) {
        onProfileUpdated(res.data.user);
      }
      setEditingField(null);
    } catch (err) {
      console.error("Field update rejected:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-brand-black mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
          <User size={18} className="text-brand-orange" /> Identity
          Specifications
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
          {/* First Name Field */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 relative group">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                First Name
              </span>
              {editingField !== "firstName" && (
                <button
                  onClick={() =>
                    handleStartEdit("firstName", profile?.firstName)
                  }
                  className="text-slate-400 hover:text-brand-orange transition cursor-pointer p-1"
                  title="Edit First Name"
                >
                  <Pencil size={14} />
                </button>
              )}
            </div>
            {editingField === "firstName" ? (
              <div className="space-y-2 mt-2">
                <input
                  type="text"
                  value={fieldValue}
                  onChange={(e) => setFieldValue(e.target.value)}
                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-brand-orange"
                  autoFocus
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={handleCancelEdit}
                    disabled={loading}
                    className="p-1.5 text-slate-500 hover:bg-slate-200 rounded-md cursor-pointer"
                  >
                    <X size={14} />
                  </button>
                  <button
                    onClick={() => handleSaveField("firstName")}
                    disabled={loading}
                    className="p-1.5 bg-brand-orange text-white rounded-md cursor-pointer flex items-center gap-1"
                  >
                    {loading ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <Check size={14} />
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <span className="font-semibold text-brand-black text-base block">
                {profile?.firstName}
              </span>
            )}
          </div>

          {/* Last Name Field */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 relative group">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Last Name
              </span>
              {editingField !== "lastName" && (
                <button
                  onClick={() => handleStartEdit("lastName", profile?.lastName)}
                  className="text-slate-400 hover:text-brand-orange transition cursor-pointer p-1"
                  title="Edit Last Name"
                >
                  <Pencil size={14} />
                </button>
              )}
            </div>
            {editingField === "lastName" ? (
              <div className="space-y-2 mt-2">
                <input
                  type="text"
                  value={fieldValue}
                  onChange={(e) => setFieldValue(e.target.value)}
                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-brand-orange"
                  autoFocus
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={handleCancelEdit}
                    disabled={loading}
                    className="p-1.5 text-slate-500 hover:bg-slate-200 rounded-md cursor-pointer"
                  >
                    <X size={14} />
                  </button>
                  <button
                    onClick={() => handleSaveField("lastName")}
                    disabled={loading}
                    className="p-1.5 bg-brand-orange text-white rounded-md cursor-pointer flex items-center gap-1"
                  >
                    {loading ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <Check size={14} />
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <span className="font-semibold text-brand-black text-base block">
                {profile?.lastName}
              </span>
            )}
          </div>

          {/* Email Address (Read-only usually, or editable if supported) */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
              <Mail size={12} className="inline mr-1 -mt-0.5" /> Email Address
            </span>
            <span className="font-semibold text-brand-black text-base break-all block mt-1">
              {profile?.email}
            </span>
          </div>

          {/* Phone Number Field */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 relative group">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                <Phone size={12} className="inline mr-1 -mt-0.5" /> Contact Line
              </span>
              {editingField !== "phone" && (
                <button
                  onClick={() => handleStartEdit("phone", profile?.phone)}
                  className="text-slate-400 hover:text-brand-orange transition cursor-pointer p-1"
                  title="Edit Phone Number"
                >
                  <Pencil size={14} />
                </button>
              )}
            </div>
            {editingField === "phone" ? (
              <div className="space-y-2 mt-2">
                <input
                  type="text"
                  value={fieldValue}
                  onChange={(e) => setFieldValue(e.target.value)}
                  placeholder="e.g. +2348000000000"
                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-brand-orange"
                  autoFocus
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={handleCancelEdit}
                    disabled={loading}
                    className="p-1.5 text-slate-500 hover:bg-slate-200 rounded-md cursor-pointer"
                  >
                    <X size={14} />
                  </button>
                  <button
                    onClick={() => handleSaveField("phone")}
                    disabled={loading}
                    className="p-1.5 bg-brand-orange text-white rounded-md cursor-pointer flex items-center gap-1"
                  >
                    {loading ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <Check size={14} />
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <span className="font-semibold text-brand-black text-base block">
                {profile?.phone || "Not provided"}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Shipping Address Section */}
      <div className="pt-4">
        <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-100">
          <h3 className="text-lg font-bold text-brand-black flex items-center gap-2">
            <MapPin size={18} className="text-brand-orange" /> Default Shipping
            Destination
          </h3>
          {editingField !== "address" && (
            <button
              onClick={() => handleStartEdit("address", profile?.address)}
              className="text-xs font-semibold text-brand-orange flex items-center gap-1 hover:underline cursor-pointer"
            >
              <Pencil size={12} /> Edit Address
            </button>
          )}
        </div>

        {editingField === "address" ? (
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                Street Address
              </label>
              <input
                type="text"
                value={addressData.street}
                onChange={(e) =>
                  setAddressData({ ...addressData, street: e.target.value })
                }
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-brand-orange"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                  City
                </label>
                <input
                  type="text"
                  value={addressData.city}
                  onChange={(e) =>
                    setAddressData({ ...addressData, city: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-brand-orange"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                  State
                </label>
                <input
                  type="text"
                  value={addressData.state}
                  onChange={(e) =>
                    setAddressData({ ...addressData, state: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-brand-orange"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={handleCancelEdit}
                disabled={loading}
                className="px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-200 hover:bg-slate-300 rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSaveField("address")}
                disabled={loading}
                className="px-4 py-1.5 text-xs font-semibold text-white bg-brand-orange hover:bg-orange-600 rounded-lg cursor-pointer flex items-center gap-1"
              >
                {loading ? (
                  <Loader2 size={12} className="animate-spin" />
                ) : (
                  "Save Address"
                )}
              </button>
            </div>
          </div>
        ) : profile?.address?.street ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Street Address
              </span>
              <span className="font-semibold text-brand-black">
                {profile.address.street}
              </span>
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                City
              </span>
              <span className="font-semibold text-brand-black">
                {profile.address.city}
              </span>
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                State
              </span>
              <span className="font-semibold text-brand-black">
                {profile.address.state}
              </span>
            </div>
          </div>
        ) : (
          <p className="text-sm text-slate-500 italic bg-slate-50 p-4 rounded-xl border border-slate-100">
            No delivery destination vectors configured yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProfileInfoView;
