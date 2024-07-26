'use client'

import React, { useEffect, useState } from 'react';

import styles from './download.module.css';
import Accordion from '@/components/base/Accordion/Accordion';
import { IconRI } from '@/assets/icons';

function DownloadCenter() {
    const [list, setList] = useState<any>(null);
    //const [file, setFile] = useState<any>(null);
    const [select, setSelect] = useState<any>(0);

    useEffect(() => {
        async function getList() {
            try {
                const resp = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/RI/GetListFileAsync`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            // 'Content-Type': 'application/x-www-form-urlencoded',
                        },
                    }
                );
                const categorieResp = await resp.json();
                if (categorieResp.statusCode === 200) {
                    setList(categorieResp.data.nivel.nivel);
                    if (categorieResp.statusCode === 204) {
                        setList(null);
                    } else {
                        setList(categorieResp.data.nivel.nivel);
                    }
                }
            } catch (error) { }
        }
        getList();
    }, []);

    function getVoucher(idItem: any, itemName: any) {
        const getVou = async () => {
            try {
                const resp = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/api/RI/GetFileAsync/${idItem}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            // 'Content-Type': 'application/x-www-form-urlencoded',
                        },
                    }
                );
                const categorieResp = await resp.json();
                if (categorieResp.statusCode !== 400) {
                    if (categorieResp.statusCode !== 204) {
                        const link = document.createElement('a');
                        link.href = `data:text/plain;base64, ${categorieResp.data}`;
                        link.setAttribute(
                            'download',
                            `${itemName}`,
                        );
                        // Append to html link element page
                        document.body.appendChild(link);

                        // Start download
                        link.click();

                        // // Clean up and remove the link
                        link?.parentNode?.removeChild(link);
                    } else {
                    }
                }
            } catch (error: any) {
            }
        }
        getVou();
    }

    function HandleSelect(e: any) {
        setSelect(e.target.value);
    }

    const convertDate = (date: string) => {
        let [data, hora] = date.split(' ');
        let [mes, dia, ano] = data.split('/');
        let newDate = `${dia}/${mes}/${ano}`;
        let newTimeDate = `${newDate} ${hora}`;
        return newTimeDate;
    }

    if (list !== null) {
        return (
            <>
                <div className={`${styles.download_center} container-page`}>
                    <div className='py-12'>
                        <h1 className="mb-5 text-center">Relações com Investidores</h1>
                        <div className='bg-white pb-4' style={{ borderRadius: ".65rem" }}>
                            <div className='flex justify-center py-8'>
                                <select
                                    onChange={HandleSelect}
                                >
                                    {
                                        list.map((item: any, index: any) => {
                                            return (
                                                <>
                                                    <option value={index}>{item.name}</option>
                                                </>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            {
                                list[select].nivel.map((trimester: any, index: any) => {
                                    return (
                                        <div key={index} className='p-3'>
                                            <Accordion
                                                title={trimester.name}
                                                style={styles.download_center_item}
                                                styleChildren={
                                                    {
                                                        borderRadius: 'calc(.65rem - 1px)',
                                                        backgroundColor: 'var(--primary)',
                                                        color: '#fff',
                                                        padding: '1rem 1.25rem',
                                                        cursor: 'pointer',
                                                    }
                                                }
                                                classIcon={styles.bg_ri_accordion}
                                            >
                                                <div className="px-0 py-0">
                                                    {
                                                        trimester.files.map((accordion: any, index: any) => {
                                                            return (
                                                                <>
                                                                    <div className="grid grid-cols-12 py-3 mx-0">
                                                                        <div className="col-span-10 px-4 my-auto">
                                                                            <div className='grid grid-cols-12'>
                                                                                <div className="col-span-4 md:col-span-3 lg:col-span-2 my-auto">
                                                                                    <span><b>{convertDate(accordion.date)}</b></span>
                                                                                </div>
                                                                                <div className="col-span-8 md:col-span-7 lg:col-span-8 my-auto">
                                                                                    <a
                                                                                        href={`#${accordion.name.split(".")[0]}`}
                                                                                        onClick={() => { getVoucher(accordion.id, accordion.name) }}
                                                                                    >
                                                                                        {accordion.description}
                                                                                    </a>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-span-2 flex justify-end items-center px-3 md:px-4">
                                                                            <div className='grid grid-cols-12'>
                                                                                <div className="col-span-12 flex justify-end px-3">
                                                                                    <a
                                                                                        href={`#${accordion.name.split(".")[0]}`}
                                                                                        onClick={() => { getVoucher(accordion.id, accordion.name) }}
                                                                                    >
                                                                                        {IconRI('20px', '20px', 'var(--primary)')}
                                                                                    </a>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </Accordion>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div >
            </>
        );
    } else {
        return (
            <div className='container-page'>
                <div className={`${styles.download_center} py-5`}>
                    <h1 className="mb-5 text-center display-2">Relações com Investidores</h1>
                    <div className="bg-white">
                        <div className='d-flex justify-center pt-4 pb-5'>
                            <div className="animated-background w-25" style={{ height: "42px" }}></div>
                        </div>
                        <div className="p-3">
                            <div className="animated-background mx-auto" style={{ width: "100%", height: "52px", borderRadius: "10px" }}></div>
                        </div>
                        <div className="p-3">
                            <div className="animated-background mx-auto" style={{ width: "100%", height: "52px", borderRadius: "10px" }}></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DownloadCenter;