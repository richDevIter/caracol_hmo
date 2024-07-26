import React, { useEffect, useState, Key } from "react";

import styles from "./FilterStores.module.css";

export interface propFilter {
    stores: any;
    setFilterLocation: any;
    setFilterType: any;
    setPagination: any;
    dic?: any;
}

const FilterStores: React.FC<propFilter> = ({
    stores, setFilterLocation, setFilterType, setPagination, dic
}: propFilter) => {
    const [modalShow, setModalShow] = React.useState(false);

    const [arrTypes, setArrTypes] = useState<any>([]);
    const [arrLocation, setArrLocation] = useState<any>([]);

    const [tourFilterType, setTourFilterType] = useState<any>([]);
    const [tourFilterLocation, setTourFilterLocation] = useState<any>([]);

    const [arrTypesStores, setArrTypesStores] = useState<any>([]);
    const [arrLocationStores, setArrLocationStores] = useState<any>([]);

    function handleClickType(event: any, filterValue: any = null) {
        var value: any = event.target.value;
        setPagination(5);
        if (filterValue !== null) { /// somente quando o click é feito no "x" da lista de filtros selecionados
            value = filterValue;
        }

        let types = [];

        if (arrTypes.includes(value) === true) {
            for (let i = 0; i < arrTypes.length; i++) {
                if (arrTypes[i] !== value) {
                    types.push(arrTypes[i]);
                }
            }
            setTourFilterType(types);
            setArrTypes(types);
        } else {
            setTourFilterType([...arrTypes, value]);
            setArrTypes([...arrTypes, value]);
        }
    }

    function handleClickLocation(event: any, filterValue: any = null) {
        var value: any = event.target.value;
        setPagination(5);

        if (filterValue !== null) { /// somente quando o click é feito no "x" da lista de filtros selecionados
            value = filterValue;
        }

        let Location = [];

        if (arrLocation.includes(value) === true) {
            for (let i = 0; i < arrLocation.length; i++) {
                if (arrLocation[i] !== value) {
                    Location.push(arrLocation[i]);
                }
            }
            setTourFilterLocation(Location);
            setArrLocation(Location);
        } else {
            setTourFilterLocation([...arrLocation, value]);
            setArrLocation([...arrLocation, value]);
        }
    }

    function clearFilters() {
        setTourFilterLocation([]);
        setTourFilterType([]);
        setArrLocation([]);
        setArrTypes([]);
        setPagination(5);
    }

    setFilterLocation(arrLocation);
    setFilterType(arrTypes);

    useEffect(() => {
        let auxTypeStore: any = [];
        let auxLocationStore: any = [];

        for (let j = 0; j < stores?.length; j++) {
            //Stores
            if (stores[j].type) {
                if (!auxTypeStore.includes(stores[j].type)) {
                    auxTypeStore.push(stores[j].type)
                }
                setArrTypesStores(auxTypeStore)
            }
            //location
            if (stores[j].location) {
                if (!auxLocationStore.includes(stores[j].location)) {
                    auxLocationStore.push(stores[j].location)
                }
                setArrLocationStores(auxLocationStore)
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    console.log(dic)

    return (
        <>
            <div className="container-page mt-4">
                <div className="mt-3 mb-5 block">
                    <h5
                        className={`${styles.title_filter} mb-4 text-uppercase text-primary`}
                    //style={{ color: "#FF6600" }}
                    >
                        {dic?.filter?.select}
                    </h5>

                    {(tourFilterType.length > 0)
                        ? tourFilterType.map((filter: any, index: Key) => (
                            <div key={index} className="flex justify-between">
                                <p className="mb-2">{filter}</p>
                                <p className="mb-2" onClick={(e) => handleClickType(e, filter)} style={{ cursor: "pointer" }}>x</p>
                            </div>
                        ))
                        : ''
                    }
                    {/* {tourFilterType.length > 0
                        ? <span className={`${styles.clear_filter}`} onClick={clearFilters}>Limpar todos</span>
                        : ''
                    } */}
                    {(tourFilterLocation.length > 0)
                        ? tourFilterLocation.map((filter: any, index: Key) => (
                            <div key={index} className="flex justify-between">
                                <p className="mb-2">{filter}</p>
                                <p className="mb-2" onClick={(e) => handleClickLocation(e, filter)} style={{ cursor: "pointer" }}>x</p>
                            </div>
                        ))
                        : ''
                    }
                    {tourFilterLocation.length > 0 || tourFilterType.length > 0
                        ? <span className={`${styles.clear_filter}`} onClick={clearFilters}>{dic?.filter?.clear}</span>
                        : ''
                    }
                </div>
                <div className="mb-5">
                    <h5
                        className={`${styles.title_filter} mb-4 text-uppercase text-primary`}
                    //style={{ color: "#FF6600" }}
                    >
                        {dic?.filter?.type}
                    </h5>
                    {
                        arrTypesStores.length > 0 ? arrTypesStores.map((store: any, index: any) => {
                            return (
                                <div key={index} className="flex flex-col">
                                    <div className={`${styles.check_cat}`}>
                                        <input
                                            checked={tourFilterType.includes(`${store}`)}
                                            type="checkbox"
                                            name="type"
                                            id={`type-${index + 1}`}
                                            value={`${store}`}
                                            onChange={handleClickType}
                                        />
                                        <label htmlFor={`type-${index + 1}`}>{store}</label>
                                    </div>
                                </div>
                            )
                        }) : ""
                    }

                    <h5
                        className={`${styles.title_filter} my-4 mb-4 text-uppercase text-primary`}
                    //style={{ color: "#FF6600" }}
                    >
                        {dic?.filter?.location}
                    </h5>
                    {
                        arrLocationStores.length > 0 ? arrLocationStores.map((store: any, index: any) => {
                            return (
                                <div key={index} className="flex flex-col">
                                    <div className={`${styles.check_cat}`}>
                                        <input
                                            checked={tourFilterLocation.includes(`${store}`)}
                                            type="checkbox"
                                            name="location"
                                            id={`location-${index + 1}`}
                                            value={`${store}`}
                                            onChange={handleClickLocation}
                                        />
                                        <label htmlFor={`location-${index + 1}`}>{store}</label>
                                    </div>
                                </div>
                            )
                        }) : ""
                    }
                </div>
            </div>
        </>
    );
}

export default FilterStores;
