import dbConnect from "@/lib/mongodb";
import Product from "@/data_model/models";

export default async function handler(req, res) {
  await dbConnect();

  const { slug } = req.query;

  try {
    const product = await Product.findOne({ slug });

    if (!product) {
      return res.status(404).json({ success: false });
    }

    res.status(200).json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}