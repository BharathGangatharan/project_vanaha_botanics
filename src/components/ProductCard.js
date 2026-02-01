"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Get the variant with the lowest FINAL price (after discount)
const getLowestPricedVariant = (variants = []) => {
  if (!variants.length) return null;

  return variants.reduce((lowest, v) => {
    const finalPrice =
      v.discount > 0 ? v.price - (v.price * v.discount) / 100 : v.price;

    const lowestFinal =
      lowest.discount > 0
        ? lowest.price - (lowest.price * lowest.discount) / 100
        : lowest.price;

    return finalPrice < lowestFinal ? v : lowest;
  });
};

const ProductCard = ({ filteredProducts }) => {
  const router = useRouter();

  if (!filteredProducts?.length) {
    return (
      <p className="text-center text-gray-500 mt-10">No products found.</p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {filteredProducts.map((product) => {
        const lowestVariant = getLowestPricedVariant(product.variants);
        if (!lowestVariant) return null;

        const discountValue = Number(lowestVariant.discount || 0);
        const hasDiscount = discountValue > 0;
        const finalPrice = hasDiscount
          ? Math.round(
              lowestVariant.price -
                (lowestVariant.price * lowestVariant.discount) / 100
            )
          : lowestVariant.price;

        return (
          <div
            key={product._id}
            onClick={() => router.push(`/products/${product.slug}`)}
            className="
              group cursor-pointer
              bg-[#FAFAF7]
              rounded-2xl
              overflow-hidden
              shadow-[0_8px_30px_rgba(47,93,80,0.08)]
              hover:shadow-[0_18px_40px_rgba(47,93,80,0.14)]
              hover:-translate-y-1
              transition-all duration-300
            "
          >
            {/* IMAGE */}
            <div className="relative bg-white rounded-2xl p-6">
              {/* DISCOUNT BADGE */}
              {hasDiscount && (
                <span
                  className="
                    absolute top-4 left-4
                    z-20
                    bg-[#2F5D50]/90 backdrop-blur-sm
                    text-white text-[11px]
                    font-semibold tracking-wide
                    px-2.5 py-1
                    rounded-full
                "
                >
                  {discountValue}% OFF
                </span>
              )}

              {/* IMAGE WRAPPER */}
              <div className="relative aspect-square w-full flex items-center justify-center z-10">
                <Image
                  src={product?.images?.[0]?.url || "/placeholder.png"}
                  alt={product.name}
                  fill
                  className="
        object-contain
        transition-transform duration-300
        group-hover:scale-105
      "
                />
              </div>
            </div>

            {/* CONTENT */}
            <div className="p-6 text-center">
              <h3 className="text-lg font-semibold text-[#1F2933]">
                {product.name}
              </h3>

              <p className="text-sm text-[#6B7280] mt-1 line-clamp-2">
                {product.shortDescription}
              </p>

              <div className="mt-3 flex items-center justify-center gap-2">
                {hasDiscount && (
                  <span className="text-sm text-gray-400 line-through">
                    ₹{lowestVariant.price}
                  </span>
                )}

                <span className="text-lg font-semibold text-[#2F5D50]">
                  ₹{finalPrice}
                </span>
              </div>

              <span className="mt-4 inline-block text-[16px] md:text-sm text-[#2F5D50] group-hover:underline">
                Explore →
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductCard;
