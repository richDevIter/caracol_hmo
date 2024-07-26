import React, { useEffect, useState } from "react";

import { Range } from 'react-range';
/* import InputRange from "react-input-range";
import 'react-input-range/lib/css/index.css'; */
//import SetTransfersItem from "../../../infra/Transfers/SetTransfersItem";


import styles from './TransfersFilter.module.css';
import { useParams, useRouter } from "next/navigation";
import { getDictionary } from "@/dictionaries";

export interface propFilter {
    transfers: any,
    transferItemJSON?: any,
    setTransfers: any,
    open?: any,
    setOpen?: any,
    setFilter?: any,
    setActiveCarrousel: any,
    setNotFound: any;
    setTotalRows: any;
    setPageCount: any;
    searchState?:any;
};

const TransfersFilter: React.FC<propFilter> = ({
    transfers, transferItemJSON, setTransfers, open, setOpen, setFilter, setActiveCarrousel, setNotFound, setTotalRows, setPageCount, searchState
}: propFilter) => {
    const router = useRouter();
    const searchParams = useParams();


    const lang = searchParams.lng === "pt" ? "BR" : searchParams.lng === "en" ? "EN" : searchParams.lng === "es" ? "ES" : "BR";


    const [dic, setDic] = useState<any>(null);

    useEffect(() => {
        const fetchDictionary = async () => {
            const dictionary = await getDictionary(searchParams.lng as "pt" | "en" | "es", 'transfersListFilter');
            setDic(dictionary);
        };
        fetchDictionary();
    }, [searchParams.lng])


    const [filterVehicle, setFilterVehicle] = useState<any>([]);
    const [filterService, setFilterService] = useState<any>([]);
    const [filterCategory, setFilterCategory] = useState<any>([]);

    const [selectedFilterVehicle, setSelectedFilterVehicle] = useState<any>([]);
    const [selectedFilterService, setSelectedFilterService] = useState<any>([]);
    const [selectedFilterCategory, setSelectedFilterCategory] = useState<any>([]);

    const [minValue, setMinValue] = useState<any>(0);
    const [maxValue, setMaxValue] = useState<any>(1000);
    const [value, setValue] = useState<any>({ min: minValue, max: maxValue });
    const [tourFilterPriceRange, setTourFilterPriceRange] = useState<any>({ values: [1000] });

    const today: string = new Date().toLocaleDateString();

    function handleSelectedFilterVehicle(elem: any) { ///cria o array dis checkbox selecionados para veículos
        var aux: any = []

        if (selectedFilterVehicle.includes(elem) === true) {
            for (let i = 0; i < selectedFilterVehicle.length; i++) {
                if (selectedFilterVehicle[i] !== elem) {
                    aux.push(selectedFilterVehicle[i]);
                }
            }
        } else {
            aux = [...selectedFilterVehicle, elem];
        }
        setSelectedFilterVehicle(aux);
    }

    function handleSelectedFilterService(elem: any) {   ///cria o array dis checkbox selecionados para serviços
        var aux: any = []

        if (selectedFilterService.includes(elem) === true) {
            for (let i = 0; i < selectedFilterService.length; i++) {
                if (selectedFilterService[i] !== elem) {
                    aux.push(selectedFilterService[i]);
                }
            }
        } else {
            aux = [...selectedFilterService, elem];
        }
        setSelectedFilterService(aux);
    }

    function handleSelectedFilterCategory(elem: any) {  ///cria o array dis checkbox selecionados para categoria
        var aux: any = []

        if (selectedFilterCategory.includes(elem) === true) {
            for (let i = 0; i < selectedFilterCategory.length; i++) {
                if (selectedFilterCategory[i] !== elem) {
                    aux.push(selectedFilterCategory[i]);
                }
            }
        } else {
            aux = [...selectedFilterCategory, elem];
        }
        setSelectedFilterCategory(aux);
    }

    function handleRangeChange(e: any) {
        setValue(e);
    }

    async function TransfersRender() {
        const data = {
            "lang": lang,
            "dateTransfer": transferItemJSON?.date !== "" ? `${transferItemJSON?.date?.split('/').reverse().join('-')}` : `${today.split('/').reverse().join('-')}`,
            "timeTransfer": transferItemJSON?.date !== "" ? `${transferItemJSON?.time}` : "00:00",
            "numPeople": `${transferItemJSON?.numPeople}`,
            "origemLng": `${transferItemJSON?.lngOrigem}`,
            "origemLat": `${transferItemJSON?.latOrigem}`,
            "destinoLng": `${transferItemJSON?.lngDestino}`,
            "destinoLat": `${transferItemJSON?.latDestino}`,
            "transferVehicleType": selectedFilterVehicle.length > 0 ? selectedFilterVehicle : '',
            "transferServiceType": selectedFilterService.length > 0 ? selectedFilterService : '',
            "vehicleCategory": selectedFilterCategory.length > 0 ? selectedFilterCategory : '',
            "priceStart": 1,
            "priceEnd": tourFilterPriceRange.values[0]
        }

        const resp = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/Products/FetchTransfersAsync`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data)
        })
        const serachResp = await resp.json();

        if (serachResp.status !== 400) {
            if (serachResp.statusCode === 200) {
                setTotalRows(serachResp.data.transferList?.length);
                setTransfers(serachResp.data.transferList);
                setFilter(serachResp.data.vehicleTypeList.concat(serachResp.data.serviceTypeList, serachResp.data.vehicleCategoryList));
                setNotFound(false);
                ({ values: [serachResp.data.maxPrice] })
                
                if(tourFilterPriceRange.values[0] === 1000) {
                    setTourFilterPriceRange({ values: [Math.ceil(serachResp.data.maxPrice)] })
                }
            } else {
                setTourFilterPriceRange
                setNotFound(true);
            }
        }
    }

    useEffect(() => {
        if (transferItemJSON !== null) {
            TransfersRender()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [transferItemJSON, selectedFilterCategory, selectedFilterService, selectedFilterVehicle])

    let auxValue: any = [];

    /* Correção infinity */
    if (value.min === Infinity && value.max === -Infinity) {
        setMinValue(value.min = 0);
        setMaxValue(value.max = 1000);
    }
    /* Correção infinity */

    useEffect(() => {
        let auxVehicle: any = [];
        let auxService: any = [];
        let auxCategory: any = [];
        //let auxValue: any = [];

        for (let j = 0; j < transfers?.length; j++) {
            //Vehicles
            if (transfers[j].transferVehicleType) {
                if (!auxVehicle.includes(transfers[j].transferVehicleType)) {
                    auxVehicle.push(transfers[j].transferVehicleType)
                }
            }

            //Services
            if (transfers[j].transferServiceType) {
                if (!auxService.includes(transfers[j].transferServiceType)) {
                    auxService.push(transfers[j].transferServiceType)
                }
            }

            //Category
            if (transfers[j].vehicleCategoryDetails.category) {
                if (!auxCategory.includes(transfers[j].vehicleCategoryDetails.category)) {
                    auxCategory.push(transfers[j].vehicleCategoryDetails.category)
                }
            }

            //Value Min and Máx
            if (transfers[j].preco) {
                auxValue.push(transfers[j].preco)
            }
        }

        /* /////
        transfers.forEach((element: any) => {
        });
        ///// */

        if (filterVehicle.length === 0) { ///impede os checkbox renderizarem denovo
            setFilterVehicle(auxVehicle);
            setFilterService(auxService);
            setFilterCategory(auxCategory);
            setMinValue(value.min = Math.floor(Math.min(...auxValue)));
            setMaxValue(value.max = Math.ceil(Math.max(...auxValue)));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [transfers, value, filterVehicle.length]);

    async function handleFilter() {
        const data = {
            "lang": lang,
            "dateTransfer": `${transferItemJSON.date.split('/').reverse().join('-')}`,
            "timeTransfer": `${transferItemJSON.time}`,
            "numPeople": `${transferItemJSON.numPeople}`,
            "origemLng": `${transferItemJSON.lngOrigem}`,
            "origemLat": `${transferItemJSON.latOrigem}`,
            "destinoLng": `${transferItemJSON.lngDestino}`,
            "destinoLat": `${transferItemJSON.latDestino}`,
            "transferVehicleType": selectedFilterVehicle.length > 0 ? selectedFilterVehicle : '',
            "transferServiceType": selectedFilterService.length > 0 ? selectedFilterService : '',
            "vehicleCategory": selectedFilterCategory.length > 0 ? selectedFilterCategory : '',
            "priceStart": 1,
            "priceEnd": tourFilterPriceRange.values[0]
        }

        const resp = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/Products/FetchTransfersAsync`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data)
        })
        const serachResp = await resp.json();

        if (serachResp.status !== 400) {
            if (serachResp.statusCode === 200) {
                setTransfers(serachResp.data.transferList);
                setNotFound(false);
            } else {
                setNotFound(true);
            }
        }
    }

    return (
        <>
            <div className={`${styles.bg_transfers_list_filter} pt-4`}>
                <div>
                    <Range
                        step={10}
                        min={value.min}
                        max={value.max}
                        values={tourFilterPriceRange.values}
                        onChange={(values: any) => setTourFilterPriceRange({ values: values })}
                        renderTrack={({ props, children }) => (
                            <div
                                {...props}
                                style={{
                                    ...props.style,
                                    height: '6px',
                                    width: '100%',
                                    backgroundColor: '#034C43'
                                }}
                            >
                                {children}
                                <div style={{ position: 'relative' }}>
                                    <div className="flex justify-between" style={{ position: 'absolute', width: '110%', top: '-30px' }}>
                                        <p>{value.min}</p>
                                        <p>{value.max}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                        renderThumb={({ props }) => (
                            <div
                                {...props}
                                style={{
                                    ...props.style,
                                    height: '20px',
                                    width: '20px',
                                    backgroundColor: '#034C43',
                                    borderRadius: '50%'
                                }}
                            >
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: '20px',
                                        left: '-50%',
                                        color: '#fff',
                                        fontWeight: 'bold',
                                        fontSize: '14px',
                                        fontFamily: 'Arial,Helvetica Neue,Helvetica,sans-serif',
                                        padding: '4px',
                                        borderRadius: '4px',
                                        backgroundColor: '#034C43'
                                    }}
                                >
                                    {tourFilterPriceRange.values}
                                </div>
                            </div>
                        )} />
                    <div style={{ marginTop: "50px" }}>
                        <button onClick={handleFilter} className="btn btn-primary" style={{ borderRadius: "100px", width: "100%" }}>{dic?.btnPrice}</button>
                    </div>
                </div>
                <div>
                    <h5 className={`${styles.bg_transfers_list_title_filter} `}>{dic?.vehicles}</h5>
                    <div id="type-vehicles" className="d-flex flex-column">
                        {filterVehicle.map((filter: any, index: any) => {
                            return (
                                <div key={index}>
                                    <div className="check-cat">
                                        <input type="checkbox" name="Arte" id={`vehicle-${index}`} onClick={() => { handleSelectedFilterVehicle(filter) }} />
                                        <label htmlFor={`vehicle-${index}`}>
                                            {filter}
                                        </label>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div>
                    <h5 className={`${styles.bg_transfers_list_title_filter} `}>{dic?.services}</h5>
                    <div className="d-flex flex-column">
                        {filterService.map((filter: any, index: any) => {
                            return (
                                <div key={index}>
                                    <div className="check-cat break-all">
                                        <input type="checkbox" name="Arte" id={`service-${index}`} onClick={() => { handleSelectedFilterService(filter) }} />
                                        <label htmlFor={`service-${index}`}>
                                            {filter}
                                        </label>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div>
                    <h5 className={`${styles.bg_transfers_list_title_filter} `}>{dic?.categories}</h5>
                    <div className="d-flex flex-column">
                        {filterCategory.map((filter: any, index: any) => {
                            return (
                                <div key={index}>
                                    <div className="check-cat">
                                        <input type="checkbox" name="Arte" id={`category-${index}`} onClick={() => { handleSelectedFilterCategory(filter) }} />
                                        <label htmlFor={`category-${index}`}>{filter}</label>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}

export default TransfersFilter;
