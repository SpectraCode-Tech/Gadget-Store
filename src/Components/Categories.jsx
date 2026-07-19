import React from "react";
import { Smartphone, Laptop, Headphones } from "lucide-react";

const Categories = () => {
  const mainCategories = [
    { name: "Phones", icon: <Smartphone className="w-8 h-8 text-blue-600" /> },
    { name: "Laptops", icon: <Laptop className="w-8 h-8 text-blue-600" /> },
    {
      name: "Accessories",
      icon: <Headphones className="w-8 h-8 text-blue-600" />,
    },
  ];

  const featuredCategories = [
    { name: "New Arrivals", color: "bg-blue-600" },
    { name: "Best Sellers", color: "bg-orange-500" },
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
        Explore Categories
      </h2>

      {/* Main Categories Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {mainCategories.map((cat, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center p-8 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-500 transition-all cursor-pointer group"
          >
            <div className="mb-3 group-hover:scale-110 transition-transform duration-200">
              {cat.icon}
            </div>
            <span className="text-sm font-semibold text-gray-800">
              {cat.name}
            </span>
          </div>
        ))}
      </div>

      {/* Featured Rectangles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {featuredCategories.map((feat, idx) => (
          <div
            key={idx}
            className={`${feat.color} text-white p-10 rounded-2xl flex items-center justify-center text-xl font-bold shadow-lg hover:brightness-110 transition-all cursor-pointer`}
          >
            {feat.name}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
