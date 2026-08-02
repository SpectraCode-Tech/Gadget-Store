// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TrendingUp,
  Coins,
  ShoppingCart,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Users,
  Package,
  RotateCw,
  Loader2,
} from "lucide-react";
import Footer from "../Components/Footer";
import { Link, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }
    fetchDashboardMetrics(token);
  }, [navigate]);

  const fetchDashboardMetrics = async (authToken) => {
    try {
      setLoading(true);
      setError("");
      const token = authToken || localStorage.getItem("token");

      if (!token) {
        navigate("/login", { replace: true });
        return;
      }

      const response = await axios.get(
        "http://localhost:5000/admin/dashboard/metrics",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      setMetrics(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Dashboard data pull failed:", err);

      if (err.response?.status === 401 || err.response?.status === 403) {
        localStorage.removeItem("token");
        navigate("/login", { replace: true });
        return;
      }

      setError(
        err.response?.data?.message ||
          "Access denied or backend server offline. Admins only.",
      );
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500 font-medium bg-slate-50">
        <Loader2 size={35} className="animate-spin text-brand-orange" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-red-600 px-4 text-center">
        <AlertTriangle className="w-12 h-12 mb-3 text-red-500 animate-bounce" />
        <h2 className="text-xl font-bold text-slate-900 mb-1">
          You are not an Admin or experiencing a Connection Error
        </h2>
        <p className="text-sm text-slate-500 max-w-sm mb-4">{error}</p>
        <div className="flex gap-2">
          <button
            onClick={() => fetchDashboardMetrics()}
            className="px-4 py-2 text-brand-orange underline text-sm font-semibold hover:text-brand-orange/90 transition cursor-pointer"
          >
            Try again
          </button>
          <Link
            to="/"
            className="px-4 py-2 text-brand-orange underline text-sm font-semibold hover:text-brand-orange/90 transition cursor-pointer"
          >
            Go Home
          </Link>
          <Link
            to="/login"
            className="px-4 py-2 text-brand-orange underline text-sm font-semibold hover:text-brand-orange/90 transition cursor-pointer"
          >
            Log In
          </Link>
        </div>
      </div>
    );
  }

  const {
    financials,
    fulfillmentPerformance,
    inventoryHealth,
    userGrowth,
    topPerformingProducts,
  } = metrics;

  return (
    <div className="bg-slate-50/50 min-h-screen flex flex-col justify-between">
      <div>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10">
          {/* HEADER SECTION */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-black text-brand-black tracking-tight">
                Admin Dashboard
              </h1>
              <p className="text-sm text-slate-500 mt-0.5">
                Overview of store performance and total sales.
              </p>
            </div>
            <button
              onClick={() => fetchDashboardMetrics()}
              title="Refresh Data"
              className="p-2.5 bg-white border border-slate-200 hover:bg-orange-50 hover:border-orange-200 rounded-xl text-slate-700 hover:text-brand-orange shadow-sm transition cursor-pointer"
            >
              <RotateCw size={18} />
            </button>
          </div>

          {/* FINANCIAL OVERVIEW CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 flex items-center justify-between shadow-sm">
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Total Sales Volume
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-brand-black">
                  ₦{financials.totalGrossRevenue.toLocaleString()}
                </h2>
              </div>
              <div className="p-3.5 bg-blue-50 text-blue-600 rounded-xl">
                <TrendingUp size={24} />
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 flex items-center justify-between shadow-sm">
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Cleared Revenue
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-emerald-600">
                  ₦{financials.settledRevenue.toLocaleString()}
                </h2>
              </div>
              <div className="p-3.5 bg-emerald-50 text-emerald-600 rounded-xl">
                <Coins size={24} />
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 flex items-center justify-between shadow-sm sm:col-span-2 lg:col-span-1">
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Cancelled Orders Loss
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-red-500">
                  ₦{financials.revenueLostToCancellations.toLocaleString()}
                </h2>
              </div>
              <div className="p-3.5 bg-red-50 text-red-500 rounded-xl">
                <XCircle size={24} />
              </div>
            </div>
          </div>

          {/* ORDERS AND INVENTORY */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Order Status Cards */}
            <div className="md:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-800 text-base border-b border-slate-100 pb-2">
                Order Status Summary
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 border border-slate-100 rounded-xl flex items-center gap-3">
                  <div className="p-2.5 bg-white text-slate-600 rounded-lg shadow-sm">
                    <ShoppingCart size={18} />
                  </div>
                  <div>
                    <span className="text-2xl font-black text-brand-black">
                      {fulfillmentPerformance.totalOrdersProcessed}
                    </span>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                      Total Orders
                    </p>
                  </div>
                </div>
                <div className="bg-slate-50 p-4 border border-slate-100 rounded-xl flex items-center gap-3">
                  <div className="p-2.5 bg-white text-emerald-600 rounded-lg shadow-sm">
                    <CheckCircle size={18} />
                  </div>
                  <div>
                    <span className="text-2xl font-black text-emerald-600">
                      {fulfillmentPerformance.completedCount}
                    </span>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                      Delivered
                    </p>
                  </div>
                </div>
                <div className="bg-slate-50 p-4 border border-slate-100 rounded-xl flex items-center gap-3">
                  <div className="p-2.5 bg-white text-brand-orange rounded-lg shadow-sm">
                    <Package size={18} />
                  </div>
                  <div>
                    <span className="text-2xl font-black text-brand-orange">
                      {fulfillmentPerformance.pendingCount}
                    </span>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                      Pending / COD
                    </p>
                  </div>
                </div>
                <div className="bg-slate-50 p-4 border border-slate-100 rounded-xl flex items-center gap-3">
                  <div className="p-2.5 bg-white text-red-500 rounded-lg shadow-sm">
                    <XCircle size={18} />
                  </div>
                  <div>
                    <span className="text-2xl font-black text-red-500">
                      {fulfillmentPerformance.cancelledCount}
                    </span>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                      Cancelled
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Customers & Inventory Health Cards */}
            <div className="md:col-span-5 flex flex-col gap-6">
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex items-center justify-between flex-1">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    Total Customers
                  </span>
                  <span className="text-3xl font-black text-brand-black">
                    {userGrowth.activeCustomers}
                  </span>
                  <p className="text-xs text-slate-400">
                    Registered store accounts.
                  </p>
                </div>
                <div className="p-4 bg-purple-50 text-purple-600 rounded-2xl">
                  <Users size={28} />
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between flex-1 gap-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                      Product Stock Status
                    </span>
                    <span className="text-2xl font-black text-brand-black">
                      {inventoryHealth.totalSkusTracked} Total Products
                    </span>
                  </div>
                  <div className="p-2.5 bg-slate-50 text-slate-700 rounded-xl border">
                    <Package size={20} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 bg-red-50 rounded-xl border border-red-100 text-red-700 font-semibold">
                    <span className="block text-lg font-black">
                      {inventoryHealth.outOfStockCount}
                    </span>
                    Out of Stock
                  </div>
                  <div className="p-2.5 bg-orange-50 rounded-xl border border-orange-100 text-orange-700 font-semibold">
                    <span className="block text-lg font-black">
                      {inventoryHealth.lowStockAlertCount}
                    </span>
                    Low Stock (&lt;=5)
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* TOP PERFORMING PRODUCTS */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-slate-800 text-base border-b border-slate-100 pb-3 mb-4">
              Top 5 Best-Selling Products
            </h3>

            {topPerformingProducts.length === 0 ? (
              <div className="py-12 text-center text-slate-400 text-sm font-medium">
                No sales data available yet.
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {topPerformingProducts.map((product, index) => (
                  <div
                    key={product._id || index}
                    className="py-3.5 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <span className="w-6 text-sm font-bold text-slate-400">
                        0{index + 1}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-slate-100 overflow-hidden border border-slate-200 flex-shrink-0">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs font-bold text-brand-orange">
                            {product.name?.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">
                          {product.name}
                        </h4>
                        <p className="text-xs text-slate-400">
                          Units Sold:{" "}
                          <span className="font-semibold text-slate-600">
                            {product.totalUnitsSold || product.soldCount || 0}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-black text-brand-orange">
                        ₦
                        {(
                          product.revenue ||
                          product.price * (product.totalUnitsSold || 0)
                        ).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
