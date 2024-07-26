'use client'

import React, { useEffect, useState } from 'react';
import Head from 'next/head';

import CookiePolicyPT from '@/components/CookiePolicy/CookiePolicePT';
import CookiePolicyEN from '@/components/CookiePolicy/CookiePoliceEN';
import CookiePolicyES from '@/components/CookiePolicy/CookiePoliceES';
import styles from '../../../../styles/politica-de-privacidade.module.css';

import { useParams } from 'next/navigation';
import { getDictionary } from '@/dictionaries';


const CookiePolicy = () => {
  const [dic, setDic] = useState<any>(null);

  const searchParams = useParams();

  useEffect(() => {
    const fetchDictionary = async () => {
      const dictionary = await getDictionary(searchParams.lng as "pt" | "en" | "es", 'cookies');
      setDic(dictionary);
    };
    fetchDictionary();
  }, [searchParams.lng])

  const renderPrivacy = () => {
    if (searchParams.lng === 'br') {
      return <CookiePolicyPT />
    } else if (searchParams.lng === 'en') {
      return <CookiePolicyEN />
    } else if (searchParams.lng === 'es') {
      return <CookiePolicyES />
    } else {
      return <CookiePolicyPT />
    }
  }

  return (
    <>
      <>
        <div className={`${styles.estatic_page} container_content container py-12`}>
          <h1 className={`${styles.title} ${styles.display_2} mb-5 text-center p-0`}>{dic?.title}</h1>
          <div className={`${styles.card} py-6 px-4`}>
            {renderPrivacy()}
          </div>
        </div>
      </>
    </>
  );
};

export default CookiePolicy;
