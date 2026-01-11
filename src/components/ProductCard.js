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
    <div className="w-[400px] gap-2 max-h-[600px]">

      {filteredProducts.map((product) => {
        const lowestVariant = getLowestPricedVariant(product.variants);

        if (!lowestVariant) return null;

        const hasDiscount = lowestVariant.discount > 0;

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
            <div className="relative h-[220px] bg-white flex items-center justify-center">
              {hasDiscount && (
                <span
                  className="
                    absolute top-3 left-3
                    bg-[#2F5D50] text-white
                    text-xs font-semibold
                    px-3 py-1 rounded-full
                  "
                >
                  {lowestVariant.discount}% OFF
                </span>
              )}

              <Image
                src={product?.images[0]?.url}
                alt={product.name}
                fill
                className="
                  object-contain p-6
                  drop-shadow-md
                  transition-transform duration-300
                  group-hover:scale-105
                "
              />
            </div>

            {/* CONTENT */}
            <div className="p-6 text-center">
              <h3 className="text-lg font-semibold text-[#1F2933]">
                {product.name}
              </h3>

              <p className="text-sm text-[#6B7280] mt-1 line-clamp-2">
                {product.shortDescription}
              </p>

              {/* PRICE */}
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

              {/* CTA */}
              <span
                className="
                  mt-4 inline-block
                  text-sm text-[#2F5D50]
                  underline-offset-4
                  group-hover:underline
                "
              >
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
