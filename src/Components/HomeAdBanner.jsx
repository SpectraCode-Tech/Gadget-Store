import React from "react";
import { Smartphone } from "lucide-react";

const HomeAdBanner = () => {
  return (
    <section className="flex-1 p-6 h-full">
      <div className="relative w-full h-full rounded-2xl overflow-hidden bg-brand-blue shadow-lg flex flex-col justify-end p-8 text-brand-white">
        {/* Decorative Lucide Icon */}
        <div className="absolute -top-10 -right-10 p-12 opacity-20">
          <Smartphone className="w-64 h-64" strokeWidth={1} />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <span className="bg-brand-orange text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Limited Time
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-2">
            Summer Tech Sale
          </h2>
          <p className="text-brand-white/80 mb-6 text-lg">
            Up to 30% off on all the latest flagship smartphones.
          </p>

          <button className="bg-brand-white text-brand-blue font-bold px-8 py-3 rounded-lg hover:bg-slate-100 transition shadow-lg">
            Shop Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default HomeAdBanner;
