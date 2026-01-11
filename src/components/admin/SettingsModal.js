"use client";

import { useState, useEffect } from "react";

export default function SettingsModal({ isOpen, onClose }) {
  const [bannerText, setBannerText] = useState("");

  // Fetch current saved settings
  useEffect(() => {
    async function loadSettings() {
      const res = await fetch(`/api/admin/settings`);
      const data = await res.json();
      if (res.ok) setBannerText(data.bannerText || "");
    }
    if (isOpen) loadSettings();
  }, [isOpen]);

  async function saveSettings() {
    const res = await fetch(`/api/admin/settings`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bannerText }),
    });

    if (res.ok) {
      alert("Settings updated!");
      onClose();
    } else {
      alert("Failed to update settings");
    }
  }

  return (
    <div className={`${isOpen ? "block" : "hidden"}`}>
      <div className="fixed inset-0 bg-blueDeep bg-opacity-40 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg w-[90%] md:w-[450px] shadow-xl">
          <h2 className="text-xl font-bold mb-4 text-navyDark">Site Settings</h2>

          <label className="block font-medium text-navyDark">Running Banner Text</label>
          <input
            value={bannerText}
            onChange={(e) => setBannerText(e.target.value)}
            placeholder="Type your banner message"
            className="w-full border border-black p-2 rounded mt-2 placeholder:text-navyDark"
          />

          <div className="flex justify-end gap-3 mt-5">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-md text-navyDark cursor-pointer"
            >
              Cancel
            </button>

            <button
              onClick={saveSettings}
              className="px-4 py-2 bg-blueBright text-white rounded-md cursor-pointer"
            >
              Save
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}