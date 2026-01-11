"use client";
import { useEffect, useState } from "react";

export default function RunningBanner() {
  const [text, setText] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/settings`);
        const data = await res.json();
        console.log("Banner text:", data.bannerText);
        setText(data.bannerText || "");
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, []);

  if (!text) return null;

  return (
    <div className="w-full bg-brand text-white py-1 overflow-hidden">
      <div className="marquee">
        <div className="marquee__inner">
          <span>{text}</span>
          <span>{text}</span>
          <span>{text}</span>
        </div>
      </div>
    </div>
  );
}
