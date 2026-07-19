import React from "react";
import ProductCard from "./ProductCard";

const PopularProducts = () => {
  const products = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `Smartphone ${i + 1}`,
    price: 1050000 + i * 5000,
    oldPrice: 1200000 + i * 5000,
  }));

  return (
    <section className="py-12 px-4 md:px-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-brand-black mb-8">
        Popular Products
      </h2>
      {/* Grid optimized for responsive fluid behavior */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-0 border-l border-t border-slate-200">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default PopularProducts;
