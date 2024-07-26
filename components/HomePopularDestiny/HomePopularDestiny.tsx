'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';

import styles from './HomePopularDestiny.module.css'

import imgRio from "../../assets/img/destinos/rio-de-janeiro.webp";
import imgGramado from "../../assets/img/destinos/gramado.webp";
import imgFortaleza from "../../assets/img/destinos/fortaleza.webp";
import imgSalvador from "../../assets/img/destinos/salvador.webp";
import imgArraial from "../../assets/img/destinos/arrail-do-cabo.webp";
import imgParaty from "../../assets/img/destinos/paraty.webp";
import imgFozDoIguacu from "../../assets/img/destinos/foz-do-iguacu.webp";

import Image from 'next/image';
import { getDictionary } from '@/dictionaries';

export interface propFooter {
    lng?: any,
  }
    

const HomePopularDestiny: React.FC<propFooter> = ({
    lng
  }) => {

    const [dic, setDic] = useState<any>(null);

    useEffect(() => {
        const fetchDictionary = async () => {
            const dictionary = await getDictionary(lng, 'homePopularDestiny');
            setDic(dictionary);
        };
    
        fetchDictionary();
    
    }, [lng])

    function SampleNextArrow(props: any) {
        const { className, style, onClick } = props;

        return (
            <div
                className={className}
                style={{ ...style }}
                onClick={onClick}
            />
        );
    }

    function SamplePrevArrow(props: any) {
        const { className, style, onClick } = props;

        return (
            <div
                className={className}
                style={{ ...style }}
                onClick={onClick}
            />
        );
    }

    const settings = {
        className: `center slider_destiny`,
        arrows: true,
        centerMode: true,
        infinite: false,
        centerPadding: "40px 0px 0px",
        slidesToShow: 3,
        slidesToScroll: 1,
        speed: 500,
        initialSlide: 0,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 2561,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                    centerPadding: "275px",
                }
            },
            {
                breakpoint: 1921,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    centerPadding: "250px",
                }
            },
            {
                breakpoint: 1601,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    centerPadding: "225px",
                }
            },
            {
                breakpoint: 1441,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    centerPadding: "200px",
                }
            },
            {
                breakpoint: 1361,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    centerPadding: "175px",
                }
            },
            {
                breakpoint: 1281,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    centerPadding: "250px",
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    arrows: false,
                    centerPadding: "120px 0px 0px",
                }
            },
            {
                breakpoint: 820,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    arrows: false,
                    centerPadding: "105px 0px 0px",
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    arrows: false,
                    centerPadding: "80px 0px 0px",
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    arrows: false,
                    centerPadding: "110px",
                }
            },
            {
                breakpoint: 361,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    arrows: false,
                    centerPadding: "100px",
                }
            }
        ]
    };

    return (
        <>
        <div className={`${styles.main_destiny_bg}`}>
            <div className={`container mx-auto`}>
                <div className='container_content p-0'>
                    <div className="bg-main-destiny">
                        <div className={`${styles.main_destiny} px-0`}>
                            <h3 className={`${styles.title_main_attractions} pb-2`}>
                                {dic?.popularDestiny?.mainTitle}
                            </h3>
                            <p className={`${styles.subtitle_main_attractions}`}>
                                {dic?.popularDestiny?.mainSubtitle}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <Slider {...settings}>
                <a href="/destinos/rio-de-janeiro" className='card-main-destiny'>
                    <div style={{ position: "relative" }} className={`${styles.img_destiny}`}>
                        <Image
                            src={`${imgRio.src}`}
                            alt="Carrousel Atrações Principais"
                            width={270}
                            height={340}
                            sizes="(max-width: 270px) 100vw"
                        />
                        <h5 className={`${styles.card_main_destiny_h5}`}>Rio de Janeiro</h5>
                    </div>
                </a>
                <a href="/destinos/gramado" className='card-main-destiny'>
                    <div style={{ position: "relative" }} className={`${styles.img_destiny}`}>
                        <Image
                            src={`${imgGramado.src}`}
                            alt="Carrousel Atrações Principais"
                            width={270}
                            height={340}
                            sizes="(max-width: 270px) 100vw"
                        />
                        <h5 className={`${styles.card_main_destiny_h5}`}>Gramado</h5>
                    </div>
                </a>
                <a href="/atividades/salvador" className='card-main-destiny'>
                    <div style={{ position: "relative" }} className={`${styles.img_destiny}`}>
                        <Image
                            src={`${imgSalvador.src}`}
                            alt="Carrousel Atrações Principais"
                            width={270}
                            height={340}
                            className={`${styles.img_destiny}`}
                            sizes="(max-width: 270px) 100vw"
                        />
                        <h5 className={`${styles.card_main_destiny_h5}`}>Salvador</h5>
                    </div>
                </a>
                <a href="/atividades/arraial-do-cabo" className='card-main-destiny'>
                    <div style={{ position: "relative" }} className={`${styles.img_destiny}`}>
                        <Image
                            src={`${imgArraial.src}`}
                            alt="Carrousel Atrações Principais"
                            width={270}
                            height={340}
                            className={`${styles.img_destiny}`}
                            sizes="(max-width: 270px) 100vw"
                        />
                        <h5 className={`${styles.card_main_destiny_h5}`}>Arraial do Cabo</h5>
                    </div>
                </a>
                <a href="/atividades/paraty" className='card-main-destiny'>
                    <div style={{ position: "relative" }} className={`${styles.img_destiny}`}>
                        <Image
                            src={`${imgParaty.src}`}
                            alt="Carrousel Atrações Principais"
                            width={270}
                            height={340}
                            className={`${styles.img_destiny}`}
                            sizes="(max-width: 270px) 100vw"
                        />
                        <h5 className={`${styles.card_main_destiny_h5}`}>Paraty</h5>
                    </div>
                </a>
                <a href="/atividades/foz-do-iguacu" className='card-main-destiny'>
                    <div style={{ position: "relative" }} className={`${styles.img_destiny}`}>
                        <Image
                            src={`${imgFozDoIguacu.src}`}
                            alt="Carrousel Atrações Principais"
                            width={270}
                            height={340}
                            className={`${styles.img_destiny}`}
                            sizes="(max-width: 270px) 100vw"
                        />
                        <h5 className={`${styles.card_main_destiny_h5}`}>Foz do Iguaçu</h5>
                    </div>
                </a>
                <a href="/atividades/fortaleza" className='card-main-destiny'>
                    <div style={{ position: "relative" }} className={`${styles.img_destiny}`}>
                        <Image
                            src={`${imgFortaleza.src}`}
                            alt="Carrousel Atrações Principais"
                            width={270}
                            height={340}
                            className={`${styles.img_destiny}`}
                            sizes="(max-width: 270px) 100vw"
                        />
                        <h5 className={`${styles.card_main_destiny_h5}`}>Fortaleza</h5>
                    </div>
                </a>
            </Slider>
            </div>

        </>
    )
}

export default HomePopularDestiny