/* eslint-disable react/jsx-no-undef */
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from "react-hook-form";
import Image from "next/image";
import { parseCookies, destroyCookie, setCookie } from 'nookies';
import styles from './CheckoutStepPayment.module.css'
import CheckoutPaymentCreditCard from '../CheckoutPayment/CheckoutPaymentCreditCard/CheckoutPaymentCreditCard';
import CheckoutPaymentPix from '../CheckoutPayment/CheckoutPaymentPix/CheckoutPaymentPix';
import { IconCreditCard, IconPix } from '@/assets/icons';
import picpay from "@/assets/icons/picpay_logo.png";
import useAppData from '@/data/hooks/useCartData';
import usekoin from '@/data/hooks/useKoin';
import { useParams } from 'next/navigation';
import { getDictionary } from '@/dictionaries';

declare module 'react' {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
        // extends React's HTMLAttributes
        org_id?: string;
    }
}

declare global {
    interface Window {
        koinSessionId?: any;
        getSessionID?: any;
        SESSION_COOKIE_NAME?: any;
    }
}

let koinId: any = undefined;

export interface propAction {
    action: any,
    back: any,
    scrollTop: any,
    setModalResponse: any,
    checkoutObjectData: any,
    setCheckoutObjectData: any,
    paymentType: any,
    setPaymentType: any,
    disableButton: any,
    setDisableButton: any,
};


