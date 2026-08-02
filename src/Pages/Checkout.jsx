import React, { useState } from "react";
import { useCart } from "../Components/CartContext";
import axios from "axios";
import {
  ShoppingBag,
  CreditCard,
  Truck,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Checkout = () => {
  const { cart, getSubtotal, clearCart } = useCart();

  // Checkout Input States
  const [shippingAddress, setShippingAddress] = useState({
    street: "",
    city: "",
    state: "",
    postalCode: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cod"); // "cod" or "card"

  // Operational Interface States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [orderConfirmation, setOrderConfirmation] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    // 1. Structure the items payload to exactly match our backend OrderItem Schema expectations
    const checkoutItems = cart.map((item) => ({
      productId: item._id || item.id,
      quantity: item.quantity,
    }));

    // 2. Compile master data payload
    const orderPayload = {
      items: checkoutItems,
      shippingAddress,
      paymentMethod,
      // For Card payments, map a dummy gateway token for this phase. COD is null.
      paymentReference:
        paymentMethod === "card" ? `pay_ref_${Date.now()}` : null,
    };

    try {
      // 3. Extract the bearer token saved during Login/Register
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/orders/checkout",
        orderPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // 4. Order created successfully! Set confirmation state and purge local storage cart array
      setOrderConfirmation(response.data);
      clearCart();
    } catch (error) {
      console.error("Checkout execution dropped:", error);
      setErrorMessage(
        error.response?.data?.error ||
          "An unexpected error occurred while placing your order.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        {/* SUCCESS STATE VIEW PANEL */}
        {orderConfirmation ? (
          <div className="max-w-xl mx-auto my-16 p-8 bg-white border border-slate-200 rounded-2xl shadow-sm text-center">
            <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-brand-black mb-2">
              Order Confirmed!
            </h2>
            <p className="text-slate-600 mb-6">
              Your order has been safely registered in our repository, and stock
              allocations are locked.
            </p>

            {/* SECURE CODE DELIVERY CONTAINER */}
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 mb-6">
              <span className="text-xs uppercase font-bold tracking-wider text-slate-400 block mb-1">
                Fulfillment Delivery Pin
              </span>
              <span className="text-3xl font-mono font-bold text-brand-orange tracking-widest">
                {orderConfirmation.deliveryVerificationCode}
              </span>
              <p className="text-xs text-slate-500 mt-3 px-4">
                Give this 6-digit code to the delivery driver when your package
                arrives to authorize handoff and complete the payment sequence.
              </p>
            </div>

            <div className="text-left border-t border-slate-100 pt-4 text-sm text-slate-600 space-y-1">
              <p>
                <strong className="text-brand-black">Order ID:</strong>{" "}
                {orderConfirmation.orderId || orderConfirmation.order?._id}
              </p>
              <p>
                <strong className="text-brand-black">
                  Grand Total Amount:
                </strong>{" "}
                ₦{getSubtotal().toLocaleString()}
              </p>
            </div>
          </div>
        ) : cart.length === 0 ? (
          /* EMPTY CART GUARD VIEW */
          <div className="max-w-7xl mx-auto my-16 px-4 text-center py-12">
            <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 font-medium text-lg">
              Your checkout desk is empty.
            </p>
            <p className="text-slate-400 text-sm mt-1">
              Add items to your cart before proceeding.
            </p>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-brand-black mb-8">
              Checkout Desk
            </h1>

            {errorMessage && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm flex items-start gap-3">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form
              onSubmit={handlePlaceOrder}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              {/* LEFT COLUMN: Shipping & Payment Info */}
              <div className="lg:col-span-7 space-y-6">
                {/* Shipping Address Subform */}
                <div className="bg-white p-6 border border-slate-200 rounded-xl space-y-4">
                  <h2 className="text-lg font-bold text-brand-black flex items-center gap-2">
                    <Truck className="w-5 h-5 text-brand-orange" /> Shipping
                    Destination
                  </h2>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                        Street Address
                      </label>
                      <input
                        type="text"
                        required
                        name="street"
                        value={shippingAddress.street}
                        onChange={handleInputChange}
                        placeholder="e.g. 45 Allen Avenue"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-brand-orange transition"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          required
                          name="city"
                          value={shippingAddress.city}
                          onChange={handleInputChange}
                          placeholder="e.g. Ikeja"
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-brand-orange transition"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                          State
                        </label>
                        <input
                          type="text"
                          required
                          name="state"
                          value={shippingAddress.state}
                          onChange={handleInputChange}
                          placeholder="e.g. Lagos"
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-brand-orange transition"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                        Postal/ZIP Code
                      </label>
                      <input
                        type="text"
                        required
                        name="postalCode"
                        value={shippingAddress.postalCode}
                        onChange={handleInputChange}
                        placeholder="e.g. 100001"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-brand-orange transition"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Selection Module */}
                <div className="bg-white p-6 border border-slate-200 rounded-xl space-y-4">
                  <h2 className="text-lg font-bold text-brand-black flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-brand-orange" />{" "}
                    Settlement Method
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* COD Option Selection Box */}
                    <label
                      className={`p-4 border rounded-xl flex items-center gap-3 cursor-pointer transition ${
                        paymentMethod === "cod"
                          ? "border-brand-orange bg-orange-50/20"
                          : "border-slate-200"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={paymentMethod === "cod"}
                        onChange={() => setPaymentMethod("cod")}
                        className="text-brand-orange focus:ring-0 accent-brand-orange"
                      />
                      <div>
                        <span className="block font-bold text-sm text-brand-black">
                          Cash on Delivery (COD)
                        </span>
                        <span className="block text-xs text-slate-500">
                          Pay cash upon verification code handoff.
                        </span>
                      </div>
                    </label>

                    {/* Card Option Selection Box */}
                    <label
                      className={`p-4 border rounded-xl flex items-center gap-3 cursor-pointer transition ${
                        paymentMethod === "card"
                          ? "border-brand-orange bg-orange-50/20"
                          : "border-slate-200"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={paymentMethod === "card"}
                        onChange={() => setPaymentMethod("card")}
                        className="text-brand-orange focus:ring-0 accent-brand-orange"
                      />
                      <div>
                        <span className="block font-bold text-sm text-brand-black">
                          Online Card Checkout
                        </span>
                        <span className="block text-xs text-slate-500">
                          Process instant balance validation.
                        </span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Real-Time Invoice Summary Breakout */}
              <div className="lg:col-span-5">
                <div className="bg-white p-6 border border-slate-200 rounded-xl space-y-4 sticky top-6">
                  <h2 className="text-lg font-bold text-brand-black pb-2 border-b border-slate-100">
                    Invoice Items Summary
                  </h2>

                  {/* Scrollable list mapping items */}
                  <div className="max-h-60 overflow-y-auto space-y-3 pr-2">
                    {cart.map((item) => (
                      <div
                        key={item._id || item.id}
                        className="flex justify-between items-center text-sm"
                      >
                        <div>
                          <span className="font-medium text-slate-800 block">
                            {item.name}
                          </span>
                          <span className="text-xs text-slate-500">
                            Qty: {item.quantity} × ₦
                            {item.price.toLocaleString()}
                          </span>
                        </div>
                        <span className="font-semibold text-brand-black">
                          ₦{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-slate-100 pt-4 space-y-2">
                    <div className="flex justify-between text-sm text-slate-600">
                      <span>Shipping Logistics</span>
                      <span className="font-medium text-emerald-600">
                        Free Delivery
                      </span>
                    </div>
                    <div className="flex justify-between text-base font-bold text-brand-black pt-2 border-t border-slate-100">
                      <span>Grand Total</span>
                      <span>₦{getSubtotal().toLocaleString()}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-brand-orange text-white font-bold rounded-xl hover:bg-orange-600 transition shadow-sm disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting
                      ? "Processing Database Transaction..."
                      : "Confirm & Place Order"}
                  </button>
                </div>
              </div>
            </form>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
