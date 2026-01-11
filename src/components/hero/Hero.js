"use client";

import { motion } from "framer-motion";
import useMobileView from "@/hooks/useMobileView";
import HeroDesktop from "../../../public/images/vana_bg/hero_bg_4.jpg";

export default function Hero() {
    const isMobile = useMobileView();

    return (
        <section
        className={`
            relative
            w-full
            bg-cover bg-center
            ${isMobile ? "h-[420px]" : "h-[600px]"}
            flex items-center
        `}
        style={{
            backgroundImage: `url(${HeroDesktop.src})`,
        }}
        >
        {/* Overlay for readability (mobile only) */}
        {isMobile && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-sm" />
        )}

        {/* CONTENT */}
        <div
            className={`
            relative z-10
            w-full
            max-w-7xl
            mx-auto
            px-6
            ${isMobile ? "text-center" : "flex justify-end"}
            `}
        >
            <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className={`
                ${isMobile ? "" : "max-w-xl"}
            `}
            >
            {/* Heading */}
            <motion.h1
                className={`
                font-cormorant
                font-bold
                text-[#1F2933]
                ${isMobile ? "text-3xl leading-snug mt-[50px]" : "text-6xl leading-tight"}
                `}
            >
                Rooted in Nature,
                <br />
                Crafted for You
            </motion.h1>

            {/* Sub text */}
            <motion.p
                className={`
                font-inter
                italic
                mt-4
                text-[#374151]
                ${isMobile ? "text-base" : "text-[22px]"}
                `}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                ❝Pure botanical care for skin & hair.
                <br className={isMobile ? "block" : "hidden"} />
                Natural, sustainable, made with love.❞
            </motion.p>
            </motion.div>
        </div>
        </section>
    );
}