import React from "react";
import { Smartphone, ArrowRight, Zap } from "lucide-react";

const HomeAdBanner = () => {
  return (
    <section className="flex-1 p-4 md:p-6 h-full">
      <div className="relative w-full h-full rounded-3xl overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 shadow-2xl flex flex-col md:flex-row items-center">
        {/* Decorative glow elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

        {/* Text Content */}
        <div className="relative z-10 flex-1 p-8 md:p-14 text-white">
          <div className="inline-flex items-center gap-2 bg-orange-500 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-5 shadow-lg shadow-orange-500/30">
            <Zap className="w-3.5 h-3.5" fill="white" />
            Limited Time Offer
          </div>

          <h2 className="text-4xl md:text-6xl font-extrabold mb-3 leading-[1.05]">
            Summer
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-orange-500">
              Tech Sale
            </span>
          </h2>

          <p className="text-blue-100/90 mb-8 text-base md:text-lg font-medium leading-relaxed max-w-md">
            Get up to <span className="text-white font-bold">30% off</span> on
            flagship phones, laptops, and accessories — this week only.
          </p>

          <button className="group relative bg-white text-blue-900 font-bold px-7 py-4 rounded-xl hover:shadow-xl hover:shadow-black/20 transition-all duration-300 hover:scale-[1.03] active:scale-95 flex items-center gap-2.5 w-fit">
            Shop The Sale
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Product Spotlight / Visual Side */}
        <div className="relative z-10 hidden md:flex flex-1 h-full items-center justify-center p-10">
          <div className="relative flex items-center justify-center">
            {/* Radial glow behind the "product" */}
            <div className="absolute w-72 h-72 bg-gradient-to-br from-orange-400/30 to-blue-400/20 rounded-full blur-2xl" />

            {/* Discount badge */}
            <div className="absolute -top-4 -right-2 z-20 bg-orange-500 text-white font-extrabold text-2xl w-20 h-20 rounded-full flex flex-col items-center justify-center shadow-xl shadow-orange-500/40 rotate-12 border-4 border-blue-900">
              <span className="text-2xl leading-none">30%</span>
              <span className="text-[10px] font-bold uppercase tracking-wide">
                off
              </span>
            </div>

            {/* Device icon as placeholder visual */}
            <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-[2rem] p-10">
              <Smartphone className="w-28 h-28 text-white/90" strokeWidth={1} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeAdBanner;
