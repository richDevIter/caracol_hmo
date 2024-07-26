import React, { useState, useEffect } from 'react';

import iconFourty from '@/assets/img/destinos/rio-de-janeiro/fourty.svg';
import iconChair from '@/assets/img/destinos/rio-de-janeiro/chair.svg';

import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import styles from './DestineKnowCity.module.css';
import Image from 'next/image';
import useWindowSize from '@/data/hooks/useWindowSize';

export interface propBanner {
  info?: any;
}

const DestineKnowCity: React.FC<propBanner> = ({ info }) => {
  const size = useWindowSize();

  const settingsMain = {
    className: 'center',
    dots: true,
    arrows: false,
    centerMode: true,
    infinite: true,
    centerPadding: '50px',
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    responsive: [
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          arrows: false,
          centerPadding: "100px",
      }
    },
    {
        breakpoint: 820,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          arrows: false,
          centerPadding: "100px",
      }
    },
    {
        breakpoint: 768,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            arrows: false,
            centerPadding: "10px",
        }
    },
    {
        breakpoint: 640,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            arrows: false,
            centerPadding: "60px",
        }
    }    
    ]
  };

  if (size.width > 1024) {
    return (
      <>
        <div className="container mx-auto">
          <div className={`container_content ${styles.bg_know_city}`}>
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className={styles.why_reservation}>
                <h3>{info.summary[0]}</h3>
                <p>
                  {info.summary[1]}
                  <br />
                  {info.summary[2]}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div
                  className={` ${styles.card_why_reservation} ${styles.why_top}`}
                >
                  <div>
                    <Image
                      src={info.firstCard[2].src}
                      alt={info.firstCard[0]}
                      width={92}
                      height={92}
                    />
                  </div>
                  <div>
                    <h4>{info.firstCard[0]}</h4>
                    <p>{info.firstCard[1]}</p>
                  </div>
                </div>
                <div
                  className={styles.card_why_reservation}
                  style={{ marginBottom: '50px' }}
                >
                  <div>
                    <Image
                      src={info.secondCard[2].src}
                      alt={info.secondCard[0]}
                      width={92}
                      height={92}
                    />
                  </div>
                  <div>
                    <h4>{info.secondCard[0]}</h4>
                    <p>{info.secondCard[1]}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="container mx-auto">
          <div className={`${styles.bg_know_city} global_bg_know_city`}>
            <div className={`${styles.why_reservation} px-4`}>
              <h3>{info.summary[0]}</h3>
              <p>
                {info.summary[1]}
                  <br />
                {info.summary[2]}
              </p>
            </div>

            <Slider {...settingsMain}>
              <div className={` ${styles.card_why_reservation} ml-3`}>
                <div>
                  <Image
                    src={info.firstCard[2].src}
                    alt={info.firstCard[0]}
                    width={92}
                    height={92}
                  />
                </div>
                <div>
                  <h4>{info.firstCard[0]}</h4>
                  <p>
                  {info.firstCard[1]}
                  </p>
                </div>
              </div>
              <div className={` ${styles.card_why_reservation} ml-3`}>
                <div>
                  <Image
                    src={info.secondCard[2].src}
                    alt={info.secondCard[0]}
                    width={92}
                    height={92}
                  />
                </div>
                <div>
                  <h4>{info.secondCard[0]}</h4>
                  <p>{info.secondCard[1]}</p>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </>
    );
  }
};

export default DestineKnowCity;
