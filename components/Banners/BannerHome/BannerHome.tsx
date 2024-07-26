'use client';

import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';

import Link from 'next/link';
import Image from "next/image";

/* Imagens do Slider 01 */
import BannerDesktop from '../../../assets/img/bannerHomeCaracol/cartao-postal-desktop.png';
import BannerMobile from '../../../assets/img/bannerHomeCaracol/cartao-postal-mobile.png';

/* END - Imagens do Slider 01 */
import useWindowSize from '@/data/hooks/useWindowSize';

import styles from './BannerHome.module.css';

function BannerHome() {
  const [changeBanner, setChangeBanner] = useState<boolean>();

  const size = useWindowSize();

  const settings = {
    dots: false,
    draggable: false,
    useTransform: true,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1500,
    autoplaySpeed: 5500,
    cssEase: "ease-out",
    arrows: false

  };
  
  useEffect(() => {
    let date = new Date().toLocaleString('pt-BR');

    let dateNow = date.split(' ')[0].split('/').reverse().join('');

    if (`${dateNow}` >= '20221123' && `${dateNow}` <= '20221205') {
      setChangeBanner(true);
    } else {
      setChangeBanner(false);
    }
  }, []);


  return (
    <div className="content-header">
      <div className="bg-main-banner">
        <Slider {...settings}>
          <Link href={'#'}>
            <div className={`bg-secondary banner-home p-0 m-0 ${styles.banner_home}`} >
              <Image
                className={`p-0 m-0 ${styles.banner_image}`}
                src={size.width < 480 ? BannerMobile : BannerDesktop}
                alt='Banner Desktop Default'
                width='1920'
                height={'533'}
                quality={90}
                priority={true}
                loading='eager'
              />
            </div>
          </Link>
        </Slider>
      </div>
    </div>
  );
}

export default BannerHome;
