import Image from "next/image";
import { FaPhone } from "react-icons/fa6";
import { FaInstagram, FaFacebook  } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import Logo from "../../../public/images/vana_bg/logo_bg_remove.png";
import singleLeaf from "../../../public/images/vana_bg/singleLeaf.png";

export default function Footer() {
  return (
    <footer className="relative bg-[#F1F5F2] border-t border-[#E6ECE8] overflow-hidden">
      {/* Decorative Leaf – Left */}
      <Image
        src={singleLeaf}
        alt="Decorative leaf"
        width={180}
        height={100}
        className="
      absolute
      left-0
      bottom-0
      opacity-10
      pointer-events-none
      hidden md:block
      max-h-[180px]
    "
      />

      {/* Decorative Leaf – Right (mirrored) */}
      <Image
        src={singleLeaf}
        alt="Decorative leaf"
        width={180}
        height={100}
        className="
      absolute
      right-0
      bottom-0
      opacity-10
      rotate-180
      pointer-events-none
      hidden md:block
      max-h-[180px]
    "
      />

      <div className="max-w-7xl mx-auto px-6 py-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
          {/* LOGO + TAGLINE */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Image
              src={Logo}
              alt="Vanaha Botanics Logo"
              width={140}
              height={140}
              className="mb-4"
            />
            <p className="text-sm font-inter text-[#6B7280] flex items-center gap-2">
              Rooted in Nature
              <span className="text-[#6FAF98]">🍃</span>
            </p>
          </div>

          {/* CONTACT INFO */}
          <div className="flex flex-col items-center gap-4 text-[#4B5563]">
            <div className="flex items-center gap-3">
              <FaPhone size={18} className="text-[#6FAF98]" />
              <span className="text-sm font-inter">+91 9080365438</span>
            </div>

            <div className="flex items-center gap-3">
              <MdOutlineMail size={18} className="text-[#6FAF98]" />
              <span className="text-sm font-inter">
                rithusdreamsdesigns@gmail.com
              </span>
            </div>
          </div>

          {/* SOCIAL ICONS */}
          <div className="flex items-center justify-center md:justify-end gap-4">
            <a
              href="#"
              className="
            w-10 h-10
            rounded-xl
            border border-[#D1D5DB]
            flex items-center justify-center
            text-[#6B7280]
            hover:bg-[#EAF2EE]
            hover:text-[#2F5D50]
            transition
          "
            >
              <FaInstagram size={18} />
            </a>

            <a
              href="#"
              className="
            w-10 h-10
            rounded-xl
            border border-[#D1D5DB]
            flex items-center justify-center
            text-[#6B7280]
            hover:bg-[#EAF2EE]
            hover:text-[#2F5D50]
            transition
          "
            >
              <FaFacebook size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
