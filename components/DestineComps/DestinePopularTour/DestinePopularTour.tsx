import React, { useState } from "react";
import { useRouter } from 'next/router';

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import Link from "next/link";

import styles from './DestinePopularTour.module.css';
import useWindowSize from "@/data/hooks/useWindowSize";
export interface propPopularTour {
    info?: any
}

const DestinePopularTour: React.FC<propPopularTour> = ({ info }) => {
    
    const size = useWindowSize();

    const [popularTour, setPopularTour] = useState<any>(null);
    const animatedObj:any =[1,2,3,4,5,6];    

    const settings = {
        className: "center",
        dots: false,
        arrows: true,
        centerMode: true,
        infinite: true,
        centerPadding: "0px",
        slidesToShow: 3,
        slidesToScroll: 1,
        speed: 500
    };

    setTimeout(() => {
        setPopularTour(true);
    }, 1000);
    
    if (size.width > 767) {
        if (popularTour !== null) {
            return (
                <>
                    <div className={`global_bg_popular_tour ${styles.bg_popular_tour}`}>
                        <div className="container_content h-full">
                            <div className="flex">
                                <div className={`${styles.col_span_8_custom}`}>
                                    <div className="pr-12">
                                        <Slider {...settings}>
                                            {info.tours.map((tour: any) => {
                                                return (
                                                    <>
                                                        <div className={`global_img_turistico ${styles.img_turistico}`} style={{ backgroundImage: `url(${tour.image.src})` }}>
                                                            <div className={`global_text_turistico ${styles.text_turistico}`}>
                                                                {/* <small>Atividades</small> */}
                                                                <h5 className="text-white">{tour.name}</h5>
                                                                <p className="text-white">{tour.summary}</p>
                                                                <div className={styles.link_turistico}>
                                                                    <Link href={tour.category} className={`${styles.see_activity}`}>
                                                                        Ver atividades
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                );
                                            })}
                                        </Slider>
                                    </div>
                                </div>
                                <div className={`${styles.col_span_4_custom}`}>
                                    <div className={styles.popular_tour}>
                                        <div>
                                            <h3 className="text-xl font-bold">
                                                {info.summary[0]}
                                            </h3>
                                            <div className={styles.btn_attaction}>
                                                <button className={`${styles.btn} bg-primary font-bold py-2 px-4 rounde`} onClick={info.redirection}>
                                                    {info.summary[1]}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>

            )
        } else {
            return (
                <>
                    <div className={`global_bg_popular_tour ${styles.bg_popular_tour}`}>
                        <div className="container-content h-full">

                            <div className="md:w-2/3">
                                <div className="slider-container">
                                    <Slider {...settings}>
                                        {animatedObj.map((obj: any) => {
                                            return (
                                                <>
                                                    <div className="img-turistico animated-background" style={{ width: "100%" }}>

                                                    </div>
                                                </>
                                            )
                                        })}
                                    </Slider>
                                </div>
                            </div>

                            <div className="col-span-4">
                                <div className={styles.popular_tour}>
                                    <div>
                                        <h3 className="text-xl font-bold">
                                            {info.summary0}
                                        </h3>
                                        <div className={styles.btn_attaction}>
                                            <button className={`${styles.btn} bg-primary font-bold py-2 px-4 rounde`} onClick={info.redirection}>
                                                {info.summary[1]}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )
        }
    } else {
        return (
            <>
                <div className={`global_bg_popular_tour ${styles.bg_popular_tour}`}>
                    <div className="container_content h-full">
                        <div className="col">
                            <div className="popular-tour pb-5">
                                <div>
                                    <h3 className="text-xl font-bold">
                                        {info.summary[0]}
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div>
                                <div>
                                    <Slider {...settings}>
                                        {info.tours.map((tour: any) => {
                                            return (
                                                <>
                                                    <div className={`global_img_turistico ${styles.img_turistico}`} style={{ backgroundImage: `url(${tour.image.src})` }}>
                                                        <div className={`global_text_turistico ${styles.text_turistico}`}>
                                                            {/* <small>Atividades</small> */}
                                                            <h5>{tour.name}</h5>
                                                            <p>{tour.summary}</p>
                                                            <div className={styles.link_turistico}>
                                                                <Link className={`${styles.see_activity}`} href={tour.category}>
                                                                    Ver atividades
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        })}
                                    </Slider>
                                </div>
                            </div>
                            <div>
                                <div className={`${styles.popular_tour} w-full flex justify-center`}>
                                    <div>
                                        <div className={styles.btn_attaction}>
                                            <button className={`${styles.btn} btn-outline-primary`}>
                                                {info.summary[1]}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default DestinePopularTour;