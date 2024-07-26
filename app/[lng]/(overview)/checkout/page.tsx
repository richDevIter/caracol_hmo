'use client'
import React, { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';

import { setCookie } from "nookies";

import Modal from '@/components/base/Modal/Modal';
import CheckoutStepBook from '@/components/CheckoutStepBook/CheckoutStepBook';
import CheckoutStepData from '@/components/CheckoutStepData/CheckoutStepData';
import CheckoutStepPayment from '@/components/CheckoutStepPayment/CheckoutStepPayment';

import { IconCheck, IconCircle, IconLockAlt, IconCheckCircle, IconSpinner, IconTimes } from '@/assets/icons';

import styles from './checkout.module.css'
// import CheckoutSummaryReservation from '@/components/CheckoutSummaryReservation/CheckoutSummaryReservation';
import dynamic from 'next/dynamic';
import CheckoutModalPayment from '@/components/CheckoutModalPayment/CheckoutModalPayment';

import TagManager from "react-gtm-module";

// useRouter
import { useRouter } from 'next/navigation'
import useAppData from '@/data/hooks/useCartData';
import { useParams } from 'next/navigation';
import { getDictionary } from '@/dictionaries';

const DynamicCheckoutSummaryReservation = dynamic(() => import('@/components/CheckoutSummaryReservation/CheckoutSummaryReservation'), {
    ssr: false,
})


const Checkout = () => {
    const router = useRouter()

    const [dic, setDic] = useState<any>(null);
    const searchParams = useParams();

    useEffect(() => {
        const fetchDictionary = async () => {
            const dictionary = await getDictionary(searchParams.lng as "pt" | "en" | "es", 'checkout');
            setDic(dictionary);
        };

        fetchDictionary();

    }, [searchParams.lng])

    const { cart } = useAppData();

    const [stepCtrl, setStepCtrl] = useState<number>(0);
    const [checkoutObjectData, setCheckoutObjectData] = useState<any>(null);

    const [modalResponse, setModalResponse] = useState<any>(null);
    const [checkoutResponse, setCheckoutResponse] = useState<any>(null);
    const [modalShow, setModalShow] = useState<any>(false);
    const [modalLog, setModalLog] = useState<any>(null);
    const [paymentType, setPaymentType] = useState<number>(0);
    const [disableButton, setDisableButton] = useState<boolean>(false);

    const trigerAddPaymentInfo = () => {
        var products: any = [];

        cart.dados.forEach((elem: any) => {
            products.push({
                item_name: elem.productName,
                item_id: elem.productCode,
                price: elem.price,
                affiliation: 'Parque Caracol',
                item_brand: 'Parque Caracol',
                category: elem.productType === 1 ? "Tour" : elem.productType === 2 ? "Transfer" : elem.productType === 4 ? "Ticket" : "",
                currency: "BRL",
                quantity: (Number(elem.adults) + Number(elem.childs) + Number(elem.elders) + Number(elem.infants) + Number(elem.student)),
                variant: `Adultos - ${elem.adults} | Crianças - ${elem.childs} | Idosos - ${elem.elders} | Infantos - ${elem.infants} | Estudantes - ${elem.student}`
            })
        });

        TagManager.dataLayer({
            dataLayer: {
                event: 'add_payment_info',
                currency: "BRL",
                value: cart.totalCart,
                coupon: cart?.cupom?.code,
                payment_type: cart?.payments[0]?.payMethod === 1 ? "Credit Card" : "PIX",
                items: products
            }
        });
    }

    const tagEvent = (id: any, isPix: any) => {
        var products: any = [];

        cart.dados.forEach((elem: any, index: any) => {
            products.push({
                name: elem.productName,
                id: elem.productCode,
                price: elem.price,
                brand: isPix === false ? cart.payments.brand : isPix === true ? 'Pix' : "Pic Pay",
                category: elem.productType === 1 ? "Tour" : elem.productType === 2 ? "Transfer" : elem.productType === 4 ? "Ticket" : "",
                quantity: (Number(elem.adults) + Number(elem.childs) + Number(elem.elders) + Number(elem.infants) + Number(elem.student)),
                variant: `Adultos - ${elem.adults} | Crianças - ${elem.childs} | Idosos - ${elem.elders} | Infantos - ${elem.infants} | Estudantes - ${elem.student}`
            })
        });

        TagManager.dataLayer({
            dataLayer: {
                event: 'purchase',
                ecommerce: {
                    purchase: {
                        actionField: { id: id, revenue: cart.totalCart, type_payment: isPix === false ? "Credit Card" : isPix === true ? "PIX" : "Pic Pay" },
                        products: products
                    }
                }
            }
        });


    }

    const createPayment = async () => {
        setModalShow(true);
        // setModalContent('loading');
        // setPaymentMethod(cartCaracol?.payments[0]?.payMethod)
        trigerAddPaymentInfo();

        sessionStorage.setItem('myOrder', JSON.stringify(cart));

        // setCookie(null, 'myOrder', JSON.stringify(cart).toString(), {
        //     maxAge: (60 * 10), //expira em 10 minutos (60 * 10)
        //     path: '/', // caminho no qual o cookie estará disponível
        // });

        try {
            const data: any = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/Checkout/EnviaCheckoutCaracol`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cart)
            }).then((r: any) => r.json())

            if (data.statusCode === 200) {
                if (data.data.log === 1) {
                    setCheckoutResponse(data);
                    setModalLog(1);
                    // setReadyPayment(false);
                    setDisableButton(false);
                }
                else if (data.data.log === '2' || data.data.log === 2) {
                    setCheckoutResponse(data);
                    setModalLog(0);
                    //setReadyPayment(false);
                    setDisableButton(false);


                    if (cart?.payments[0]?.payMethod !== 96 && cart?.payments[0]?.payMethod !== 110) {
                        //let info: any = data?.data?.data?.voucherFile;
                        let info: any = {
                            "texto": data.data.texto,
                            "log": data.data.log
                        }
                        localStorage.setItem('checkoutInfo', JSON.stringify(info));

                        setCookie(null, 'bookloc', data.data.log, {
                            maxAge: (60 * 10), //expira em 10 minutos (60 * 10)
                            path: '/',
                        });

                        tagEvent(data?.data?.data?.reservationLoc, false);

                        router.push("/order");
                        setModalResponse(null);
                    }
                } else {
                    setCheckoutResponse(data);
                    setModalLog(0);
                    setDisableButton(false);
                    //setReadyPayment(false);

                    if (cart?.payments[0]?.payMethod !== 96 && cart?.payments[0]?.payMethod !== 110) {
                        /* let info: any = data?.data?.data?.voucherFile;
                        localStorage.setItem('download', JSON.stringify(info)); */

                        let info: any = {
                            "texto": data.data.texto,
                            "log": data.data.log
                        }
                        localStorage.setItem('checkoutInfo', JSON.stringify(info));

                        setCookie(null, 'bookloc', data?.data?.data?.reservationLoc, {
                            maxAge: (60 * 10), //expira em 10 minutos (60 * 10)
                            path: '/',
                        });

                        tagEvent(data?.data?.data?.reservationLoc, false);
                        router.push("/order");
                        setModalResponse(null);
                    }
                }
                //setLoading(false);
            }

        } catch (error: any) {
            setDisableButton(false);
            if (error?.response?.status === 400) {
                // setCheckoutResponse(error.response);
                // setModalContent('error');
                // setReadyPayment(false);
                //setLoading(false);
            }
        }
    }

    function ScrollTop() {
        window.scrollTo(0, 0);
    }

    const handleNext = () => {
        // ScrollTop();

        if (stepCtrl !== 2) {
            setStepCtrl(stepCtrl + 1);
        } else {
            createPayment();
        }
    };

    useEffect(() => {
        var products: any = [];

        cart.dados.forEach((elem: any) => {
            products.push({
                item_name: elem.productName,
                item_id: elem.productCode,
                price: elem.price,
                affiliation: 'Parque Caracol',
                item_brand: 'Parque Caracol',
                category: elem.productType === 1 ? "Tour" : elem.productType === 2 ? "Transfer" : elem.productType === 4 ? "Ticket" : "",
                currency: "BRL",
                quantity: (Number(elem.adults) + Number(elem.childs) + Number(elem.elders) + Number(elem.infants) + Number(elem.student)),
                variant: `Adultos - ${elem.adults} | Crianças - ${elem.childs} | Idosos - ${elem.elders} | Infantos - ${elem.infants} | Estudantes - ${elem.student}`
            })
        });

        TagManager.dataLayer({
            dataLayer: {
                event: 'begin_checkout',
                currency: "BRL",
                value: cart.totalCart,
                coupon: cart?.cupom?.code,
                items: products
            }
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>

            <Head>
                <title>Checkout - {process.env.NEXT_PUBLIC_CLIENT_NAME}</title>
                <meta
                    name="description"
                    content="Reserve seus passeios nos melhores Destinos do Brasil na Destinow. Encontre as melhores atrações turísticas, passeios, excursões, tours e ingressos aqui."
                />
                <meta name="googlebot" content={process.env.NEXT_PUBLIC_SERVER_ROBOTS} />

                {/* Essential META Tags */}
                <meta property="og:title" content={`Checkout - ${process.env.NEXT_PUBLIC_CLIENT_NAME}`} />
                <meta property="og:type" content="TravelAgency" />
                <meta property="og:image" content={`${process.env.NEXT_PUBLIC_SERVER_URL_API}${process.env.NEXT_PUBLIC_CLIENT_LOGO}`}/>
                <meta property="og:url" content={process.env.NEXT_PUBLIC_SERVER_URL} />

                {/* Non-Essential, But Recommended */}
                <meta property="og:site_name" content={process.env.NEXT_PUBLIC_CLIENT_NAME} />

                Non-Essential, But Required for Analytics
                <meta property="fb:app_id" content="your_app_id" />

                <meta name="robots" content={process.env.NEXT_PUBLIC_SERVER_ROBOTS} />
                <link rel="canonical" href={process.env.NEXT_PUBLIC_SERVER_URL_API} />
                <link rel="icon" href={process.env.NEXT_PUBLIC_SERVER_ICON} />

            </Head>
            <script src="https://securegtm.despegar.com/risk/fingerprint/statics/track-min.js" type="text/javascript" org_id={process.env.NEXT_PUBLIC_ORG_ID} id="deviceId_fp" async={true} ></script>

            <div className='container_content'>
                {
                    stepCtrl !== 3
                        ?
                        <div className={`grid grid-cols-12 row_controll ${styles.steps_guide}`}>
                            <div className="col-span-12" >
                                <div className="steps flex items-center pb-1 px-0 col">
                                    <div
                                        className={
                                            stepCtrl >= 0 ? `${styles.stepline} ${styles.complete}` : `${styles.stepline}`
                                        }
                                    ></div>
                                    <div className={`${styles.step} ${styles.complete}`}>
                                        <span className={styles.step_icon}>
                                            {stepCtrl >= 0
                                                ? <>{IconCheck} </>
                                                : <>{IconCircle}</>
                                            }
                                        </span>
                                        <br />
                                        <span className={`${styles.span_text} ${styles.complete}`}> {dic?.bookingDetails}
                                        </span>
                                    </div>
                                    <div
                                        className={
                                            stepCtrl > 0 ? `${styles.stepline} ${styles.complete}` : `${styles.stepline}`
                                        }
                                    ></div>
                                    <div className={stepCtrl > 0 ? `${styles.step} ${styles.complete}` : `${styles.step}`}>
                                        <span className={styles.step_icon}>
                                            {stepCtrl > 0
                                                ? <>{IconCheck} </>
                                                : <>{IconCircle}</>
                                            }
                                        </span>
                                        <br />
                                        <span className={stepCtrl > 0 ? `${styles.span_text} ${styles.complete}` : `${styles.span_text}`}>
                                            {dic?.purchaseAddress}
                                        </span>
                                    </div>
                                    <div
                                        className={
                                            stepCtrl > 1 ? `${styles.stepline} ${styles.complete}` : `${styles.stepline}`
                                        }
                                    ></div>
                                    <div className={stepCtrl > 1 ? `${styles.step} ${styles.complete}` : `${styles.step}`}>
                                        <span className={styles.step_icon}>
                                            {stepCtrl > 1
                                                ? <>{IconCheck} </>
                                                : <>{IconCircle}</>
                                            }
                                        </span>
                                        <br />
                                        <span className={stepCtrl > 1 ? `${styles.span_text} ${styles.complete}` : `${styles.span_text}`}>
                                            {dic?.paymentDetails}
                                        </span>
                                    </div>
                                    <div
                                        className={
                                            stepCtrl > 2 ? `${styles.stepline} ${styles.complete}` : `${styles.stepline}`
                                        }
                                    ></div>
                                </div>
                            </div>
                        </div>
                        :
                        <></>
                }
                <div className="grid grid-cols-12 row_controll">
                    {/*  Col 8 */}
                    <div className={stepCtrl !== 3 ? `col-span-12 lg:col-span-8  px-4` : `col-span-12 `} >
                        {stepCtrl === 0 ? (
                            <div className="subtitle">
                                <h2 className={styles.text_custom}>
                                    {dic?.whereSendTheConfirm}
                                </h2>
                                <span className={styles.security}>
                                    {IconLockAlt}
                                    <p className='ml-2 mb-0'>{dic?.fastPayment}</p>
                                </span>

                                <CheckoutStepBook
                                    action={handleNext}
                                    checkoutObjectData={checkoutObjectData}
                                    setCheckoutObjectData={setCheckoutObjectData}
                                />
                            </div>
                        ) : (
                            ""
                        )}

                        {stepCtrl === 1 ? (
                            <div className="step-two">
                                <h5 className={styles.text_custom}>
                                    {dic?.billingAddress}
                                </h5>
                                <span className={styles.security}>
                                    {IconLockAlt}
                                    <p className='ml-2 mb-0'>{dic?.fastPayment}</p>
                                </span>

                                <CheckoutStepData
                                    action={handleNext}
                                    back={setStepCtrl}
                                    scrollTop={ScrollTop}
                                    checkoutObjectData={checkoutObjectData}
                                    setCheckoutObjectData={setCheckoutObjectData}
                                />
                            </div>
                        ) : (
                            ""
                        )}

                        {stepCtrl === 2 ? (
                            <div className="subtitle">
                                <h5 className={styles.text_custom}>{dic?.billingAddress}
                                </h5>
                                <span className={styles.security}>
                                    {IconLockAlt}
                                    <p className='ml-2 mb-0'>{dic?.criptoPayment}</p>
                                </span>

                                <CheckoutStepPayment
                                    action={handleNext}
                                    back={setStepCtrl}
                                    scrollTop={ScrollTop}
                                    setModalResponse={setModalResponse}
                                    checkoutObjectData={checkoutObjectData}
                                    setCheckoutObjectData={setCheckoutObjectData}
                                    paymentType={paymentType}
                                    setPaymentType={setPaymentType}
                                    disableButton={disableButton}
                                    setDisableButton={setDisableButton}
                                />
                            </div>
                        ) : (
                            ""
                        )}

                    </div>
                    {/*  Col 8 */}
                    <div className={stepCtrl !== 3 ? `col-span-12 lg:col-span-4  px-4` : `col-span-12 `} >
                        <DynamicCheckoutSummaryReservation />
                    </div>
                </div>


            </div>
            <Modal
                btnClose={false}
                showModal={modalShow}
                setShowModal={setModalShow}
            >
                <div
                    style={{ minHeight: '520px' }}
                    className={`${styles.modal_body} rounded-lg bg-white w-full py-4 px-6 flex flex-col justify-evenly items-center`}
                >
                    <CheckoutModalPayment
                        pix={paymentType === 96 || paymentType === 110 ? true : false}
                        modalLog={modalLog}
                        setModalLog={setModalLog}
                        checkoutResponse={checkoutResponse}
                        setModalShow={setModalShow}
                    />
                </div>
            </Modal>
        </>
    )
}

export default Checkout