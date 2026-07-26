import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  ArrowRight,
  ArrowLeft,
  Check,
  X,
  Eye,
  EyeOff,
} from "lucide-react";
import { Link } from "react-router-dom";

const Register = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (step === 1 && (!formData.firstName || !formData.lastName)) return;
    if (step === 2 && (!formData.email || !formData.gender)) return;
    setStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  const passwordsMatch =
    formData.password && formData.password === formData.confirmPassword;

  return (
    <div className="min-h-screen w-full bg-slate-100 flex flex-col justify-between items-center py-6 px-4 overflow-y-auto">
      {/* Top Header Logo */}
      <Link to="/" className="w-full max-w-md flex justify-start shrink-0 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-sm bg-brand-orange flex items-center justify-center font-bold text-white text-lg shadow-md shadow-brand-orange/20">
            G
          </div>
          <span className="font-bold tracking-tight text-lg text-brand-black">
            Gadget Store
          </span>
        </div>
      </Link>

      {/* Centered Card Container */}
      <div className="w-full max-w-md bg-white border border-slate-200/80 rounded-sm shadow-xl shadow-slate-200/50 my-auto overflow-hidden shrink-0">
        <div className="p-6 sm:p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-extrabold tracking-tight text-center text-brand-black mb-1">
              Create Account
            </h1>
            <p className="text-xs font-semibold text-center text-slate-400 uppercase tracking-wider">
              Step {step} of 3
            </p>
          </div>

          <form
            onSubmit={step === 3 ? handleSubmit : handleNext}
            className="space-y-4"
          >
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div className="space-y-1.5">
                    <label
                      htmlFor="firstName"
                      className="text-xs font-semibold text-slate-700"
                    >
                      First Name
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <User size={16} />
                      </span>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Enter First Name"
                        className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-sm text-brand-black placeholder:text-slate-400 text-sm focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="lastName"
                      className="text-xs font-semibold text-slate-700"
                    >
                      Last Name
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <User size={16} />
                      </span>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Enter Last Name"
                        className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-sm text-brand-black placeholder:text-slate-400 text-sm focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all shadow-sm"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 py-3 cursor-pointer bg-brand-orange text-white rounded-sm font-semibold hover:bg-orange-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-orange/25 active:scale-[0.99]"
                  >
                    <span>Next</span>
                    <ArrowRight size={16} />
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div className="space-y-1.5">
                    <label
                      htmlFor="email"
                      className="text-xs font-semibold text-slate-700"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Mail size={16} />
                      </span>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@example.com"
                        className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-sm text-brand-black placeholder:text-slate-400 text-sm focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="gender"
                      className="text-xs font-semibold text-slate-700"
                    >
                      Gender
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      required
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-sm text-brand-black text-sm focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all shadow-sm"
                    >
                      <option value="" disabled>
                        Select Gender
                      </option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="prefer-not-to-say">
                        Prefer not to say
                      </option>
                    </select>
                  </div>

                  <div className="flex gap-2 mt-2">
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="w-1/3 py-3 cursor-pointer border border-slate-200 bg-white text-slate-700 rounded-sm font-semibold hover:bg-slate-50 transition-all flex items-center justify-center gap-2 shadow-sm"
                    >
                      <ArrowLeft size={16} />
                      <span>Back</span>
                    </button>
                    <button
                      type="submit"
                      className="w-2/3 py-3 cursor-pointer bg-brand-orange text-white rounded-sm font-semibold hover:bg-orange-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-orange/25 active:scale-[0.99]"
                    >
                      <span>Next</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div className="space-y-1.5">
                    <label
                      htmlFor="password"
                      className="text-xs font-semibold text-slate-700"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Lock size={16} />
                      </span>
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        required
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter Password"
                        className="w-full pl-10 pr-10 py-3 bg-white border border-slate-200 rounded-sm text-brand-black placeholder:text-slate-400 text-sm focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        {showPassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="confirmPassword"
                      className="text-xs font-semibold text-slate-700"
                    >
                      Confirm Password
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Lock size={16} />
                      </span>
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm Password"
                        className="w-full pl-10 pr-16 py-3 bg-white border border-slate-200 rounded-sm text-brand-black placeholder:text-slate-400 text-sm focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all shadow-sm"
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center gap-1.5">
                        {formData.confirmPassword && (
                          <span className="pointer-events-none flex items-center">
                            {passwordsMatch ? (
                              <Check size={16} className="text-emerald-500" />
                            ) : (
                              <X size={16} className="text-red-500" />
                            )}
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="text-slate-400 hover:text-slate-600 cursor-pointer"
                        >
                          {showConfirmPassword ? (
                            <EyeOff size={16} />
                          ) : (
                            <Eye size={16} />
                          )}
                        </button>
                      </div>
                    </div>
                    {formData.confirmPassword && !passwordsMatch && (
                      <p className="text-[11px] text-red-500 font-medium">
                        Passwords do not match
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2 mt-2">
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="w-1/3 py-3 cursor-pointer border border-slate-200 bg-white text-slate-700 rounded-sm font-semibold hover:bg-slate-50 transition-all flex items-center justify-center gap-2 shadow-sm"
                    >
                      <ArrowLeft size={16} />
                      <span>Back</span>
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading || !passwordsMatch}
                      className="w-2/3 py-3 cursor-pointer bg-brand-orange text-white rounded-sm font-semibold hover:bg-orange-600 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-brand-orange/25 active:scale-[0.99]"
                    >
                      {isLoading ? (
                        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <span>Sign Up</span>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>

          {/* Divider */}
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <span className="relative px-3 bg-white mx-auto text-[11px] uppercase font-bold text-slate-400 tracking-wider block w-fit">
              OR
            </span>
          </div>

          {/* Social Buttons */}
          <div className="space-y-3">
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-slate-200 rounded-sm cursor-pointer hover:bg-slate-50 font-semibold text-sm transition-all focus:ring-2 focus:ring-slate-200 outline-none shadow-sm"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.33 0 3.323 2.694 1.412 6.621l3.854 3.144Z"
                />
                <path
                  fill="#4285F4"
                  d="M23.513 12.245c0-.825-.074-1.62-.21-2.386H12v4.51h6.46c-.279 1.481-1.115 2.73-2.37 3.573l3.69 2.862c2.158-1.99 3.402-4.919 3.402-8.559Z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.266 14.235A7.014 7.014 0 0 1 4.909 12c0-.783.128-1.537.357-2.235L1.412 6.621A11.956 11.956 0 0 0 0 12c0 1.92.454 3.734 1.261 5.35l4.005-3.115Z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.956-1.075 7.941-2.916l-3.69-2.862c-1.022.686-2.33 1.096-4.251 1.096-3.27 0-6.046-2.21-7.037-5.184l-3.882 3.01A11.957 11.957 0 0 0 12 24Z"
                />
              </svg>
              <span className="text-slate-700">Continue with Google</span>
            </button>
          </div>
        </div>

        {/* Bottom Card Footer inside the wrapper */}
        <div className="bg-slate-50/80 border-t border-slate-100 p-4 text-center">
          <p className="text-xs text-slate-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-brand-orange font-semibold hover:text-orange-600 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>

      <div className="h-4 shrink-0" />
    </div>
  );
};

export default Register;
