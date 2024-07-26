import React, { useState, useEffect, useRef } from "react";

import styles from "./DropdownNumberPeopleCombo.module.css";
import { IconArrowDownWhite, IconUser } from "@/assets/icons";

import { useParams } from "next/navigation";
import { getDictionary } from "@/dictionaries";

export interface propsR {
    tariffs: any;
    actionPeople: any;
    info: any;
    dateTour: any;
    index: any;
    isIntegration?: any;
    infoCombo: any;
}

const DropdownNumberPeopleCombo: React.FC<propsR> = ({
    tariffs,
    actionPeople,
    info,
    dateTour,
    index,
    isIntegration,
    infoCombo
}: propsR) => {
    const searchParams = useParams();

    const [numberAdults, setNumberAdults] = useState<number>(infoCombo[index] === undefined || infoCombo[index]?.peoples === null ? 0 : infoCombo[index].peoples.adults);
    const [numberChilds, setNumberChilds] = useState<number>(infoCombo[index] === undefined || infoCombo[index]?.peoples === null ? 0 : infoCombo[index].peoples.childs);
    const [numberInfants, setNumberInfants] = useState<number>(infoCombo[index] === undefined || infoCombo[index]?.peoples === null ? 0 : infoCombo[index].peoples.infants);
    const [numberStudent, setNumberStudent] = useState<number>(infoCombo[index] === undefined || infoCombo[index]?.peoples === null ? 0 : infoCombo[index].peoples.student);
    const [numberElders, setNumberElders] = useState<number>(infoCombo[index] === undefined || infoCombo[index]?.peoples === null ? 0 : infoCombo[index].peoples.elders);
    const [numberPeople, setNumberPeople] = useState<number>(infoCombo[index] === undefined || infoCombo[index]?.peoples === null ? 0 : infoCombo[index].peoples.globalPeople);
    const [numberTotal, setNumberTotal] = useState<number>(1);
    const [numberTotalPeople, setNumberTotalPeople] = useState<number>(1);
    const [numberStockTotal, setNumberStockTotal] = useState<number>(0);

    const [isOpen, setIsOpen] = useState<any>(false);

    const [dic, setDic] = useState<any>(null);

    useEffect(() => {
        const fetchDictionary = async () => {
            const dictionary = await getDictionary(searchParams.lng as "pt" | "en" | "es", 'productTour');
            setDic(dictionary);
        };
    
        fetchDictionary();
    
    }, [searchParams.lng])

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
    /* Detecta clique fora da div#wrapper para fechar\\ */

    const handleClickPeoples = () => {
        isOpen === false ? setIsOpen(true) : setIsOpen(false);
    };

    const handleClick = (controll: string, faixa: string) => {
        let stateNumber: any;

        if (faixa === "Adult") {
            stateNumber = numberAdults;
        } else if (faixa === "Child") {
            stateNumber = numberChilds;
        } else if (faixa === "Infant") {
            stateNumber = numberInfants;
        } else if (faixa === "Elders") {
            stateNumber = numberElders;
        } else if (faixa === "Student") {
            stateNumber = numberStudent;
        } else {
            stateNumber = numberPeople;
        }

        let newNumber = numberAdults;

        if (controll === "sub") {
            if (stateNumber === 0) {
                return false;
            } else {
                newNumber = stateNumber - dateTour[index]?.ranges[`increment${faixa}`];
                if (dateTour[index]?.ranges[`flagStock${faixa}`] === 1) {
                    setNumberStockTotal(numberStockTotal - dateTour[index]?.ranges[`increment${faixa}`]);
                }
            }
        }
        if (controll === "plus") {
            if (dateTour[index]?.ranges[`flagStock${faixa}`] === 1) {
                if ((numberStockTotal + dateTour[index]?.ranges[`increment${faixa}`] <= dateTour[index].maxStockNumber)) {
                    newNumber = stateNumber + dateTour[index]?.ranges[`increment${faixa}`];
                    setNumberStockTotal(numberStockTotal + dateTour[index]?.ranges[`increment${faixa}`]);
                } else {
                    return false;
                }
            } else {
                newNumber = stateNumber + dateTour[index]?.ranges[`increment${faixa}`];
            }
        }

        if (faixa === "Adult") {
            return setNumberAdults(newNumber);
        } else if (faixa === "Child") {
            return setNumberChilds(newNumber);
        } else if (faixa === "Infant") {
            return setNumberInfants(newNumber);
        } else if (faixa === "Elders") {
            return setNumberElders(newNumber);
        } else if (faixa === "Student") {
            return setNumberStudent(newNumber);
        } else {
            return setNumberPeople(newNumber);
        }
    };
    
    useEffect(() => {
        setNumberTotal(numberAdults + numberChilds + numberInfants + numberStudent + numberElders);
        setNumberTotalPeople(numberTotalPeople)
        const numberSend = {
            adults: dateTour[index]?.idSellingType === 1 ? 0 : numberAdults,
            childs: numberChilds,
            infants: numberInfants,
            elders: numberElders,
            student: numberStudent,
            globalPeople: dateTour[index]?.idSellingType === 2 ? 0 : numberPeople,
        };
        actionPeople(numberSend, index);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [numberAdults, numberChilds, numberInfants, numberPeople, numberStudent, numberElders]);

    useEffect(() => {
        /* setNumberAdults(0);
        setNumberChilds(0);
        setNumberInfants(0);
        setNumberStudent(0);
        setNumberElders(0);
        setNumberPeople(0);
        setNumberStockTotal(0)
        setNumberTotal(0); */
        //setNumberTotalPeople(0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dateTour[index]?.time, dateTour[index]?.data]);

    const RenderPeople = () => {
        return (
            <>
                {
                    dateTour[index]?.ranges?.labelsRealSorted.map((faixa: any, i: any) => {
                        let stateNumber: any;

                        if (faixa === "Adult") {
                            stateNumber = numberAdults;
                        } else if (faixa === "Child") {
                            stateNumber = numberChilds;
                        } else if (faixa === "Infant") {
                            stateNumber = numberInfants;
                        } else if (faixa === "Elders") {
                            stateNumber = numberElders;
                        } else if (faixa === "Student") {
                            stateNumber = numberStudent;
                        } else {
                            stateNumber = numberPeople
                        }

                        return (
                            <div key={i}>
                                {dateTour[index]?.ranges[`isActive${faixa}`] === true && dateTour[index]?.time !== undefined
                                    ?
                                    <div className={`${styles.dropdown_number_qtyButtons} `}>
                                        <div className="flex-ajuste">
                                            <label>
                                                {dateTour[index]?.ranges[`label${faixa}`]}
                                                <div className="price">
                                                    {
                                                        faixa === "Private"
                                                            ?
                                                            <span
                                                                className="price-dropdown text-dark font-weight-bold w-100 d-block"
                                                                id="valor-adulto-sm"
                                                            >
                                                                R$ {(dateTour[index].global).toFixed(2).split(".").join(",")}
                                                            </span>
                                                            :
                                                            <span
                                                            className="price-dropdown text-dark font-weight-bold w-100 d-block"
                                                            id="valor-adulto-sm"
                                                            >
                                                                R$ {(dateTour[index][`${faixa.toLowerCase()}`]).toFixed(2).split(".").join(",")}
                                                            </span>
                                                    }
                                                </div>
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <button className={`${styles.dropdown_number_qtyDec} `} onClick={() => handleClick("sub", faixa)}>
                                                -
                                            </button>
                                            <input
                                                type="text"
                                                name="qtyInput"
                                                value={stateNumber}
                                                id="numero-adulto"
                                            />
                                            <button  className={`${styles.dropdown_number_qtyInc} `} onClick={() => handleClick("plus", faixa)}>
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    :
                                    <></>
                                }
                            </div>
                        )
                    })
                }
            </>
        );
    };

    useEffect(() => {
        setNumberTotal(numberAdults + numberChilds + numberInfants);
        setNumberTotalPeople(numberPeople);
    }, [numberAdults, numberChilds, numberInfants, numberPeople]);

    if (isOpen === true) {
        return (
            <div id="wrapper" ref={wrapperRef} className={styles.input_people}>
                <div style={{ cursor: "pointer" }} onClick={() => handleClickPeoples()}>
                    <span className={`${styles.input_calendar_custom} left-4 arrow py-0 py-md-2`}>
                        {IconUser("#65E587", "24px", "24px")}
                    </span>
                    <div className={`${styles.dropdown_number_people_text} `}>
                        <span
                            className="qtyTotal"
                            data-min="2"
                            data-max="19"
                            style={{ marginRight: "5px" }}
                        >
                            {dateTour[index]?.idSellingType === 2
                                ? numberTotal
                                : dateTour[index]?.idSellingType === 1
                                    ? numberTotalPeople
                                    : ""}
                        </span>
                        <span style={{ color: "#FFF" }}>
                            {dateTour[index]?.idSellingType === 2
                                ? `${dic?.tour.tourOptions.dropdown.passengers}`
                                : dateTour[index]?.idSellingType === 1
                                    ? `${dic?.tour.tourOptions.dropdown.people}`
                                    : `${dic?.tour.tourOptions.dropdown.passengers}`}
                        </span>
                    </div>
                    <div className="input-group-append">
                        <span className={`${styles.input_calendar_custom} right-4 py-0 py-md-2`} >
                            {IconArrowDownWhite}
                        </span>
                    </div>
                </div>
                <div className="shadow-mobile">
                    <div className={`${styles.dropdown_number_panel_content} ${styles.dropdown_number_panel_content_active} right`}>
                        <RenderPeople />
                        <p id="alertNumber"></p>
                        <div className="flex justify-end md:hidden">
                            <button style={{ color: "#2682d3", fontSize: "12px", padding: "0 5px", fontWeight: 600 }} onClick={() => setIsOpen(false)}>OK</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <>
                <div className={styles.input_people}>
                    <div style={{ cursor: "pointer" }} onClick={() => handleClickPeoples()}>
                        <span className={`${styles.input_calendar_custom} left-4 arrow py-0 py-md-2`}>
                            {IconUser("#65E587", "24px", "24px")}
                        </span>
                        <div className={styles.people_text}>
                            <span
                                className="qtyTotal"
                                data-min="2"
                                data-max="19"
                                style={{ marginRight: "5px" }}
                            >
                                {dateTour[index]?.idSellingType === 2
                                    ? numberTotal
                                    : dateTour[index]?.idSellingType === 1
                                        ? numberTotalPeople
                                        : ""}
                            </span>
                            <span style={{ color: "#FFF" }}>
                                {dateTour[index]?.idSellingType === 2
                                    ? `${dic?.tour.tourOptions.dropdown.passengers}`
                                    : dateTour[index]?.idSellingType === 1
                                        ? `${dic?.tour.tourOptions.dropdown.people}`
                                        : `${dic?.tour.tourOptions.dropdown.passengers}`}
                            </span>
                        </div>
                        <div className="input-group-append">
                            <span className={`${styles.input_calendar_custom} right-4 py-0 py-md-2`} >
                                {IconArrowDownWhite}
                            </span>
                        </div>
                    </div>
                </div>
            </>
        );
    }
};

export default DropdownNumberPeopleCombo;
