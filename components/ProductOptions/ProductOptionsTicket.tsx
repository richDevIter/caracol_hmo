import React, { Key, useEffect, useState } from 'react'

import DoubleCalendar from '../Calendar/DoubleCalendar';
import DropdownNumberPeople from '../DropdownNumberPeople/DropdownNumberPeople';

import { IconArrowDown, IconArrowDownWhite, IconCalendar, IconTime, IconTimeSecondary, IconWatch } from '@/assets/icons';

import styles from './ProductOptions.module.css'
import DoubleCalendarTicket from '../Calendar/DoubleCalendarTicket';
import BagdeDays from '../BagdeDays/BagdeDays';
import useAppData from '@/data/hooks/useCartData';
import useWindowSize from '@/data/hooks/useWindowSize';
import { getDictionary } from '@/dictionaries';
import { useParams } from 'next/navigation';
import DropdownHours from '../DropdownHours/DropdownHours';

export interface propOptions {
    optionTour: any,
    tourResponse: any,
    setMessageCart?: any,
    isTicket?: boolean
}

const ProductOptions: React.FC<propOptions> = ({
    optionTour, tourResponse, setMessageCart, isTicket = true
}) => {

    const { cart, addItemCart } = useAppData();

    const size = useWindowSize();
    const searchParams = useParams();

    function scrollTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });

        if (size.width >= 767) {
            var elem: any = document.getElementById("authCartDropdown");
            elem.classList.add("active");
        }
    }


    const [dic, setDic] = useState<any>(null);

    useEffect(() => {
        const fetchDictionary = async () => {
            const dictionary = await getDictionary(searchParams.lng as "pt" | "en" | "es", 'productTour');
            setDic(dictionary);
        };

        fetchDictionary();

    }, [searchParams.lng])


    const [dateTour, setDateTour] = useState<any>([]);
    const [numberPeople, setNumberPeople] = useState<any>(null);

    const [productHours, setProductHours] = useState<any>(null);
    const [hour, setHour] = useState<any>(null);

    const [loading, setLoading] = useState<any>(false);

    const [isIntegration, setIsIntegration] = useState<any>(false);
    const [showDropdown, setShowDropdown] = useState<any>(false);

    const [tariffs, setTariffs] = useState<any>({
        maxNumPeople: tourResponse.maxNumPeople,
        minNumPeople: tourResponse.minNumPeople
    });

    function changePriceDateTour(obj: any, hours: any) {
        setDateTour([...obj]);
        setProductHours(hours);
        /* setNumberPeople({
                adults: '1',
                childs: '0',
                infants: '0',
                elders: '0',
                student: '0',
                globalPeople: '0'
            }); */
    }

    const setNewNumberPeople = (peoples: any, index: any) => {
        var aux: any = numberPeople;
        if (aux !== null) {
            aux[index] = peoples;
            setNumberPeople(aux);
        }
    }

    const selectHours = (e: any) => {
        setHour(e.target.value);
        setTariffs({
            maxNumPeople: e.target.options[e.target.selectedIndex].dataset.capacity,

            minNumPeople: 1,
        });
    };

    const addToCart = (itemOption: any, index: any) => {
        var repeatedItem: any = false; //impede de adicionar produto repetido no carrinho

        // cart.dados.forEach((elem: any) => {
        //     if (elem.productCode === tourResponse.productCode) {
        //         repeatedItem = true
        //     }
        // });

        // if (repeatedItem === true) {
        //     alert(`${t("tour.tourOptions.tourAlert1")}`);
        // } else {
        setMessageCart(true);

        setTimeout(() => {
            setMessageCart(false);
        }, 4000);

        const timestamp = new Date().getTime();

        const item = {
            controlCart: timestamp,
            productName: itemOption.productName,
            productNameBR: itemOption.productNameBR,
            productNameEN: itemOption.productNameEN,
            productNameES: itemOption.productNameES,
            modalityName: itemOption.modalityName,
            imgCart: tourResponse.images[0],
            imagesBaseUrl: tourResponse.imagesBaseUrl,
            typeProduct: tourResponse.typeProduct,
            price: itemOption?.tarif?.price,

            idTarif: itemOption.idTarif,
            idPickup: itemOption.idPickup,

            priceAdults: itemOption.priceAdults,
            priceChilds: itemOption.priceChilds,
            priceInfants: itemOption.priceInfants,
            priceElders: 0,
            priceStudent: 0,
            priceGlobalPeople: itemOption.priceGlobalPeople,


            sellingType: itemOption.idSellingType,
            adults: itemOption.adults,
            childs: itemOption.childs,
            infants: itemOption.infants,
            elders: itemOption.elders,
            student: itemOption.student,
            globalPeople: itemOption.globalPeople,
            productType: 4,
            productCode: tourResponse.productCode,
            time: itemOption.time,
            date: itemOption.date,
            duration: itemOption.activityDuration,
            supplier: tourResponse.supplier,
            supplierFantasyName: tourResponse.supplierFantasyName,
            typePickup: itemOption.embarkingType,
            meetingPoint: itemOption.embarkingType === "0" ? itemOption.meetingPoint : '',
            pickupListId: itemOption.embarkingType === "0" ? 0 : itemOption.pickupListId,
            pickup: 0,

            discount: 0,
            customValueNet: 0,
            customValueSell: 0,
            goingSource: "null",
            commingSource: "null",
            latOrigem: "null",
            lngOrigem: "null",
            latDestino: "null",
            lngDestino: "null",
            cia: "null",
            voo: "null",
            smallSuitcase: 0,
            bigSuitcase: 0,
            internalNotes: " ",
            idVeiculo: 0,
            passengers: []

        }
        addItemCart?.(item);
        // }
    }

    useEffect(() => {
        var aux: any = [];
        var auxPeople: any = [];
        for (var i = 0; i < tourResponse.modalities.length; i++) {
            aux.push({
                adult: 0,
                child: 0,
                infant: 0,
            })
            auxPeople.push(null)
        }
        setDateTour(aux);
        setNumberPeople(auxPeople);
    }, [tourResponse.modalities])

    const auth = (option: any, index: any) => {
        if (dateTour.length < 1) {
            alert(`${dic?.tour.tourOptions.tourAlert2}`);
        } else {
            option.productName = tourResponse.productName;
            option.productNameBR = tourResponse.productNameBR;
            option.productNameEN = tourResponse.productNameEN;
            option.productNameES = tourResponse.productNameES;

            option.adults = numberPeople[index].adults;
            option.childs = numberPeople[index].childs;
            option.infants = numberPeople[index].infants;
            option.elders = numberPeople[index].elders;
            option.student = numberPeople[index].student;
            option.globalPeople = numberPeople[index].globalPeople;


            // option.date = (document.getElementById(`date-${option.id}`) as HTMLInputElement).value.split('/').reverse().join('-');
            option.date = (document.querySelector(`#date-${option.id}`) as HTMLInputElement).value.split('/').reverse().join('-');


            option.time = dateTour[index].time;

            const selectedDate = JSON.parse((document.querySelector(`#date-${option.id}`) as HTMLInputElement).dataset.object || '{}');
            // const selectedDate = JSON.parse((document.getElementById(`date-${option.id}`) as HTMLInputElement).dataset.object || '{}'); 

            option.idTarif = selectedDate.idTarif;
            /* option.idPickup = (document.getElementById(`pickup`) as HTMLInputElement).value; */


            option.priceAdults = selectedDate.priceAdultFinal;
            option.priceChilds = selectedDate.priceChildFinal;
            option.priceInfants = selectedDate.priceInfantFinal;
            option.priceElders = 0;
            option.priceStudent = 0;
            option.priceGlobalPeople = selectedDate.priceGlobalFinal;
            option.idSellingType = selectedDate.idSellingType;


            if (option.date !== "") {
                /* if (option.idSellingType === 1) {
                    if (numberPeople[index].globalPeople > 0) {
                        addToCart(option, index);
                    } else {
                        alert(`${t("tour.tourOptions.tourAlert2")}`)
                    }
                } else {
                    if (numberPeople[index].adults > 0) {
                        addToCart(option, index);
                    } else {
                        alert(`${t("tour.tourOptions.tourAlert2")}`)
                    }
                } */
                addToCart(option, index);
                //keepDropdownOpen()
                //setModalShow(false);
                setTimeout(() => scrollTop(), 200);
            } else {
                alert("Preencha todos os dados");
            }
        }
    }

    return (
        <>
            {
                optionTour.map((options: any, index: any) => {
                    return (
                        <div key={index}>
                            <div className={styles.tour_modalities}>
                                <div className="grid grid-cols-12">
                                    {/*  Col 7 */}
                                    <div className="col-span-12 md:col-span-8 overflow-hidden " >
                                        <div className={styles.modalities_data}>
                                            <div className={styles.tour_modalities_top}>
                                                <div className={styles.modalities_info}>
                                                    <h5>{options.modalityName}</h5>
                                                    <div className="flex flex-wrap gap-2 mt-2 mb-3">
                                                        <BagdeDays
                                                            options={options}
                                                        />
                                                    </div>
                                                    <div className='flex flex-col md:flex-row md:flex'>
                                                        {
                                                            options.activityStart !== undefined
                                                                ?
                                                                <span className='flex items-center gap-2'>
                                                                    {IconWatch("#034C43", "18px", "18px")}
                                                                    {dic?.tour.tourOptions.tourStart}{" "}
                                                                    {options.activityStart}
                                                                </span>
                                                                :
                                                                ""
                                                        }
                                                        {
                                                            options.activityDuration !== undefined
                                                                ?
                                                                <span
                                                                    className={
                                                                        size.width > 1012
                                                                            ? "px-4"
                                                                            : "px-0 pe-4 d-block"
                                                                    }
                                                                >
                                                                    {dic?.tour.tourOptions.tourDuration}{" "}
                                                                    {options.activityDuration}{" "}
                                                                    {dic?.tour.tourOptions.tourHours}
                                                                </span>
                                                                :
                                                                ""
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={`${styles.tour_modalities_bottom} `}>
                                                <div className="grid grid-cols-12 row_controll">
                                                    {/*  Col 6 */}
                                                    <div className="col-span-12 md:col-span-6 overflow-hidden mx-3" >
                                                        <h5 className='mb-1'>
                                                            {dic?.tour.tourOptions.includes}
                                                        </h5>
                                                        <ul className="tour-list-experience tour-add mb-3 md:mb-0">
                                                            {tourResponse.modalities[index].includedItems.map(
                                                                (include: any, index: Key) => {
                                                                    return (
                                                                        <li
                                                                            className={styles.included}
                                                                            key={index}
                                                                        >
                                                                            {include}
                                                                        </li>
                                                                    );
                                                                }
                                                            )}
                                                        </ul>
                                                    </div>
                                                    {/*  END: Col 6 */}

                                                    {/*  Col 6 */}
                                                    <div className="col-span-12 md:col-span-6 overflow-hidden mx-3" >
                                                        <h5 className='mb-1'>
                                                            {dic?.tour.tourOptions.notIncludes}
                                                        </h5>
                                                        <ul className="tour-list-experience tour-add">
                                                            {tourResponse.modalities[index].excludedItems.map(
                                                                (include: any, index: Key) => {
                                                                    return (
                                                                        <li
                                                                            className={styles.excluded}
                                                                            key={index}
                                                                        >
                                                                            {include}
                                                                        </li>
                                                                    );
                                                                }
                                                            )}
                                                        </ul>
                                                    </div>
                                                    {/*  END: Col 6 */}
                                                </div>
                                                {/* END: ROW */}
                                            </div>
                                        </div>
                                    </div>
                                    {/*  END: Col 7 */}

                                    {/*  Col 5 */}
                                    <div className="col-span-12 md:col-span-4 order-first md:order-last" >
                                        <div className={styles.modalities_calendar_people}>
                                            <div className={styles.modalities_price}>
                                                {tourResponse.modalities[index].allTarif[0]
                                                    .percDesc !== 0 ? (
                                                    <>
                                                        <p className="text-price mb-3 w-100 text-2xl">
                                                            Preço por adulto:
                                                        </p>
                                                        <p className="text-price w-100 ">
                                                            <span className="text-price mb-3 w-100 text-gray-400">
                                                                de R${" "}
                                                                <span className="fs-3 line-through">
                                                                    {
                                                                        tourResponse.modalities[index]
                                                                            .allTarif[0].price.toFixed(2).replace(".", ",")
                                                                    }
                                                                </span>
                                                            </span>
                                                        </p>
                                                        <p className="price mb-3 w-100 text-base">
                                                            por:{" "}
                                                        </p>
                                                    </>
                                                ) : (
                                                    <>
                                                        <p className="text-price mb-3 w-100 fs-4">
                                                            {dic?.tour.pricePerAdult}
                                                        </p>
                                                    </>
                                                )}

                                                <small>R$ </small>{" "}
                                                <b>
                                                    {(
                                                        (1 - options.tarif.percDesc / 100) *
                                                        options.tarif?.price
                                                    )
                                                        .toFixed(2)
                                                        .replace(".", ",")}
                                                </b>
                                            </div>
                                            <div className='pt-5'>
                                                <div>
                                                    <DoubleCalendarTicket
                                                        modalityID={options.id}
                                                        product={options}
                                                        productCode={tourResponse.productCode}
                                                        changePriceDateTour={changePriceDateTour}
                                                        dateTour={dateTour}
                                                        index={index}
                                                        setLoading={setLoading}
                                                        setIsIntegration={setIsIntegration}
                                                    />
                                                </div>
                                                <div className={styles.panel_dropdown}>
                                                    <DropdownHours
                                                        changePriceDateTour={changePriceDateTour}
                                                        dateTour={dateTour}
                                                        index={index}
                                                        setPeopleDisponible={setShowDropdown}
                                                        isIntegration={isIntegration}
                                                        info={tourResponse}
                                                    />
                                                </div>
                                                <div className={styles.panel_dropdown}>
                                                    <DropdownNumberPeople
                                                        info={tourResponse}
                                                        actionPeople={setNewNumberPeople}
                                                        dateTour={dateTour}
                                                        index={index}
                                                        tariffs={tariffs}
                                                        isIntegration={isIntegration}
                                                    />
                                                </div>
                                                <div>
                                                    <button
                                                        className={`${styles.tour_modality_btn} btn `}
                                                        onClick={() => auth(options, index)}
                                                    >
                                                        {dic?.tour.tourOptions.addToCart}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    {/*  END: Col 5 */}
                                </div>
                            </div>
                        </div>
                    )
                }
                )
            }
        </>
    )
}

export default ProductOptions