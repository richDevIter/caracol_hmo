'use client'

import React, { useEffect, useState } from 'react';

import RulesPT from '@/components/Rules/RulesPT';
import RulesEN from '@/components/Rules/RulesEN';
import RulesES from '@/components/Rules/RulesES';
import styles from '../../../../styles/estatic-page.module.css';

import { useParams } from 'next/navigation';
import { getDictionary } from '@/dictionaries';


const Rules = () => {
    const [dic, setDic] = useState<any>(null);

    const searchParams = useParams();

    useEffect(() => {
        const fetchDictionary = async () => {
            const dictionary = await getDictionary(searchParams.lng as "pt" | "en" | "es", 'rules');
            setDic(dictionary);
        };
        fetchDictionary();
    }, [searchParams.lng])

    const renderRules = () => {
        if (searchParams.lng === 'br') {
            return <RulesPT />
        } else if (searchParams.lng === 'en') {
            return <RulesEN />
        } else if (searchParams.lng === 'es') {
            return <RulesES />
        } else {
            return <RulesPT />
        }
    }

    return (
        <>
            <div className={`${styles.estatic_page} container_content container py-12`}>
                <h1 className={`${styles.title} ${styles.display_2} mb-5 text-center p-0`}>{dic?.title}</h1>
                <div className={`${styles.card} py-6 px-4`}>
                    {renderRules()}
                </div>
            </div>
        </>
    );
};

export default Rules;
