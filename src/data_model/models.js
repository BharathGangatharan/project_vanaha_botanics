import mongoose from "mongoose";

const VariantSchema = new mongoose.Schema(
  {
    size: { type: String },
    color: { type: String },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
  },
  { _id: false }
);

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: {
      type: String,
      enum: ["skin_care", "hair_care", "eco_friendly"],
      required: true,
    },

    shortDescription: String,
    description: String,

    ingredients: [String],
    benefits: [String],
    howToUse: String,

    hasVariant: { type: Boolean, default: false },

    variants: {
      type: [VariantSchema],
      required: true,
    },

    images: [
      {
        url: { type: String, required: true },
        publicId: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);