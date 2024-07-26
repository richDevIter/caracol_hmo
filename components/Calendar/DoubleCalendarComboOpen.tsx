'use client'
import "react-multi-date-picker/styles/layouts/mobile.css";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import DatePicker from "react-multi-date-picker";

import useWindowSize from "@/data/hooks/useWindowSize";

import styles from './DoubleCalendar.module.css'
import { IconArrowDownWhite, IconCalendarSecondary } from "@/assets/icons";

// import calendar from '../../assets/icons/ci_calendar_single_tour.svg';
// import iconArrow from '../../assets/icons/arrow_white.svg';

export interface productInfo {
    modalityID: any;
    product: any;
    productCode: any;
    changePriceDateTour: any;
    index: any;
    dateTour: any;
    isTicket?: boolean;
    infoCombo: any;
    eventDate?: any;
}

const DoubleCalendarComboOpen: React.FC<productInfo> = ({
    modalityID,
    product,
    productCode,
    changePriceDateTour,
    dateTour,
    index,
    isTicket = false,
    infoCombo,
    eventDate
}: productInfo) => {
    const size = useWindowSize();

    const date: string = eventDate.split("/").reverse().join("-");

    const [dayProduct, setDayProduct] = React.useState<any>(null);
    const [valueCalendar, setValueCalendar] = useState<any>({});
    const [newGetDate, setNewGetDate] = React.useState<any>(null);
    const [ranges, setRanges] = React.useState<any>({});
    const [tariffs, setTariffs] = React.useState<any>({});
    const [loading, setLoading] = useState<any>(true);

    const searchParams = useParams();
    const lng: string = searchParams.lng === "pt" ? "BR" : searchParams.lng === "en" ? "EN" : searchParams.lng === "es" ? "ES" : 'BR';

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
        let idChannel: number = 2;

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
                    dataInicio: date,
                    dataFim: date,
                    productCode: `${productCode}`,
                    productType: `${product.modalities[index].productType}`,
                    idCanal: idChannel,
                    comboCode: `${product.productCode}`,
                    lang: lng,
                }

                let productType: string = isTicket ? "/Products/ComboCalendar" : "/Products/ComboCalendar"

                const resp = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL_API}${productType}`, {
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

    useEffect(() => {
        if (dayProduct !== null) {
            setValueCalendar(dayProduct[date]);
            handleDateTour(dayProduct[date]);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dayProduct])

    return (
        <span>
            {eventDate}
        </span>
    );
};

export default DoubleCalendarComboOpen;
