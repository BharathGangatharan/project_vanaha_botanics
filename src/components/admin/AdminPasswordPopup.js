"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPasswordPopup({ correctPassword, onSuccess }) {
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(true);

  const router = useRouter();

  const handleSubmit = () => {
    if (password === correctPassword) {
      setVisible(false);
      onSuccess(); // allow admin content to show
    } else {
      setTimeout(() => {
        router.push("/");
      }, 100);
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-[9999]">
      <div className="bg-white w-[90%] md:w-[400px] p-6 rounded-xl shadow-xl">
        <h2 className="text-xl font-bold text-center mb-4 text-blueDeep">
          Admin Access Required
        </h2>

        <input
          type="password"
          placeholder="Enter Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md mb-3 text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-lavender"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-navyDark text-white py-3 rounded-md hover:bg-blueDeep transition"
        >
          Submit
        </button>
      </div>
    </div>
  );
}