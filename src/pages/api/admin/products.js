// pages/api/admin/products.js
import dbConnect from "@/lib/mongodb";
import Product from "@/data_model/models";
import cloudinary from "@/utils/cloudinary";
// If using NextAuth:
import { getSession } from "next-auth/react";
import { generateUniqueSlug } from "@/utils/helper";

async function requireAdmin(req, res) {
  const session = await getSession({ req });
  if (!session || session.user?.role !== "admin") {
    res.status(403).json({ error: "Forbidden" });
    return false;
  }
  return true;
}

function textToArray(text = "") {
  return text
    .split("\n")
    .map((i) => i.trim())
    .filter(Boolean);
}

export default async function handler(req, res) {
	await dbConnect();
	const { method } = req;

	// GET - public listing
	if (method === "GET") {
		try {
		const products = await Product.find({}).sort({ createdAt: -1 }).lean();
		return res.status(200).json({ success: true, products });
		} catch (error) {
		console.error("GET ERROR:", error);
		return res.status(500).json({ success: false, message: "Server error", error: error.message });
		}
	}


  	// POST - create product
	if (method === "POST") {
		try {
			const {
			name,
			category,
			shortDescription,
			description,
			ingredients,
			benefits,
			howToUse,
			hasVariant,
			variants,
			images,
			} = req.body;

			if (!name || !category) {
				return res.status(400).json({
					success: false,
					message: "Name and category are required",
				});
			}

			// 🔒 Variant validation
			if (!Array.isArray(variants) || variants.length === 0) {
				return res.status(400).json({
					success: false,
					message: "At least one variant is required",
				});
			}

			// If product is marked as single-variant, allow only one
			if (!hasVariant && variants.length > 1) {
				return res.status(400).json({
					success: false,
					message: "Multiple variants not allowed when hasVariant is false",
				});
			}

			variants.forEach((v, index) => {
				if (v.price === undefined || v.price === null) {
					throw new Error(`Variant price is required (index ${index})`);
				}

				if (v.discount < 0 || v.discount > 100) {
					throw new Error(`Invalid discount for variant (index ${index})`);
				}
			});

			const slug = await generateUniqueSlug(name);

			const product = await Product.create({
				name,
				slug,
				category,
				shortDescription,
				description,
				ingredients: textToArray(ingredients),
				benefits: textToArray(benefits),
				howToUse,
				hasVariant: Boolean(hasVariant),
				variants: variants.map((v) => ({
					size: v.size,
					color: v.color,
					price: Number(v.price),
					discount: Number(v.discount || 0),
				})),
				images: images.map((img) => ({
					url: img.url,
					publicId: img.publicId,
				})),
			});

			return res.status(201).json({ success: true, product });
		} catch (error) {
			console.error("POST ERROR:", error);
			return res.status(500).json({ success: false, error: error.message });
		}
	}

	if (method === "PUT") {
		try {
			const {
			id,
			name,
			category,
			shortDescription,
			description,
			ingredients,
			benefits,
			howToUse,
			hasVariant,
			variants,
			images,
			} = req.body;

			const product = await Product.findById(id);
			if (!product) {
			return res.status(404).json({
				success: false,
				message: "Product not found",
			});
			}

			// 🔒 VARIANT VALIDATION
			if (variants !== undefined) {
				if (!Array.isArray(variants) || variants.length === 0) {
					return res.status(400).json({
					success: false,
					message: "At least one variant is required",
					});
				}

				const effectiveHasVariant =
					hasVariant !== undefined ? Boolean(hasVariant) : product.hasVariant;

				if (!effectiveHasVariant && variants.length > 1) {
					return res.status(400).json({
					success: false,
					message: "Multiple variants not allowed when hasVariant is false",
					});
				}

				variants.forEach((v, index) => {
					if (v.price === undefined || v.price === null) {
					throw new Error(`Variant price is required (index ${index})`);
					}
					if (v.discount < 0 || v.discount > 100) {
					throw new Error(`Invalid discount for variant (index ${index})`);
					}
				});

				product.variants = variants.map((v) => ({
					size: v.size,
					color: v.color,
					price: Number(v.price),
					discount: Number(v.discount || 0),
				}));
			}

			// 🖼 IMAGE UPDATE (FULL REPLACE)
			if (images !== undefined) {

				if (!Array.isArray(images) || images.length === 0) {
					return res.status(400).json({
					success: false,
					message: "At least one product image is required",
					});
				}

				product.images = images.map((img) => ({
					url: img.url,
					publicId: img.publicId,
				}));
			}

			// 🧾 OTHER FIELD UPDATES
			product.name = name ?? product.name;
			product.category = category ?? product.category;
			product.shortDescription =
			shortDescription ?? product.shortDescription;
			product.description = description ?? product.description;

			product.ingredients = ingredients
			? textToArray(ingredients)
			: product.ingredients;

			product.benefits = benefits
			? textToArray(benefits)
			: product.benefits;

			product.howToUse = howToUse ?? product.howToUse;

			product.hasVariant =
			hasVariant !== undefined ? Boolean(hasVariant) : product.hasVariant;

			await product.save();

			return res.status(200).json({ success: true, product });
		} catch (err) {
			console.error("PUT ERROR:", err);
			return res.status(500).json({ success: false, error: err.message });
		}
	}



  	// DELETE - delete product (and its Cloudinary image if present)
	if (method === "DELETE") {
		try {
		const { id } = req.query;
		if (!id) return res.status(400).json({ success: false, message: "Product id is required" });

		const product = await Product.findById(id);
		if (!product) return res.status(404).json({ success: false, message: "Product not found" });

		if (product.publicId) {
			try {
			await cloudinary.uploader.destroy(product.publicId);
			} catch (e) {
			// log but don't fail the request solely because Cloudinary delete failed
			console.warn("Cloudinary delete warning:", e);
			}
		}

		await Product.findByIdAndDelete(id);
		return res.status(200).json({ success: true, message: "Product deleted successfully" });
		} catch (error) {
		console.error("DELETE ERROR:", error);
		return res.status(500).json({ success: false, message: "Server error while deleting", error: error.message });
		}
	}

  res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
  return res.status(405).end(`Method ${method} Not Allowed`);
}
