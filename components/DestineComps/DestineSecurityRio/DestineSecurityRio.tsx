import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Slider from "react-slick";

import iconCar from '../../../assets/img/destinos/car.svg';
import iconVan from '../../../assets/img/destinos/van.svg';
import iconBus from '../../../assets/img/destinos/bus.svg';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import styles from "./DestineSecurityRio.module.css";
import Image from 'next/image';
import useWindowSize from '@/data/hooks/useWindowSize';

function DestineSecurityRio() {
    const size = useWindowSize();

    const settingsMain = {
        className: "center",
        dots: true,
        arrows: false,
        centerMode: true,
        infinite: true,
        centerPadding: "80px",
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 500
    };

    if (size.width > 767) {
        return (
            <>
                <div className="container mx-auto">
                    <div className={`${styles.bg_security_rio} container_content px-0`}>
                        <div className='grid grid-cols-12 items-center'>
                            <div className="col-span-12 md:col-span-2 pr-5">
                                <div className={`${styles.card_why_reservation}`}>
                                    <div className="flex justify-center">
                                        <Image src={iconCar.src} alt="Rio 40 graus" width={79} height={52} />
                                    </div>
                                    <div>
                                        <h4>
                                            Individuais
                                        </h4>
                                        <p>
                                            Até 3 pessoas por veículo privativo.
                                        </p>
                                        {/* <div className='flex'>
                                            <Link href="/destinos/rio-de-janeiro">
                                                Ver opções
                                            </Link>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-2 pr-5">
                                <div className={`${styles.card_why_reservation}`}>
                                    <div className="flex justify-center">
                                        <Image src={iconVan} alt="Paraíso Tropical" width={79} height={52} />
                                    </div>
                                    <div>
                                        <h4>
                                            Coletivos
                                        </h4>
                                        <p>
                                            Até 15 pessoas por veículo privativo.
                                        </p>
                                        {/* <div className='flex'>
                                            <Link href="/destinos/rio-de-janeiro">
                                                Ver opções
                                            </Link>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-2 pr-5">
                                <div className={`${styles.card_why_reservation}`}>
                                    <div className="flex justify-center">
                                        <Image src={iconBus} alt="Paraíso Tropical" width={79} height={52} />
                                    </div>
                                    <div>
                                        <h4>
                                            Coletivos maiores
                                        </h4>
                                        <p>
                                            Até 45 pessoas por veículo privativo.
                                        </p>
                                        {/* <div className='flex'>
                                            <Link href="/destinos/rio-de-janeiro">
                                                Ver opções
                                            </Link>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6">
                                <div className={`${styles.why_reservation}`}>
                                    <h3>
                                        Comodidade e segurança na hora de se movimentar em Rio de Janeiro
                                    </h3>
                                    <p>
                                        Com o conforto e a segurança que você precisa, temos diferentes modelos de transferes para te levar onde você quiser dentro e fora do Rio de Janeiro. Do aeroporto movimentado até o aconchego do seu hotel, da bagunça da cidade até as relaxantes praias paradisíacas. Escolha seu transporte perfeito.
                                    </p>
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
                <div className="container">
                    <div className={`${styles.bg_security_rio} global_bg_security_rio`}>
                        <div className={`${styles.why_reservation}`}>
                            <h3>
                                Comodidade e segurança na hora de se movimentar em Rio de Janeiro
                            </h3>
                            <p>
                                Com o conforto e a segurança que você precisa, temos diferentes modelos de transferes para te levar onde você quiser dentro e fora do Rio de Janeiro. Do aeroporto movimentado até o aconchego do seu hotel, da bagunça da cidade até as relaxantes praias paradisíacas. Escolha seu transporte perfeito.
                            </p>
                        </div>
                        <Slider {...settingsMain}>
                            <div className={`${styles.card_why_reservation} ml-3`}>
                                <div className="flex justify-center">
                                    <Image src={iconCar.src} alt="Rio 40 graus" width={79} height={52} />
                                </div>
                                <div>
                                    <h4>
                                        Individuais
                                    </h4>
                                    <p>
                                        Até 3 pessoas por veículo privativo.
                                    </p>
                                    {/* <div className='flex'>
                                        <Link href="/destinos/rio-de-janeiro">
                                            Ver opções
                                        </Link>
                                    </div> */}
                                </div>
                            </div>
                            <div className={`${styles.card_why_reservation} ml-3`}>
                                <div className="flex justify-center">
                                    <Image src={iconVan.src} alt="Paraíso Tropical" width={79} height={52} />
                                </div>
                                <div>
                                    <h4>
                                        Coletivos
                                    </h4>
                                    <p>
                                        Até 15 pessoas por veículo privativo.
                                    </p>
                                    {/*  <div className='flex'>
                                        <Link href="/destinos/rio-de-janeiro">
                                            Ver opções
                                        </Link>
                                    </div> */}
                                </div>
                            </div>
                            <div className={`${styles.card_why_reservation} ml-3`}>
                                <div className="flex justify-center">
                                    <Image src={iconBus.src} alt="Paraíso Tropical" width={79} height={52} />
                                </div>
                                <div>
                                    <h4>
                                        Coletivos maiores
                                    </h4>
                                    <p>
                                        Até 45 pessoas por veículo privativo.
                                    </p>
                                    {/* <div className='flex'>
                                        <Link href="/destinos/rio-de-janeiro">
                                            Ver opções
                                        </Link>
                                    </div> */}
                                </div>
                            </div>
                        </Slider>
                    </div>
                </div>
            </>
        )
    }
}

export default DestineSecurityRio;