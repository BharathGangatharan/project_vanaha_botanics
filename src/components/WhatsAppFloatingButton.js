"use client";

import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppFloatingButton({ phone }) {
  const whatsappLink = `https://wa.me/${phone}?text=Hi!%20I%20would%20like%20to%20know%20more%20about%20your%20products.`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="
        fixed 
        bottom-5 right-5 
        z-50 
        bg-green-500 
        text-white 
        w-14 h-14 
        rounded-full 
        flex items-center justify-center 
        shadow-xl 
        cursor-pointer
        hover:scale-110 
        transition-transform duration-300
      "
    >
      <FaWhatsapp size={32} />
    </a>
  );
}