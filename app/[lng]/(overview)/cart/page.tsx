'use client'

import React, { Key, useEffect, useState } from 'react'
import Head from 'next/head';
import dynamic from 'next/dynamic';

import styles from "@/styles/cart.module.css"
import useAppData from '@/data/hooks/useCartData';
import { useParams } from 'next/navigation';
import { getDictionary } from '@/dictionaries';


const DynamicCheckoutSummaryDetails = dynamic(() => import('@/components/CheckoutSummaryDetails/CheckoutSummaryDetails'), {
    ssr: false,
})

const DynamicCheckoutCartCard = dynamic(() => import('@/components/CheckoutCartCard/CheckoutCartCard'), {
    ssr: false,
})


const Cart = () => {

    const [updateCart, setUpdateCart] = useState<any>(true);

    const { cart, removeCupomCart } = useAppData();
    const [alert, setAlert] = useState<any>();

    const [dic, setDic] = useState<any>(null);
    
    const searchParams = useParams();


    useEffect(() => {
        const fetchDictionary = async () => {
            const dictionary = await getDictionary(searchParams.lng as "pt" | "en" | "es", 'cart');
            setDic(dictionary);
        };
    
        fetchDictionary();
    
    }, [searchParams.lng])

    useEffect(() => {
        RenderCart(); 
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updateCart])

    

    const RenderCart = () => {
        return (
            <div>
                <Head>
                    <title>Carrinho - O melhor da viagem é agora.</title>
                    <meta name="description" content="Reserve seus passeios nos melhores Destinos do Brasil na Destinow. Encontre as melhores atrações turísticas, passeios, excursões, tours e ingressos aqui." />
                    <link rel='icon' href='/favicon.ico' />
                </Head>
                    <div className='container_content p-0'>

                        <div className="grid grid-cols-12 px-4 md:px-4">
                            <div className={`${styles.cart_title} col-span-12  text-primary`}>
                                <h1 className="title-custom">{dic?.title}</h1>
                            </div>
                            {/*  Col 8 */}
                            <div className="col-span-12 lg:col-span-8">
                                <div className="subtitle">
                                    <h2 className={`${styles.cart_subtitle} title-custom`}>
                                        {dic?.subtitle}
                                    </h2>
                                </div>

                                <div className="grid grid-cols-12">
                                    <div className="col-span-12">
                                        <DynamicCheckoutCartCard setUpdateCart={setUpdateCart} updateCart={updateCart} alert={alert} />
                                    </div>
                                </div>
                            </div>
                            {/*  Col 8 */}

                            {/*  Col 4 */}
                            <div className="col-span-12 lg:col-span-4 px-0 md:px-4 mt-5 lg:mt-0">
                                <div className="subtitle">
                                    <h2 className={`${styles.cart_subtitle} title-custom`}>{dic?.details}</h2>
                                </div>
                                <div>
                                    {/* <PaymentDetails
                                        setAlert={setAlert}
                                    /> */}
                                    <DynamicCheckoutSummaryDetails
                                        setAlert={setAlert}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

            </div>
        )
    }

    return (
        <>
            {RenderCart()}
        </>
    )
}

export default Cart