import React, { useEffect, useState } from "react";


import Accordion from "../base/Accordion/Accordion";
import { ExclamationCircle, IconCalendarAlt, IconFriends, IconHandSuitcase, IconRollingSuitcase, IconWatch } from '@/assets/icons';

import styles from "./PostPurchaseAboutYourAttraction.module.css"
import { useParams } from "next/navigation";
import { getDictionary } from "@/dictionaries";

export interface purchase {
    elem: any;
    index: any;
}

const PostPurchaseAboutYourAttraction: React.FC<purchase> = ({
    elem, index
}: purchase) => {

    const searchParams = useParams();

    const [dic, setDic] = useState<any>(null);

    useEffect(() => {
        const fetchDictionary = async () => {
            const dictionary = await getDictionary(searchParams.lng as "pt" | "en" | "es", 'order');
            setDic(dictionary);
        };
        fetchDictionary();
    }, [searchParams.lng])

    const lng = searchParams.lng === "pt" ? "BR" : searchParams.lng === "en" ? "EN" : searchParams.lng === "es" ? "ES" : 'BR';

    const titleAccordion = (elem: any) => {
        if (elem.productType !== 2) {
            return (
                <div className="flex flex-col">
                    <h6>{dic?.adult} {index + 1}</h6>
                    <p>{dic?.responsible}</p>
                </div>
            )
        } else {
            return (
                <div className="flex flex-col">
                    <h6>{dic?.adult} {index + 1}</h6>
                    <p>{dic?.responsibleTransfer}</p>
                </div>
            )
        }
    }

    return (
        <div className="attrc-card mb-3">
            <div className={`${styles.card_post_purchase}`}>
                <div className="flex gap-6">
                    <div className={styles.bg_image_post}>
                        {
                            elem.productType === 1
                                ?
                                <div className={`${styles.image} rounded-2`} style={{
                                    backgroundImage: `url(${elem.imagesBaseUrl}medium_${elem.imgCart})`, width: "100%",
                                    height: "100%", backgroundSize: "cover"
                                }}></div>
                                :
                                elem.productType === 2
                                    ?
                                    <div className={`${styles.image} rounded-2`} style={{
                                        backgroundImage: `url(${elem.imagesBaseUrl}/${elem.imgCart})`, width: "100%",
                                        height: "100%", backgroundSize: "cover"
                                    }}></div>
                                    :
                                    <div className={`${styles.image} rounded-2`} style={{
                                        backgroundImage: `url(${elem.imagesBaseUrl}${elem.imgCart})`, width: "100%",
                                        height: "100%", backgroundSize: "cover"
                                    }}></div>
                        }
                    </div>
                    <div className="w-full  ">
                        <div className="grid md:grid-cols-12 w-full m-auto">
                            <div className='col-span-12'>
                                <h4 className={`${styles.h4} mb-2`}>
                                    {
                                        lng === "BR"
                                            ?
                                            elem?.productNameBR
                                            :
                                            lng === "EN"
                                                ?
                                                elem?.productNameEN
                                                :
                                                lng === "ES"
                                                    ?
                                                    elem?.productNameES
                                                    :
                                                    elem?.productName
                                    }
                                </h4>
                            </div>
                        </div>
                        {/* ----------------------------------------------------------------- */}
                        <div className="md:grid-cols-12 hidden md:grid w-full m-auto">
                            <div className='col-span-12'>
                                {
                                    elem.productType !== 2
                                        ?
                                        <div className="grid md:grid-cols-12 w-full m-auto">
                                            <div className='col-span-12'>
                                                <div className="grid md:grid-cols-12 w-full m-auto">
                                                    <div className='sm:col-span-6 mb-2 flex items-center'>
                                                        <span className="mr-2">
                                                            {IconCalendarAlt('#212529', '18px', '18')}
                                                        </span>
                                                        <span>{dic?.date}: {elem.date.split("-").reverse().join("/")}</span>
                                                    </div>
                                                    <div className='sm:col-span-6 mb-2 flex items-center'>
                                                        <span className="mr-2">
                                                            {IconWatch("#212529", "18px", "18px")}
                                                        </span>
                                                        <span>{dic?.startActiv} {elem.time}</span>
                                                    </div>
                                                </div>
                                                <div className="grid md:grid-cols-12 w-full m-auto">
                                                    <div className='col-span-12 mb-2 flex items-center'>
                                                        <span className="mr-2">
                                                            {IconFriends("#212529", "18px", "22px")}
                                                        </span>
                                                        <span>
                                                            {
                                                                elem.sellingType !== 1
                                                                    ?
                                                                    <>
                                                                        {elem.adults !== 0 ? `${elem.adults} ${dic?.adult}  ` : ""}
                                                                        {elem.childs !== 0 ? `|  ${elem.childs} ${dic?.child}` : ""}
                                                                        {elem.infants !== 0 ? `|  ${elem.infants} ${dic?.infant}` : ""}
                                                                        {elem.elders !== 0 ? `|  ${elem.elders} ${dic?.elders}` : ""}
                                                                        {elem.student !== 0 ? `|  ${elem.student} ${dic?.student}` : ""}
                                                                    </>
                                                                    :
                                                                    <>
                                                                        {elem.globalPeople !== 0 ? `${elem.globalPeople} ${dic?.people}  ` : ""}
                                                                    </>
                                                            }
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        <div className="grid md:grid-cols-12 w-full m-auto">
                                            <div className='col-span-12'>
                                                <div className="grid md:grid-cols-12 w-full m-auto">
                                                    <div className='sm:col-span-6 mb-2 flex items-center'>
                                                        <span className="mr-2">
                                                            {IconCalendarAlt('#212529', '18px', '18')}
                                                        </span>
                                                        <span>{dic?.date}: {elem.date.split("-").reverse().join("/")} - {elem.time}</span>
                                                    </div>
                                                    <div className='sm:col-span-6 mb-2 flex items-center'>
                                                        <span className="mr-2">
                                                            {IconFriends("#212529", "18px", "22px")}
                                                        </span>
                                                        <span>{elem.productType === 2 && elem.sellingType === 1 ? elem.totalPeople : elem.globalPeople} {dic?.peoplePerVehicle}</span>
                                                    </div>
                                                </div>
                                                <div className="grid md:grid-cols-12 w-full m-auto">
                                                    <div className='sm:col-span-6 mb-2 flex items-center'>
                                                        <span className="mr-2">
                                                            {IconHandSuitcase("#2A2146", 18, 18)}
                                                        </span>
                                                        <span className="text-align-left">{elem.bigSuitcase} {dic?.suitcase}</span>
                                                    </div>
                                                    <div className='sm:col-span-6 mb-2 flex items-center'>
                                                        <span className="mr-2">
                                                            {IconRollingSuitcase("#2A2146", 18, 18)}
                                                        </span>
                                                        <span className="text-align-left">{elem.smallSuitcase} {dic?.handbag}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-12 md:hidden mt-3 w-full m-auto">
                    <div className='col-span-12'>
                        {
                            elem.productType !== 2
                                ?
                                <div className="grid md:grid-cols-12 w-full m-auto">
                                    <div className='col-span-12'>
                                        <div className="grid md:grid-cols-12 w-full m-auto">
                                            <div className='sm:col-span-6 mb-2 flex'>
                                                <span className="mr-2">
                                                    {IconCalendarAlt('#212529', '18px', '18')}
                                                </span>
                                                <span>{dic?.date}: {elem.date.split("-").reverse().join("/")}</span>
                                            </div>
                                            <div className='sm:col-span-6 mb-2 mb-md-0 flex'>
                                                <span className="mr-2">
                                                    {IconWatch("#212529", "18px", "18px")}
                                                </span>
                                                <span>{dic?.startActiv}: {elem.time}</span>
                                            </div>
                                        </div>
                                        <div className="grid md:grid-cols-12 w-full m-auto">
                                            <div className='sm:col-span-6 mb-2 flex'>
                                                <span className="mr-2">
                                                    {IconFriends("#212529", "18px", "22px")}
                                                </span>
                                                <span>
                                                    {
                                                        elem.sellingType !== 1
                                                            ?
                                                            <>
                                                                {elem.adults !== 0 ? `${elem.adults} ${dic?.adult}  ` : ""}
                                                                {elem.childs !== 0 ? `|  ${elem.childs} ${dic?.child}` : ""}
                                                                {elem.infants !== 0 ? `|  ${elem.infants} ${dic?.infant}` : ""}
                                                                {elem.elders !== 0 ? `|  ${elem.elders} ${dic?.elders}` : ""}
                                                                {elem.student !== 0 ? `|  ${elem.student} ${dic?.student}` : ""}
                                                            </>
                                                            :
                                                            <>
                                                                {elem.globalPeople !== 0 ? `${elem.globalPeople} ${dic?.people}  ` : ""}
                                                            </>
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div className="grid md:grid-cols-12 w-full m-auto">
                                    <div className='col-span-12'>
                                        <div className="grid md:grid-cols-12 w-full m-auto">
                                            <div className='sm:col-span-6 mb-2 flex items-center'>
                                                <span className="mr-2">
                                                    {IconCalendarAlt('#212529', '18px', '18')}
                                                </span>
                                                <span>{dic?.date}: {elem.date.split("-").reverse().join("/")} - {elem.time}</span>
                                            </div>
                                            <div className='sm:col-span-6 flex items-center'>
                                                <span className="mr-2">
                                                    {IconFriends("#212529", "18px", "22px")}
                                                </span>
                                                <span>{elem.globalPeople} {dic?.peoplePerVehicle}</span>
                                            </div>
                                        </div>
                                        <div className="grid md:grid-cols-12 w-full m-auto">
                                            <div className='sm:col-span-6 mb-2 flex items-center'>
                                                <span className="mr-2">
                                                    {IconHandSuitcase("#2A2146", 18, 18)}
                                                </span>
                                                <span className="text-align-left">{elem.bigSuitcase} {dic?.suitcase}</span>
                                            </div>
                                            <div className='sm:col-span-6 mb-2 flex items-center'>
                                                <span className="mr-2">
                                                    {IconRollingSuitcase("#2A2146", 18, 18)}
                                                </span>
                                                <span className="text-align-left">{elem.smallSuitcase} {dic?.handbag}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        }
                    </div>
                </div>
                {/* ----------------------------------------------------------------- */}
                <div className="grid md:grid-cols-12 w-full m-auto">
                    <div className={`${styles.card_space} col-span-12`}>
                        <div className="flex align-center mb-6">
                            <span className="text-primary mr-2">
                                {ExclamationCircle("#034C43", "18px", "22px")}
                            </span>
                            <h6 className="m-0 text" style={{ color: "#58565d" }}>
                                {dic?.arriveInAdvance}
                            </h6>
                        </div>
                        <div className="my-5">
                            <h4 className={styles.h4}>{dic?.aboutParticipants}</h4>
                        </div>
                        <div className="mt-5">
                            <Accordion
                                style={styles.radius}
                                styleChildren={{
                                    color: '6731ff',
                                    cursor: 'pointer',
                                    backgroundColor: '#f5f5fb',
                                    borderRadius: '0.65rem 0.65rem 0 0!important',
                                    padding: '0.75rem 1.5rem'
                                }}
                                title={titleAccordion(elem)}
                            >

                                <div style={{ padding: '1rem 0' }}>
                                    <div className={`${styles.card_post_purchase} border-primary`}>
                                        <div className="grid md:grid-cols-12 mb-3 w-full m-auto">
                                            <div className='sm:col-span-6 md:col-span-6 lg:col-span-6'>
                                                <p className="text-muted mb-1">{dic?.name}</p>
                                                <b className="text-dark">{elem.passengers[0]?.firstName}</b>
                                            </div>
                                            <div className='sm:col-span-6 md:col-span-6 lg:col-span-6'>
                                                <p className="text-muted mb-1">{dic?.lastName}</p>
                                                <b className="text-bl">{elem.passengers[0]?.lastName}</b>
                                            </div>
                                        </div>
                                        <div className="grid md:grid-cols-12 w-full m-auto">
                                            <div className='sm:col-span-6 md:col-span-6 lg:col-span-6'>
                                                <p className="text-muted mb-1">{elem.passengers[0]?.cpf ? `CPF` : `ID`}</p>
                                                <b className="text-dark">{elem.passengers[0]?.DocumentNumber}</b>
                                            </div>
                                            <div className='sm:col-span-6 md:col-span-6 lg:col-span-6'>
                                                <p className="text-muted mb-1">{dic?.phone}</p>
                                                <b className="text-bl">{elem.passengers[0]?.phone}</b>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Accordion>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default PostPurchaseAboutYourAttraction;
