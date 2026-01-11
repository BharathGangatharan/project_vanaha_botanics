"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

import HairCareBg from "../../public/images/vana_bg/skincare_bg.jpg";
import SkincareBg from "../../public/images/vana_bg/haircare_bg_2.jpg";
import EcoFriendlyBg from "../../public/images/vana_bg/ecofriendly_bg.jpg";

const containerVariants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const ProductSection = () => {
  const router = useRouter();

  const mainProducts = [
    {
      id: 1,
      name: "Skin Care",
      bgImage: SkincareBg,
      slug: "skin_care",
    },
    {
      id: 2,
      name: "Hair Care",
      bgImage: HairCareBg,
      slug: "hair_care",
    },
    {
      id: 3,
      name: "Eco Friendly",
      bgImage: EcoFriendlyBg,
      slug: "eco_friendly",
    },
  ];

  return (
    <div className="py-10 md:py-20 bg-[#F7F9F6]">
      {/* Title */}
      <motion.h2
        className="text-[30px] md:text-5xl font-cormorant font-bold text-center text-brand tracking-wide mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        — Featured Products —
      </motion.h2>

      {/* Product Grid */}
      <motion.div
        className="px-5 md:px-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {mainProducts.map((p) => (
          <motion.div
            key={p.id}
            variants={cardVariants}
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="cursor-pointer"
            onClick={() => router.push(`/products?category=${p.slug}`)}
          >
            <div className="relative overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-[0_20px_40px_rgba(47,93,80,0.18)] transition-all duration-300">

              {/* Image */}
              <div className="relative w-full h-[260px]">
                <Image
                  src={p.bgImage}
                  alt={p.name}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity" />

              {/* Title */}
              <div className="p-5">
                <h3 className="text-[18px] md:text-2xl font-inter font-semibold text-center text-brand tracking-wide">
                  {p.name}
                </h3>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ProductSection;