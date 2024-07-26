'use client'

import React, { useEffect, useState } from 'react';
import Head from 'next/head';

import TermsOfUsePT from '@/components/TermsOfUse/TermsOfUsePT';
import TermsOfUseEN from '@/components/TermsOfUse/TermsOfUseEN';
import TermsOfUseES from '@/components/TermsOfUse/TermsOfUseES';
import styles from '../../../../styles/politica-de-privacidade.module.css';

import { useParams } from 'next/navigation';
import { getDictionary } from '@/dictionaries';

const TermsOfUse = () => {
    const [dic, setDic] = useState<any>(null);

    const searchParams = useParams();

    useEffect(() => {
        const fetchDictionary = async () => {
            const dictionary = await getDictionary(searchParams.lng as "pt" | "en" | "es", 'termsOfUse');
            setDic(dictionary);
        };
        fetchDictionary();
    }, [searchParams.lng])

    const renderTerms = () => {
        if (searchParams.lng === 'br') {
            return <TermsOfUsePT />
        } else if (searchParams.lng === 'en') {
            return <TermsOfUseEN />
        } else if (searchParams.lng === 'es') {
            return <TermsOfUseES />
        } else {
            return <TermsOfUsePT />
        }
    }


    return (
        <>
            <div className={`${styles.estatic_page} container_content container py-12`}>
                <h1 className={`${styles.title} ${styles.display_2} mb-5 text-center p-0`}>{dic?.title}</h1>
                <div className={`${styles.card} py-6 px-4`}>
                    {renderTerms()}
                </div>
            </div>
        </>
    );
};

export default TermsOfUse;
