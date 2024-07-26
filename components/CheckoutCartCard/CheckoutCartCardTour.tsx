import { IconCalendarAlt, IconClock, IconFriends, IconTrash, IconWatchAlt } from "@/assets/icons";
import React, { useEffect, useState } from "react";


// import GetPickups from "../../../../C2Points/GetPickups";
import GetPickups from "../base/DestPoints/GetPickups";

import styles from './CheckoutCartCard.module.css'
import GetPickupsSIG from "../base/DestPoints/GetPickupsSIG";
import useAppData from "@/data/hooks/useCartData";
import { useParams } from "next/navigation";
import { getDictionary } from "@/dictionaries";

export interface propCard {
    item: any;
    invertDate: any;
    addPickup: any;
    pickupSelect: any;
    amount: any;
    alert: any;
    index: any;
    setUpdateCart: any;
    updateCart: any;
}


const CheckoutCartCardTour: React.FC<propCard> = ({
    item,
    invertDate,
    addPickup,
    pickupSelect,
    amount,
    alert,
    index,
    setUpdateCart,
    updateCart
}: propCard) => {
    const { cart, removeItemCart} = useAppData();

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
            <div className={`container_content ${styles.size_card_custom} size-card-custom`}>
                <div className="grid grid-cols-12 gap-1.5 md:gap-x-6">
                    <div className="col-span-4 md:col-span-3">
                        <div
                            className={`${styles.cart_card_image} rounded-xl`}
                            style={{
                                backgroundImage:
                                    item.productType === 1
                                        ?
                                        `url(${item.imagesBaseUrl}medium_${item.imgCart})`
                                        :
                                        item.productType === 4
                                            ?
                                            `url(${item.imagesBaseUrl}/img_tickets/products/${item.imgCart})`
                                            :
                                            `url(${item.imagesBaseUrl}${item.imgCart})`,
                                width: "100%",
                            }}
                        ></div>
                    </div>
                    <div className="col-span-8 md:col-span-9 pl-2 md:pl-0">
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
                    <div className="col-span-12 md:col-start-4 md:col-span-9 pl-0"
                    // xs={12} md={{ span: 9, offset: 3 }}
                    >
                        <div className="flex justify-between md:block mb-3 mb-md-2 mt-2 md:mt-0">
                            <div className=""
                            // xs={6} md={12}
                            >
                                <div className={`${styles.cart_mobile_custom} grid grid-cols-12`}>
                                    <div className="flex content-center items-center mb-2 col-span-6">
                                        <span className="mr-2">
                                            {IconCalendarAlt('#212529', '12.25', '14')}
                                        </span>
                                        <span>{`${dic?.date} ${invertDate(item.date)}`}</span>
                                    </div>
                                    <div className="flex items-center col-span-6 mb-2">
                                        <span className="mr-2">
                                            {IconWatchAlt("#000000", "14px", "14px")}
                                        </span>
                                        <span>{`${dic?.startActiv} ${item.time}`}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-12"
                            // xs={6} md={12}
                            >
                                <div className={`${styles.cart_mobile_custom} grid grid-cols-12`}>
                                    <div className="flex items-center mb-2 col-span-6">
                                        <span className="mr-2">
                                            {IconClock("#000000", "14px", "14px")}
                                        </span>
                                        <span className="text-align-left">{dic?.duration}{item.duration} horas</span>
                                    </div>
                                    <div className="flex items-center justify-end md:justify-start mobile-people-custom mb-2 col-span-6">
                                        <span className="mr-2">
                                            {IconFriends("#000000", "18px", "19px")}
                                        </span>
                                        <span>
                                            {
                                                item.sellingType === 2
                                                    ?
                                                    <>
                                                        {`${(Number(item.adults) + Number(item.childs) + Number(item.infants) + Number(item.elders) + Number(item.student))} ${dic?.people}`}
                                                    </>
                                                    :
                                                    <>
                                                        {parseInt(item.totalPeople) > 1 ? `${item.totalPeople} ${dic?.people}` : `${item.totalPeople} ${dic?.person}`}
                                                    </>
                                            }
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {item.typePickup === '0'
                            ?
                            <>
                                <div className="mb-3 mt-2">
                                    <div>
                                        <h6 className='mt-0'>{dic?.boardingLocal}</h6>
                                    </div>
                                    <div>
                                        <span>{item.meetingPoint}</span>
                                    </div>
                                </div>
                            </>
                            :
                            <>
                                <div className="mb-3">
                                    <div>
                                        <label>
                                            <h6 className="mb-3">
                                                {dic?.chooseBoardingLocal}
                                            </h6>
                                        </label>
                                        {
                                            item.reservationSystem === 99 

                                            ?

                                            <GetPickupsSIG
                                                propsId={item.pickupListId}
                                                actionPickup={addPickup}
                                                alert={alert}
                                                index={index}
                                            />

                                            :

                                            <GetPickups
                                                propsId={item.pickupListId}
                                                actionPickup={addPickup}
                                                alert={alert}
                                                index={index}
                                            />

                                        }
                                        
                                        {/* <Controller
                                                    control={control}
                                                    name="pickup"
                                                    render={({ field }) => {
                                                        // sending integer instead of string.
                                                        return <input {...field} value={pickupSelect} type="hidden" />;
                                                    }}
                                                />
                                                <ErrorMessage
                                                    errors={errors}
                                                    name="pickup"
                                                    render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                                                /> */}
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                </div>

            </div>
            <div>
                <div className={`${styles.rodape} bg-white flex justify-end items-center`}>
                    <div className="h-100 px-3">
                        {/* <h6 className="m-0  text-primary">
                                Modificar data ou número de participantes
                            </h6> */}
                        <h6 className="m-0 font-medium text-white">{`${amount?.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}`}</h6>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CheckoutCartCardTour;

