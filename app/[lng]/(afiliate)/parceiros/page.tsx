"use client"
import React, { useEffect, useState } from "react";

import styles from "./afiliados.module.css";

import FormAffiliates from "@/components/FormAffiliates/FormAffiliates";

import Head from "next/head";
import useScrollTo from "@/data/hooks/useScrollTo";
import { useParams } from "next/navigation";
import { getDictionary } from "@/dictionaries";


function Affiliates() {

  const scrollTo = useScrollTo;

  const [dic, setDic] = useState<any>(null);
  const searchParams = useParams();

  useEffect(() => {
    const fetchDictionary = async () => {
      const dictionary = await getDictionary(searchParams.lng as "pt" | "en" | "es", 'affiliate');
      setDic(dictionary);
    };

    fetchDictionary();

  }, [searchParams.lng]);

  useEffect(() => {
    console.log(dic)
  }, [dic])

  return (
    <>
      <Head>
        <title>Afiliados - {process.env.NEXT_PUBLIC_SERVER_NAME}</title>
        <meta
          name="description"
          content="Reserve seus passeios nos melhores Destinos do Brasil na Destinow. Encontre as melhores atrações turísticas, passeios, excursões, tours e ingressos aqui."
        />
        <meta
          name="googlebot"
          content={process.env.NEXT_PUBLIC_SERVER_ROBOTS}
        />

        {/* Essential META Tags */}
        <meta
          property="og:title"
          content={`Afiliados - ${process.env.NEXT_PUBLIC_SERVER_NAME}`}
        />
        <meta property="og:type" content="TravelAgency" />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_SERVER_URL}${process.env.NEXT_PUBLIC_SERVER_LOGO_SHARED}`}
        />
        <meta
          property="og:url"
          content={process.env.NEXT_PUBLIC_SERVER_URL_API}
        />

        {/* Non-Essential, But Recommended */}
        <meta
          property="og:site_name"
          content={process.env.NEXT_PUBLIC_SERVER_NAME}
        />

        {/* Non-Essential, But Required for Analytics */}
        {/* <meta property="fb:app_id" content="your_app_id" /> */}

        <meta name="robots" content={process.env.NEXT_PUBLIC_SERVER_ROBOTS} />
        <link rel="canonical" href={process.env.NEXT_PUBLIC_SERVER_URL_API} />
        <link rel="icon" href={process.env.NEXT_PUBLIC_SERVER_ICON} />
      </Head>
      <>
        <div className={`${styles.top_affiliates}`}>
          <div className="container flex items-center h-full mx-auto">
            <div className="grid grid-cols-12">
              <div className="mx-6 col-span-12 md:col-span-8 pl-3 pr-12 md:px-0" style={{ zIndex: 1 }}>
                <h1 className={styles.title}>
                  {dic?.title}
                </h1>
                <p>
                {dic?.subTitle01}
                  <br />
                  {dic?.subTitle02}
                </p>
                <button className="btn btn-primary mb-6 md:mb-0">
                {dic?.registration}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.meddium_affiliates}`}>
          <div id="bg-form" className={`${styles.form_affiliates}`}>
            <div className="container_content">
              <div className="w-full flex flex-col items-center pb-12">
                <h3>{dic?.registration}</h3>
                <p>{dic?.validationTitle}</p>
              </div>
              <div>
                <FormAffiliates />
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
}

export default Affiliates;