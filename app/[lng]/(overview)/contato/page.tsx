'use client'

import React, { useEffect, useState } from 'react';
import styles from '../../../../styles/estatic-page.module.css';

import { useParams } from 'next/navigation';
import { getDictionary } from '@/dictionaries';


const Contact = () => {
    const [dic, setDic] = useState<any>(null);

    const searchParams = useParams();

    useEffect(() => {
        const fetchDictionary = async () => {
            const dictionary = await getDictionary(searchParams.lng as "pt" | "en" | "es", 'contact');
            setDic(dictionary);
        };
        fetchDictionary();
    }, [searchParams.lng])

    return (
        <>
            <div className={`${styles.estatic_page} container_content container py-12 contact-page`}>
                <h1 className={`${styles.title} ${styles.display_2} mb-5 text-center p-0`}>{dic?.title}</h1>
                <div className={`${styles.card} py-6 px-4`}>
                    {/*  */}
                    <div className="p-3">
                        <div className="grid grid-cols-12">

                            <div className="col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-4 text-center py-4 pb-4 lg:pb-1">
                                <p className="mb-1">
                                    <strong>{dic?.customer_service}</strong>
                                </p>
                                <a href="mailto:sac@cnct.com.br">sac@cnct.com.br</a>
                            </div>
                            <div className="col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-4 text-center py-4 pb-4 lg:pb-1">
                                <p className="mb-1">
                                    <strong>{dic?.commercial}</strong>
                                </p>
                                <a href="mailto:comercial@novocaracoltainhas.com.br">
                                    comercial@novocaracoltainhas.com.br
                                </a>
                            </div>
                            <div className="col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-4 text-center py-4 pb-4 lg:pb-1">
                                <p className="mb-1">
                                    <strong>{dic?.events}</strong>
                                </p>
                                <a href="mailto:negocios@novocaracoltainhas.com.br">
                                    negocios@novocaracoltainhas.com.br
                                </a>
                            </div>
                            <div className="col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-4 text-center py-4 pb-4 lg:pb-1">
                                <p className="mb-1">
                                    <strong>{dic?.press}</strong>
                                </p>
                                <a href="mailto:imprensa@novocaracoltainhas.com.br">
                                    imprensa@novocaracoltainhas.com.br
                                </a>
                            </div>
                            <div className="col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-4 text-center py-4 pb-4 lg:pb-1">
                                <p className="mb-1">
                                    <strong>{dic?.marketing}</strong>
                                </p>
                                <a href="mailto:marketing@novocaracoltainhas.com.br">
                                    marketing@novocaracoltainhas.com.br
                                </a>
                            </div>
                            <div className="col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-4 text-center py-4 pb-4 lg:pb-1">
                                <p className="mb-1">
                                    <strong>{dic?.privacy}</strong>
                                </p>
                                <a href="mailto:dpo@novocaracoltainhas.com.br">
                                    dpo@novocaracoltainhas.com.br
                                </a>
                            </div>
                            <div className="grid grid-cols-12">
                            </div>
                            {/*  */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Contact;
