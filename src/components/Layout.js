import React from "react";
import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";
import WhatsAppFloatingButton from "./WhatsAppFloatingButton";
import PageTransition from "@/components/animations/PageTransition";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Head from "next/head";

const Layout = ({ children }) => {

  const pathname = usePathname();

  return (
    <div className="flex min-h-screen flex-col">
      
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />

      <AnimatePresence mode="wait">
        <PageTransition key={pathname}>
          <main className="flex-1">{children}</main>
        </PageTransition>
      </AnimatePresence>

      <WhatsAppFloatingButton phone="919080365438" />
      <Footer />
    </div>
  );
};

export default Layout;
