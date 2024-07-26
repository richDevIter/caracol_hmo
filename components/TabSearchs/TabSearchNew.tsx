'use client'
import React, { useEffect, useState } from 'react'

import useWindowSize from '@/data/hooks/useWindowSize';

import { IconSearchActivity, IconSearchTransfer } from '@/assets/icons';

import styles from './TabSearchs.module.css';
import { getDictionary } from '@/dictionaries';
import { useParams, usePathname } from 'next/navigation';
import TabSearchActivities from './TabSearchActivities';
import TabSearchTransfer from './TabSearchTransfer';

import TabSearchCollection from '@/core/TabSearch';
import TabSearchRepository from '@/core/TabSearchRepository';

const TabSearchNew: React.FC = () => {
    const [dic, setDic] = useState<any>(null);
    const [openTab, setOpenTab] = useState(1);
    const [screenSize, setScreenSize] = useState<any>(0);

    const pathname = usePathname();
    const searchParams = useParams();

    const size = useWindowSize();

    useEffect(() => {
        const fetchDictionary = async () => {
            const dictionary = await getDictionary(searchParams.lng as "pt" | "en" | "es", 'tabSearchs');
            setDic(dictionary);
        };

        fetchDictionary();

    }, [searchParams.lng])


    useEffect(() => {
        const segmentosInteressantes = ["/transfers", "/transfers/"];
        const contemSegmentos = segmentosInteressantes.some(segmento => pathname.includes(segmento));
        if (contemSegmentos) {
            setOpenTab(2);
        }
    }, [pathname])

    return (
        <div className="w-full px-3 md:px-0">
            {/* END: TABS*/}
            <div className={` ${styles.nav_tabs} "flex mb-0 list-none flex-wrap flex-row`} >
                {/* TAB de Atividades */}
                <div className="last:mr-0 flex-auto text-center h-full">
                    <a
                        className={
                            `${styles.bg_tab_options_activity} h-full px-5 py-3 leading-normal flex items-center justify-center ` +
                            (openTab === 1
                                ? "bg-white"
                                : "bg-slate-200")
                        }
                        onClick={e => {
                            e.preventDefault();
                            setOpenTab(1);
                        }}
                        data-toggle="tab"
                        href="#link1"
                    >
                        <span>
                            {size.width > 767 ? (
                                <>
                                    {IconSearchActivity("#000000", "24px", "24px")}
                                </>
                            ) : (
                                ""
                            )}
                            {dic?.activity}
                        </span>
                    </a>

                </div>
                {/* END: TAB de Atividades */}

                {/* TAB de Transfers */}
                <div className="-mb-px mr-2 last:mr-0 flex-auto text-center h-full">
                    <a
                        className={
                            `${styles.bg_tab_options_transfer} h-full px-5 py-3 leading-normal flex items-center justify-center ` +
                            (openTab === 2
                                ? "bg-white"
                                : "bg-slate-200")
                        }
                        onClick={e => {
                            e.preventDefault();
                            setOpenTab(2);
                        }}
                        data-toggle="tab"
                        href="#link2"
                    >
                        <span>
                            {size.width > 767 ? (
                                <>
                                    {IconSearchTransfer}
                                </>
                            ) : (
                                ""
                            )}
                            {dic?.transfers}
                        </span>
                    </a>
                </div>
                {/* END: TAB de Transfers */}
            </div>
            {/* END: TABS*/}

            <div className={`${styles.bg_tab_options_content} relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded`}>
                <div className="flex-auto">
                    <div className={` ${styles.tab_space} flex items-center w-full`}>

                        {openTab === 1 ?

                            <TabSearchActivities />
                            :
                            <TabSearchTransfer />
                        }
                    </div>
                </div>
            </div>



        </div>
    )
}

export default TabSearchNew