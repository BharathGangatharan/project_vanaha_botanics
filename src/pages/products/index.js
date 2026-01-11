"use client";

import React, { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { FaSearch } from "react-icons/fa";
import { useSearchParams } from "next/navigation";

/* ---------------- Skeleton ---------------- */
function ProductSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm animate-pulse">
      <div className="h-[200px] bg-gray-200 rounded-xl mb-4" />
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
    </div>
  );
}

/* ---------------- Tabs ---------------- */
const TABS = [
  { key: "skin_care", label: "Skin Care" },
  { key: "hair_care", label: "Hair Care" },
  { key: "eco_friendly", label: "Eco-Friendly" },
];

const AllProducts = () => {
  const searchParams = useSearchParams();

  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("skin_care");
  const [search, setSearch] = useState("");

  /* -------- Read category from URL -------- */
  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    if (TABS.some((t) => t.key === categoryFromUrl)) {
      setActiveTab(categoryFromUrl);
    }
  }, [searchParams]);

  /* -------- Fetch products -------- */
  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/admin/products`
        );
        const data = await res.json();
        if (res.ok) setAllProducts(data.products || []);
      } catch (err) {
        console.error("Fetch failed:", err);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  /* -------- Filter products -------- */
  const filteredProducts = allProducts
    .filter((p) => p.category === activeTab)
    .filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );


  return (
    <div className="bg-[#FAFAF7] py-20">
      <div className="max-w-[1000px] mx-auto px-6">

        {/* ---------- Title ---------- */}
        <h2 className="text-center text-[30px] md:text-5xl font-cormorant text-brand">
          Our Products
        </h2>
        <p className="text-center text-muted mt-2 mb-12">
          Rooted in nature, crafted with care
        </p>

        {/* ---------- Tabs ---------- */}
        <div className="flex justify-center gap-8 mb-8">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key);
                setSearch("");
              }}
              className={`pb-2 text-[16px] md:text-base font-medium transition
                ${
                  activeTab === tab.key
                    ? "text-brand border-b-2 border-brand"
                    : "text-muted hover:text-brand"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ---------- Search ---------- */}
        <div className="max-w-md mx-auto mb-14 relative">
          <FaSearch
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-sage"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search ${
              TABS.find((t) => t.key === activeTab)?.label
            } products...`}
            className="
              w-full
              pl-12 pr-5 py-3
              rounded-full
              border border-[#E6ECE8]
              bg-white
              text-sm
              focus:outline-none
              focus:ring-2 focus:ring-sage
            "
          />
        </div>

        {/* ---------- Products ---------- */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <ProductCard filteredProducts={filteredProducts} />
        ) : (
          <div className="bg-white rounded-2xl py-14 text-center shadow-sm">
            <p className="text-lg font-medium text-brand">
              No products found
            </p>
            <p className="text-sm text-muted mt-2">
              Try a different keyword or explore another category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;