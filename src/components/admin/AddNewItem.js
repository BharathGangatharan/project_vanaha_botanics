"use client";

import { useEffect, useState } from "react";

/* ---------------- IMAGE UPLOAD ---------------- */

function MultiImageUpload({ images, setImages }) {
  const onFilesChange = (e) => {
    const files = Array.from(e.target.files);

    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <label className="font-semibold mb-2 block">Product Images</label>

      <div className="flex gap-3 flex-wrap">
        {images.map((img, index) => (
          <div
            key={index}
            className="relative w-32 h-32 border rounded overflow-hidden"
          >
            <img
              src={img.preview || img.url}
              className="w-full h-full object-cover"
              alt="preview"
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-1 right-1 bg-white rounded-full px-2 shadow"
            >
              ✕
            </button>
          </div>
        ))}

        <label className="w-32 h-32 border rounded flex items-center justify-center cursor-pointer bg-gray-50">
          <span className="text-gray-400 text-sm">Add Images</span>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={onFilesChange}
            className="hidden"
          />
        </label>
      </div>
    </div>
  );
}


/* ---------------- ADD / EDIT PRODUCT ---------------- */

export default function AddNewItem({ setOpen, editItem, setProducts }) {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");

    const [shortDesc, setShortDesc] = useState("");
    const [description, setDescription] = useState("");

    const [ingredients, setIngredients] = useState("");
    const [benefits, setBenefits] = useState("");
    const [howToUse, setHowToUse] = useState("");
    const [hasVariant, setHasVariant] = useState(false);
    const [variants, setVariants] = useState([
        { size: "", color: "", price: "", discount: "" },
    ]);


    const [images, setImages] = useState([]);

    const [loading, setLoading] = useState(false);

    /* ---------------- HELPERS ---------------- */

    function toDataUrl(file) {
        return new Promise((res, rej) => {
        const reader = new FileReader();
        reader.onload = (e) => res(e.target.result);
        reader.onerror = rej;
        reader.readAsDataURL(file);
        });
    }

    function refreshProducts() {
        fetch("/api/admin/products")
        .then((r) => r.json())
        .then((d) => setProducts(d.products || []));
    }

    /* ---------------- SUBMIT ---------------- */

    async function handleSubmit(e) {
        e.preventDefault();

        if (!name || !category) {
            alert("Product name and category are required");
            return;
        }

        //UPDATED VALIDATION (size & color optional)
        if (variants.some((v) => !v.price)) {
            alert("Each variant must have a price");
            return;
        }

        setLoading(true);

        try {
            /* ---------------- IMAGE UPLOAD ---------------- */

            const uploadedImages = [];

            for (const img of images) {
                // already uploaded image (edit mode)
                if (img.url && img.publicId) {
                    uploadedImages.push({
                    url: img.url,
                    publicId: img.publicId,
                    });
                    continue;
                }

                // new image
                if (img.file instanceof File) {
                    const dataUrl = await toDataUrl(img.file);

                    const r = await fetch("/api/admin/upload", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ dataUrl }),
                    });

                    const d = await r.json();

                    uploadedImages.push({
                        url: d.url,
                        publicId: d.publicId,
                    });
                }
            }

            /* ---------------- PAYLOAD ---------------- */

            const payload = {
                name,
                category,
                shortDescription: shortDesc,
                description,
                ingredients,
                benefits,
                howToUse,
                hasVariant,
                variants: variants.map((v) => ({
                    size: v.size?.trim() || "",
                    color: v.color?.trim() || "",
                    price: Number(v.price),
                    discount: Number(v.discount || 0),
                })),
                images: uploadedImages,
            };

            const res = await fetch("/api/admin/products", {
            method: editItem ? "PUT" : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(
                editItem ? { ...payload, id: editItem._id } : payload
            ),
            });

            if (!res.ok) {
                throw new Error("Failed to save product");
            }

            refreshProducts();
            setOpen(false);
        } catch (err) {
            console.error("SAVE ERROR:", err);
            alert(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }


  /* ---------------- EDIT PREFILL (CRITICAL FIX) ---------------- */

  useEffect(() => {
    if (!editItem) return;

    setName(editItem.name || "");
    setCategory(editItem.category || "");
    setShortDesc(editItem.shortDescription || "");
    setDescription(editItem.description || "");
    setIngredients((editItem.ingredients || []).join("\n"));
    setBenefits((editItem.benefits || []).join("\n"));
    setHowToUse(editItem.howToUse || "");
    setHasVariant(editItem.hasVariant || false);

    //NORMALIZE VARIANTS (THIS FIXES YOUR ERROR)
    setVariants(
      editItem.variants?.length
        ? editItem.variants.map((v) => ({
            size: v.size || "",
            color: v.color || "",
            price: v.price || "",
            discount: v.discount || "",
          }))
        : [{ size: "", color: "", price: "", discount: "" }]
    );

    setImages(
        (editItem.images || []).map((img) => ({
        url: img.url,
        publicId: img.publicId,
        preview: img.url,
        }))
    );
  }, [editItem]);

  /* ---------------- UI ---------------- */

  return (
    <div className="p-2 max-w-[800px] mx-auto">
      <div className="border rounded-lg bg-white">

        <form
          onSubmit={handleSubmit}
          className="space-y-5 max-h-[600px] overflow-y-auto p-4"
        >
          {/* PRODUCT NAME */}
          <label className="font-semibold mb-2 block">Product Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Product Name"
            className="w-full p-2 border rounded"
          />

          {/* CATEGORY */}
          <label className="font-semibold mb-2 block">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Category</option>
            <option value="skin_care">Skin Care</option>
            <option value="hair_care">Hair Care</option>
            <option value="eco_friendly">Eco Friendly</option>
          </select>

          {/* SHORT DESCRIPTION */}
          <label className="font-semibold mb-2 block">Short Description</label>
          <input
            value={shortDesc}
            onChange={(e) => setShortDesc(e.target.value)}
            placeholder="Short Description"
            className="w-full p-2 border rounded"
          />

          {/* DESCRIPTION */}
          <label className="font-semibold mb-2 block">Detailed Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Detailed Description"
            className="w-full p-2 border rounded"
          />

          {/* HAS VARIANTS */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={hasVariant}
              onChange={(e) => {
                const checked = e.target.checked;
                setHasVariant(checked);

                // If unchecked → keep only one variant
                if (!checked && variants.length > 1) {
                  setVariants([variants[0]]);
                }
              }}
            />
            <label className="font-semibold">
              This product has multiple variants
            </label>
          </div>

          {/* VARIANTS */}
          <div>
            <h3 className="font-semibold mb-2">Variants</h3>

            {variants.map((v, index) => (
              <div key={index} className="grid grid-cols-4 gap-2 mb-2">
                <input
                  placeholder="Size (optional)"
                  value={v.size}
                  onChange={(e) => {
                    const copy = [...variants];
                    copy[index].size = e.target.value;
                    setVariants(copy);
                  }}
                  className="p-2 border rounded"
                />

                <input
                  placeholder="Color (optional)"
                  value={v.color}
                  onChange={(e) => {
                    const copy = [...variants];
                    copy[index].color = e.target.value;
                    setVariants(copy);
                  }}
                  className="p-2 border rounded"
                />

                <input
                  type="number"
                  placeholder="Price"
                  required
                  value={v.price}
                  onChange={(e) => {
                    const copy = [...variants];
                    copy[index].price = e.target.value;
                    setVariants(copy);
                  }}
                  className="p-2 border rounded"
                />

                <input
                  type="number"
                  placeholder="Discount %"
                  min="0"
                  max="100"
                  value={v.discount}
                  onChange={(e) => {
                    const copy = [...variants];
                    copy[index].discount = e.target.value;
                    setVariants(copy);
                  }}
                  className="p-2 border rounded"
                />
              </div>
            ))}

            {/* ADD VARIANT BUTTON */}
            {hasVariant && (
              <button
                type="button"
                onClick={() =>
                  setVariants([
                    ...variants,
                    { size: "", color: "", price: "", discount: "" },
                  ])
                }
                className="text-sm text-blue-600"
              >
                + Add Variant
              </button>
            )}
          </div>

          {/* INGREDIENTS */}
          <label className="font-semibold mb-2 block">Ingredients</label>
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="Ingredients (one per line)"
            className="w-full p-2 border rounded"
          />

          {/* BENEFITS */}
          <label className="font-semibold mb-2 block">Benefits</label>
          <textarea
            value={benefits}
            onChange={(e) => setBenefits(e.target.value)}
            placeholder="Benefits (one per line)"
            className="w-full p-2 border rounded"
          />

          {/* HOW TO USE */}
          <label className="font-semibold mb-2 block">How to Use</label>
          <textarea
            value={howToUse}
            onChange={(e) => setHowToUse(e.target.value)}
            placeholder="How to use"
            className="w-full p-2 border rounded"
          />

          {/* IMAGE */}
          <MultiImageUpload images={images} setImages={setImages} />


          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white px-4 py-2 rounded"
          >
            {loading
              ? "Saving..."
              : editItem
              ? "Update Product"
              : "Create Product"}
          </button>
        </form>
      </div>
    </div>
  );
};