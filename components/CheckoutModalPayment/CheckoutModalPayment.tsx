/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useCallback } from 'react';
// useRouter
import { useRouter } from 'next/navigation';
import * as signalR from "@microsoft/signalr";
import styles from './CheckoutModalPayment.module.css';
import { IconCheckCircle, IconPix, IconSpinner, IconTimesCircled } from '@/assets/icons';
import { setCookie } from "nookies";
import picpay from "@/assets/icons/picpay_logo.png";
import Image from "next/image";

import TagManager from 'react-gtm-module';
import useAppData from '@/data/hooks/useCartData';
import { useParams } from 'next/navigation';
import { getDictionary } from '@/dictionaries';
import useWindowSize from '@/data/hooks/useWindowSize';

export interface propContent {
    pix: boolean;
    modalLog: any,
    setModalLog: any;
    checkoutResponse: any;
    setModalShow: any;
}

const CheckoutModalPayment: React.FC<propContent> = ({
    pix, modalLog, setModalLog, checkoutResponse, setModalShow
}: propContent) => {
    const size = useWindowSize();
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
    const router = useRouter();

    const [texts, setTexts] = useState<any>();
    const [scanResponse, setScanResponse] = useState<any>(null); // pixSuccess / pixFailed / pixExpired
    const [pixResponse, setPixResponse] = useState<any>();

    const [minutes, setMinutes] = useState<any>(10);
    const [seconds, setSeconds] = useState<any>(0);

    /* const handleClearCart = () => {
        localStorage.removeItem("cartBDA");
    }; */

    useEffect(() => {
        let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(myInterval)
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            }
        }, 1000)
        return () => {
            clearInterval(myInterval);
        };
    });

    useEffect(() => {
        let timer1 = setTimeout(() => setTexts(dic?.modal_loading01), 1000);
        let timer2 = setTimeout(() => setTexts(dic?.modal_loading02), 2000);
        let timer3 = setTimeout(() => setTexts(dic?.modal_loading03), 3000);
        let timer4 = setTimeout(() => setTexts(dic?.modal_loading04), 4000);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
            clearTimeout(timer4);
        };
    }, [dic])

    useEffect(() => {
        if (modalLog === 0 && pix === true) {

            if (!(checkoutResponse.data.log === 1 || checkoutResponse.data.log === '1')) {
                let connection = new signalR.HubConnectionBuilder()
                    .withUrl(process.env.NEXT_PUBLIC_SERVER_URL_API_PIX + '/streaming/')
                    .build();

                tagEvent(checkoutResponse.data.data[0].data.bookingLoc, cart.payments[0].payMethod === 96 ? true : null);

                connection.on(checkoutResponse.data.data[0].data.channelPix, data => {

                    if (data.log === 0) { //success
                        //let info: any = data?.data?.voucherFile;

                        setPixResponse(data);
                        setScanResponse("pixSuccess");

                        let info: any = {
                            "texto": data.texto,
                            "log": data.log
                        }
                        localStorage.setItem('checkoutInfo', JSON.stringify(info));

                        localStorage.setItem('download', JSON.stringify(info));

                        setCookie(null, 'bookloc', data?.data?.reservationLoc, {
                            maxAge: (60 * 10), //expira em 10 minutos (60 * 10)
                            path: '/',
                        });

                        router.push('/order');

                    } else if (data.log === 1) { //error
                        setScanResponse("pixFailed");
                    }
                });

                connection.start().then(function () {
                    connection.invoke('JoinToGroup', checkoutResponse.data.data[0].data.channelPix);
                }).catch(function (err) {
                    return console.error(err.toString());
                });
                let closeChannel = setTimeout(() => {
                    if (scanResponse !== 'pixSuccess' || scanResponse !== 'pixFailed') {
                        setScanResponse("pixExpired");

                        let info: any = {
                            "texto": "Sua pré-reserva está criada e agora a gente vai analisar os dados do seu pagamento.",
                            "log": 2
                        }

                        localStorage.setItem('checkoutInfo', JSON.stringify(info));

                        setCookie(null, 'bookloc', '2', {
                            maxAge: (60 * 10), //expira em 10 minutos (60 * 10)
                            path: '/',
                        });

                        //setModalResponse(null);
                        /* window.location.href = `/order`; */
                        router.push('/order');
                    }
                    connection.stop();
                }, 660000);
                return () => {
                    clearTimeout(closeChannel);
                };
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalLog])

    function copyText() {
        var text_to_copy = (document.getElementById("qrcodelink") as HTMLElement).innerHTML;

        if (!navigator.clipboard) {

        } else {
            navigator.clipboard.writeText(text_to_copy);
        }
    }

    const tagEvent = useCallback((id: any, isPix: any) => {

        var products: any = [];

        cart.dados.forEach((elem: any, index: any) => {
            products.push({
                name: elem.productName,
                id: elem.productCode,
                price: elem.price,
                brand: isPix === false ? cart.payments.brand : isPix === true ? 'PIX' : "Pic Pay",
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

        /* TagManager.dataLayer({
            dataLayer: {
                event: 'compare-purchase',
                ecommerce: {
                    purchase: {
                        actionField: { id: id, revenue: cart.totalCart, type_payment: isPix === false ? "Credit Card" : "PIX" },
                        products: products
                    }
                }
            }
        }); */


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cart.dados, cart.totalCart]);

    // useEffect(() => {
    //     if (modalLog === 0) {
    //         tagEvent(checkoutResponse?.data?.data?.reservationLoc, pix);
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [checkoutResponse, modalLog]);

    if (modalLog === null) {
        return (
            <div className="sucess-pos h-full" id="wrapper" >
                <div className="flex flex-col items-center justify-evenly h-full">
                    <div className="" >
                        <>{IconSpinner}</>
                    </div>
                    <h5>{dic?.modal_finalizingPurchase}</h5>
                    <p>{texts}</p>
                    <button className={`${styles.btn_outline_primary} btn-my-5 mx-auto`} onClick={() => { setModalLog(null); setModalShow(false) }}>
                        {dic?.modal_closeBtn}
                    </button>
                </div>
            </div>
        );
    } else if (modalLog === 0) {

        if (checkoutResponse.data.log === 0 && !pix) { //sucesso cartão
            return (
                <>
                    <div className="sucess-pos h-full" id="wrapper" >
                        <div className="flex flex-col items-center justify-evenly h-full">
                            <div className="" >
                                <>{IconSpinner}</>
                            </div>
                            {/* <h5>{t("modal_finalizingPurchase")}</h5>
                            <p>{texts}</p>
                            <button className={`${styles.btn_outline_primary} btn-my-5 mx-auto`} onClick={() => { setModalLog(null); setModalShow(false) }}>
                                {t("modal_closeBtn")}
                            </button> */}
                        </div>
                    </div>
                </>
            );
        } else if (checkoutResponse.data.log === 1 || checkoutResponse.data.log === '1') { // Erro
            return (
                <div className="flex flex-col justify-around sucess-pos h-full" id="wrapper" >
                    <div className="flex flex-col items-center justify-around">
                        <>{(IconTimesCircled(120, 120))}</>
                    </div>
                    <div className="flex flex-col items-center justify-around">
                        <div className="flex flex-col items-center justify-around text-center">
                            <div>
                                <h5 className='mt-4'>{dic?.modal_error}</h5><br />
                                <p><small >{checkoutResponse.data.texto}</small>
                                    <br />
                                    <br />
                                    {dic?.modal_pixFailed_text03}</p>
                            </div>
                        </div>
                    </div>
                    <div className='modal-btn-controller flex flex-col items-center'>
                        <button className={`${styles.btn_outline_primary} my-5 mx-auto`} onClick={() => { setModalLog(null); setModalShow(false) }}>
                            {dic?.modal_closeBtn}
                        </button>
                    </div>
                </div>

            );
        } else if (pix === true) { //sucesso pix
            const pixInfo = checkoutResponse.data.data[0].data;
            const isPicpay: boolean = checkoutResponse.data?.data[0]?.data?.merchantPayMethod === 8;

            if (scanResponse === null && !isPicpay) {
                return (
                    <>
                        <div className={styles.pix_container}>
                            {IconPix(24, 24)}
                            <h6>{dic?.modal_pixText01}</h6>
                            <p className='text-center my-3'>{dic?.modal_pixText02}</p>
                            {size.width >= 768 &&
                                <>
                                    <h4 className={styles.pix_pay_with_text}>{dic?.modal_qrCode}</h4>
                                    <Image
                                        style={{ width: '60%' }}
                                        src={("data:image/png;base64," + pixInfo.urlQrCode).toString()}
                                        className="qr-code"
                                        alt="QR Code"
                                        width={500}
                                        height={500}
                                    />
                                    <div className={styles.pix_separator}>
                                        <hr />
                                        <p className={styles.pix_separator_text}>{dic?.modal_or}</p>
                                    </div>
                                </>
                            }
                            <h4 className={styles.pix_copy_paste_title}>{dic?.modal_pixCopy} {"&"} {dic?.modal_pixPaste}</h4>
                            <div className={styles.pix_copy_paste}>
                                <p id="qrcodelink" className={`${styles.qrcode_link} text-center`}>{pixInfo.urlCopyAndPaste}</p>
                                <button className={`btn text-uppercase ${styles.pix_copy_paste_button}`} onClick={copyText}><strong>{dic?.modal_copyBtn}</strong></button>
                            </div>

                            <p className='text-center'>{dic?.modal_expire}<br />
                                {minutes === 0 && seconds === 0
                                    ? null
                                    : <h2 className={styles.pix_expire_time}> {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h2>
                                }
                            </p>

                            <div className='flex items-center justify-center mt-4'>
                                <button onClick={() => setModalShow(false)} className='btn btn-primary'>Fechar</button>
                            </div>
                        </div>
                    </>
                );
            } else if (scanResponse === null && isPicpay) {
                return (
                    <>
                        <div className="pix-container flex justify-center items-center flex-col mt-3">
                            <Image
                                src={picpay}
                                alt=""
                                className="mb-4"
                                width={50}
                                height={50}
                            />
                            <h6>{dic?.modal_picpayText01}</h6>
                            <p className='text-center my-3'>{dic?.modal_picpayText02}</p>
                            <h4 className={styles.pix_pay_with_text}>{dic?.modal_qrCode}</h4>

                            <Image
                                src={(pixInfo?.urlQrCode).toString()}
                                className="qr-code"
                                alt="QR Code"
                                width={300}
                                height={300}
                            />

                            {window.innerWidth <= 768
                                &&
                                <>
                                    <div className="flex justify-center items-center">
                                        <a href={pixInfo?.paymentUrl}><button className="btn btn-primary">Abrir no app</button></a>
                                    </div>
                                </>
                            }

                            <p className="flex justify-center items-center flex-col mt-3">
                                {dic?.modal_expire}
                                <br />
                                {minutes === 0 && seconds === 0 ? null : (
                                    <h2 className={styles.pix_expire_time}>
                                        {" "}
                                        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                                    </h2>
                                )}
                            </p>

                            <div className='flex items-center justify-center mt-4'>
                                <button onClick={() => setModalShow(false)} className='btn btn-primary'>Fechar</button>
                            </div>

                        </div>
                    </>
                );
            } else if (scanResponse === "pixSuccess") {
                return (
                    <>
                        <div className="sucess-pos h-full" id="wrapper" >
                            <div className="flex flex-col items-center justify-evenly h-full">
                                <div className="" >
                                    <>{IconSpinner}</>
                                </div>
                                {/* <h5>{t("modal_finalizingPurchase")}</h5>
                                <p>{texts}</p>
                                <button className={`${styles.btn_outline_primary} btn-my-5 mx-auto`} onClick={() => { setModalLog(null); setModalShow(false) }}>
                                    {t("modal_closeBtn")}
                                </button> */}
                            </div>
                        </div>
                    </>
                );
            } else if (scanResponse === "pixFailed") {
                return (
                    <>
                        <div className="sucess-pos" id="wrapper" >
                            <div className="text-center">
                                <>{(IconTimesCircled(120, 120))}</>
                                <h4 className='mt-4'>{dic?.modal_pixFailed_text01}</h4>
                                <p>{dic?.modal_pixFailed_text02}<br />
                                    {checkoutResponse.data.texto}
                                    {/* Richard */}
                                    {dic?.modal_pixFailed_text03} {/* <a href="mailto:sac@bondinho.com.br">sac@bondinho.com.br</a> */}</p>
                            </div>
                            <div className='modal-btn-controller'>
                                <button className={`${styles.btn_outline_primary} btn-my-5 mx-auto`} onClick={() => { setModalShow(false) }}>
                                    {dic?.modal_closeBtn}
                                </button>
                            </div>
                        </div>
                    </>
                );
            } else if (scanResponse === "pixExpired") {
                return (
                    <>
                        <div className="sucess-pos" id="wrapper" >
                            <div className="text-center flex flex-col items-center">
                                <>{(IconTimesCircled(120, 120))}</>
                                <div>
                                    <h4 className='mt-4'>{dic?.modal_expired}</h4>
                                    <p className="mb-0"><small>{dic?.modal_expiredWarning}</small></p>
                                </div>
                            </div>
                            <div className='modal-btn-controller flex'>
                                <button className="btn btn-outline-primary my-5 mx-auto" onClick={() => { /* resetCart() */ }}>
                                    {dic?.modal_closeBtn}
                                </button>
                            </div>
                        </div>
                    </>
                );
            } else {
                return (<></>);
            }
        } else {
            return (<></>);
        }

    } else if (modalLog === 1) {
        return (
            <div className="flex flex-col justify-around sucess-pos h-full" id="wrapper" >
                <div className="flex flex-col items-center justify-around">
                    <>{(IconTimesCircled(120, 120))}</>
                </div>
                <div className="flex flex-col items-center justify-around">
                    <div className="flex flex-col items-center justify-around text-center">
                        <div>
                            <h5 className='mt-4'>{dic?.modal_pixFailed_text01}</h5><br />
                            <p><small >{checkoutResponse.data.texto}</small>
                                <br />
                                <br />
                                {dic?.modal_pixFailed_text03}</p>
                        </div>
                    </div>
                </div>
                <div className='modal-btn-controller flex flex-col items-center'>
                    <button className={`${styles.btn_outline_primary} my-5 mx-auto`} onClick={() => { setModalLog(null); setModalShow(false) }}>
                        {dic?.modal_closeBtn}
                    </button>
                </div>
            </div>
        );
    } else {
        return (<></>)
    }
}

export default CheckoutModalPayment;