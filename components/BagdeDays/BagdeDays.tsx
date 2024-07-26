import React from "react";

import styles from './BagdeDays.module.css'
import { useParams } from "next/navigation";

export interface propOptions {
    options: any,
}

const BagdeDays: React.FC<propOptions> = ({
    options
}) => {
    
    const searchParams = useParams();

    const dom = searchParams.lng === "pt" ? "Dom" : searchParams.lng === "en" ? "Sun" : searchParams.lng === "es" ? "Dom" : 'Dom';
    const seg = searchParams.lng === "pt" ? "Seg" : searchParams.lng === "en" ? "Mon" : searchParams.lng === "es" ? "Lun" : 'Seg'; 
    const ter = searchParams.lng === "pt" ? "Ter" : searchParams.lng === "en" ? "Tue" : searchParams.lng === "es" ? "Mar" : 'Ter';
    const qua = searchParams.lng === "pt" ? "Qua" : searchParams.lng === "en" ? "Wen" : searchParams.lng === "es" ? "Mie" : 'Qua';
    const qui = searchParams.lng === "pt" ? "Qui" : searchParams.lng === "en" ? "Thu" : searchParams.lng === "es" ? "Jue" : 'Qui';
    const sex = searchParams.lng === "pt" ? "Sex" : searchParams.lng === "en" ? "Fri" : searchParams.lng === "es" ? "Vie" : 'Sex';
    const sab = searchParams.lng === "pt" ? "Sab" : searchParams.lng === "en" ? "Sat" : searchParams.lng === "es" ? "Sab" : 'Sab';

    if(options.daysOfWeek !== null) {
        return (
            <>
                <div
                    className={
                        options.daysOfWeek.dom === 1
                            ? `${styles.modalities_info_weekDay_enable}`
                            : `${styles.modalities_info_weekDay_disable} `
                    }
                >
                    {dom}
                </div>
                <div
                    className={
                        options.daysOfWeek.seg === 1
                            ? `${styles.modalities_info_weekDay_enable}`
                            : `${styles.modalities_info_weekDay_disable} `
                    }
                >
                    {seg}
                </div>
                <div
                    className={
                        options.daysOfWeek.ter === 1
                            ? `${styles.modalities_info_weekDay_enable}`
                            : `${styles.modalities_info_weekDay_disable} `
                    }
                >
                    {ter}
                </div>
                <div
                    className={
                        options.daysOfWeek.qua === 1
                            ? `${styles.modalities_info_weekDay_enable}`
                            : `${styles.modalities_info_weekDay_disable} `
                    }
                >
                    {qua}
                </div>
                <div
                    className={
                        options.daysOfWeek.qui === 1
                            ? `${styles.modalities_info_weekDay_enable}`
                            : `${styles.modalities_info_weekDay_disable} `
                    }
                >
                    {qui}
                </div>
                <div
                    className={
                        options.daysOfWeek.sex === 1
                            ? `${styles.modalities_info_weekDay_enable}`
                            : `${styles.modalities_info_weekDay_disable} `
                    }
                >
                    {sex}
                </div>
                <div
                    className={
                        options.daysOfWeek.sab === 1
                            ? `${styles.modalities_info_weekDay_enable}`
                            : `${styles.modalities_info_weekDay_disable} `
                    }
                >
                    {sab}
                </div>
            </>
        )
    } else {
        return (
            <></>
        )
    }
}

export default BagdeDays;