"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import Head from "next/head";

export default function ProductDetailPage() {
  const router = useRouter();
  const { slug } = router.query;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    if (!slug) return;

    async function fetchProduct() {
      const res = await fetch(`/api/products/${slug}`);
      const data = await res.json();
      if (res.ok) setProduct(data.product);
      setLoading(false);
    }

    fetchProduct();
  }, [slug]);

  if (loading) return <div className="h-screen grid place-items-center">Loading...</div>;
  if (!product) return <div className="h-screen grid place-items-center">Product not found</div>;

  const variant = product.variants[selectedVariantIndex];

  const finalPrice =
    variant.discount > 0
      ? Math.round(variant.price - (variant.price * variant.discount) / 100)
      : variant.price;

  const images = product.images?.length
    ? product.images
    : [{ url: product.imageUrl }]; // fallback

  return (
    <div className="bg-[#F7F9F6] min-h-screen mt-20">
      <Head>
        <title>{product.name} | Vanaha Botanics</title>
        <meta name="description" content={product.shortDescription} />
      </Head>

      <div className="max-w-6xl mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* ---------------- IMAGE GALLERY ---------------- */}
        <div>
          <div className="relative bg-white rounded-2xl shadow overflow-hidden group">
            <div className="relative h-[420px]">
              <Image
                src={images[activeImageIndex].url}
                alt={product.name}
                fill
                className="object-contain p-6 transition-transform duration-300 group-hover:scale-110"
              />
            </div>

            {variant.discount > 0 && (
              <span className="absolute top-4 left-4 bg-green-700 text-white text-xs px-3 py-1 rounded-full">
                {variant.discount}% OFF
              </span>
            )}
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3 mt-4">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setActiveImageIndex(index)}
                className={`w-16 h-16 border rounded-lg overflow-hidden
                  ${
                    index === activeImageIndex
                      ? "border-green-700"
                      : "border-gray-200"
                  }`}
              >
                <Image
                  src={img.url}
                  alt=""
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </button>
            ))}
          </div>

          <p className="text-xs text-gray-500 mt-2">Hover image to zoom</p>
        </div>

        {/* ---------------- PRODUCT DETAILS ---------------- */}
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">
            {product.name}
          </h1>

          <p className="text-gray-600 mt-2">{product.shortDescription}</p>

          {/* PRICE */}
          <div className="mt-6 flex items-center gap-3">
            {variant.discount > 0 && (
              <span className="text-gray-400 line-through text-lg">
                ₹{variant.price}
              </span>
            )}
            <span className="text-3xl font-bold text-green-700">
              ₹{finalPrice}
            </span>
          </div>

          {/* VARIANTS */}
          <div className="mt-8">
            <p className="font-medium mb-3">Variant's Available</p>
            <div className="flex flex-wrap gap-3">
              {product.variants.map((v, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedVariantIndex(index)}
                  className={`px-4 py-2 rounded-lg border text-sm transition text-capitalize
                    ${
                      index === selectedVariantIndex
                        ? "border-green-700 bg-green-50 text-green-800"
                        : "border-gray-300 hover:border-green-400"
                    }`}
                >
                  {v.size} {v.color ? "•" : ""} {v.color}
                </button>
              ))}
            </div>
          </div>

          {/* CTA */}
          <a
            href={`https://wa.me/919080365438?text=Hi, I am interested in ${product.name} (${variant.size} - ${variant.color})`}
            target="_blank"
            className="block mt-10 bg-green-700 text-white py-3 rounded-xl text-center hover:bg-green-800 transition"
          >
            Enquire on WhatsApp
          </a>
        </div>
      </div>

      {/* ---------------- DETAILS SECTION ---------------- */}
      <div className="max-w-5xl mx-auto px-4 pb-24 space-y-14">

        {product.description && (
          <section>
            <h3 className="text-xl font-semibold mb-4">Description</h3>
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </section>
        )}

        {product.ingredients?.length > 0 && (
          <section>
            <h3 className="text-xl font-semibold mb-4">Ingredients</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {product.ingredients.map((i, idx) => (
                <li key={idx}>{i}</li>
              ))}
            </ul>
          </section>
        )}

        {product.benefits?.length > 0 && (
          <section>
            <h3 className="text-xl font-semibold mb-4">Benefits</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {product.benefits.map((b, idx) => (
                <li key={idx}>{b}</li>
              ))}
            </ul>
          </section>
        )}

        {product.howToUse && (
          <section>
            <h3 className="text-xl font-semibold mb-4">How to Use</h3>
            <p className="text-gray-700 leading-relaxed">{product.howToUse}</p>
          </section>
        )}
      </div>
    </div>
  );
}