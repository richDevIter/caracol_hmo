import React, { useEffect, useState } from "react";



import styles from './CheckoutCartCard.module.css';
import { IconCalendarAlt, IconClock, IconFriends, IconTrash, IconWatchAlt } from "@/assets/icons";
import useAppData from "@/data/hooks/useCartData";
import { useParams } from "next/navigation";
import { getDictionary } from "@/dictionaries";

export interface propCard {
    item: any;
    invertDate: any;
    addPickup: any;
    pickupSelect: any;
    amount: any;
    setUpdateCart: any;
    updateCart: any;
}

const CheckoutCartCardTicket: React.FC<propCard> = ({
    item, invertDate, addPickup, pickupSelect, amount, setUpdateCart, updateCart
}) => {
    const { cart, removeItemCart } = useAppData();

   

    const [dic, setDic] = useState<any>(null);
    const searchParams = useParams();

    useEffect(() => {
        const fetchDictionary = async () => {
            const dictionary = await getDictionary(searchParams.lng as "pt" | "en" | "es", 'cart');
            setDic(dictionary);
        };
    
        fetchDictionary();
    
    }, [searchParams.lng])

    const lng = searchParams.lng === "pt" ? "BR" : searchParams.lng === "en" ? "EN" : searchParams.lng === "es" ? "ES" : 'BR';

    return (
        <>
            <div className={`${styles.size_card_custom} container`}>
                <div className="grid grid-cols-12 gap-1.5 md:gap-x-6">
                    <div className="col-span-4 md:col-span-3 xs:col-span-4 mobile-img-custom">
                        <div
                            className={`${styles.cart_card_image} grid grid-cols-12`}
                            style={{
                                backgroundImage:
                                    item.productType === 1
                                        ?
                                        `url(${item.imagesBaseUrl}/images-products/medium_${item.imgCart})`
                                        :
                                        item.productType === 4
                                            ?
                                            `url(${item.imagesBaseUrl}${item.imgCart})`
                                            :
                                            `url(${item.imagesBaseUrl}${item.imgCart})`,
                                width: "100%",
                            }}
                        ></div>
                    </div>
                    <div className="col-span-8 md:col-span-9 xs:col-span-8 pl-2 md:pl-0">
                        <div className="flex justify-between">
                            <h4>
                                {
                                    lng === "BR"
                                        ?
                                        item.productNameBR
                                        :
                                        lng === "EN"
                                            ?
                                            item.productNameEN
                                            :
                                            lng === "ES"
                                                ?
                                                item.productNameES
                                                :
                                                item.productName
                                }
                            </h4>
                            <div className={`${styles.cart_trash}`}>
                                {/* <FontAwesomeIcon
                                    size={"lg"}
                                    icon={["fal", "trash-alt"]}
                                    onClick={() => { dispatch(removeItemCart(item)) }}
                                    style={{ cursor: 'pointer' }}
                                /> */}
                                <span style={{ cursor: 'pointer' }} onClick={() => {removeItemCart?.(item), setUpdateCart(!updateCart)}}>
                                    {IconTrash}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12 md:col-start-4 md:col-span-9 xs:col-span-12 my-3 mb-md-2 md:mt-0">
                        <div className="grid grid-cols-12 mb-3 mb-md-2">
                            <div className="col-span-6 md:col-span-12">
                                <div className="grid grid-cols-12 mobile-row-custom">
                                    <div className="col-span-12 md:col-span-6 flex items-center mb-2">
                                        <span className="mr-2">
                                            {IconCalendarAlt('#212529', '12.25', '14')}
                                        </span>
                                        <span>{`${dic?.date} ${invertDate(item.date)}`}</span>
                                    </div>
                                    <div className="col-span-12 md:col-span-6 flex items-center min-w-[200px] md:min-w-[100%] mb-2">
                                        <span className="mr-2">
                                            {IconWatchAlt("#000000", "14px", "14px")}
                                        </span>
                                        <span>{`${dic?.startActiv} ${item.time !== null && item.time !== undefined ? item.time : '--:--'}`}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-6 md:col-span-12 xs:col-span-6">
                                <div className="grid grid-cols-12">
                                    <div className="col-span-12 md:col-span-6 flex items-center justify-end md:justify-start mb-2">
                                        <span className="mr-2">
                                            {IconClock("#000000", "14px", "14px")}
                                        </span>
                                        <span className="text-align-left">{dic?.duration}{item.duration} horas</span>
                                    </div>
                                    <div className="col-span-12 md:col-span-6 flex items-center mobile-people-custom justify-end md:justify-start mb-2">
                                        <span className="mr-2">
                                            {IconFriends("#000000", "18px", "19px")}
                                        </span>
                                        <span>{`${(Number(item.adults) + Number(item.childs) + Number(item.infants) + Number(item.elders) + Number(item.student))} ${dic?.people}`}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className={`${styles.rodape} bg-white flex justify-end items-center`}>
                    <div className="flex justify-end items-center h-full px-3">
                        {/* <h6 className="m-0  text-primary">
                            Modificar data ou número de participantes
                        </h6> */}
                        <h6 className="m-0 font-medium text-white">{`${amount.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}`}</h6>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CheckoutCartCardTicket;

