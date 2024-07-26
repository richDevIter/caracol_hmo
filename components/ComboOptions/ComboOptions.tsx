'use client'

import React, { Key, useEffect, useState } from 'react';

import DoubleCalendarCombo from '../Calendar/DoubleCalendarCombo';
import DropdownHoursCombo from '../DropdownHoursCombo/DropdownHoursCombo';
import DropdownNumberPeopleCombo from '../DropdownNumberPeopleCombo/DropdownNumberPeopleCombo';

import { IconCalendar, IconWatch } from '@/assets/icons';

import styles from './comboOptions.module.css';
import BagdeDays from '../BagdeDays/BagdeDays';

import TagManager from 'react-gtm-module';
import useWindowSize from '@/data/hooks/useWindowSize';
import useAppData from '@/data/hooks/useCartData';

import { useParams } from 'next/navigation';
import { getDictionary } from '@/dictionaries';

export interface propOptions {
    tourResponse: any;
    setMessageCart?: any;
    isTicket?: boolean;
}

const ComboOptions: React.FC<propOptions> = ({
    tourResponse,
    setMessageCart,
    isTicket = false,
}) => {
    const { cart, addItemCart } = useAppData();
    const size = useWindowSize();

    const searchParams = useParams();

    const lng: string = searchParams.lng === "pt" ? "BR" : searchParams.lng === "en" ? "EN" : searchParams.lng === "es" ? "ES" : 'BR';

    const [dic, setDic] = useState<any>(null);

    const [dateTour, setDateTour] = useState<any>([]);
    const [numberPeople, setNumberPeople] = useState<any>([]);

    const [stateCombo, setStateCombo] = useState<any>([]);
    const [infoCombo, setInfoCombo] = useState<any>([]);
    const [totalPriceCombo, setTotalPriceCombo] = useState<number>(0);

    const [showDropdown, setShowDropdown] = useState<any>(false);
    const [isCombo, setIsCombo] = useState<any>(true);

    const isIntegration = false;

    const [tariffs] = useState<any>({
        maxNumPeople: tourResponse.maxNumPeople,
        minNumPeople: tourResponse.minNumPeople,
    });

    useEffect(() => {
        const fetchDictionary = async () => {
            const dictionary = await getDictionary(searchParams.lng as "pt" | "en" | "es", 'productTour');
            setDic(dictionary);
        };

        fetchDictionary();

    }, [searchParams.lng])

    function changePriceDateTour(obj: any, index: number, isDateChange: boolean = false) {
        let newNumberPeople: any = numberPeople;
        newNumberPeople[index] = {
            "adults": 0,
            "childs": 0,
            "elders": 0,
            "globalPeople": 0,
            "infants": 0,
            "student": 0
        }
        setNumberPeople(newNumberPeople)
        if (isDateChange) {
            delete obj[index].time
            delete obj[index].adult
            delete obj[index].child
            delete obj[index].infant
            delete obj[index].student
            delete obj[index].tieldersme
            delete obj[index].global
            delete obj[index].maxStockNumber
        }



        setDateTour([...obj]);
    }

    const setNewNumberPeople = (peoples: any, index: any) => {
        numberPeople[index] = peoples;
        setNumberPeople([...numberPeople]);
    };

    function scrollTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });

        if (size.width >= 767) {
            var elem: any = document.getElementById('authCartDropdown');
            elem.classList.add('active');
        }
    }

    const addToCart = (itemOption: any) => {
        var repeatedItem: any = false; //impede de adicionar produto repetido no carrinho

        cart.dados.forEach((elem: any) => {
            if (elem.comboCode === itemOption.productCode) {
                repeatedItem = true
            }
        });

        if (repeatedItem === true) {
            alert(`${dic?.tour.tourOptions.tourAlert1}`);
        } else {
            setMessageCart(true);

            setTimeout(() => {
                setMessageCart(false);
            }, 4000);

            const timestamp = new Date().getTime();

            let comboObject: any = [];

            itemOption.modalities.forEach((elem: any, index: number) => {
                comboObject.push({
                    code: itemOption.productCode,
                    modalityName: elem.modalityName,
                    qtdAdulto: numberPeople[index].adults,
                    qtdChild: numberPeople[index].childs,
                    qtdInfant: numberPeople[index].infants,
                    qtdElders: numberPeople[index].elders,
                    qtdStudents: numberPeople[index].student,
                    qtdPrivativo: numberPeople[index].globalPeople,
                    productCode: elem.productCode,
                    idTarifario: dateTour[index].idTarifario,
                    date: dateTour[index].data,
                    time: dateTour[index].time,
                    productType: elem.productType,
                    pickupListId: elem.pickupListId,
                    //idPickup: 0,
                    supplierId: 414,
                    meetingPoint: elem.meetingPoint,
                    typePickup: elem.typePickup
                })
            });

            const item = {
                productName: itemOption.productName,
                productNameBR: itemOption.productNameBR,
                productNameEN: itemOption.productNameEN,
                productNameES: itemOption.productNameES,
                modalityName: "",
                imgCart: tourResponse.images[0],
                imagesBaseUrl: tourResponse.imagesBaseUrl,
                typeProduct: tourResponse.typeProduct,
                productType: 1,
                price: totalPriceCombo,

                idTarif: 0, //PENDENTE

                priceAdults: 112, //PENDENTE
                priceChilds: 112, //PENDENTE
                priceInfants: 112, //PENDENTE
                priceElders: 0, //PENDENTE
                priceStudent: 0, //PENDENTE
                priceGlobalPeople: 0, //PENDENTE
                reservationSystem: 1, //PENDENTE

                sellingType: 2, //PENDENTE
                adults: 1,
                childs: 2,
                infants: 0,
                elders: 0,
                student: 0,
                globalPeople: 0,

                comboObject, //add os treco do combo
                comboCode: itemOption.productCode,
                isCombo: true,
                productCode: "",
                time: dateTour[0].time,
                date: dateTour[0].data,
                supplier: itemOption.supplier,
                supplierFantasyName: itemOption.supplierFantasyName,
                typePickup: "0",
                meetingPoint: itemOption.eventLocation,
                pickupListId: 0,
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
                bigSuitcase0: 0,
                idVeiculo: 0,
                passengers: [],
                labelsSorted: ["Adulto", "Criança", "Infante"]
            }

            setTimeout(() => scrollTop(), 200);
            addItemCart?.(item);
        }
    };

    function handleNext(select: any) {
        const combo: any = document.querySelector(`#comboOptions-${select}`);
        //const comboCheckout: any = document.querySelector(`#comboModalitiesCheckout`);

        if (select > 0) {
            handleSaveInfo(select - 1);

            if (infoCombo[select - 1]?.date !== "" &&
                infoCombo[select - 1]?.time !== "" &&
                (infoCombo[select - 1]?.peoples.adults +
                    infoCombo[select - 1]?.peoples.childs +
                    infoCombo[select - 1]?.peoples.infants +
                    infoCombo[select - 1]?.peoples.elders +
                    infoCombo[select - 1]?.peoples.student +
                    infoCombo[select - 1]?.peoples.globalPeople > 0)) {

                combo?.classList.add('combo');

                /* if (tourResponse.modalities.length === select) {
                    comboCheckout?.classList.add('combo');
                } */

                stateCombo[select - 1] = true;
                setStateCombo([...stateCombo]);
            } else {
                alert("Por favor, preencha todos os campos")
            }
        } else {
            combo?.classList.add('combo');
        }

    }

    const calculaPrecoCombo = async () => {

        const data = {
            "comboCode": tourResponse.productCode,
            "comboList": dateTour.map((elem: any, index: number) => {
                return ({
                    "qtdAdulto": numberPeople[index].adults,
                    "qtdChild": numberPeople[index].childs,
                    "qtdInfant": numberPeople[index].infants,
                    "qtdElders": numberPeople[index].elders,
                    "qtdStudents": numberPeople[index].student,
                    "idTarifario": elem.idTarifario,
                    "qtdPrivativo": numberPeople[index].globalPeople,
                    "productCode": elem.productCode,
                    "date": elem.data,
                    "time": elem.time,

                })
            })
        }

        const resp = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/Products/ComboCalculaPreco`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const tourResp = await resp.json();

        if (tourResp.data.log === 0) { //sucesso
            setTotalPriceCombo(tourResp.data.data);
        } else {}

    }

    useEffect(() => {
        const comboCheckout: any = document.querySelector(`#comboModalitiesCheckout`);

        if (stateCombo.length > 0 && !stateCombo.includes(false)) {
            comboCheckout?.classList.add('combo');

            calculaPrecoCombo();
        } else {
            comboCheckout?.classList.remove('combo');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stateCombo])

    function handleBack(select: any) {
        stateCombo[select] = false;
        setStateCombo([...stateCombo]);
    }


    const handleSaveInfo = (index: any,) => {
        infoCombo[index].date = dateTour[index]?.data === undefined ? "" : dateTour[index]?.data;
        infoCombo[index].time = dateTour[index]?.time === undefined ? "" : dateTour[index]?.time;
        infoCombo[index].peoples = numberPeople[index];
        setInfoCombo([...infoCombo]);
    }

    useEffect(() => {
        let aux: any = [];
        let auxInfo: any = [];
        let auxPeople: any = [];

        handleNext(0);

        for (let index = 0; index < tourResponse.modalities.length; index++) {
            aux.push(false);
            auxInfo.push(
                {
                    date: "",
                    time: "",
                    peoples: null
                }
            );
            auxPeople.push({
                adults: 0,
                childs: 0,
                elders: 0,
                globalPeople: 0,
                infants: 0,
                student: 0
            });
        }
        setStateCombo(aux);
        setInfoCombo(auxInfo);
        setNumberPeople(auxPeople);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {tourResponse.modalities.map((options: any, index: any) => {
                return (
                    <div key={index} id={`comboOptions-${index}`}>
                        <div id="comboModalities" className={`${styles.tour_modalities}`}>
                            <div className="grid grid-cols-12">
                                {/*  Col 7 */}
                                <div className="col-span-12 lg:col-span-12">
                                    <div className={styles.modalities_data}>
                                        <div className={styles.tour_modalities_top}>
                                            <div className={styles.modalities_info}>
                                                <h5>
                                                    {options.modalityName} - {options.productName}
                                                </h5>
                                                <div className="flex flex-wrap gap-2 mt-2 mb-3">
                                                    <BagdeDays options={options} />
                                                </div>
                                                <div className="flex flex-col md:flex-row md:flex">
                                                    <span className="flex items-center gap-2">
                                                        {IconWatch('#034C43', '18px', '18px')}
                                                        {dic?.tour.tourOptions.tourStart}
                                                        {' '}
                                                        {options.activityStart}
                                                    </span>
                                                    {/* <span
                                                        className={
                                                            size.width > 1012 ? 'px-4' : 'px-0 pe-4 d-block'
                                                        }
                                                    >
                                                        {t('tour.tourOptions.tourDuration')}{' '}
                                                        {options.activityDuration}{' '}
                                                        {t('tour.tourOptions.tourHours')}
                                                    </span> */}
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className={`${styles.tour_modalities_bottom} modalitites_bottom`}
                                        >
                                            <div className="grid grid-cols-12 row_controll">
                                                {/*  Col 6 */}
                                                <div className="col-span-12 md:col-span-6 overflow-hidden mx-3">
                                                    <h5 className="mb-1">
                                                        {dic?.tour.tourOptions.includes}
                                                    </h5>
                                                    <ul className="tour-list-experience tour-add mb-3 md:mb-0">
                                                        {tourResponse?.modalities[index]?.includedItems?.map(
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
                                                <div className="col-span-12 md:col-span-6 mx-3">
                                                    <h5 className="mb-1">
                                                        {dic?.tour.tourOptions.notIncludes}
                                                    </h5>
                                                    <ul className="tour-list-experience tour-add">
                                                        {tourResponse?.modalities[index]?.excludedItems?.map(
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
                                        <div className={`${styles.modalities_checkout} modalitites_combo`}>
                                            {stateCombo[index] !== true ? (
                                                <div className="grid grid-cols-12 pt-6 xl:pt-0 xl:gap-10 px-4 xl:px-8">
                                                    <div className="col-span-12 xl:col-span-3 flex items-center">
                                                        <DoubleCalendarCombo
                                                            modalityID={options.id}
                                                            product={tourResponse}
                                                            productCode={options.productCode}
                                                            changePriceDateTour={changePriceDateTour}
                                                            dateTour={dateTour}
                                                            index={index}
                                                            isTicket={false}
                                                            infoCombo={infoCombo}
                                                        />
                                                    </div>
                                                    <div className="col-span-12 xl:col-span-3">
                                                        <div
                                                            className={`${styles.panel_dropdown} py-3 my-0`}
                                                        >
                                                            <DropdownHoursCombo
                                                                changePriceDateTour={changePriceDateTour}
                                                                dateTour={dateTour}
                                                                index={index}
                                                                setPeopleDisponible={setShowDropdown}
                                                                isIntegration={isIntegration}
                                                                info={tourResponse}
                                                                isCombo={isCombo}
                                                                infoCombo={infoCombo}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-span-12 xl:col-span-3">
                                                        <div
                                                            className={`${styles.panel_dropdown} py-0 xl:py-3 my-0`}
                                                        >
                                                            <DropdownNumberPeopleCombo
                                                                info={tourResponse}
                                                                actionPeople={setNewNumberPeople}
                                                                dateTour={dateTour}
                                                                index={index}
                                                                tariffs={tariffs}
                                                                isIntegration={isIntegration}
                                                                infoCombo={infoCombo}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-span-12 xl:col-span-3">
                                                        <div className={`${styles.panel_dropdown} py-5`}>
                                                            <button
                                                                className={`${styles.tour_modality_btn} btn btn-primary`}
                                                                onClick={() => handleNext(index + 1)}
                                                            >
                                                                Próximo
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="grid grid-cols-12 xl:gap-10 px-4 xl:px-8" onClick={() => handleBack(index)}>
                                                    <div className="col-span-12 xl:col-span-3">
                                                        <div className="flex pt-5 xl:py-5 gap-2">
                                                            {/* {IconCalendarSecondaryCustom(50, 50)} */}
                                                            <div className={`${styles.bg_ready_choose}`}>
                                                                <small>Data da Visita:</small>
                                                                <br />
                                                                <span>{infoCombo[index].date.split("-").reverse().join("/")}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-span-12 xl:col-span-3">
                                                        <div className="flex py-5 gap-2">
                                                            {IconWatch('#65E587', '50px', '50px')}
                                                            <div className={`${styles.bg_ready_choose}`}>
                                                                <small>Hora da Visita:</small>
                                                                <br />
                                                                <span>{infoCombo[index].time.split(":")[0] + ":" + infoCombo[index].time.split(":")[1]}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-span-12 xl:col-span-3">
                                                        <div className="flex pb-5 xl:pb-0 xl:py-5 gap-2">
                                                            {/* {IconUser('#65E587', '50px', '50px')} */}
                                                            <div className={`${styles.bg_ready_choose}`}>
                                                                <small>Pessoas:</small>
                                                                <br />
                                                                {
                                                                    dateTour[index]?.ranges?.labelsRealSorted.map((faixa: any, i: any) => {
                                                                        if (infoCombo[index]?.peoples[`${faixa.toLowerCase()}s`] || infoCombo[index]?.peoples[`${faixa.toLowerCase()}`]) {
                                                                            return (
                                                                                <span key={i} className={`${styles.bg_peoples_choose}`}>
                                                                                    {
                                                                                        faixa === "Adult"
                                                                                            ?
                                                                                            infoCombo[index]?.peoples.adults
                                                                                            :
                                                                                            faixa === "Child"
                                                                                                ?
                                                                                                infoCombo[index]?.peoples.childs
                                                                                                :
                                                                                                faixa === "Infant"
                                                                                                    ?
                                                                                                    infoCombo[index]?.peoples.infants
                                                                                                    :
                                                                                                    faixa === "Elders"
                                                                                                        ?
                                                                                                        infoCombo[index]?.peoples.elders
                                                                                                        :
                                                                                                        faixa === "Student"
                                                                                                            ?
                                                                                                            infoCombo[index]?.peoples.student
                                                                                                            :
                                                                                                            infoCombo[index]?.peoples.globalPeople
                                                                                    }
                                                                                    {" "} {dateTour[index]?.ranges[`label${faixa}`].toLowerCase()}
                                                                                </span>
                                                                            )
                                                                        } else {
                                                                            return (
                                                                                <></>
                                                                            )
                                                                        }
                                                                    })
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {/*  END: Col 7 */}

                                {/*  Col 5 */}
                                <div className="col-span-12 lg:col-span-4 order-first lg:order-last"></div>
                                {/*  END: Col 5 */}
                            </div>
                        </div>
                    </div>
                );
            })}

            <div id="comboModalitiesCheckout" className={styles.tour_modalities}>
                <div className={styles.modalities_data}>
                    <div className={styles.tour_modalities_top}>
                        <div className={`${styles.modalities_info} w-full`}>
                            <h5 style={{ marginBottom: 0 }}>Informações da sua compra</h5>
                            <div className="combo_checkout">
                                <div className="mt-5">
                                    Combo:{' '}
                                    <span style={{ fontWeight: 500 }}>
                                        {tourResponse.modalities.map(
                                            (options: any, index: any) => {
                                                return (
                                                    <>
                                                        {options.modalityName} - {options.productName}{' '}
                                                        {index + 1 !== tourResponse.modalities.length
                                                            ? ' + '
                                                            : ''}
                                                    </>
                                                );
                                            }
                                        )}
                                    </span>
                                    <div
                                        className={`${styles.bg_info_checkout} grid grid-cols-12 mt-5`}
                                    >
                                        <div className="col-span-6">
                                            <span>Subtotal</span>
                                        </div>
                                        <div className="col-span-6 flex justify-end">
                                            <span>
                                                R$ <strong>{Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(totalPriceCombo)}</strong>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex justify-end mt-5">
                                        <div className="col-span-3">
                                            <button
                                                onClick={() => { addToCart(tourResponse) }}
                                                className={`${styles.tour_modality_btn} btn btn-primary`}
                                            >
                                                Adicionar ao carrinho
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ComboOptions;
