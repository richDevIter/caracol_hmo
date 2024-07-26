/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react';

import styles from "./Pagination.module.css";
import useWindowSize from '@/data/hooks/useWindowSize';

export interface propPage {
    totalRows: any;
    pageCount: number;
    setPageCount: any;
    rowsPerPage?: any;
    setRowsPerPage?: any;
    selectNumberRows: any;
}

const Pagination: React.FC<propPage> = ({
    totalRows, pageCount, setPageCount, rowsPerPage, setRowsPerPage, selectNumberRows
}: propPage) => {
    console.log(totalRows, pageCount, rowsPerPage, selectNumberRows);
    const size = useWindowSize();
    const width: any = size.width;
    const [numberOfPages, setNumberOfPages] = useState<any>([]);
    const [lang, setLang] = useState<any>("pt");

    /* useEffect(()=>{
        setLang(i18next.language)
    },[i18next]) */
    
    const words:any = {
        "pt": {
            "pages": "Páginas",
            "showing": "Mostrando",
            "of": "de"
        },
        "pt-BR": {
            "pages": "Páginas",
            "showing": "Mostrando",
            "of": "de"
        },
        "en": {
            "pages": "Pages",
            "showing": "Showing",
            "of": "of"
        },
        "es": {
            "pages": "Páginas",
            "showing": "Mostrando",
            "of": "de"
        }
    }

    const paginateFoward = () => {
        setPageCount(pageCount + 1);
    }

    const paginateBack = () => {
        setPageCount(pageCount - 1);
    }

    function handleSelect(e: any) {
        setPageCount(1);
        setRowsPerPage(Number(e.target.value));
    }

    useEffect(() => {
        if (totalRows) {
            setNumberOfPages(Object.keys(new Array(Math?.ceil((totalRows / rowsPerPage))).fill(null)).map((elem: any) => Number(elem) + 1));
        }
    }, [totalRows, rowsPerPage])

    return (
        <div className="flex justify-between">
            {width > 640 &&
                <>
                    <div className="select-pagination col-span-4">
                        <div style={{ maxWidth: '65px' }}>

                            {
                                selectNumberRows === "yes"
                                    ?
                                    <select
                                        onChange={handleSelect}
                                        id="rowsPerPage"
                                    >
                                        <option value="10" selected={rowsPerPage == '10'}>10</option>
                                        <option value="20" selected={rowsPerPage == '20'}>20</option>
                                        <option value="30" selected={rowsPerPage == '30'}>30</option>
                                    </select>
                                    :
                                    ""
                            }
                        </div>
                    </div>
                    <div className="flex items-center justify-center col-span-4">
                        {totalRows > 0 &&
                            <span style={{color: "#6C6C6C"}}>{/* Página {pageCount} -  */}{words[lang]?.showing} ({(rowsPerPage * pageCount) - rowsPerPage + 1} - {rowsPerPage * pageCount > totalRows ? totalRows : rowsPerPage * pageCount}) {words[lang]?.of} {totalRows}</span>
                        }
                    </div>
                </>
            }
            <div className="flex items-center justify-end md:col-span-4">
                {totalRows > 0 &&
                    <>
                        {
                            pageCount > 3
                                ?
                                <button className={`${styles.pagination_btn}`} onClick={paginateBack}>{
                                    
                                }</button>
                                :
                                ''
                        }

                        {
                            pageCount > 3 &&
                            <>
                                <button className={`${styles.pagination_btn} ${Number(pageCount) === 1 ? `${styles.active}` : ''}`} type='button' onClick={() => { setPageCount(1) }}>{1}</button>
                                <span>...</span>
                            </>
                        }

                        {numberOfPages.slice(pageCount > 3 ? Number(pageCount) - 3 : 0, pageCount > 3 ? Number(pageCount) + 2 : 5).map((elem: any) => {
                            return (
                                <>
                                    <button className={`${styles.pagination_btn} ${Number(pageCount) === elem ? `${styles.active}` : ''}`} type='button' onClick={() => { setPageCount(elem) }}>{elem}</button>
                                </>
                            );
                        })}

                        {
                            numberOfPages.length > 5 && pageCount + 2 < numberOfPages.length &&
                            <>
                                <span>...</span>
                                <button className={`${styles.pagination_btn} ${Number(pageCount) === numberOfPages.length ? `${styles.active}` : ''}`} type='button' onClick={() => { setPageCount(numberOfPages.length) }}>{numberOfPages.length}</button>
                            </>
                        }

                        {
                            (totalRows > (rowsPerPage * pageCount))
                                ?
                                <button className={`${styles.pagination_btn}`} onClick={paginateFoward}>{
                                    
                                }
                                </button>
                                :
                                ''
                        }
                    </>
                }
            </div>
        </div>
    )
}

export default Pagination;