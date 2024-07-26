
import type { Metadata } from "next";
import "./globals.css";
import Head from "next/head";

import localFont from 'next/font/local'
import { CartProvider } from "@/data/context/CartContext";
import Header from "./ui/Header";
import Footer from "./ui/Footer";

export const metadata: Metadata = {
  title: {
    default: "Parque do Caracol",
    template: `%s | ${process.env.NEXT_PUBLIC_SERVER_NAME}`
  },
  description: "",
  icons: {
    icon: [
      {
        url: '/favicon.ico',
      },
    ],
  },
};

// Font files can be colocated inside of `app`
const effra = localFont({
  src: [
    {
      path: '../../../assets/fonts/woff2/Effra.woff2',
      weight: '400',
    },
    {
      path: '../../../assets/fonts/woff2/Effra-Medium.woff2',
      weight: '500',
    },
    {
      path: '../../../assets/fonts/woff2/Effra-Heavy.woff2',
      weight: '800',
    },
  ],
  display: 'swap',
})

export async function generateStaticParams() {
  return [{ lng: 'pt' }, { lng: 'es' }, { lng: 'en' },]
}

export default function SiteLayout({
  children, params, messageCart
}: Readonly<{
  children: React.ReactNode;
  params?: any;
  messageCart?: any;
}>) {

  return (
    <html lang={params.lng}>
      <CartProvider>
        <body className={effra.className}>
          <Header lng={params.lng} />
          <main> 
            {children}
          </main>
          <Footer lng={params.lng} />
        </body>
      </CartProvider>

    </html>
  );
}
