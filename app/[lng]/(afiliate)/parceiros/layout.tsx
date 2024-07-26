import "../../(overview)/globals.css";
import Head from "next/head";

import localFont from 'next/font/local'
import { CartProvider } from "@/data/context/CartContext";
import HeaderAffiliate from "@/components/HeaderAffiliate/HeaderAffiliate";
import Footer from "../../(overview)/ui/Footer";



// Font files can be colocated inside of `app`
const effra = localFont({
  src: [
    {
      path: '../../../../assets/fonts/woff2/Effra.woff2',
      weight: '400',
    },
    {
      path: '../../../../assets/fonts/woff2/Effra-Medium.woff2',
      weight: '500',
    },
    {
      path: '../../../../assets/fonts/woff2/Effra-Heavy.woff2',
      weight: '800',
    },
  ],
  display: 'swap',
})

export async function generateStaticParams() {
  return [{ lng: 'pt' }, { lng: 'es' }, { lng: 'en' }, ]
}

export default function LayoutAffiliate({
  children, params
}: Readonly<{
  children: React.ReactNode;
  params : any;
}>) {
  return (
    <html lang={params.lng}> 
        <Head>
          <meta name="adopt-website-id" content="ec50c0f8-a778-4e34-8b98-501c90dcac6c" />
          <link rel="icon" href="/favicon.ico" sizes="any" />
        </Head> 
        <body  className={effra.className}>
          <HeaderAffiliate />
          <main> 
            {children}
          </main>
          <Footer lng={params.lng}/>
        </body>
    </html>
  );
}
