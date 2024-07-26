import "react-multi-date-picker/styles/layouts/mobile.css";

import React, { useEffect, useState } from "react";
import DatePicker from "react-multi-date-picker";

import useWindowSize from "@/data/hooks/useWindowSize";

import styles from './DoubleCalendar.module.css'
import { IconArrowDownWhite, IconCalendarSecondary } from "@/assets/icons";

import { useParams } from "next/navigation";

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
    infoCombo: any;
}

const CustomMultipleInput = ({ openCalendar, value, modalityID, valueCalendar, setNewGetDate, infoCombo, index, loading }: any) => {
    const searchParams = useParams();

    const [arrow, setArrow] = useState<any>(false);
    const lngcopy: string = searchParams.lng === "pt" ? "BR" : searchParams.lng === "en" ? "EN" : searchParams.lng === "es" ? "ES" : 'BR';
    const lang: any = lngcopy === "BR" ? "Quando?" : lngcopy === "EN" ? "When?" : "¿Cuándo?"

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
                {loading
                    ?
                    <>
                        <div className="input-group-prepend w-full" style={{ border: '1px solid #d1cbe0', borderRadius: '100px', height: '54px' }}>
                            <div className={`bg-hours`}>
                                <div className={`${styles.panelHours}`}>
                                    <div style={{ padding: "0.5rem 0 0.375rem 0", height: "42px" }} className="bg-height-hours"></div>
                                    <div className="d-flex align-items-center justify-content-start" style={{ cursor: "pointer", color: "#666", position: "relative" }} onClick={() => { }}>
                                        <div className="load" style={{ position: "absolute", bottom: "6px", left: "1rem", width: "1.375rem", height: "1.375rem" }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                    :
                    <>
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
                            placeholder={infoCombo[index]?.date === "" ? lang : infoCombo[index]?.date?.split("-").reverse().join("/")}
                        />
                        <div className="input-group-append">
                            <span className={`${styles.input_calendar_custom} right-4 arrow py-0 py-md-2`} >
                                {IconArrowDownWhite}
                            </span>
                        </div>
                    </>
                }
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

const DoubleCalendarCombo: React.FC<productInfo> = ({
    modalityID,
    product,
    productCode,
    changePriceDateTour,
    dateTour,
    index,
    isTicket = false,
    infoCombo,
}: productInfo) => {
    const size = useWindowSize();
    const searchParams = useParams();

    const [dayProduct, setDayProduct] = React.useState<any>({});
    const [valueCalendar, setValueCalendar] = useState<any>({});
    const [newGetDate, setNewGetDate] = React.useState<any>(null);
    const [ranges, setRanges] = React.useState<any>({});
    const [tariffs, setTariffs] = React.useState<any>({});
    const [loading, setLoading] = useState<any>(true);

    const lng = searchParams.lng === "pt" ? "BR" : searchParams.lng === "en" ? "EN" : searchParams.lng === "es" ? "ES" : 'BR';


    function handleDateTour(objCalendar: any) {
        var aux: any = dateTour;

        var objTemp = {
            data: objCalendar.data,
            idSellingType: /* product?.ranges?.isActivePrivate === true ? 1 : 2 */2,
            daysUniqueTarCode: objCalendar.daysUniqueTarCode,
            prodModUniqueCode: objCalendar.prodModUniqueCode,
            productCode: productCode,
            tarUniqueCode: objCalendar.tarUniqueCode,
            idTarifario: objCalendar.idTarif,
            ranges: ranges
        }

        aux[index] = objTemp;

        changePriceDateTour(aux, index, true);
        /* setShowHours(true); */
    }

    useEffect(() => {
        //setLoading(true);
        let idChannel: number = 1;

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
                endMonth = (today.getMonth() + 3);
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
                endMonth = newGetDate + 2;
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
                const data = {
                    dataInicio: todayYear + '-' + todayMonth + '-' + todayDay,
                    dataFim: endYear + '-' + endMonth + '-' + todayDay,
                    productCode: `${productCode}`,
                    productType: `${product.modalities[index].productType}`,
                    idCanal: idChannel,
                    comboCode: `${product.productCode}`,
                    lang: lng,
                }

                const resp = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/Products/ComboCalendar`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: JSON.stringify(data)
                })
                const tourResp = await resp.json();

                setRanges(tourResp.data.data[0].calendar[0].ranges);
                setTariffs(tourResp.data.data[0].calendar[0].tariffs);
                setLoading(false);

                tourResp.data.data[0].calendar[0].dates.forEach((dayProduct: any) => {
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

            } catch (error: any) {
                setLoading(false);
            }
        }

        async function getIdChannel() {
            try {
                const resp = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/Products/GetChannelBySource/site`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                })
                const channelResp = await resp.json();

                if (channelResp.statusCode === 200) {
                    idChannel = channelResp.data.data;
                    getDays();
                }
            } catch (error) { }
        }

        getIdChannel();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [product, productCode, newGetDate]);

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
                render={<CustomMultipleInput modalityID={modalityID} valueCalendar={valueCalendar} setNewGetDate={setNewGetDate} infoCombo={infoCombo} index={index} loading={loading} />}
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
                                            fontSize: "14px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            flexDirection: "column",
                                            height: "100%"
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

export default DoubleCalendarCombo;
