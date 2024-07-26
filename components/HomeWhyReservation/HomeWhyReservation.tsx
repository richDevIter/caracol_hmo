'use client'
import React, { useEffect, useState } from 'react'
import Image from "next/image";

//Images
import iconMap from "../../assets/img/group_map.svg";
import iconReservation from "../../assets/img/group_reservation.svg";
import iconTour from "../../assets/img/group_tour.svg";

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


import styles from './HomeWhyReservation.module.css'
import Slider from 'react-slick';
import { getDictionary } from '@/dictionaries';
import { useParams } from 'next/navigation';

export interface propFooter {
  lng?: any,
}

const HomeWhyReservation: React.FC<propFooter> = ({
  lng
}) => {

 
 
  const [dic, setDic] = useState<any>(null);
    
  const searchParams = useParams();

  useEffect(() => {
      const fetchDictionary = async () => {
          const dictionary = await getDictionary(searchParams.lng as "pt" | "en" | "es", 'homeWhyReservation');
          setDic(dictionary);
      };
  
      fetchDictionary();
  
  }, [searchParams.lng])


  const settingsMain = {
    dots: false,
    arrows: false,
    centerMode: false,
    infinite: false,
    centerPadding: "0px",
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 500,
    responsive: [
      {
          breakpoint: 767,
          settings: {
              className: "center",
              dots: true,
              centerMode: true,
              slidesToShow: 1,
              slidesToScroll: 1,
              centerPadding: "60px",
              infinite: true,
          }
      }
    ]
  };

  return (
      <div className={`container_content ${styles.bg_why_reservation} p-0 home-why-reservation`} >
        <div className="grid grid-cols-12 row_controll">

          <div className='col-span-12 md:col-span-3 p-3'>
            <div className="why-reservation">
              <h3 className={`${styles.h3_why_reservation}`}>
                {dic?.whyBook.title}
                <span className={`${styles.h3_why_reservation_span}`}>{dic?.whyBook.titleSpan}</span>
                {dic?.whyBook.titleInterrogation}
              </h3>
            </div>
          </div>

          <div className='col-span-12 md:col-span-9 p-3'>
            <Slider {...settingsMain}>
              <div className="card-why-reservation">
                <div className={`${styles.card_why_reservation}`}>
                  <div>
                    <Image src={iconMap} alt="Várias escolhas" style={{ marginBottom: '1.375rem' }} loading='lazy' width={92} height={79} />
                  </div>
                  <div>
                    <h4 className={`${styles.h4_why_reservation}`}>{dic?.whyBook.multipleChoices}</h4>
                    <p className={`${styles.p_why_reservation}`}>{dic?.whyBook.multipleChoicesSub}</p>
                  </div>
                </div>
              </div>
              <div className="card-why-reservation">
                <div className={`${styles.card_why_reservation} ${styles.why_top}`}>
                  <div>
                    <Image src={iconTour} alt="Melhor passeio" style={{ marginBottom: '1.375rem' }} loading='lazy' width={98} height={71}/>
                  </div>
                  <div>
                    <h4 className={`${styles.h4_why_reservation}`}>{dic?.whyBook.bestTour}</h4>
                    <p className={`${styles.p_why_reservation}`}>{dic?.whyBook.bestTourSub}</p>
                  </div>
                </div>
              </div>
              <div className="card-why-reservation">
                <div className={`${styles.card_why_reservation}`}>
                  <div>
                    <Image src={iconReservation} alt="Reserva fácil" style={{ marginBottom: '1.375rem' }} loading='lazy' width={90} height={61}/>
                  </div>
                  <div>
                    <h4 className={`${styles.h4_why_reservation}`}>{dic?.whyBook.easyBooking}</h4>
                    <p className={`${styles.p_why_reservation}`}>{dic?.whyBook.easyBookingSub}</p>
                  </div>
                </div>
              </div>
            </Slider>
          </div>

        </div>

      </div>
  )
}

export default HomeWhyReservation