import type { Metadata } from "next";
import "../../app/[lng]/(overview)/globals.css";
import Head from "next/head";

import localFont from 'next/font/local'

export const metadata: Metadata = {
  title: "",
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
      path: '../../assets/fonts/woff2/Effra.woff2',
      weight: '400',
    },
    {
      path: '../../assets/fonts/woff2/Effra-Medium.woff2',
      weight: '500',
    },
    {
      path: '../../assets/fonts/woff2/Effra-Heavy.woff2',
      weight: '800',
    },
  ],
  display: 'swap',
})

export async function generateStaticParams() {
  return [{ lng: 'pt' }, { lng: 'es' }, { lng: 'en' }, ]
}

export default function SiteLayout({
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
          <style>
            {`
                :root {
                    --primary:${process.env.NEXT_PUBLIC_PRIMARY_COLOR};
                    --secondary:${process.env.NEXT_PUBLIC_SECONDARY_COLOR};
                    --shadow:${process.env.NEXT_PUBLIC_SHADOW_PRIMARY_COLOR};
                }
            `}
          </style>
          <main>
            {children}
          </main>
        </body>
     
    </html>
  );
}
