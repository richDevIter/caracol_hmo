'use client'

import React, { useEffect, useState } from "react";

import HowToGetCaracolPT from "./components/HowToGetCaracolPT/HowToGetCaracolPT";
import HowToGetCaracolEN from "./components/HowToGetCaracolEN/HowToGetCaracolEN";
import HowToGetCaracolES from "./components/HowToGetCaracolES/HowToGetCaracolES";

import { useParams } from 'next/navigation';
import { getDictionary } from '@/dictionaries';

import styles from "./HomeHowToGet.module.css";

function HomeHowToGet() {
    const [dic, setDic] = useState<any>(null);

    const searchParams = useParams();

    useEffect(() => {
        const fetchDictionary = async () => {
            const dictionary = await getDictionary(searchParams.lng as "pt" | "en" | "es", 'profile');
            setDic(dictionary);
        };
        fetchDictionary();
    }, [searchParams.lng])

    return (
        <>
            <div
                className={`${styles.bg_how_to_get_caracol}`}
            >
                <div className="grid grid-cols-12 h-full">
                    <div
                        className="col-span-12 sm:col-span-12 md:col-span-5 flex justify-end px-3 py-auto"
                    >
                        {
                            searchParams.lng === "pt"
                                ?
                                <HowToGetCaracolPT />
                                :
                                searchParams.lng === "en"
                                    ?
                                    <HowToGetCaracolEN />
                                    :
                                    searchParams.lng === "es"
                                        ?
                                        <HowToGetCaracolES />
                                        :
                                        <HowToGetCaracolPT />
                        }
                    </div>
                    <div className="col-span-12 md:col-span-7 ">
                        <div className="embed-responsive embed-responsive-16by9 h-full w-full">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3478.9900151897073!2d-50.85569252499975!3d-29.311968547697074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x951ecd5b1eff3555%3A0x8f7d9481de645462!2sParque%20do%20Caracol!5e0!3m2!1spt-BR!2sbr!4v1672078196497!5m2!1spt-BR!2sbr"
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                title="how to get"
                                allow="autoplay; fullscreen; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomeHowToGet;
