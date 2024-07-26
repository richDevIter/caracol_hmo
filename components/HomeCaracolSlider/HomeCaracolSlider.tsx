'use client'

import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';

import { useParams } from 'react-router-dom';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import styles from './HomeCaracolSlider.module.css';

import Slider1 from '../../assets/img/parque_caracol/2.png';
import Slider2 from '../../assets/img/parque_caracol/3.png';
import Slider3 from '../../assets/img/parque_caracol/4.png';
import Slider4 from '../../assets/img/parque_caracol/5.png';
import Slider5 from '../../assets/img/parque_caracol/6.png';
import Slider6 from '../../assets/img/parque_caracol/7.png';
import Slider7 from '../../assets/img/parque_caracol/8.png';
import Slider8 from '../../assets/img/parque_caracol/9.png';
import Slider9 from '../../assets/img/parque_caracol/10.png';
import Slider10 from '../../assets/img/parque_caracol/12.png';
import Slider11 from '../../assets/img/parque_caracol/13.png';
import { getDictionary } from '@/dictionaries';

export default function HomeCaracolSlider() {
    const [dic, setDic] = useState<any>(null);
    const searchParams = useParams();

    /* useEffect(() => {
        const fetchDictionary = async () => {
            const dictionary = await getDictionary(searchParams.lng as "pt" | "en" | "es", 'profile');
            setDic(dictionary);
        };
        fetchDictionary();
    }, [searchParams.lng]) */

    const images: any = [
        Slider1,
        Slider2,
        Slider3,
        Slider4,
        Slider5,
        Slider6,
        Slider7,
        Slider8,
        Slider9,
        Slider10,
        Slider11,
    ];

    const settings = {
        className: 'center',
        dots: false,
        arrows: true,
        centerMode: true,
        infinite: true,
        centerPadding: '0px',
        slidesToShow: 3,
        slidesToScroll: 1,
        speed: 500,
    };

    return (
        <div className={`${styles.container_caracol_slider} container-caracol-slider`}>
            <div className='container-page'>
                <div className="grid grid-cols-12 gap-4 md:gap-0 w-100 mx-0">
                    <div className="col-span-12 md:col-span-6 px-0 sm:px-3">
                        <Slider {...settings}>
                            {images.map((item: any, index: any) => (
                                <div key={index}>
                                    <div
                                        className={`${styles.img_slider_caracol} img-slider-caracol`}
                                        key={index}
                                        style={{ backgroundImage: `url(${item.src})` }}
                                    ></div>
                                </div>
                            ))}
                        </Slider>
                    </div>

                    <div className={`${styles.rediscover} col-span-12 md:col-span-5`}>
                        <div className={`${styles.rediscover_top}`}>
                            {searchParams.lng === "pt" ? (
                                <p>
                                    Naturalmente <br /> o seu Destino <br /> Parque do Caracol.
                                </p>
                            ) : searchParams.lng === "en" ? (
                                <p>
                                    Naturally <br /> your Destiny <br /> Caracol Park.
                                </p>
                            ) : searchParams.lng === "es" ? (
                                <p>
                                    Naturalmente <br /> tu Destino <br /> Parque Caracol.
                                </p>
                            ) : (
                                <p>
                                    Naturalmente <br /> o seu Destino <br /> Parque do Caracol.
                                </p>
                            )}
                        </div>

                        <div className={`${styles.rediscover_mid}`}>
                            <p>É uma das joias da Serra Gaúcha. Uma oportunidade única para desfrutar a vida em meio à natureza e a um visual exclusivo e privilegiado da famosa Cascata do Caracol.</p>
                        </div>

                        <div className={`${styles.rediscover_button}`}>
                            <a href="#main-product">
                                <button className="btn btn-outline-light">
                                    Compre agora seu bilhete
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
