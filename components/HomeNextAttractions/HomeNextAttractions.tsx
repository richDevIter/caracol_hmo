'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import Image from 'next/image';
// ... (restante das importações)

import styles from './HomeNextAttractions.module.css'
import { IconMapMarkerAlt } from '@/assets/icons';

import { getDictionary } from '@/dictionaries';

import HomePageRepository from '@/core/HomePageRepository';
import HomePageCollection from '@/core/HomePage';

import IdChannelCollection from '@/core/IdChannel';
import IdChannelRepository from '@/core/IdChannelRepository';
import { parseCookies, setCookie } from 'nookies';
import { useParams } from 'next/navigation';
import { HomeNextAttractionsSkeleton } from '@/app/[lng]/(overview)/ui/skeletons';

export interface propFooter {
    lng?: any,
}

const HomeNextAttractions: React.FC<propFooter> = ({ lng }) => {
    const repo: HomePageRepository = new HomePageCollection();
    const repoChannel: IdChannelRepository = new IdChannelCollection();

    const cookies = parseCookies();
    const [resProduct, setResProduct] = useState<any>(null);
    const [dic, setDic] = useState<any>(null);

    const searchParams = useParams();

    const handleInfoCarrousel = (channel: number) => {
        const lang = searchParams.lng === "pt" ? "BR" : searchParams.lng === "en" ? "EN" : searchParams.lng === "es" ? "ES" : "BR";

        const getProducts = async () => {
            repo.getCategories(process.env.NEXT_PUBLIC_CATEGORY, lang, channel).then((result: any) => {
                if (result instanceof Error) {
                    const message = JSON.parse(result.message)
                    /* setConectionError(true);
                    setErrorMessage(message?.errors.length > 0 ? message?.errors.length : ['Erro desconhecido - Entre em contato com o Suporte']) */
                } else {
                    if (resProduct === null) {
                        setResProduct(result);
                    }
                }
            });
            
        };

        const fetchDictionary = async () => {
            const dictionary = await getDictionary(lng, 'homeNextAttractions');
            setDic(dictionary);
        };

        getProducts();
        fetchDictionary();
    } // Dependências do useEffect



    useEffect(() => {
        if (!cookies.idCanal) {
            repoChannel.getFiltered('site').then((result: any) => {
                if (result instanceof Error) {
                    const message = JSON.parse(result.message)
                    //setConectionError(true);
                    //setErrorMessage(message?.errors.length > 0 ? message?.errors.length : ['Erro desconhecido - Entre em contato com o Suporte'])
                } else {
                    setCookie(null, 'idCanal', result.data, {
                        maxAge: (60 * 10), //expira em 10 minutos (60 * 10)
                        path: '/',
                    });
                    handleInfoCarrousel(result.data);
                }
            });
        } else {
            handleInfoCarrousel(+cookies.idCanal);
        }
    }, [])

    // ... (restante do seu componente)

    if (resProduct !== null && dic !== null) {
        return (
            // ... (seu JSX quando os produtos e o dicionário estão carregados)
            <div className={`${styles.bg_next_attractions}`}>
                <div className='container_content p-0'>
                    <div className="main-next-attractions">
                        <div>
                            <h3 className={`${styles.h3_main_next_attractions}`}>
                                {dic.nextAttractions.mainTitle}
                            </h3>
                            <p className={`${styles.p_main_next_attractions}`}>
                                {dic.nextAttractions.mainSubtitle}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-12 row_controll">
                        {/*  Col 6 */}
                        <div className='col-span-12 md:col-span-6 px-3'>

                            <div className="grid grid-cols-12 row_controll">

                                <div className='col-span-12 px-3'>
                                    {resProduct?.length > 0 &&
                                    <a href={`/tour/${resProduct[0]?.productSlug}`}>
                                        <div style={{ position: "relative" }} className={`${styles.img_next_attractions_duo}`}>
                                            <Image
                                                src={`${resProduct[0].imagesBaseUrl}${resProduct[0]?.productImg}`}
                                                alt="Carrousel Atrações Principais"
                                                width={559}
                                                height={250}
                                                sizes="(max-width: 559px) 100vw"
                                                objectFit="contain"
                                                quality={80}
                                                loading='lazy'
                                            />
                                            <div className={`${styles.card_content}`}>
                                                <div className="flex items-center pt-3 pt-md-4 pb-2 gap-2 md:gap-3">
                                                    {IconMapMarkerAlt("#00cc79", "24", "24")}
                                                    <span className={`${styles.card_content_span}`}>{resProduct[0]?.eventLocation.split(',')[0]}</span>
                                                </div>
                                                <div>
                                                    <h4 className={`${styles.h4_card_content}`}>
                                                        {resProduct[0]?.productName}
                                                    </h4>
                                                </div>
                                                <div className="price-next-attractions">
                                                    <p className={`${styles.card_content_p} flex`}>
                                                        <span className={`${styles.price_next_attractions_span}`}>R$ {resProduct[0]?.price.toFixed(2).replace(".", ",")}</span> {dic.nextAttractions.perPeople}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                    }
                                </div>

                                {
                                    resProduct[1] !== undefined
                                        ?
                                        <div className='col-span-12 px-3'>
                                            <a href={`/tour/${resProduct[1]?.productSlug}`}>
                                                <div style={{ position: "relative" }} className={`${styles.img_next_attractions_duo}`}>
                                                    <Image
                                                        src={`${resProduct[1]?.imagesBaseUrl}${resProduct[1]?.productImg}`}
                                                        alt="Carrousel Atrações Principais"
                                                        width={559}
                                                        height={250}
                                                        sizes="(max-width: 559px) 100vw"
                                                    // placeholder="blur"
                                                    // quality={80}
                                                    // loading='lazy'
                                                    />
                                                    <div className={`${styles.card_content}`}>
                                                        <div className="flex items-center pt-3 pt-md-4 pb-2 gap-2 md:gap-3">
                                                            {IconMapMarkerAlt("#00cc79", "24", "24")}
                                                            <span className={`${styles.card_content_span}`}>{resProduct[1]?.eventLocation.split(',')[0]}</span>
                                                        </div>
                                                        <div>
                                                            <h4 className={`${styles.h4_card_content}`}>
                                                                {resProduct[1]?.productName}
                                                            </h4>
                                                        </div>
                                                        <div className="price-next-attractions">
                                                            <p className={`${styles.card_content_p} flex`}>
                                                                <span className={`${styles.price_next_attractions_span}`}>R$ {resProduct[1]?.price.toFixed(2).replace(".", ",")}</span> {dic.nextAttractions.perPeople}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>

                                        </div>
                                        :
                                        <></>
                                }
                            </div>
                        </div>
                        {/*  Col 6 */}

                        {
                            resProduct[2] !== undefined
                                ?
                                <div className='col-span-12 md:col-span-6 px-3'>
                                    <a href={`/tour/${resProduct[2]?.productSlug}`}>
                                        <div style={{ position: "relative" }} className={`${styles.img_next_attractions_solo}`}>

                                            {
                                                resProduct[2]?.percDesc !== 0
                                                    ?
                                                    <div className={`${styles.badge}`}>
                                                        <span>-{resProduct[2]?.percDesc}%</span>
                                                    </div>
                                                    :
                                                    ""
                                            }
                                            <Image
                                                src={`${resProduct[2]?.imagesBaseUrl}${resProduct[2]?.productImg}`}
                                                alt="Carrousel Atrações Principais"
                                                width={559}
                                                height={250}
                                                sizes="(max-width: 559px) 100vw"
                                            // placeholder="blur"
                                            // quality={80}
                                            // loading='lazy'
                                            />
                                            <div className={`${styles.card_content}`}>
                                                <div className="flex items-center pt-3 pt-md-4 pb-2 gap-2 md:gap-3">
                                                    {IconMapMarkerAlt("#00cc79", "24", "24")}
                                                    <span className={`${styles.card_content_span}`}>{resProduct[2]?.eventLocation.split(',')[0]}</span>
                                                </div>
                                                <div>
                                                    <h4 className={`${styles.h4_card_content}`}>
                                                        {resProduct[2]?.productName}
                                                    </h4>
                                                </div>
                                                <div className="price-next-attractions">

                                                    <p className={`${styles.card_content_p} flex`}>
                                                        <span className={`${styles.price_next_attractions_span}`}>R$ {resProduct[2]?.price.toFixed(2).replace(".", ",")}</span> {dic.nextAttractions.perPeople}
                                                    </p>
                                                </div>
                                            </div>

                                        </div>
                                    </a>
                                </div>
                                :
                                <></>
                        }
                    </div>
                </div>
            </div>
        )
    } else {
        return <>
            <HomeNextAttractionsSkeleton />
            </>
    }
};

export default HomeNextAttractions;