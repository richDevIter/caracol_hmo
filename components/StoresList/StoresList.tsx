import React, { useState, useEffect } from "react";

import imgStore from "../.././assets/img/img-default.jpg";

import { Link } from "react-router-dom";
import Card from "@/components/base/Card/Card";

import styles from "../../app/[lng]/(overview)/lojas/stores.module.css";
import Pagination from "../base/Pagination/Pagination";
import { IconArrowPageLeft, IconArrowPageRight, IconInstagram } from "@/assets/icons";

export interface propStore {
    stores: any;
    filterLocation: any;
    filterType: any;
    pagination: any;
    setPagination: any;
    dic: any;
}

const StoresList: React.FC<propStore> = ({
    stores, filterLocation, filterType, pagination, setPagination, dic
}: propStore) => {
    const [tourListSize, setTourListSize] = useState<any>(null);

    const paginateFoward = () => {
        setPagination(pagination + 5);
    }

    const paginateBack = () => {
        setPagination(pagination - 5);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    let aux: any = [];

    useEffect(() => {
        let initial: any = [];

        if (stores?.length > 0) {
            if (filterLocation.length > 0) {
                for (let i = 0; i < stores.length; i++) {
                    if (filterLocation.includes(stores[i].location)) {
                        initial.push(stores[i]);
                    }
                }
            } else {
                initial = stores;
            }

            if (filterType.length > 0) {
                for (let i = 0; i < initial.length; i++) {
                    if (filterType.includes(initial[i].type)) {
                        aux.push(initial[i].type);
                    }
                }
            } else {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                aux = initial;
            }

            setTourListSize(aux.length === 0 ? 0 : aux.length)
        } else {
            setTourListSize(0)
        }
    }, [aux]);

    if (stores !== null) {
        return (
            <div className={`${styles.store_list} container-page`}>
                {stores?.length > 0
                    ? stores?.filter((store: any) => filterLocation?.length === 0 && filterType?.length === 0 ?
                        store :
                        filterLocation.length > 0 && filterType.length > 0 ?
                            (filterLocation.includes(store.location) && filterType.includes(store?.type)) :
                            filterLocation.length === 0 ?
                                filterType.includes(store.type) :
                                filterLocation.includes(store.location)
                    ).slice(pagination - 5, pagination).map((store: any, index: any) =>
                        <div key={index}>
                            <div className={`${styles.card} my-4`}>
                                <div className="grid grid-cols-12 h-full">
                                    <div className="col-span-5 sm:col-span-4 lg:col-span-3 px-0 md:px-6">
                                        {store.image === '' ?
                                            <div className={`${styles.img_store}`} style={{ backgroundImage: `url(${imgStore})` }}></div>
                                            :
                                            <div className={`${styles.img_store}`} style={{ backgroundImage: `url(${store.image})` }}></div>
                                        }
                                    </div>
                                    <div className="col-span-7 sm:col-span-8 lg:col-span-9 px-4 md:px-2">
                                        <div className="grid grid-cols-12 h-full">
                                            <div className="col-span-12 md:col-span-4">
                                                <h5><b>{store.name}</b></h5>
                                                <span>{store.type}</span>
                                            </div>
                                            <div className="col-span-12 md:col-span-4">
                                                <p>{store.location}</p>
                                            </div>
                                            <div className="col-span-12 md:col-span-4">
                                                <div className="h-full">
                                                    {
                                                        store.description === "" || store.description === undefined
                                                            ?
                                                            ""
                                                            :
                                                            <div className="flex flex-col justify-between h-full">
                                                                <b>{(store.description.replace("55 ", "")).replace("21", "(21)")}</b>

                                                                {
                                                                    store.instagram
                                                                    &&
                                                                    <div className={`${styles.store_social_midia}`}>
                                                                        <small><b>{dic?.storeList.social}</b></small>
                                                                        <div>
                                                                            <a
                                                                                href={`https://www.instagram.com/${store.instagram}`}
                                                                                target="_blank"
                                                                            >
                                                                                {IconInstagram('var(--primary)', '20px', '20px')}
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                }
                                                            </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : ""}
                <div className="flex justify-end tems-center mb-3 mb-md-0">
                    {pagination / 5 > 1 ? <button className={`${styles.paginate_btn}`} onClick={paginateBack}>
                    {IconArrowPageLeft('10px', '16px', '#FFFFFF')}
                    </button> : ''}
                    <span>{dic?.storeList?.page} {pagination / 5} - {dic?.storeList?.show} ({pagination - 5} - {pagination >= tourListSize ? tourListSize : pagination}) de {tourListSize}</span>
                    {(pagination / 5 < (tourListSize / 5)) ? <button className={`${styles.paginate_btn}`} onClick={paginateFoward}>
                        {IconArrowPageRight('10px', '16px', '#FFFFFF')}
                    </button> : ''}
                </div>

                {/* <Pagination 
                    totalRows={tourListSize}
                    pageCount={pagination/5}
                    setPageCount={setPagination}
                    rowsPerPage={5}
                    selectNumberRows={'no'}
                /> */}
            </div>
        )
    } else {
        return (
            <>
                <h2>{/* {t("store.storeList.any")} */}</h2>
            </>
        )
    }
}

export default StoresList;