// pages/api/upload.js
import cloudinary from "@/utils/cloudinary";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  try {
    const { dataUrl, folder = "vanaha_botanics_products" } = req.body;
    if (!dataUrl) return res.status(400).json({ message: "Missing dataUrl" });

    const result = await cloudinary.uploader.upload(dataUrl, {
      folder,
      transformation: [{ quality: "auto" }, { fetch_format: "auto" }],
    });

    return res.status(200).json({ url: result.secure_url, publicId: result.public_id });
  } catch (err) {
    console.error("Upload error:", err);
    return res.status(500).json({ message: "Upload failed", error: err.message });
  }
}
