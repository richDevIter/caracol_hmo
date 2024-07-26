'use client';

import { Suspense, useEffect, useState } from "react";
import SliderHome from "@/components/base/Slider/Slider";
import BannerHome from "@/components/Banners/BannerHome/BannerHome";

import HomeNewsletter from '@/components/HomeNewsletter/HomeNewsletter';
import styles from '../../../styles/home.module.css';
import HomeHowToGet from '@/components/HomeHowToGet/HomeHowToGet';
import HomeCaracolSlider from '@/components/HomeCaracolSlider/HomeCaracolSlider';
import HomeLiveCaracol from '@/components/HomeLiveCaracol/HomeLiveCaracol';
import HomePark from '@/components/HomePark/HomePark';
import ProductsCarrousel from "@/components/ProductCarrousel/ProductCarrousel";

export default function Home({ params: { lng } }: any) {
  return (
    <>
      <section className={styles.bg_home}>

        <SliderHome lng={lng}/>
        <ProductsCarrousel codCategory={process.env.NEXT_PUBLIC_CATEGORY?.split(",")}></ProductsCarrousel>
        <HomePark />
        <HomeLiveCaracol />
        <HomeCaracolSlider />
        <HomeHowToGet />
        <HomeNewsletter />
      </section>
    </>
  );
}
