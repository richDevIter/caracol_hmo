'use client'
import Head from 'next/head'
import React, { Key, useState, useEffect } from 'react'
import { getDictionary } from "@/dictionaries";

import Breadcrumb from '@/components/base/BreadCrumbs/BreadCrumbs';

import { IconMap } from '@/assets/icons';

import styles from './combo.module.css'
import HomeDestinowApp from '@/components/HomeDestinowApp/HomeDestinowApp';
import Modal from '@/components/base/Modal/Modal';
import ProductModalGallery from '@/components/ProductModalGallery/ProductModalGallery';
import { useRouter } from 'next/router';

import ComboGallery from '@/components/ComboGallery/ComboGallery';
import ComboOptions from '@/components/ComboOptions/ComboOptions';
import ComboOpenOptions from '@/components/ComboOptions/ComboOpenOptions';

import { useParams } from "next/navigation";

import ComboPageCollection from '@/core/ComboPage';
import ComboRepository from '@/core/ComboPageRepository';
import useScrollTo from '@/data/hooks/useScrollTo';
import useWindowSize from '@/data/hooks/useWindowSize';

const Combo = (props: any) => {
    let idChannel: number = 2;

    const scrollTo = useScrollTo;

    const searchParams = useParams();

    const size = useWindowSize();

    const [seeMore, setSeeMore] = useState<any>(false);
    const [showModal, setShowModal] = React.useState(false);
    const [messageCart, setMessageCart] = useState<any>(false);
    const [respTour, setRespTour] = useState<any>(null)

    const lng: string = searchParams.lng === "pt" ? "BR" : searchParams.lng === "en" ? "EN" : searchParams.lng === "es" ? "ES" : 'BR';

    const [dic, setDic] = useState<any>(null);

    useEffect(() => {
        const fetchDictionary = async () => {
            const dictionary = await getDictionary(searchParams.lng as "pt" | "en" | "es", 'combo');
            setDic(dictionary);
        };
        
        async function getIdChannel() {
            try {
                const resp = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/Products/GetChannelBySource/site`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                })
                const channelResp = await resp.json();

                if (channelResp.statusCode === 200) {
                    // eslint-disable-next-line react-hooks/exhaustive-deps
                    idChannel = channelResp.data.data;
                    getProductInfo();
                }
            } catch (error) { }
        }

        fetchDictionary();
        getIdChannel();

    }, [searchParams.lng])

    const getProductInfo = async () => {
        const today: any = new Date;
        const formatedToday: any = today.toISOString();

        const data = {
            productCode: searchParams.slug,
            lang: lng,
            eventDate: formatedToday,
            idCanal: idChannel
        }

        const resp = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/Products/FetchSingleComboAsync`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const tourResp = await resp.json();
        setRespTour(tourResp.data);
    }

    const createMenuProduct = () => {
        return (
            <>
                {size.width > 767 ? (
                    <div className={styles.tour_menu}>
                        <div>
                            <div
                                className='cursor-pointer'
                                onClick={() => scrollTo("session-info")}
                            >
                                {dic?.summary}
                            </div>
                        </div>
                        <div>
                            <div
                                className='cursor-pointer'
                                onClick={() => scrollTo("session-highlights")}
                            >
                                 {dic?.highlights}
                            </div>
                        </div>
                        <div>
                            <div
                                className='cursor-pointer'
                                onClick={() => scrollTo("session-details")}
                            >
                                 {dic?.details}
                            </div>
                        </div>
                    </div>
                )
                    :
                    <></>
                }
            </>
        )

    }

    function handleDescription() {
        if (seeMore === false) {
            setSeeMore(true);
        } else {
            setSeeMore(false);
        }
    }

    /*  const trigerViewItem = (product: any) => {
         TagManager.dataLayer({
             dataLayer: {
                 event: 'view_item',
                 currency: "BRL",
                 value: product.modalities[0].tarif.price,
                 items: [{
                     item_name: product.productName,
                     item_id: product.productCode,
                     price: product.modalities[0].tarif.price,
                     affiliation: 'Destinow',
                     item_brand: 'Destinow',
                     category: 'Tour',
                     currency: "BRL",
                 }]
             }
         });
     }
 
     useEffect(() => {
         if (respTour !== null) {
             trigerViewItem(respTour);
         }
     }, [respTour]) */

    if (respTour !== null) {
        /* let aux: any = [];
        
        const urlProducts = {
          slugBR: respTour.slugBR,
          slugEN: respTour.slugEN,
          slugES: respTour.slugES,
        }
        
        for (let i = 0; i < respTour.modalities.length; i++) {
          aux.push((respTour.modalities[i].tarif.price) - (respTour.modalities[i].tarif.price * (respTour.modalities[i].tarif?.percDesc / 100)));
        }
        
        let index: any = aux.indexOf(Math.min(...aux)); // Pega a posição do menor valor
    
        typeof window !== 'undefined' ? localStorage.setItem("productSlug", JSON.stringify(urlProducts)) : ''; */

        return (
            <>
                <Head>
                    <title>
                        {respTour.productName +
                            " | " +
                            process.env.NEXT_PUBLIC_SERVER_NAME}
                    </title>
                    <meta
                        name="description"
                        content={""}
                    />
                    <link rel='icon' href='/favicon.ico' />
                </Head>



                <div className='container_content'>
                    <>
                        <Breadcrumb tourResponse={{ eventLocation: respTour.eventLocation, productName: respTour.productName }} />

                        <div className={styles.tour_title_span}>
                            <div className='flex'>
                                {IconMap}
                                <span className='ml-2'>{respTour.eventLocation}</span>
                            </div>

                            <h1 className={styles.tour_title_h1}>{
                                searchParams.lng === "pt" ?
                                    respTour.productNameBR
                                    :
                                    searchParams.lng === "en" ?
                                        respTour.productNameEN
                                        :
                                        searchParams.lng === "es" ?
                                            respTour.productNameES
                                            :
                                            respTour.productNameBR
                            }</h1>
                        </div>

                        <ComboGallery tourResponse={respTour} setShowModal={setShowModal} />

                        {createMenuProduct()}

                        <div className="grid grid-cols-12 row_controll">
                            {/*  Col 8 */}
                            <div className="col-span-12 md:col-span-12 overflow-hidden mx-3" >
                                {/* Content */}
                                <div id="session-info" className={styles.tour_experience}>
                                    <h3> {dic?.summary}</h3>
                                    <div
                               /*  */ dangerouslySetInnerHTML={{
                                            __html: respTour.productInfo.replace(/<[^>]*>?/gm, ""),
                                        }}
                                    ></div>
                                </div>

                                {/* <div id="session-highlights" className={styles.tour_experience}>
                                        <h3>{t("tour.highlights")}</h3>
                                        <ul className="tour-list-experience">
                                            {respTour.highLight.map(
                                                (high: any, index: Key) => {
                                                    return <li key={index}>{high[0].highlight.text}</li>;
                                                }
                                            )}
                                        </ul>
                                    </div> */}

                                <div id="session-about-us" className={`${styles.tour_about_us} mb-5`}>
                                    <h3> {dic?.theExp}</h3>
                                    <div className="tour-text-about">
                                        {seeMore === false ? (
                                            <>
                                                <div
                                                    dangerouslySetInnerHTML={{
                                                        __html:
                                                            respTour.productDescription.split(
                                                                "</p>"
                                                            )[0],
                                                    }}
                                                ></div>
                                                <span>...</span>
                                                <br />
                                            </>
                                        ) : (
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: respTour.productDescription,
                                                }}
                                            ></div>
                                        )}
                                        <button
                                            className={`${styles.tour_btn_see_more} pt-2`}
                                            onClick={handleDescription}
                                        >
                                            {seeMore === false ? (
                                                <>{dic?.readMore}</>
                                            ) : (
                                                `${dic?.collapse}`
                                            )}
                                        </button>
                                    </div>
                                </div>
                                <div id="product_options" className='flex flex-col gap-8 combo_options'>
                                    {/* ADICIONAR O COMBO AQUI */}
                                    {
                                        respTour.isOpen === 0
                                            ?
                                            <ComboOptions
                                                tourResponse={respTour}
                                                setMessageCart={setMessageCart}
                                            />
                                            :
                                            <ComboOpenOptions
                                                tourResponse={respTour}
                                                setMessageCart={setMessageCart}
                                            />
                                    }
                                </div>
                                {/* <div id="session-details" className={styles.tour_about_us}>
                                        <h3>{t("tour.details")}</h3>
                                        <ul className="tour-list-experience">
                                            {respTour.details.map((details: any, index: Key) => {
                                                return <li key={index}>{details[0].detail.text}</li>;
                                            })}
                                        </ul>
                                    </div> */}
                                <div id="session-experience" className={`${styles.tour_about_us} pb-12`}>
                                    <h3>{dic?.cancellation}</h3>
                                    <p className="mb-0">{dic?.upTo24Hours}</p>
                                </div>
                                {/* END:Content */}
                            </div>
                        </div>

                    </>
                </div>

                <HomeDestinowApp />

                <Modal
                    setShowModal={setShowModal}
                    showModal={showModal}
                    btnClose={true}
                >
                    <div className={`modal-gallery`}>
                        <ProductModalGallery tourResponse={respTour} /> {/* REVER */}
                    </div>
                </Modal>


                <style jsx global>
                    {`
                        :root {
                            --primary: ${process.env.NEXT_PUBLIC_PRIMARY_COLOR};
                            --secondary: ${process.env.NEXT_PUBLIC_SECONDARY_COLOR};
                            --shadow: ${process.env.NEXT_PUBLIC_SHADOW_PRIMARY_COLOR};
                        }
                    `}
                </style>
            </>
        )
    }
}


export default Combo