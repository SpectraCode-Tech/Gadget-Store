import React from "react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        {/* Branding - Spans full width on mobile, 2 columns on small tablets */}
        <div className="sm:col-span-2 lg:col-span-1">
          <h2 className="text-2xl font-bold text-white mb-4 tracking-tight">
            Sentinel.
          </h2>
          <p className="text-sm leading-relaxed max-w-xs">
            Your premium destination for the latest mobile technology.
            Authenticity and quality guaranteed.
          </p>
        </div>

        {/* Links - Responsive Stacking */}
        <div className="flex flex-col">
          <h4 className="font-bold text-white mb-4">Shop</h4>
          <ul className="space-y-3 text-sm">
            {["New Arrivals", "Smartphones", "Accessories"].map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="hover:text-brand-orange transition-colors"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col">
          <h4 className="font-bold text-white mb-4">Support</h4>
          <ul className="space-y-3 text-sm">
            {["Order Status", "Shipping Policy", "Returns"].map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="hover:text-brand-orange transition-colors"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter - Full width on small screens for better input usability */}
        <div className="sm:col-span-2 lg:col-span-1">
          <h4 className="font-bold text-white mb-4">Newsletter</h4>
          <p className="text-xs mb-4 text-slate-400">
            Get the latest deals and tech updates.
          </p>
          <div className="flex bg-slate-800 rounded-lg overflow-hidden border border-slate-700 focus-within:border-brand-orange transition-colors">
            <input
              type="email"
              placeholder="Email address"
              className="bg-transparent p-3 text-sm w-full focus:outline-none text-white placeholder-slate-500"
            />
            <button className="bg-brand-orange hover:bg-orange-600 text-white px-5 font-bold text-sm transition-colors">
              Join
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
        <p>© {new Date().getFullYear()} Sentinel. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition">
            Privacy
          </a>
          <a href="#" className="hover:text-white transition">
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
