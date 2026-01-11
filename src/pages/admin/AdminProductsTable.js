"use client";

import { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import useMobileView from "@/hooks/useMobileView";

const ITEMS_PER_PAGE = 10;

export default function AdminProductsTable({
  filteredProducts,
  editHandler,
  handleDelete,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const isMobile = useMobileView();

  const safeProducts = Array.isArray(filteredProducts)
    ? filteredProducts
    : [];

  const totalPages = Math.ceil(safeProducts.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = safeProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  function getFinalPrice(variant) {
    return variant.discount > 0
      ? Math.round(
          variant.price - (variant.price * variant.discount) / 100
        )
      : variant.price;
  }

  function getPriceRange(variants = []) {
     if (!Array.isArray(variants) || variants.length === 0) return "—";
    const prices = variants.map(getFinalPrice);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    return min === max ? `₹ ${min}` : `₹ ${min} – ${max}`;
  }

  /* ---------------- MOBILE CARD VIEW ---------------- */

  if (isMobile) {
    return (
      <div className="px-4 mt-10 space-y-4">
        {paginatedProducts.length === 0 && (
          <p className="text-center text-gray-500 py-10">
            No products found.
          </p>
        )}

        {paginatedProducts?.map((product) => (
          <div
            key={product._id}
            className="bg-white border rounded-xl p-4 shadow-sm"
          >
            <div className="flex gap-4">
              {/* Image */}
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={product?.images?.[0]?.url || ""}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 text-sm">
                  {product.name}
                </h3>

                <p className="text-xs text-gray-500 capitalize mt-1">
                  {product.category.replace("_", " ")}
                </p>

                <p className="text-brand font-medium mt-2">
                  {getPriceRange(product.variants)}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => editHandler(product._id)}
                className="flex items-center gap-1 px-3 py-2 border rounded-md text-sm"
              >
                <AiFillEdit size={16} />
                Edit
              </button>

              <button
                onClick={() => handleDelete(product._id)}
                className="flex items-center gap-1 px-3 py-2 border rounded-md text-sm text-red-600"
              >
                <MdDelete size={16} />
                Delete
              </button>
            </div>
          </div>
        ))}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center pt-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Prev
            </button>

            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    );
  }

  /* ---------------- DESKTOP TABLE VIEW ---------------- */

  return (
    <div className="px-10 mb-10 mt-10">
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b text-sm font-semibold text-gray-700">
          <div className="col-span-2">Image</div>
          <div className="col-span-4">Name</div>
          <div className="col-span-3">Category</div>
          <div className="col-span-1">Price</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {paginatedProducts.length === 0 && (
          <div className="px-6 py-14 text-center text-gray-500">
            No products found.
          </div>
        )}

        {paginatedProducts.map((product) => (
          <div
            key={product._id}
            className="grid grid-cols-12 gap-4 px-6 py-4 items-center border-b hover:bg-gray-50"
          >
            <div className="col-span-2">
              <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={product?.images?.[0].url || ""}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="col-span-4 font-medium">
              {product.name}
            </div>

            <div className="col-span-3 capitalize text-gray-600">
              {product.category}
            </div>

            <div className="col-span-1 font-medium">
              {getPriceRange(product.variants)}
            </div>

            <div className="col-span-2 flex justify-end gap-3">
              <button
                onClick={() => editHandler(product._id)}
                className="p-2 border rounded hover:bg-gray-100 cursor-pointer"
              >
                <AiFillEdit size={18} />
              </button>

              <button
                onClick={() => handleDelete(product._id)}
                className="p-2 border rounded text-red-600 hover:bg-red-50 cursor-pointer"
              >
                <MdDelete size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
