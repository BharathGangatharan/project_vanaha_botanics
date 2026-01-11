import connectDB from "@/lib/mongodb";
import Settings from "@/data_model/setting";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "GET") {
    const settings = await Settings.findOne({});
    return res.status(200).json(settings || { bannerText: "" });
  }

  if (req.method === "PUT") {
    const { bannerText } = req.body;

    let settings = await Settings.findOne({});
    if (!settings) settings = new Settings();

    settings.bannerText = bannerText || "";
    await settings.save();

    return res.status(200).json({ success: true, settings });
  }

  res.status(405).json({ error: "Method not allowed" });
}
