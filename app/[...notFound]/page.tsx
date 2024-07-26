'use client'

import Image from "next/image";
import React, { useEffect, useState } from "react";

import { useParams } from "next/navigation";
import { getDictionary } from "@/dictionaries";

import logoCRC from '../../assets/img/Logo Caracol-BRANCO.png';

import styles from '../../styles/404.module.css';

export default function NotFound() {

    const [dic, setDic] = useState<any>(null);

    const searchParams = useParams();

    useEffect(() => {
        const fetchDictionary = async () => {
            const dictionary = await getDictionary('pt', '404');
            setDic(dictionary);
        };

        fetchDictionary();
    }, []);

    return (
        <>

            <div className={`${styles.bg_not_found} max-w-[1920px] mx-auto`}>
                <div className="flex flex-col justify-center h-screen gap-6">
                    <div className={`order-2 lg:order-1 col-span-12 lg:col-span-5`}>
                        <div className="flex flex-col justify-center items-center lg:h-screen px-8 text-center">
                            <Image src={logoCRC} alt="logo caracol" />
                            <div className="mt-5 mb-6">
                                <h1>
                                    {dic?.title}
                                </h1>
                                <h2>
                                    {dic?.subtitle}
                                </h2>
                            </div>
                            <a href="/">
                                {dic?.btn404}
                            </a>
                        </div>
                    </div>
                    <div className="order-1 lg:order-2 col-span-12 lg:col-span-7 lg:flex flex-col justify-center items-end lg:h-screen lg:pr-24">
                        {/* <Image src={Image404} alt="404" className="w-full sm:w-4/5 mx-auto lg:w-full" /> */}
                    </div>
                </div>
            </div>
        </>
    )
}
