import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full bg-slate-100 flex flex-col justify-between items-center py-6 px-4 overflow-y-auto">
      {/* Top Header Logo */}
      <div className="w-full max-w-md flex justify-start shrink-0 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-sm bg-brand-orange flex items-center justify-center font-bold text-white text-lg shadow-md shadow-brand-orange/20">
            G
          </div>
          <span className="font-bold tracking-tight text-lg text-brand-black">
            Gadget Store
          </span>
        </div>
      </div>

      {/* Centered Card Container */}
      <div className="w-full max-w-md bg-white border border-slate-200/80 rounded-sm shadow-xl shadow-slate-200/50 my-auto overflow-hidden shrink-0">
        <div className="p-6 sm:p-8">
          <h1 className="text-2xl font-extrabold tracking-tight text-center text-brand-black mb-6">
            Login
          </h1>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="text-xs font-semibold text-slate-700"
              >
                Email Address or Phone Number
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail size={16} />
                </span>
                <input
                  id="email"
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address or Phone Number"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-sm text-brand-black placeholder:text-slate-400 text-sm focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all shadow-sm"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-xs font-semibold text-slate-700"
                >
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-semibold text-brand-orange hover:text-orange-600 transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock size={16} />
                </span>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                  className="w-full pl-10 pr-12 py-3 bg-white border border-slate-200 rounded-sm text-brand-black placeholder:text-slate-400 text-sm focus:outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 transition-all shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs font-bold cursor-pointer text-slate-500 hover:text-slate-700 transition-colors"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 cursor-pointer bg-brand-orange text-white rounded-sm font-semibold hover:bg-orange-600 transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-brand-orange/25 active:scale-[0.99]"
            >
              {isLoading ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <span>Login</span>
              )}
            </button>
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
              <span className="text-slate-700">Login with Google</span>
            </button>
          </div>
        </div>

        {/* Bottom Card Footer inside the wrapper */}
        <div className="bg-slate-50/80 border-t border-slate-100 p-4 text-center">
          <p className="text-xs text-slate-500">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-brand-orange font-semibold hover:text-orange-600 transition-colors"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>

      <div className="h-4 shrink-0" />
    </div>
  );
};

export default Login;
