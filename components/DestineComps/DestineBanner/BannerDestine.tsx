import React, { useState, useEffect } from "react";

import styles from './BannerDestine.module.css';
import useWindowSize from "@/data/hooks/useWindowSize";


export interface propBanner {
    info?:any;   
}

const BannerDestine: React.FC<propBanner> = ({
    info   
  }) => {
    
    const size = useWindowSize();

if(info !== null){
    return (
        <>
         
         <div className={`w-full h-screen px-0 mx-0 bg-cover bg-center ${styles.banner_home} `} style={{ backgroundImage: `url(${ size.width >= 768 ? `${info?.ImgDestineDesktop?.src}` : `${info?.ImgDestineMobile?.src}`})` }}>
            <div className="container_content h-full flex items-center">
                <div className={` ${styles.bg_home_size} w-full md:w-1/2 `}>
                    <h3 className="text-white">{info.mainAttractionsStr}</h3>
                    <h1 className="text-white text-4xl md:text-5xl font-bold">{info.city}{' '}</h1>
                    <h2 className="text-white mt-4 md:mt-6 text-xl md:text-2xl">{info.subTitle}</h2>
                </div>
            </div>
        </div>
        </>
    )
}else{
    return (
        <>
         
         <div className={`w-full h-screen px-0 mx-0 bg-cover bg-center ${styles.banner_home} `} >
            <div className="container_content h-full flex items-center animated-background">
                <div className={` ${styles.bg_home_size} w-full md:w-1/2 `}>
                    <h3 className="text-white "></h3>
                    <h1 className="text-white text-4xl md:text-5xl font-bold  "></h1>
                    <h2 className="text-white mt-4 md:mt-6 text-xl md:text-2xl "></h2>
                </div>
            </div>
        </div>
        </>
    )
}
    
}

export default BannerDestine;