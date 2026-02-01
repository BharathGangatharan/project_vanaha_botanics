import React from "react";
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";

const Breadcrumb = ({ product }) => {
  const CATEGORY_MAP = {
    skin_care: {
      label: "Skin Care",
      href: "/products?category=skin_care",
    },
    hair_care: {
      label: "Hair Care",
      href: "/products?category=hair_care",
    },
    eco_friendly: {
      label: "Eco-Friendly",
      href: "/products?category=eco_friendly",
    },
  };

  const category = CATEGORY_MAP[product.category];

  return (
    <div className="bg-white/70 backdrop-blur-sm border-b border-[#E6ECE8]">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <nav className="flex items-center flex-wrap text-[14px] md:text-[15px] text-gray-600 gap-1">
          <Link
            href="/"
            className="hover:text-[#2F5D50] transition font-medium"
          >
            Home
          </Link>

          <FiChevronRight className="text-gray-400" />

          {category && (
            <>
              <Link
                href={category.href}
                className="hover:text-[#2F5D50] transition font-medium"
              >
                {category.label}
              </Link>

              <FiChevronRight className="text-gray-400" />
            </>
          )}

          <span className="text-[#2F5D50] font-semibold truncate max-w-[240px]">
            {product.name}
          </span>
        </nav>
      </div>
    </div>
  );
};

export default Breadcrumb;