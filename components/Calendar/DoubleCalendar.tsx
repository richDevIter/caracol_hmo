import "react-multi-date-picker/styles/layouts/mobile.css";

import React, { useEffect, useState } from "react";
import DatePicker from "react-multi-date-picker";

import styles from './DoubleCalendar.module.css'
import { IconArrowDownWhite, IconCalendarSecondary } from "@/assets/icons";

import useWindowSize from "@/data/hooks/useWindowSize";
import { useParams } from "next/navigation";
import TourRepository from "@/core/TourPageRepository";
import TourPageCollection from "@/core/TourPage";
import { channel } from "diagnostics_channel";
import IdChannelRepository from "@/core/IdChannelRepository";
import IdChannelCollection from "@/core/IdChannel";
import { parseCookies, setCookie } from "nookies";

// import calendar from '../../assets/icons/ci_calendar_single_tour.svg';
// import iconArrow from '../../assets/icons/arrow_white.svg';

const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
];

const numberMonths = typeof window !== 'undefined' && window.innerWidth <= 1360 ? 1 : 2; //480


export interface productInfo {
    modalityID: any;
    product: any;
    productCode: any;
    changePriceDateTour: any;
    index: any;
    dateTour: any;
    isTicket?: boolean;
}

const CustomMultipleInput = ({ openCalendar, value, modalityID, valueCalendar, setNewGetDate, lng }: any) => {
    //const { t } = useTranslation();
    const [arrow, setArrow] = useState<any>(false);

    const lang: any = lng === "BR" ? "Quando?" : lng === "EN" ? "When?" : "¿Cuándo?"

    useEffect(() => {
        let arrowBody = document.querySelector('body');
        if (arrowBody?.className === "modal-open") {
            setArrow(true);
        } else {
            setArrow(false);
        }
    }, []);

    function getArrowLimit() {
        var today: any = new Date();
        var monthControl = (today.getMonth() + 1);
        //var actual: any = monthControl;

        let timer1 = setTimeout(() => {

            var teste: any = document.getElementsByClassName('rmdp-arrow-container');

            if (teste.length >= 1) {
                teste[0].addEventListener("click", (e: any) => {
                    monthControl = monthControl - 1;
                }, false)
                teste[1].addEventListener("click", (e: any) => {
                    monthControl = monthControl + 1;
                    setNewGetDate(monthControl);
                }, false)
            }
        }, 500);
        return () => {
            clearTimeout(timer1);
        };
    }

    return (
        <div className="flex">
            <div className={styles.input_group}>
                <div className="input-group-prepend">
                    <span className={`${styles.input_calendar_custom} left-4 icon py-0 py-md-2`}>
                        {/* <img src={calendar} alt="calendário" className="py-1" /> */}
                        {IconCalendarSecondary}
                    </span>
                </div>
                <input
                    className={`form-control rounded-0 bg-white py-2 rounded ${styles.calendar_input}`}
                    onFocus={() => { openCalendar(); getArrowLimit(); }}
                    value={value}
                    data-object={JSON.stringify(valueCalendar)}
                    readOnly
                    id={`date-${modalityID}`}
                    placeholder={lang}
                    style={{ color: "#FFFFFF" }}
                />
                <div className="input-group-append">
                    <span className={`${styles.input_calendar_custom} right-4 arrow py-0 py-md-2`} >
                        {IconArrowDownWhite}
                    </span>
                </div>
            </div>
            {
                arrow === true
                    ?
                    "Arrow"
                    :
                    ""
            }
        </div>
    );
};

