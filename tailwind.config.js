/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lavender: "#A6B2EC",
        navyDark: "#080C25", // Add your custom color here
        blueDeep: "#161E35",
        blueBright: "#3071E7",
        allProductsBg: "#d6d9eb",
        reviewCarouselBg: "#20274b",
        serviceProvideBg: "#4d4f69",
        runningBannerBg: "#d8c8c0",
        navBarHoverText: "#ebb9a1",
        white: "#fff",
        black: "#000",
        brand: '#2F5D50',
        sage: '#9DBFB3',
        bg: '#FAFAF7',
        section: '#F1F5F2',
        text: '#1F2933',
        muted: '#6B7280',

      },
      fontFamily: {
        playfair: ["Playfair Display", "serif"],
        cormorant: ["Cormorant Garamond", "serif"],
        inter: ["Inter", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: 0, transform: "translateY(30px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        fadeInUp: "fadeInUp 1s ease-out forwards",
      },
    },
  },
  plugins: [],
};
  