const CheckoutStepPayment: React.FC<propAction> = ({
    action, back, scrollTop, setModalResponse, checkoutObjectData, setCheckoutObjectData, paymentType, setPaymentType, disableButton, setDisableButton
}: propAction) => {
    const { cart, addCheckoutStepPayment } = useAppData();
    //const newGetKoin = useKoin();

    const [hasForeign, setHasForeign] = useState<boolean>(false);


    const [dic, setDic] = useState<any>(null);
    const searchParams = useParams();

    useEffect(() => {
        const fetchDictionary = async () => {
            const dictionary = await getDictionary(searchParams.lng as "pt" | "en" | "es", 'checkout');
            setDic(dictionary);
        };

        fetchDictionary();

    }, [searchParams.lng])



    const {
        control,
        handleSubmit,
        getValues,
        formState: { errors },
        setError,
        clearErrors,
        setValue,
    } = useForm();

    useEffect(() => {
        //let data: any = getValues();
        if (checkoutObjectData?.brand) {
            setValue('brand', checkoutObjectData?.brand)
        }

        setValue('number', checkoutObjectData?.cardNumber ? checkoutObjectData?.cardNumber : '');
        setValue('cvc', checkoutObjectData?.cvc ? checkoutObjectData?.cvc : '');
        setValue('expiry', checkoutObjectData?.expiry ? checkoutObjectData?.expiry : '');
        setValue('titular', checkoutObjectData?.titular ? checkoutObjectData?.titular : '');
        setValue('cpfTitular', checkoutObjectData?.docNumber ? checkoutObjectData?.docNumber : '');

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const validateCpf = (strCPF: any) => {
        var Soma;
        var Resto;
        Soma = 0;
        if (strCPF === "00000000000") return false;

        for (var i: any = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto === 10) || (Resto === 11)) Resto = 0;
        if (Resto !== parseInt(strCPF.substring(9, 10))) return false;

        Soma = 0;
        for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto === 10) || (Resto === 11)) Resto = 0;
        if (Resto !== parseInt(strCPF.substring(10, 11))) return false;
        return true;
    }

    const checkValidation = (data: any) => {
        clearErrors();

        let pass: boolean = true;

        if (data.titular?.split(' ').length <= 1 || data.titular?.split(' ')[1] === '') {
            setError(`titular`, { type: 'custom', message: `Favor adicionar nome e sobrenome` });
            pass = false;
        }

        if (data.number?.length < 16) {
            setError(`number`, { type: 'custom', message: `Número do cartão inválido` });
            pass = false;
        }

        if (data.brand === '' || data.brand === undefined || data.brand === null) {
            alert("Bandeira do cartão não reconhecida. Favor digitar número do cartão novamente.")
            setValue('number', '');
            pass = false;
        }

        /* Data de Vencimento */
        var d = new Date(),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        if (data.expiry.split('/').reverse().join('') < `${year}${month}`) {
            setError(`expiry`, { type: 'custom', message: `Cartão vencido` });
            pass = false;
        }
        /* [END] Data de Vencimento */

        /* Validação cpf */

        if (hasForeign === false) {
            if (validateCpf(data.cpfTitular.replaceAll(/(\.|\-|\_)/g, '')) === false) {
                setError(`cpfTitular`, { type: 'custom', message: `Cpf inválido` });
                pass = false;
            }
        }

        /* [END] Validação cpf */

        return pass;
    }

    const createObjectToPayment = (data: any, sessionId: any) => {
        data.payment = paymentType;

        let check = false

        if (paymentType === 96 || paymentType === 110) {
            check = true;
        } else if (paymentType === 1) {
            check = checkValidation(data);
        }

        if (check === true) {
            setModalResponse(true);

            let today = new Date();
            let dd = String(today.getDate()).padStart(2, '0');
            let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            let yyyy = today.getFullYear();

            let todayFoPayment = yyyy + '-' + mm + '-' + dd;

            let docNumber: string;

            if (paymentType === 96 || paymentType === 110) {
                docNumber = cart.dados[0].passengers[0].DocumentNumber
            } else {
                docNumber = cart.Country === "BR" ? data.cpfTitular : cart.dados[0].passengers[0].DocumentNumber//hasForeign === false ? data.cpfTitular : cart.dados[0].passengers[0].DocumentNumber
            }

            setCheckoutObjectData({
                ...checkoutObjectData,
                paymentType: paymentType,
                cardNumber: data.number,
                docNumber: docNumber,
                cvc: data.cvc,
                expiry: data.expiry,
                titular: data.titular,
                brand: data.brand,
            });

            let payments = [{
                brand: data.brand,
                cardNumber: data.number,
                codeVerifier: data.cvc,
                DocumentNumber: docNumber.replaceAll(/(\.|\-)/g, ''),
                SessionIdKoin: sessionId,
                datePayment: todayFoPayment,
                expiration: data.expiry,
                holder: data.titular,
                MerchantPayMethod: paymentType === 1 ? 1 : paymentType === 110 ? 8 : 2,
                valor: '',
                payMethod: paymentType,
                merchant: '0',
                refCode: '',
                installments: paymentType === 96 || paymentType === 110 ? 1 : parseInt(data.installments || '1'),
            }];

            addCheckoutStepPayment?.(payments);
            action(data);
        }
    }

    const getKoin = async () => {
        if (koinId !== undefined) {
            console.log('1')
            return window.koinSessionId;
        } else {
            console.log('2')
            if (!!window?.getSessionID) {
                console.log('3')
                destroyCookie(null, window.SESSION_COOKIE_NAME);
                let koin: string = ' ';
                await new Promise((resolve: any) => {
                    console.log('4')
                    window.getSessionID(function (sessionId: any) {
                        window.koinSessionId = sessionId;
                        const cookies = parseCookies();
                        koin = cookies[window.SESSION_COOKIE_NAME] === sessionId ? sessionId : ' ';
                        resolve();
                    });
                });
                return koin;
            } else {
                console.log('5')
                return ' ';
            }
        }
    }

    const onSubmit = async (data: any) => {
        if (disableButton) { //evita multiplas chamadas
            return;
        }

        setDisableButton(true);
        if (data.brand === '' || data.brand === 'unknown') {
            //alertar erro de bandeira
        } else {
            let koin = await usekoin()//newGetKoin
            //let koinValue = await getKoin();

            createObjectToPayment(data, koin);
        }
    }

    useEffect(() => {
        for (let i = 0; i < cart.dados?.length; i++) {
            if (cart.dados[i].passengers[0].isForeign === 1) {
                setHasForeign(true);
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const PaymentsMethods = () => {
        return (
            <>
                {
                    paymentType === 1
                        ?
                        <CheckoutPaymentCreditCard
                            control={control}
                            errors={errors}
                            setValue={setValue}
                            getValues={getValues}
                        />
                        :
                        paymentType === 96
                            ?
                            <CheckoutPaymentPix />
                            :
                            <></>
                }
            </>
        )
    }

    return (
        <>
            <div className='step-general'>
                <div className={styles.warning}>{dic?.mandatoryCompletion}</div>
                <form noValidate onSubmit={handleSubmit(onSubmit)} autoComplete="false">
                    <div className={styles.accordion} >
                        <div>
                            <h6 className={styles.title_payments}>{dic?.paymentMethods}</h6>
                        </div>
                        <div className="grid grid-cols-12 row_controll">
                            {/*  Col 12 */}
                            <div className="col-span-12 mx-3 mb-6" >
                                <div className={paymentType === 1 ? `${styles.form_radio} ${styles.selected}` : `${styles.form_radio} `} onClick={() => { setPaymentType(1) }}>
                                    <div className="flex items-center">
                                        <Controller
                                            control={control}
                                            name="payment"
                                            render={({ field }: any) => (
                                                <input
                                                    {...field}
                                                    checked={paymentType === 1}
                                                    type="radio"
                                                    variant="standard"
                                                    margin="normal"
                                                    value="1"
                                                    required
                                                    className="form-check-input mx-2  my-0"
                                                />
                                            )}
                                        />
                                        <label className="mb-0">
                                            {dic?.creditCard}
                                        </label>
                                    </div>
                                    <div className={`${styles.bgIconCheckout}`}>
                                        {IconCreditCard(22, 22)}
                                    </div>
                                </div>
                            </div>

                            {
                                cart?.Country === "BR"
                                    ?
                                    <div className="col-span-12 mx-3 mb-6" >
                                        <div className={paymentType === 96 ? `${styles.form_radio} ${styles.selected}` : `${styles.form_radio} `} onClick={() => { setPaymentType(96) }}>
                                            <div className="flex items-center">
                                                <Controller
                                                    control={control}
                                                    name="payment"
                                                    render={({ field }: any) => (
                                                        <input
                                                            {...field}
                                                            checked={paymentType === 96}
                                                            type="radio"
                                                            variant="standard"
                                                            margin="normal"
                                                            value="96"
                                                            required
                                                            className="form-check-input mx-2 my-0"
                                                        />
                                                    )}
                                                />
                                                <label className="mb-0">
                                                    {dic?.pixPayment}
                                                </label>
                                            </div>
                                            <div className={`${styles.bgIconCheckout}`}>
                                                {IconPix(24, 24)}
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    ""
                            }
                            {/* <div className="col-span-12 mx-3 mb-6" >
                                <div className={paymentType === 110 ? `${styles.form_radio} ${styles.selected}` : `${styles.form_radio} `} onClick={() => { setPaymentType(110) }}>
                                    <div className="flex items-center">
                                        <Controller
                                            control={control}
                                            name="payment"
                                            render={({ field }: any) => (
                                                <input
                                                    {...field}
                                                    checked={paymentType === 110}
                                                    type="radio"
                                                    variant="standard"
                                                    margin="normal"
                                                    value="110"
                                                    required
                                                    className="form-check-input mx-2 my-0"
                                                />
                                            )}
                                        />
                                        <label className="mb-0">
                                            {dic?.picpayPayment}
                                        </label>
                                    </div>
                                    <div className={`${styles.bgIconCheckout}`}>
                                        <Image src={picpay} alt="logotipo picpay" width={24} height={24} />
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>

                    <PaymentsMethods />

                    <div className={styles.bg_checkout_back_next}>
                        <div className="flex items-center">
                            <p onClick={() => { scrollTop(); back(1); }}>
                                {dic?.prevScreen}
                            </p>
                        </div>
                        {
                            paymentType !== 0
                                ?
                                <div>
                                    <button type="submit" disabled={false/* disableButton */} className="btn btn-primary">
                                        {dic?.confirmPayment}
                                    </button>
                                </div>
                                :
                                <></>
                        }
                    </div>
                </form>
            </div>
        </>
    )
}

export default CheckoutStepPayment