const DoubleCalendar: React.FC<productInfo> = ({
    modalityID,
    product,
    productCode,
    changePriceDateTour,
    dateTour,
    index,
    isTicket = false
}: productInfo) => {
    const repo: TourRepository = new TourPageCollection;
    const repoChannel: IdChannelRepository = new IdChannelCollection();

    const cookies = parseCookies();

    const size = useWindowSize();
    const searchParams = useParams();

    const [dayProduct, setDayProduct] = React.useState<any>({});
    const [valueCalendar, setValueCalendar] = useState<any>({});
    const [newGetDate, setNewGetDate] = React.useState<any>(null);
    const [ranges, setRanges] = React.useState<any>({});
    const [tariffs, setTariffs] = React.useState<any>({});

    const [calendar, setCalendar] = useState<any>(null);

    const lng = searchParams.lng === "pt" ? "BR" : searchParams.lng === "en" ? "EN" : searchParams.lng === "es" ? "ES" : 'BR';

    function handleDateTour(objCalendar: any) {
        var aux: any = dateTour;

        var objTemp = {
            data: objCalendar.data,
            idSellingType: product.ranges.isActivePrivate === true ? 1 : 2,
            daysUniqueTarCode: objCalendar.daysUniqueTarCode,
            prodModUniqueCode: objCalendar.prodModUniqueCode,
            tarUniqueCode: objCalendar.tarUniqueCode,
            ranges: ranges
        }

        aux[index] = objTemp;

        changePriceDateTour(aux);
        //setShowHours(true);
    }

    useEffect(() => {
        if (!cookies.idCanal) {
            repoChannel.getFiltered('site').then((result: any) => {
                if (result instanceof Error) {
                    const message = JSON.parse(result.message)
                    //setConectionError(true);
                    //setErrorMessage(message?.errors.length > 0 ? message?.errors.length : ['Erro desconhecido - Entre em contato com o Suporte'])
                } else {
                    setCookie(null, 'idCanal', result.data, {
                        maxAge: (60 * 10), //expira em 10 minutos (60 * 10)
                        path: '/',
                    });
                    handleCalendarTour(result.data);
                }
            });
        } else {
            handleCalendarTour(+cookies.idCanal);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [product, productCode, newGetDate]);

    const handleCalendarTour = (channel: number) => {
        async function getDays() {
            var today: any;
            var todayDay: any;
            var todayMonth: any;
            var todayYear: any;
            var endMonth: any;
            var endYear: any;

            if (newGetDate === null) {
                today = new Date();
                todayDay = today.getDate() < 28 ? today.getDate() : 28;
                todayMonth = (today.getMonth() + 1);
                todayYear = today.getFullYear();
                endMonth = (today.getMonth() + 5);
                endYear = today.getFullYear();

                if (endMonth > 11) {
                    endMonth = endMonth - 11;
                    endYear = parseInt(endYear) + 1;
                }
            } else {
                today = new Date();
                todayDay = today.getDate() < 28 ? today.getDate() : 28;
                todayMonth = newGetDate - 1;
                todayYear = today.getFullYear();
                endMonth = newGetDate + 3;
                endYear = today.getFullYear();

                if (todayMonth > 12) {
                    todayMonth = todayMonth - 12;
                    todayYear = parseInt(todayYear) + 1;
                }
                if (endMonth > 12) {
                    endMonth = endMonth - 12;
                    endYear = parseInt(endYear) + 1;
                }
            }

            try {
                repo.getCalendarTour(todayYear + '-' + todayMonth + '-' + todayDay, endYear + '-' + endMonth + '-28', `${productCode}`, `${product.tarif.tarCode}`, `${product.prodModCode}`, lng, channel).then((result) => {
                    if (result instanceof Error) {
                        const message = JSON.parse(result.message)
                        //setConectionError(true);
                        //setErrorMessage(message?.errors.length > 0 ? message?.errors.length : ['Erro desconhecido - Entre em contato com o Suporte'])
                    } else {
                        if (calendar === null) {
                            setCalendar(result);
                        }
                    }
                });
            } catch (error: any) { }
        }

        getDays();
    }

    useEffect(() => {
        if (calendar !== null) {
            setRanges(calendar.ranges);
            setTariffs(calendar.tariffs);

            calendar.dates.forEach((dayProduct: any) => {
                let year = dayProduct.selectedDate.split("-")[0];
                let month = dayProduct.selectedDate.split("-")[1];
                let day = dayProduct.selectedDate.split("-")[2];

                let controlObject: { [x: number]: { price: any; data: any, idTarif: any, priceAdultFinal: any, priceChildFinal: any, priceGlobalFinal: any, priceInfantFinal: any, idSellingType: any, daysUniqueTarCode: any, prodModUniqueCode: any, tarUniqueCode: any } };
                let sControl: any = year + "-" + month + "-" + day.split("T")[0];
                controlObject = {
                    [sControl]: {
                        price:
                            dayProduct.priceAdultFinal === 0.0
                                ? dayProduct.priceGlobalFinal
                                : dayProduct.priceAdultFinal,
                        idTarif: dayProduct.idTarifario,
                        priceAdultFinal: dayProduct.priceAdultFinal,
                        priceChildFinal: dayProduct.priceChildFinal,
                        priceInfantFinal: dayProduct.priceInfantFinal,
                        priceGlobalFinal: dayProduct.priceGlobalFinal,
                        idSellingType: dayProduct.idSellingType,
                        daysUniqueTarCode: dayProduct.daysUniqueTarCode,
                        prodModUniqueCode: dayProduct.prodModUniqueCode,
                        tarUniqueCode: dayProduct.tarUniqueCode,
                        data: year + "-" + month + "-" + day.split("T")[0],
                    },
                };
                setDayProduct((curObjDeal: any) => ({
                    ...curObjDeal,
                    ...controlObject,
                }));
            });
        }
    }, [calendar])

    if (dayProduct !== null) {
        /* funcao(); */
        return (
            <DatePicker
                weekDays={weekDays}
                numberOfMonths={numberMonths}
                disableMonthPicker
                disableYearPicker
                months={months}
                format="DD/MM/YYYY"
                render={<CustomMultipleInput modalityID={modalityID} valueCalendar={valueCalendar} setNewGetDate={setNewGetDate} lng={lng} />}
                className={size.width <= 768 ? "rmdp-mobile multi-locale-days" : "multi-locale-days"}
                mapDays={({ date }): any => {
                    let controlNumber =
                        JSON.stringify(date.day).length === 1 ? "0" + date.day : date.day;
                    let controlMonth =
                        JSON.stringify(date.month.number).length === 1
                            ? "0" + date.month.number
                            : date.month.number;
                    let controlYear = date.year;

                    const objCalendar =
                        dayProduct[controlYear + "-" + controlMonth + "-" + controlNumber];
                    if (objCalendar !== undefined && objCalendar.price !== "null") {
                        if (
                            controlYear + "-" + controlMonth + "-" + controlNumber ===
                            objCalendar.data
                        ) {
                            return {
                                children: (
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            fontSize: "14px",
                                        }}
                                        onClick={() => { setValueCalendar(objCalendar); handleDateTour(objCalendar) }}
                                    >
                                        <div style={{
                                            textAlign: "center",
                                            bottom: "0px",
                                            left: "0px",
                                            right: "0px",
                                            top: "0px",
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",

                                        }}>
                                            {date.format("D")}
                                        </div>
                                        <div
                                            style={{
                                                textAlign: "center",
                                                fontSize: "9px",
                                                minHeight: "14px",
                                            }}
                                        >
                                            {" "}
                                            {objCalendar !== undefined
                                                ? objCalendar.price !== "null"
                                                    ? `R$ ${objCalendar.price
                                                        .toFixed(2)
                                                        .replace(".", ",")}`
                                                    : ""
                                                : ""}
                                        </div>
                                    </div>
                                ),
                            };
                        } else {
                            return {
                                disabled: true,
                            };
                        }
                    } else {
                        return {
                            disabled: true,
                        };
                    }
                }}
            ></DatePicker>
        );
    } else {
        return <></>;
    }
};

export default DoubleCalendar;