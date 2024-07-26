'use client'
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

//Images
import imgExperience from "../../assets/img/home/experience.webp"

// CSS
import styles from './HomeYourExperience.module.css'
import { getDictionary } from '@/dictionaries';
import { useParams } from 'next/navigation';

export interface propFooter {
    lng?: any,
}

const HomeYourExperience: React.FC<propFooter> = ({
    lng
}) => {

    const [dic, setDic] = useState<any>(null);
    
    const searchParams = useParams();

    useEffect(() => {
        const fetchDictionary = async () => {
            const dictionary = await getDictionary(searchParams.lng as "pt" | "en" | "es", 'homeYourExperience');
            setDic(dictionary);
        };
    
        fetchDictionary();
    
    }, [searchParams.lng])

    return (
        <div className={`${styles.bg_your_experience}`}>  
            <div className='container_content'>
                <div className="grid grid-cols-12 row_controll">
                    {/*  Col 6 */}
                    <div className='col-span-12 md:col-span-6 px-3'>
                        <Image 
                        src={imgExperience}
                        alt='Image Expirence'
                        loading='lazy'/>
                    </div>
                    {/*  Col 6 */}
                    <div className='col-span-12 md:col-span-6 px-3 order-first md:order-last'>
                        <div className={`${styles.content_main_your_experience}`}>
                            <h3 className={`${styles.h3_main_your_experience}`}> {dic?.yourExperience.title}
                                <span className={`${styles.h3_span_main_your_experience}`}> {dic?.yourExperience.titleSpan}</span>!</h3>
                            <p className={`${styles.p_main_your_experience}`}>
                                {dic?.yourExperience.subTitle}
                            </p>
                            <div className={`${styles.content_info_main_your_experience}`}>
                                <div>
                                    <h4 className={`${styles.h4_content_info_main_your_experience}`}>{dic?.yourExperience.expYearsNumber}</h4>
                                    <p>
                                        {dic?.yourExperience.expYears}
                                    </p>
                                </div>
                                <div>
                                    <h4 className={`${styles.h4_content_info_main_your_experience}`}>
                                        {dic?.yourExperience.collaborationNumber}
                                    </h4>
                                    <p>
                                        {dic?.yourExperience.collaboration}
                                    </p>
                                </div>
                                <div>
                                    <h4 className={`${styles.h4_content_info_main_your_experience}`}>
                                        {dic?.yourExperience.clientsNumber}
                                    </h4>
                                    <p>
                                        {dic?.yourExperience.clients}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeYourExperience