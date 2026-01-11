import mongoose from "mongoose";

const SettingsSchema = new mongoose.Schema(
  {
    bannerText: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// Prevent model overwrite on hot reload
export default mongoose.models.Settings || mongoose.model("Settings", SettingsSchema);