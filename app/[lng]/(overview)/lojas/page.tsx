'use client'

import React, { useEffect, useState } from "react";

import dataCaracol from "./locales/storesCaracol.json";

import styles from "./stores.module.css";

import StoresList from "@/components/StoresList/StoresList";
import FilterStores from "@/components/StoresList/FilterStores";

import { useParams } from "next/navigation";
import { getDictionary } from "@/dictionaries";

export default function Stores() {
    const [filterType, setFilterType] = useState<any>([]);
    const [filterLocation, setFilterLocation] = useState<any>([]);
    const [pagination, setPagination] = useState<any>(5);

    const [dic, setDic] = useState<any>(null);
    const searchParams = useParams();

    useEffect(() => {
        const fetchDictionary = async () => {
            const dictionary = await getDictionary(searchParams.lng as "pt" | "en" | "es", 'stores');
            setDic(dictionary);
        };
        fetchDictionary();
    }, [searchParams.lng]);

    return (
        <>
            <div className={`${styles.store_page} container-page py-5`}>
                <div className="store-title">
                    <h1 className="text-center pb-4">{dic?.title}</h1>
                </div>
                <div className="grid grid-cols-12">
                    <div className="col-span-12 md:col-span-3 md:px-4">
                        <div className={`${styles.card_filter}`}>
                            <FilterStores
                                stores={dataCaracol.stores.default}
                                setFilterLocation={setFilterLocation}
                                setFilterType={setFilterType}
                                setPagination={setPagination}
                                dic={dic}
                            />
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-9 md:px-4">
                        <StoresList
                            stores={dataCaracol.stores.default}
                            filterLocation={filterLocation}
                            filterType={filterType}
                            pagination={pagination}
                            setPagination={setPagination}
                            dic={dic}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}