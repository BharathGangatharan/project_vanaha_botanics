import "@/styles/globals.css"; 
import { Open_Sans, Poppins, Playfair_Display } from "next/font/google";
import Layout from "@/components/Layout";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"], 
  variable: "--font-open-sans",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"], 
  variable: "--font-poppins",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-playfair",
});

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout className={`${openSans.variable} ${poppins.variable} ${playfair.variable}`}>
      <Component {...pageProps} />
    </Layout>
  );
}
