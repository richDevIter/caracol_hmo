import { IconCalendarAlt, IconClock, IconFriends, IconTrash, IconWatchAlt } from "@/assets/icons";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";

// import GetPickups from "../../../../C2Points/GetPickups";
import GetPickups from "../base/DestPoints/GetPickups";

import styles from './CheckoutCartCard.module.css'
import useAppData from "@/data/hooks/useCartData";
import useConsoleLog from "@/data/hooks/useConsoleLog";
import GetPickupsSIG from "../base/DestPoints/GetPickupsSIG";

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


const CheckoutCartCardCombo: React.FC<propCard> = ({
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
    const { cart, removeItemCart } = useAppData();

    const searchParams = useParams();
    const lng: string = searchParams.lng === "pt" ? "BR" : searchParams.lng === "en" ? "EN" : searchParams.lng === "es" ? "ES" : 'BR';

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
                                <span style={{ cursor: 'pointer' }} onClick={() => { removeItemCart?.(item), setUpdateCart(!updateCart) }}>
                                    {IconTrash}
                                </span>
                            </div>
                        </div>
                        <hr />
                    </div>
                    <div className="col-span-12 md:col-start-4 md:col-span-9 pl-0">
                        {item.comboObject.map((comboObjectElem: any, comboObjectIndex: number) => {
                            return (
                                <>
                                    {comboObjectIndex !== 0 && <hr />}
                                    <div className="my-2">
                                        <h5>{comboObjectElem.modalityName}</h5>
                                    </div>
                                    <div className="flex justify-between md:block mb-3 mb-md-2 mt-2 md:mt-0">
                                        <div className="">
                                            <div className={`${styles.cart_mobile_custom} grid grid-cols-12`}>
                                                <div className="flex content-center items-center mb-2 col-span-6">
                                                    <span className="mr-2">
                                                        {IconCalendarAlt('#212529', '12.25', '14')}
                                                    </span>
                                                    <span>{`Data ${invertDate(comboObjectElem.date)}`}</span>
                                                </div>

                                                <div className="flex items-center justify-end md:justify-start mobile-people-custom mb-2 col-span-6">
                                                    <span className="mr-2">
                                                        {IconFriends("#000000", "18px", "19px")}
                                                    </span>
                                                    <span>
                                                        {/*  {
                                                            comboObjectElem.sellingType === 2
                                                                ?
                                                                <> */}
                                                        {`${(Number(comboObjectElem.qtdAdulto) + Number(comboObjectElem.qtdChild) + Number(comboObjectElem.qtdInfant) + Number(comboObjectElem.qtdElders) + Number(comboObjectElem.qtdStudents))} pessoas`}
                                                        {/*  </>
                                                                :
                                                                <>
                                                                    {parseInt(comboObjectElem.totalPeople) > 1 ? `${comboObjectElem.totalPeople} ${t("people")}` : `${comboObjectElem.totalPeople} ${t("person")}`}
                                                                </>
                                                        } */}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-span-12">
                                            <div className={`${styles.cart_mobile_custom} grid grid-cols-12`}>
                                                {/* <div className="flex items-center mb-2 col-span-6">
                                                    <span className="mr-2">
                                                        {IconClock("#000000", "14px", "14px")}
                                                    </span>
                                                    <span className="text-align-left">{t("duration")}{item.duration} horas</span>
                                                </div> */}
                                                {
                                                    comboObjectElem.time
                                                        ?
                                                        <div className="flex items-center col-span-6 mb-2">
                                                            <span className="mr-2">
                                                                {IconWatchAlt("#000000", "14px", "14px")}
                                                            </span>
                                                            <span>{`Início da atividade ${comboObjectElem.time}`}</span>
                                                        </div>
                                                        :
                                                        <></>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    {comboObjectElem.pickupListId !== '0'
                                        ?
                                        <>
                                            <div className="mb-3">
                                                <div>
                                                    <label>
                                                        <h6 className="mb-3">
                                                            Local de embarque
                                                        </h6>
                                                    </label>
                                                    {
                                                        comboObjectElem.reservationSystem === 99
                                                            ?
                                                            <GetPickupsSIG
                                                                propsId={comboObjectElem.pickupListId}
                                                                actionPickup={addPickup}
                                                                alert={alert}
                                                                index={index}
                                                            />
                                                            :
                                                            <GetPickups
                                                                propsId={comboObjectElem.pickupListId}
                                                                actionPickup={addPickup}
                                                                alert={alert}
                                                                index={index}
                                                                comboObjectIndex={comboObjectIndex}
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
                                        :
                                        <>
                                            <div className="mb-3 mt-2">
                                                <div>
                                                    <h6 className='mt-0'>Local de embarque</h6>
                                                </div>
                                                <div>
                                                    <span>{comboObjectElem.meetingPoint}</span>
                                                </div>
                                            </div>
                                        </>
                                    }
                                </>
                            )
                        })}
                    </div >
                </div >

            </div >
            <div>
                <div className={`${styles.rodape} bg-white flex justify-end items-center`}>
                    <div className="h-100 px-3">
                        {/* <h6 className="m-0  text-primary">
                                Modificar data ou número de participantes
                            </h6> */}
                        <h6 className="m-0 font-medium">{`${amount?.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}`}</h6>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CheckoutCartCardCombo;

