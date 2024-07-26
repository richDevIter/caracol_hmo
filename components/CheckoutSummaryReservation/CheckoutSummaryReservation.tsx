/* eslint-disable @next/next/no-img-element */
import React, { Key, useEffect, useState } from 'react'
import style from './CheckoutSummaryReservation.module.css';
import CheckoutCupom from '../CheckoutCupom/CheckoutCupom';
import { IconTimes } from '@/assets/icons';
import useAppData from '@/data/hooks/useCartData';
import { useParams } from 'next/navigation';
import { getDictionary } from '@/dictionaries';

const CheckoutSummaryReservation = () => {

    const { cart, removeCupomCart } = useAppData();

    const [dic, setDic] = useState<any>(null);
    const searchParams = useParams();

    useEffect(() => {
        const fetchDictionary = async () => {
            const dictionary = await getDictionary(searchParams.lng as "pt" | "en" | "es", 'checkout');
            setDic(dictionary);
        };
    
        fetchDictionary();
    
    }, [searchParams.lng])

    const lng = searchParams.lng === "pt" ? "BR" : searchParams.lng === "en" ? "EN" : searchParams.lng === "es" ? "ES" : 'BR';

    let totalCart: any = 0;
    let actTotal: any = 0;

    return (
        <>
            <div className={`${style.subtitle} ${style.weight_5}`}>
                <h5>{dic?.bookingSummary}</h5>
            </div>
            <div className={`${style.checkout_summary} bg-white`}>
                {
                    cart.dados.map((info: any, index: Key) => {
                        let priceProduct = (
                            (Number(info.adults) * Number(info.priceAdults))
                            + (Number(info.childs) * Number(info.priceChilds))
                            + (Number(info.infants) * Number(info.priceInfants))
                            + (Number(info.elders) * Number(info.priceElders))
                            + (Number(info.student) * Number(info.priceStudent))
                            + (Number(info.globalPeople)) * (Number(info.priceGlobalPeople))
                        );

                        totalCart = Number(totalCart) + (priceProduct - (priceProduct * (info.discount / 100)));

                        actTotal = (Number(info.adults) + Number(info.childs) + Number(info.infants) + Number(info.elders) + Number(info.student));


                        return (
                            <div key={index} className={`${style.card_summary} ${style.card_summary_separator}`}>
                                <div className="grid grid-cols-12 row_controll">
                                    {/*  Col 5 */}
                                    <div className={`col-span-5 pl-4`} >
                                        <div className={style.card_summary_product_image} style={{
                                            backgroundImage:
                                                info.productType === 1
                                                    ?
                                                    `url(${info.imagesBaseUrl}medium_${info.imgCart})`
                                                    :
                                                    info.productType === 4
                                                        ?
                                                        `url(${info.imagesBaseUrl}${info.imgCart})`
                                                        :
                                                        `url(${info.imagesBaseUrl}${info.imgCart})`,

                                        }}></div>

                                    </div>
                                    {/*  Col 7 */}
                                    <div className={`col-span-7 px-4`} >
                                        <h4 className={style.card_summary_product_name}>
                                            {
                                                lng === "BR"
                                                    ?
                                                    info.productNameBR
                                                    :
                                                    lng === "EN"
                                                        ?
                                                        info.productNameEN
                                                        :
                                                        lng === "ES"
                                                            ?
                                                            info.productNameES
                                                            :
                                                            info.productName
                                            }
                                        </h4>
                                    </div>
                                </div>
                                <div className="grid grid-cols-12 row_controll">
                                    <div className={`col-span-12 px-4`} >
                                        {
                                            info.productType === 1
                                                ?
                                                <h5 className={style.card_summary_product_name}>{dic?.boarding}: {info.meetingPoint}</h5>
                                                :
                                                info.productType === 2
                                                    ?
                                                    <h5 className={style.card_summary_product_name}>{dic?.boarding}: {info.commingSource}</h5>
                                                    :
                                                    <></>
                                        }
                                    </div>
                                    <div className={`col-span-6 px-4`} >
                                        <p className={style.card_summary_simple_text}>{dic?.date}: {info?.date.split("-").reverse().join("/")}</p>
                                        <p className={style.card_summary_simple_text}>{dic?.duration}: {info?.duration?.split(":")[0]} {dic?.hours}</p>
                                    </div>
                                    <div className={`col-span-6 px-4`} >
                                        <p className={style.card_summary_simple_text}>{dic?.start}: {info.time}</p>
                                        {

                                            info.productType === 2 && info.sellingType === 1
                                                ?
                                                <p className={style.card_summary_simple_text}>{parseInt(info.totalPeople) > 1 ? `${info.totalPeople} ${dic?.people}` : `${info.totalPeople} ${dic?.person}`}</p>
                                                :
                                                info.productType === 2 && info.sellingType === 2
                                                    ?
                                                    <p className={style.card_summary_simple_text}>{parseInt(info.globalPeople) > 1 ? `${info.globalPeople} ${dic?.people}` : `${info.globalPeople} ${dic?.person}`}</p>
                                                    :
                                                    info.productType === 1 && info.sellingType === 1
                                                        ?
                                                        <p className={style.card_summary_simple_text}>{parseInt(info.globalPeople) > 1 ? `${info.globalPeople} ${dic?.people}` : `${info.globalPeople} ${dic?.person}`}</p>
                                                        :
                                                        info.productType === 1 && info.sellingType === 2
                                                            ?
                                                            actTotal === 1 ?
                                                                <p className={style.card_summary_simple_text}>{`${actTotal} ${dic?.person}`}</p>
                                                                :
                                                                <p className={style.card_summary_simple_text}>{`${actTotal} ${dic?.people}`}</p>
                                                            :
                                                            actTotal === 1 ?
                                                                <p className={style.card_summary_simple_text}>{`${actTotal} ${dic?.person}`}</p>
                                                                :
                                                                <p className={style.card_summary_simple_text}>{`${actTotal} ${dic?.people}`}</p>
                                        }
                                    </div>
                                </div>

                                <div className="grid grid-cols-12 row_controll">
                                    <div className={`col-span-12 px-4`} >
                                        <div className="cancel-summary pb-6">
                                            <h6 className={style.card_summary_free_cancel}>{dic?.freeCancel}</h6>
                                            <p className={style.card_summary_free_cancel_description}>{dic?.untilTwentyFour}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                <div className={`${style.card_summary_separator} py-3`}>
                    <CheckoutCupom />
                </div>
                <div>
                    {
                        cart?.cupom?.type === 2
                            ?
                            <>
                                {/* <div className="bg-cupom-value">
                                    <div className="d-flex justify-content-between w-100">
                                        <small className="d-flex space-between align-items-center">
                                            <p className='mb-0'>
                                                {cart.cupom.codeName}
                                            </p>
                                        </small>
                                        <small className='text-right'>
                                            <span className='mb-0'>
                                                {cart.cupom.value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                                            </span>
                                            <span className='exclude-cupom'
                                                onClick={() => dispatch(removeCupomCart())}>
                                                <FontAwesomeIcon
                                                    icon={["fal", "times"]}
                                                    size="1x"
                                                    style={{ marginLeft: "10px" }}
                                                />
                                            </span>
                                        </small>
                                    </div>
                                </div>
                                <div className="bg-cart-price-total pt-0">
                                    <div>
                                        <p>{dic?.checkout.subtotal")}</p>
                                    </div>
                                    <div>
                                        <p>
                                            R$
                                            <b>{(cart.totalCart.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }).split('R$')[1])}</b>
                                        </p>
                                    </div>
                                </div> */}
                            </>
                            :
                            cart?.cupom?.type === 4
                                ?
                                <>
                                    <div className={` grid grid-cols-12 my-4`}>
                                        <small className="col-span-6 d-flex space-between align-items-center">
                                            <p className='mb-0'>
                                                {cart.cupom.codeName}
                                            </p>
                                        </small>
                                        <small className='col-span-6 flex justify-end items-center'>
                                            <span className='mb-0'>{cart.cupom.value}%</span>
                                            <span className={style.exclude_cupom} onClick={() => { removeCupomCart?.() }/* dispatch(removeCupomCart() */}>
                                                {IconTimes(14, 14)}
                                            </span>
                                        </small>
                                    </div>
                                    <div className="flex justify-between items-end pb-5">
                                        <div>
                                            <p className={style.card_summary_subtotal}>{dic?.subtotal}</p>
                                        </div>
                                        <div>
                                            <p className={style.card_summary_subtotal}>
                                                R$
                                                <b className={style.card_summary_price}>{(Number(cart?.totalCart).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }).split('R$')[1])}</b>
                                            </p>
                                        </div>
                                    </div>
                                </>
                                :
                                <div className="flex justify-between items-end py-7">
                                    <div>
                                        <p className={style.card_summary_subtotal}>{dic?.subtotal}</p>
                                    </div>
                                    <div>
                                        <p className={style.card_summary_subtotal}>
                                            R$
                                            <b className={style.card_summary_price}>{(Number(cart?.totalCart).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }).split('R$')[1])}</b>
                                        </p>
                                    </div>
                                </div>
                    }
                </div>
            </div >

        </>
    )
}

export default CheckoutSummaryReservation