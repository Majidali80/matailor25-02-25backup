import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import React from "react";
import { CartProvider } from "./context/cartContext";
import Navbar from "./components/Navbar/page";
import Footer from "./components/Footer/page";
import Navbar3 from "./components/Navbar3/page";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Bandage",
  description: "A Clothing Brand",
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
         <CartProvider>
         <Navbar />
         <Navbar3 />
        <main>{children}</main>
        <Footer />
        </CartProvider>
      </body>
    </html>
 
    
    
  );
}
