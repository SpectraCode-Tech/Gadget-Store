import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

const PopularProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Hits the Public view route we registered on the backend
    axios
      .get("http://localhost:5000/products/all?limit=20")
      .then((res) => {
        // Safe mapping to extract the array out of the paginated metadata envelope
        setProducts(res.data.products || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Database sync error:", err);
        setError("Failed to load products from marketplace repository.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="py-12 text-center text-slate-500 font-medium">
        Syncing with backend inventory pipeline...
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 text-center text-red-500 font-medium">{error}</div>
    );
  }

  return (
    <section className="py-12 px-4 md:px-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-brand-black mb-8">
        Popular Products
      </h2>

      {products.length === 0 ? (
        <p className="text-slate-500 text-center py-6">
          No active product stock cataloged in database.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-0 border-l border-t border-slate-200">
          {products.map((product) => (
            // Fallback unique key check mapping to MongoDB native identifiers
            <ProductCard key={product._id || product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};

export default PopularProducts;
