'use client'

import React, { useEffect, useState } from 'react';
import HomeNewsletter from '@/components/HomeNewsletter/HomeNewsletter';

import bgPark from '../../../../assets/img/banner-home-caracol.png';

import styles from '../../../../styles/sobre-nos.module.css';

import { useParams } from 'react-router-dom';
import { getDictionary } from '@/dictionaries';

import AboutUsPortuguese from './content/AboutUsPortuguese';
import AboutUsSpanish from './content/AboutUsSpanish';
import AboutUsEnglish from './content/AboutUsEnglish';

function ThePark() {
  const [dic, setDic] = useState<any>(null);
  const searchParams = useParams();

  const lng = searchParams.lng === "pt" ? "BR" : searchParams.lng === "en" ? "EN" : searchParams.lng === "es" ? "ES" : "BR";
  console.log(lng)


  useEffect(() => {
    const fetchDictionary = async () => {
      const dictionary = await getDictionary(
        searchParams.lng as 'pt' | 'en' | 'es',
        'login',
      );
      setDic(dictionary);
    };

    fetchDictionary();
  }, [searchParams.lng]);

  return (
    <>
      <div className={`${styles.top_park} mb-0 md:mb-3`} style={{ backgroundImage: `url(${bgPark?.src})` }}>
        <div className={`${styles.shadow_park} h-full`}>
          <h1>O Parque</h1>
        </div>
      </div>
      <div className='container-page'>
        <div className={`${styles.park_content}`}>
          {lng === "BR" ? <AboutUsPortuguese /> : lng === "EN" ? <AboutUsEnglish /> : lng === "ES" ? <AboutUsSpanish /> : <AboutUsPortuguese />}
        </div>
      </div>
      <HomeNewsletter />
    </>
  )
}

export default ThePark;