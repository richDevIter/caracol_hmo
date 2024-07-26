'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image';

import styles from './HomeDestinowApp.module.css'

import imgApp from '../../assets/img/home/image01 (1).webp';
import { getDictionary } from '@/dictionaries';
import { useParams } from 'next/navigation';

export interface propFooter {
    lng?: any,
}

const HomeDestinowApp: React.FC<propFooter> = ({
    lng
}) => {

    const [dic, setDic] = useState<any>(null);
    
    const searchParams = useParams();

    useEffect(() => {
        const fetchDictionary = async () => {
            const dictionary = await getDictionary(searchParams.lng as "pt" | "en" | "es", 'homeDestinowApp');
            setDic(dictionary);
        };
    
        fetchDictionary();
    
    }, [searchParams.lng])

    
    return (
        <div className={`${styles.bg_app}`}>
            <div className={`${styles.main_app} container_content`}>
                <div className={`${styles.control_main } grid grid-cols-12 row_controll`}>
                    {/*  Col 6 */}
                    <div className='col-span-12 md:col-span-6 px-3'>
                        <div>
                            <h3>Conheça o <strong>DestiBlog</strong></h3>
                            <p className={`${styles.main_app_p}`}>
                                {dic?.destinowApp.subtitle}
                            </p>
                            <div className='ml-6 mb-5 md:ml-0 md:mb-0 app-buttons'>
                                <a href="https://blog.destinow.com.br/" className='btn btn-secondary'>
                                    {dic?.destinowApp.soon}
                                </a>
                            </div>
                        </div>
                    </div>
                    {/*  Col 6 */}
                    <div className='col-span-12 md:col-span-6 px-3'>
                        <Image 
                            src={imgApp}
                            alt='Image Expirence'
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeDestinowApp