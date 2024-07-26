'use client'

import React, { useEffect, useState } from 'react';
import Head from 'next/head';

import PrivacyNoticePT from '@/components/PrivacyNotice/PrivacyNoticePT';
import PrivacyNoticeEN from '@/components/PrivacyNotice/PrivacyNoticeEN';
import PrivacyNoticeES from '@/components/PrivacyNotice/PrivacyNoticeES';
import styles from '../../../../styles/politica-de-privacidade.module.css';

import { useParams } from 'next/navigation';
import { getDictionary } from '@/dictionaries';


const PrivacyPolicy = () => {
    const [dic, setDic] = useState<any>(null);

    const searchParams = useParams();

    useEffect(() => {
        const fetchDictionary = async () => {
            const dictionary = await getDictionary(searchParams.lng as "pt" | "en" | "es", 'privacyPolicy');
            setDic(dictionary);
        };
        fetchDictionary();
    }, [searchParams.lng])

    const renderPrivacy = () => {
        if (searchParams.lng === 'br') {
            return <PrivacyNoticePT />
        } else if (searchParams.lng === 'en') {
            return <PrivacyNoticeEN />
        } else if (searchParams.lng === 'es') {
            return <PrivacyNoticeES />
        } else {
            return <PrivacyNoticePT />
        }
    }

    return (
        <>
            <Head>
                <title>Política de Privacidade - O melhor da viagem é agora.</title>
                <meta
                    name="description"
                    content="Reserve seus passeios nos melhores Destinos do Brasil na Destinow. Encontre as melhores atrações turísticas, passeios, excursões, tours e ingressos aqui."
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <>
                <div className={`${styles.estatic_page} container_content container py-12`}>
                    <h1 className={`${styles.title} ${styles.display_2} mb-5 text-center p-0`}>{dic?.title}</h1>
                    <div className={`${styles.card} py-6 px-4`}>
                        {renderPrivacy()}
                    </div>
                </div>
            </>
        </>
    );
};

export default PrivacyPolicy;
