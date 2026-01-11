"use client";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import useMobileView from "../../hooks/useMobileView";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Logo from "../../../public/images/vana_bg/logo_bg_remove.png";

export default function Navbar() {
  const isMobile = useMobileView();
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const NavOptions = [
    { name: "Home", link: "/" },
    { name: "Products", link: "/products" },
    { name: "Faq", link: "/faq" },
  ];

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const navigateInMobile = (href) => {
    router.push(href);
    setMenuOpen(false);
  };

  return (
    <nav className={`
        bg-white border-b border-[#E6ECE8] shadow-[0_1px_4px_rgba(0,0,0,0.03)] backdrop-blur-md flex sticky justify-between px-5 item-center top-0 left-0 w-full z-50`}>
     
      <div onClick={() => navigateInMobile("/")} className="cursor-pointer">
        <Image src={Logo} height={100} alt="Hero" />
      </div>

      {isMobile ? (
        <button
          onClick={toggleMenu}
          className="text-[20px] hover:text-lavender"
        >
          {menuOpen ? <IoClose size={30} /> : <GiHamburgerMenu size={25} className="fill-brand" />}
        </button>
      ) : (
        <div className="space-x-10 flex items-center gap-4 mr-4">
          {NavOptions.map((option, index) => (
            <div
              key={index}
              className={`text-[#374151]relative text-[20px] font-semibold font-sans cursor-pointer hover:text-brand
      `}
              onClick={() => router.push(option.link)}
            >
              {option.name}
            </div>
          ))}
        </div>
      )}

      {/* Animated Mobile Menu */}
      {isMobile && (
        <div
          className={`
              absolute top-0 left-0 w-screen
              pt-20
              h-[280px]
              gap-4
              bg-brand text-white z-40 flex flex-col items-center space-y-4 py-4
              transition-all duration-300 ease-out
              ${
                menuOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-5 pointer-events-none"
              }
            `}
        >
          <div className="absolute right-5 top-5 bg-white rounded-full p-1" onClick={()=>{setMenuOpen(false)}}><IoClose size={20} className="text-navyDark"/></div>
          {NavOptions.map((option, index) => (
            <div
              key={index}
              className={`text-[18px] cursor-pointer`}
              onClick={() => navigateInMobile(option.link)}
            >
              {option.name}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
}