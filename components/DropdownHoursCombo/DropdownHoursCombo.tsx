//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";

import styles from "./DropdownHoursCombo.module.css";
import { IconArrowDownWhite, IconWatch } from "@/assets/icons";

export interface propsR {
    changePriceDateTour: any,
    dateTour: any,
    index?: any,
    setPeopleDisponible?: any,
    edit?: any,
    item?: any,
    info?: any,
    isIntegration?: any,
    isCombo?: any,
    infoCombo: any
}

const DropdownHoursCombo: React.FC<propsR> = ({
    changePriceDateTour, dateTour, index = 0, setPeopleDisponible, edit = false, item, info, isIntegration, isCombo = false, infoCombo
}: propsR) => {
    const [isOpen, setIsOpen] = useState<any>(false);
    const [hours, setHours] = useState<any>(null);
    const [select, setSelect] = useState<any>(null);
    const [loading, setLoading] = useState<any>(false);

    /* Detecta clique fora da div#wrapper para fechar*/
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    function useOutsideAlerter(ref: any) {
        useEffect(() => {
            function handleClickOutside(event: any) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setIsOpen(false);
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    const handleClickHours = () => {
        isOpen === false ? setIsOpen(true) : setIsOpen(false);
    };

    function handleSelectHours(hours: any, price: any) {
        setSelect(hours);

        var aux: any = dateTour;

        aux[index].time = hours;

        if (isIntegration === false) {
            aux[index].adult = price.sellingTarifAdultFinal;
            aux[index].child = price.sellingTarifChildFinal;
            aux[index].infant = price.sellingTarifInfantFinal;
            aux[index].student = price.sellingTarifEldersFinal;
            aux[index].elders = price.sellingTarifStudentFinal;
            aux[index].global = price.sellingTarifGlobalFinal;
            aux[index].maxStockNumber = price.balanceAvailableByChannel;
        } else {
            aux[index].maxStockNumber = price.capacity;
        }

        setIsOpen(false);
        if (edit !== true) {
            setPeopleDisponible(true);
        }
        changePriceDateTour(aux, index, false);
        //changePriceDateTour(aux, hours);
    }

    useEffect(() => {
        let idChannel: number = 1;

        if (edit !== true) {
            setSelect(null);
            setPeopleDisponible(false);
        } else {
            if (dateTour[0].time === undefined) {
                dateTour[0].time = item.startTimeLocal.split("T")[1];
            }
        }

        const token = localStorage.getItem('crcSiteAuth') || '{}';

        async function listHours() {
            setLoading(true);

            const data = {
                page: 1,
                rowsPerPage: 10,
                dateStart: dateTour[index]?.data,
                tarUniqueCode: dateTour[index]?.tarUniqueCode,
                prodModUniqueCode: dateTour[index]?.prodModUniqueCode/* 'MOA5357' */,
                daysUniqueTarCode: dateTour[index]?.daysUniqueTarCode,
                idCanal: idChannel
            }

            try {
                const resp = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/Products/GetTicketAndTourHoursStockAsync`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data)
                    });

                const hoursList = await resp.json();

                if (hoursList.status !== 400) {
                    setLoading(false);
                    setHours(hoursList.data);

                } else {

                }
            } catch (error: any) { }
        }

        async function listHoursIntegration() {
            setLoading(true);

            const data = {
                "page": 1,
                "rowsPerPage": 10,
                "dateStart": dateTour[index].data,
                "tarUniqueCode": dateTour[index].tarUniqueCode,
                "prodModUniqueCode": dateTour[index].prodModUniqueCode,
                "daysUniqueTarCode": dateTour[index].daysUniqueTarCode,
                "idCanal": 1
            }

            try {
                const resp = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/Products/GetTicketActivitiesIntegrationAsync`,
                    {
                        method: 'POST',
                        headers: {
                            Authorization: `Bearer ${JSON.parse(token).token.token}`,
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data)
                    });

                const hoursListIntegration = await resp.json();
                if (hoursListIntegration.status !== 400) {
                    setLoading(false);
                    setHours(hoursListIntegration.data);
                } else {

                }
            } catch (error: any) {
                /* if (error.response.status === 401) {
                    window.location.href = window.location.origin + '/';
                } */
            }
        }

        async function getIdChannel() {
            try {
                const resp = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/Products/GetChannelBySource/site`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                const channelResp = await resp.json();

                if (channelResp.statusCode === 200) {
                    idChannel = channelResp.data.data;
                    if (dateTour[index]?.data !== undefined) {
                        if (isIntegration === false) {
                            listHours();
                        } else {
                            listHoursIntegration();
                        }
                    }
                }
            } catch (error) { }
        }

        getIdChannel();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dateTour[index]?.data]);

    /* Adicionar o valor já escolhido ao horário */
    useEffect(() => {
        if (infoCombo[index]?.time !== undefined && infoCombo[index]?.time !== "") {
            setSelect(infoCombo[index]?.time);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [infoCombo[index]])
    /* END - Adicionar o valor já escolhido ao horário */

    if (isOpen === true && isIntegration === false) {
        return (
            <div className={`${isCombo === false ? "mb-5 bg-hours" : "bg-hours"}`}>
                <div className={`${styles.panelHours}`}>
                    <div style={{ height: "54px" }} className="flex items-center">
                        <div id="wrapper" ref={wrapperRef}>
                            <div className="flex items-center" style={{ cursor: "pointer", color: "#666" }} onClick={() => handleClickHours()}>
                                <div className="absolute" style={{ left: "1rem" }}>
                                    {IconWatch('#00cc79', '24', '24')}
                                </div>
                                <span>
                                    {select === null ? "Horários" : select.split(":")[0] + ":" + select.split(":")[1]}
                                </span>
                                <div className="absolute" style={{ right: "16px" }}>
                                    {IconArrowDownWhite}
                                </div>
                            </div>

                            <div className={`${styles.hoursOptions}`}>
                                <div className="grid grid-cols-12 mx-0">
                                    {hours?.map((x: any, index: any) => {
                                        if (x.balanceAvailableByChannel <= 5) {
                                            return (
                                                <>
                                                    {
                                                        index === 0
                                                            ?
                                                            <h6 className="hours-title">
                                                                Últimas Vagas
                                                            </h6>
                                                            :
                                                            ""
                                                    }
                                                    <div
                                                        key={index}
                                                        /* value={x.startTime} */
                                                        data-capacity={x.balanceAvailableByChannel}
                                                        className="col-span-3 md:col-span-4 p-1 mb-2"
                                                    >
                                                        <div className="hours-options" onClick={() => handleSelectHours(x.hora, x)}>
                                                            <p>{`${x.hora.split(":")[0]}:${x.hora.split(":")[1]}`}</p>
                                                            <span>{`${x.balanceAvailableByChannel} vagas`}</span>
                                                        </div>
                                                    </div>
                                                </>
                                            );
                                        } else {
                                            return (
                                                <></>
                                            )
                                        }
                                    })}
                                </div>
                                <h6 className="hours-title">
                                    {hours?.length > 0 ? "Horários Disponíveis" : "Não há horários disponíveis"}
                                </h6>
                                <div className="grid grid-cols-12 mx-0 gap-1">
                                    {hours?.map((x: any, index: any) => {
                                        if (x.balanceAvailableByChannel > 5) {
                                            return (
                                                <>
                                                    <div
                                                        key={index}
                                                        /* value={x.startTime} */
                                                        data-capacity={x?.balanceAvailableByChannel}
                                                        className="col-span-3 md:col-span-4"
                                                    >
                                                        <div className={`${styles.hoursBorder}`} onClick={() => handleSelectHours(x.hora, x)}>
                                                            <p>{`${x.hora.split(":")[0]}:${x.hora.split(":")[1]}`}</p>
                                                        </div>
                                                    </div>
                                                </>
                                            );
                                        } else {
                                            return (
                                                <></>
                                            )
                                        }
                                    })}
                                </div>
                                {/* <p id="alertNumber"></p> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else if (isOpen === true && isIntegration === true && hours?.length > 0) {
        return (
            <div className={`${isCombo === false ? "mb-5 bg-hours" : "bg-hours"}`}>
                <div className={`${styles.panelHours}`}>
                    <div style={{ height: "54px" }} className="flex items-center">
                        <div id="wrapper" ref={wrapperRef}>
                            <div className="d-flex align-items-center" style={{ cursor: "pointer", color: "#666" }} onClick={() => handleClickHours()}>
                                <div className="absolute" style={{ left: "1rem" }}>
                                    {IconWatch('#00cc79', '24', '24')}
                                </div>
                                <span>
                                    {select === null ? "Horários" : select.split(":")[0] + ":" + select.split(":")[1]}
                                </span>
                            </div>

                            <div className={`${styles.hoursOptions}`}>
                                <div className="grid grid-cols-12 mx-0 gap-1">
                                    {hours?.map((x: any, index: any) => {
                                        if (x.balanceAvailableByChannel <= 5) {
                                            return (
                                                <>
                                                    {
                                                        index === 0
                                                            ?
                                                            <h6 className="hours-title">
                                                                Últimas Vagas
                                                            </h6>
                                                            :
                                                            ""
                                                    }
                                                    <div
                                                        key={index}
                                                        /* value={x.startTime} */
                                                        data-capacity={x.balanceAvailableByChannel}
                                                        className="col-span-4 md:col-span-3 p-1 mb-2"
                                                    >
                                                        <div className="hours-options" onClick={() => handleSelectHours(x.hora, x)}>
                                                            <p>{`${x.hora.split(":")[0]}:${x.hora.split(":")[1]}`}</p>
                                                            <span>{`${x.balanceAvailableByChannel} vagas`}</span>
                                                        </div>
                                                    </div>
                                                </>
                                            );
                                        } else {
                                            return (
                                                <></>
                                            )
                                        }
                                    })}
                                </div>
                                <h6 className="hours-title">
                                    {hours?.length > 0 ? "Horários Disponíveis" : "Não há horários disponíveis"}
                                </h6>
                                <div className="grid grid-cols-12 mx-0">
                                    {hours?.map((x: any, index: any) => {
                                        if (x.capacity > 5) {
                                            return (
                                                <>
                                                    <div
                                                        key={index}
                                                        /* value={x.startTime} */
                                                        data-capacity={x?.capacity}
                                                        className="col-span-4 md:col-span-3 p-1"
                                                    >
                                                        <div className="hours-options" onClick={() => handleSelectHours(x.startTime, x)}>
                                                            <p>{`${x.startTime.split(":")[0]}:${x.startTime.split(":")[1]}`}</p>
                                                            <small>{x?.capacity} vagas</small>
                                                        </div>
                                                    </div>
                                                </>
                                            );
                                        } else {
                                            return (
                                                <></>
                                            )
                                        }
                                    })}
                                </div>
                                {/* <p id="alertNumber"></p> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else if (hours?.length <= 0 && isCombo === false) {
        dateTour[index].maxStockNumber = 99990;
        setPeopleDisponible(true);

        return (
            <></>
        )
    } else {
        if (loading !== true) {
            return (
                <div className={`${isCombo === false ? "mb-5 bg-hours" : "bg-hours"}`}>
                    <div className={`${styles.panelHours}`}>
                        <div style={{ height: "54px" }} className="flex items-center">
                            <div className="flex items-center" style={{ cursor: "pointer", color: "#666" }} onClick={() => handleClickHours()}>
                                <div className="absolute" style={{ left: "1rem" }}>
                                    {IconWatch('#00cc79', '24', '24')}
                                </div>
                                <span>{select === null ? "Horários" : select.split(":")[0] + ":" + select.split(":")[1]}</span>
                                <span
                                    className="qtyTotal"
                                    data-min="2"
                                    data-max="19"
                                >
                                    {/* {dateTour[actual]?.idSellingType === 2
                            ? numberTotal
                            : dateTour[actual]?.idSellingType === 1
                                ? numberTotalPeople
                                : 0} */}
                                </span>
                            </div>
                            <div className="absolute" style={{ right: "16px" }}>
                                {IconArrowDownWhite}
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className={`${isCombo === false ? "mb-5 bg-hours" : "bg-hours"}`}>
                    <div className={`${styles.panelHours}`}>
                        <div style={{ padding: "0.5rem 0 0.375rem 0", height: "42px" }} className="bg-height-hours"></div>
                        <div className="d-flex align-items-center justify-content-start" style={{ cursor: "pointer", color: "#666", position: "relative" }} onClick={() => handleClickHours()}>
                            <div className="load" style={{ position: "absolute", bottom: "6px", left: "1rem", width: "1.375rem", height: "1.375rem" }}></div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default DropdownHoursCombo;