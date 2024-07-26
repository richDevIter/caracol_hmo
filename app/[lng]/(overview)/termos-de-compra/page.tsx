'use client'

import React, { useEffect, useState } from 'react';
import Head from 'next/head';

import TermsOfPurchasePT from '@/components/TermsOfPurchase/TermsOfPurchasePT';
import TermsOfPurchaseEN from '@/components/TermsOfPurchase/TermsOfPurchaseEN';
import TermsOfPurchaseES from '@/components/TermsOfPurchase/TermsOfPurchaseES';
import styles from '../../../../styles/politica-de-privacidade.module.css';

import { useParams } from 'next/navigation';
import { getDictionary } from '@/dictionaries';

const TermsOfPurchase = () => {
    const [dic, setDic] = useState<any>(null);

    const searchParams = useParams();

    useEffect(() => {
        const fetchDictionary = async () => {
            const dictionary = await getDictionary(searchParams.lng as "pt" | "en" | "es", 'termsOfPurchase');
            setDic(dictionary);
        };
        fetchDictionary();
    }, [searchParams.lng])

    const renderTerms = () => {
        if (searchParams.lng === 'br') {
            return <TermsOfPurchasePT />
        } else if (searchParams.lng === 'en') {
            return <TermsOfPurchaseEN />
        } else if (searchParams.lng === 'es') {
            return <TermsOfPurchaseES />
        } else {
            return <TermsOfPurchasePT />
        }
    }


    return (
        <>
            <Head>
                <title>Termos e Condições - {process.env.NEXT_PUBLIC_SERVER_NAME}</title>
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
                    content={`Termos e Condições - ${process.env.NEXT_PUBLIC_SERVER_NAME}`}
                />
                <meta property="og:type" content="TravelAgency" />
                <meta
                    property="og:image"
                    content={`${process.env.NEXT_PUBLIC_SERVER_URL}${process.env.NEXT_PUBLIC_SERVER_LOGO_SHARED}`}
                />
                <meta
                    property="og:url"
                    content={process.env.NEXT_PUBLIC_SERVER_URL}
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
                <div className={`${styles.estatic_page} container_content container py-12`}>
                    <h1 className={`${styles.title} ${styles.display_2} mb-5 text-center p-0`}>{dic?.title}</h1>
                    <div className={`${styles.card} py-6 px-4`}>
                        {renderTerms()}
                    </div>
                </div>
            </>
        </>
    );
};

export default TermsOfPurchase;
