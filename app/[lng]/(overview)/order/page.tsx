'use client'
import Head from 'next/head';
import React, { Key, useEffect, useState } from 'react';


import { ExclamationCircle, IconCheckCart } from '@/assets/icons';

import { parseCookies } from "nookies";

import PostPurchaseAboutYourAttraction from '@/components/PostPurchaseAboutYourAttraction/PostPurchaseAboutYourAttraction';
import PostPurchasePaymentDetails from '@/components/PostPurchasePaymentDetails/PostPurchasePaymentDetails';

import styles from "./order.module.css"
import HomeDestinowApp from '@/components/HomeDestinowApp/HomeDestinowApp';
import useAppData from '@/data/hooks/useCartData';
import { useParams, useRouter } from 'next/navigation';
import { getDictionary } from '@/dictionaries';


let items: any;

const PostPurchase = () => {

    const router = useRouter();

    const { cart, removeTotalCart } = useAppData();

    const [isTour, setIsTour] = useState<any>(false);
    const [isTransfer, setIsTransfer] = useState<any>(false);
    const [isClear, setIsClear] = useState<any>(false);

    const cookies = parseCookies();
    const booklocCookies = cookies.bookloc;
    
    const bookloc: string = booklocCookies;

    function finishCheckout() {
        router.push("/");
    }

    function ScrollTop() {
        window.scrollTo(0, 0);
    }
    
    useEffect(() => {
        
        const myCart = JSON.parse(sessionStorage.getItem('myOrder') || '') ;
        items = myCart;
        
        if (cart.dados.length === 0) {
            setIsClear(true);
        } else {
            setIsClear(false);
        }

        removeTotalCart?.(cart);
        ScrollTop();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /* if (isClear === true) {
        router.push("/");
    } */

    useEffect(() => {
        for (let i = 0; i <= items?.dados.length; i++) {
            if (items?.dados[i]?.productType === 2) {
                setIsTransfer(true);
            }
            if (items?.dados[i]?.productType === 1 || items?.dados[i]?.productType === 4) {
                setIsTour(true);
            }
        }

    }, []);

    const [info, setInfo] = useState<any>({});

    useEffect(() => {
        setInfo(JSON.parse(localStorage.getItem('checkoutInfo') || '{}'));
    }, [])

    const searchParams = useParams();

    const [dic, setDic] = useState<any>(null);

    useEffect(() => {
        const fetchDictionary = async () => {
            const dictionary = await getDictionary(searchParams.lng as "pt" | "en" | "es", 'order');
            setDic(dictionary);
        };
        fetchDictionary();
    }, [searchParams.lng])

    return (
        <div>
            <Head>
                <title>Carrinho - O melhor da viagem é agora.</title>
                <meta name="description" content="Reserve seus passeios nos melhores Destinos do Brasil na Destinow. Encontre as melhores atrações turísticas, passeios, excursões, tours e ingressos aqui." />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <>
                <div className='container_content p-0 post-purchase-general'>
                    <div style={{ backgroundColor: "#FFF" }}>
                        <div className='step-general' style={{ padding: "2.5rem 0" }}>
                            <div className="grid grid-cols-12 w-full m-auto">
                                <div className='col-span-12 px-4 md:px-3'>
                                    {
                                        info.log !== 2 && info.log !== '2'
                                            ?
                                            <div className="flex md:grid md:grid-cols-12 bg-top-post-purchase items-center w-full m-auto">
                                                <div className="flex justify-center items-center md:col-span-1 xs:col-span-2 overflow-hidden mr-3" >
                                                    {IconCheckCart("#00cc79", "62", "62")}
                                                </div>
                                                <div className="flex flex-col justify-center md:col-span-11 xs:col-span-10 overflow-hidden mx-3" >
                                                    <h1 className={styles.h1}><strong>{dic?.congratulations}! {info.texto}</strong></h1>
                                                    {
                                                        items?.payments[0]?.payMethod !== 96
                                                            ?
                                                            <h4 className={`${styles.h4} mb-0`}>{dic?.yourOrder} #{bookloc} {dic?.isDone}.</h4>
                                                            :
                                                            <h4 className={`${styles.h4} mb-0`}>{dic?.yourOrder} #{bookloc} {dic?.isDone}.</h4>
                                                    }
                                                </div>
                                            </div>
                                            :
                                            <div className="flex md:grid md:grid-cols-12 bg-top-post-purchase items-center w-full m-auto">
                                                <div className="flex justify-center items-center col-span-1 md:col-span-1 xs:col-span-2 overflow-hidden mx-3" >
                                                    {ExclamationCircle("#FFD43B", "62", "62")}
                                                </div>
                                                <div className="flex flex-col justify-center col-span-10 md:col-span-11 xs:col-span-10 overflow-hidden mx-3" >
                                                    <h1 className={styles.h1}><strong>{info.texto}</strong></h1>
                                                </div>
                                            </div>
                                    }
                                    {
                                        info.log !== 2 && info.log !== '2'
                                            ?
                                            <div className="my-4">
                                                <h6>
                                                    {dic?.emailSent}
                                                </h6>
                                            </div>
                                            :
                                            <div className="my-4">
                                                <h6>
                                                    {dic?.verifyEmail}
                                                </h6>
                                            </div>
                                    }
                                </div>
                                <div className='col-span-12'>
                                    <div className="block md:grid md:grid-cols-12 w-full m-auto">
                                        <div className="md:col-span-8 px-4 md:px-3" >
                                            {
                                                isTour === true
                                                    ?
                                                    <>
                                                        <div>
                                                            <h5 className={`${styles.h5} mb-4`}>
                                                                {dic?.aboutAttraction}
                                                            </h5>
                                                        </div>
                                                        <div className="blockgrid md:grid-cols-12 mb-4 pb-4 w-full m-auto">
                                                            <div className="md:col-span-12" >
                                                                <div className={`${styles.lighted_background_post} border border-muted subtitle lighted-background lighted-background-post`}>
                                                                    {
                                                                        // eslint-disable-next-line array-callback-return
                                                                        items?.dados.map((elem: any, index: any) => {
                                                                            if (elem.productType === 1 || elem.productType === 4) {

                                                                                return (
                                                                                    <div key={index}>
                                                                                        <PostPurchaseAboutYourAttraction elem={elem} index={index} />
                                                                                    </div>
                                                                                )
                                                                            }
                                                                        })
                                                                    }
                                                                    {/* <div className={`${styles.bg_footer_post_purchase}`}>
                                                                        <b>{dic?.freeCancelation}</b>
                                                                        <small className="mb-0">{dic?.freeCancelation24hours}</small>
                                                                    </div> */}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                    :
                                                    ""
                                            }

                                            {
                                                isTransfer === true
                                                    ?
                                                    <>
                                                        <div>
                                                            <h5 className={`${styles.h5} mb-4`}>
                                                                {dic?.aboutAttractionTransfer}
                                                            </h5>
                                                        </div>
                                                        <div className="block md:grid md:grid-cols-12 mb-4 pb-4 w-full m-auto">
                                                            <div className="md:col-span-12" >
                                                                <div className={`${styles.lighted_background_post} border border-muted subtitle lighted-background lighted-background-post`}>
                                                                    {
                                                                        // eslint-disable-next-line array-callback-return
                                                                        items?.dados.map((elem: any, index: any) => {
                                                                            if (elem.productType === 2) {
                                                                                return (
                                                                                    <div key={index}>
                                                                                        <PostPurchaseAboutYourAttraction elem={elem} index={index} />
                                                                                    </div>
                                                                                )
                                                                            }
                                                                        })
                                                                    }
                                                                    <div className={`${styles.bg_footer_post_purchase}`}>
                                                                        <b>{dic?.freeCancelation}</b>
                                                                        <small className="mb-0">{dic?.freeCancelation24hours}</small>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                    :
                                                    ""
                                            }

                                            <div className="my-4 hidden md:block">
                                                <div className='flex justify-end'>
                                                    <button className="btn btn-primary" onClick={finishCheckout}>
                                                        {dic?.continue}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="custom md:col-span-4 px-4 md:px-3" >
                                            <div className="subtitle">
                                                <h5 className={`${styles.h5} mb-4`}>{dic?.paymentDetails}</h5>
                                            </div>
                                            <div>
                                                <PostPurchasePaymentDetails items={items} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="my-4 block md:hidden">
                                        <div className='flex justify-end'>
                                            <button className="btn btn-primary" onClick={finishCheckout}>
                                                {dic?.continue}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>

        </div>
    );
}

export default PostPurchase;
