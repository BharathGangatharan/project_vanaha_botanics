"use client";

import { useEffect, useMemo, useState } from "react";
import Modal from "@/components/modal/Modal";
import AddNewItem from "@/components/admin/AddNewItem";
import SpinnerOverlay from "@/components/spinner/SpinnerOverlay";
import { CiSettings } from "react-icons/ci";
import SettingsModal from "@/components/admin/SettingsModal";
import AdminPasswordPopup from "@/components/admin/AdminPasswordPopup";
import AdminProductsTable from "./AdminProductsTable";

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [editItem, setEditItem] = useState(null);
  const [open, setOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [accessGranted, setAccessGranted] = useState(false);
  

  const editHandler = (id) => {
    const selectEditedProduct = products.find((p) => p._id === id);
    if (selectEditedProduct) {
      setEditItem(selectEditedProduct);
      setOpen(true);
    }
  };

  const filteredProducts = useMemo(() => {
    if (!searchQuery) return products;

    return products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  async function handleDelete(id) {
    if (!confirm("Delete product?")) return;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/products?id=${id}`,
      {
        method: "DELETE",
      }
    );
    if (res.ok) setProducts((p) => p.filter((x) => x._id !== id));
  }

    useEffect(() => {
      async function loadProducts() {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/admin/products`
          );
          const data = await res.json();
          if (res.ok) {
            setProducts(data.products || []);
          }
        } catch (err) {
          console.error("Fetch failed:", err);
        }
        setLoading(false);
      }
      setLoading(true);
      loadProducts();
    }, [accessGranted]);

  if (!accessGranted) {
  return (
    <AdminPasswordPopup
      correctPassword={"admin@#123"}
      onSuccess={() => setAccessGranted(true)}
    />
  );
}

  return (
    <>
      <SpinnerOverlay show={loading} />

      <div className="min-h-screen bg-bg">
        <div className="sticky top-[100px] md:top-[100px] z-40 shadow-sm bg-white">
          <div className="flex flex-col md:flex-row justify-between md:items-center p-4">
            <h1 className="text-2xl font-semibold mb-3 md:mb-0">
              Admin — Products
            </h1>
            <div className="mr-4 flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
                placeholder="Search for products"
                className="w-[200px] md:w-[550px] p-2 border border-navyDark bg-amber-50 mr-4 rounded-md placeholder:text-black"
              />
              <button
                onClick={() => {
                  setEditItem(null);
                  setOpen(true);
                }}
                className="px-4 py-2 bg-navyDark text-white rounded-md cursor-pointer mr-1"
              >
                Add Item
              </button>
              <button
                onClick={() => setSettingsOpen(true)}
                className="px-2 py-2 text-white rounded-md cursor-pointer mr-3 md:ml-3"
              >
                <CiSettings color="#000" size={30} />
              </button>
            </div>
          </div>
        </div>
        <AdminProductsTable
          filteredProducts={filteredProducts}
          editHandler={editHandler}
          handleDelete={handleDelete}
        />
      </div>

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title={editItem ? "Edit Product" : "Add New Product"}
      >
        <AddNewItem
          setOpen={setOpen}
          editItem={editItem}
          setProducts={setProducts}
        />
      </Modal>
      <SettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </>
  );
}
