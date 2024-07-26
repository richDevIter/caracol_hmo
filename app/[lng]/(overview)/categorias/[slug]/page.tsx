'use client'

import BannerHome from '@/components/HomeBanner/HomeBanner';
import React, { Key, useEffect, useState } from 'react';
import { parseCookies } from "nookies";

import Head from 'next/head';
import dynamic from 'next/dynamic';

import Image from 'next/image';

import styles from './categorias.module.css';
import { IconHalfStar, IconStar } from '@/assets/icons';
import ActivitiesPagination from '@/components/ActivitiesPagination/ActivitiesPagination';
import Link from 'next/link';

/* import BannerBleasureDesk from '@/public/images/banners/banner-bleasure-desk.jpg';
import BannerBleasureTablet from '@/public/images/banners/banner-bleasure-tablet.jpg';
import BannerBleasureMob from '@/public/images/banners/banner-bleasure-mob.jpg'; */
import useWindowSize from '@/data/hooks/useWindowSize';
import { useParams, useRouter } from 'next/navigation';
import { getDictionary } from '@/dictionaries';

const DynamicTabSearchs = dynamic(
  () => import('@/components/TabSearchs/TabSearchs'),
  {
    ssr: false,
  }
);





// export async function getStaticPaths({ slug }: any) {
//   return {
//     paths: [], //indicates that no page needs be created at build time
//     fallback: 'blocking', //indicates the type of fallback
//   };
// }

function Category(props: any) {

  const router = useRouter();

  const searchParams = useParams();

  const [dic, setDic] = useState<any>(null);

  useEffect(() => {
    const fetchDictionary = async () => {
      const dictionary = await getDictionary(searchParams.lng as "pt" | "en" | "es", 'categories');
      setDic(dictionary);
    };
    fetchDictionary();
  }, [searchParams.lng])


  const lng = searchParams.lng === "pt" ? "BR" : searchParams.lng === "en" ? "EN" : searchParams.lng === "es" ? "ES" : "BR";


  const size = useWindowSize();
  const [seeMore, setSeeMore] = useState<any>(5);
  const [pageCount, setPageCount] = useState<any>(1);
  const [totalRows, setTotalRows] = useState<any>(0);
  const [respCategory, setRespCategory] = useState<any>(null);


  function HandleMore() {
    if (seeMore <= respCategory.length) {
      setSeeMore(seeMore + 5);
    } else {
      setSeeMore(5);
    }
  }

  const getCategoryInfo = async () => {
    const cookies: any = parseCookies();
    const popular: any = props.slug !== "populares" ? '' : cookies?.POPULAR_CAT.split(",");

    const data = {
      Slug: '',
      lang: lng,
      categoryCode: props.slug !== "populares" ? [props.slug] : popular,
    };

    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL_API}/Products/GetProductsFromCategories`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data),
      }
    );
    const categoryResp = await resp.json();

    setRespCategory(categoryResp.data);
    setTotalRows(categoryResp.data?.length);
  }

  useEffect(() => {
    getCategoryInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //const categories = localStorage.getItem('popularCat') || '{}';

  /* Scroll para os passeios */

  /* END - Scroll para os passeios */

  if (respCategory !== null) {
    return (
      <>
        <Head>
          <title>
            {respCategory[0]?.categoryName +
              ' | ' +
              process.env.NEXT_PUBLIC_SERVER_NAME}
          </title>
          <meta
            name="description"
            content={respCategory.productInfo?.replace(/<[^>]*>?/gm, '')}
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <>

          {
            props.slug !== "CAT-25MTDD1"
              ?
              <BannerHome />
              :
              <div /* className={loadBanner === true ? styles.banner_home : styles.await_banner} */>
                {/* <Image
                  src={size.width >= 1025 ? BannerBleasureDesk : size.width >= 768 ? BannerBleasureTablet : size.width >= 1 ? BannerBleasureMob : BannerBleasureDesk}
                  width={1920}
                  height={530}
                  alt={"Banner Bleasure"}
                  priority={true}
                  placeholder="blur"
                  quality={90}
                //blurDataURL={banner.image.blurDataURL}
                //onLoad={() => setLoadBanner(false)}
                /> */}
              </div>
          }

          <div className={` ${styles.bg_tab_options} container_content flex flex-wrap px-0`}>
            <DynamicTabSearchs />
          </div>

          <div className="container_content" style={{ marginTop: '-80px' }}>
            <div className={`${styles.things_to_do}`}>
              <p>
              {dic?.thingsToDo}{' '}
                <span className="capitalize">
                  {respCategory[0]?.categoryName?.split('-')[0]}
                </span>
              </p>
            </div>
            <div className="flex flex-wrap justify-between mb-9">
              <div>
                <p className="">
                  {respCategory[0]?.eventLocation.split(',')[0]},{' '}
                  {respCategory[0]?.eventLocation.split(',')[2]}
                </p>
                <p className="">
                  {respCategory.length}{' '}
                  {respCategory.length === 1
                    ? 'atividade encontrada'
                    : dic?.activitiesFound}
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-end mt-2 md:mt-0 md:w-2/4">
                <span className="hidden md:block">{dic?.ordenateBy} </span>
                <select name="select" className={`${styles.ordenate_select} `}>
                  <option>{dic?.recommended}</option>
                  <option value="1">{dic?.reviews}</option>
                  <option value="2">{dic?.lowestPrice}</option>
                  <option value="3">{dic?.highestPrice}</option>
                </select>
              </div>
            </div>
            {/* <div className={`${styles.things_to_do} block md:hidden`}>
              <p>
                Coisas para fazer -{' '}
                <span className="capitalize">
                  {respCategory[0]?.categoryName.split('-')[0]}
                </span>
              </p>
            </div> */}
            <div className={`${styles.category_card_collection}`}>
              {respCategory.length > 0
                && respCategory.slice((pageCount - 1) * 5, ((pageCount - 1) * 5) + 5).map((tour: any, index: Key) => {
                  const ratingTotal = tour.stars;
                  let rating: any;
                  let arrayStars: any = [];
                  if (ratingTotal !== null) {
                    if (ratingTotal > 0 && ratingTotal <= 0.75) {
                      rating = 0.5;
                    } else if (ratingTotal > 0.76 && ratingTotal <= 1.25) {
                      rating = 1;
                    } else if (ratingTotal > 1.26 && ratingTotal <= 1.75) {
                      rating = 1.5;
                    } else if (ratingTotal > 1.76 && ratingTotal <= 2.25) {
                      rating = 2;
                    } else if (ratingTotal > 2.26 && ratingTotal <= 2.75) {
                      rating = 2.5;
                    } else if (ratingTotal > 2.76 && ratingTotal <= 3.25) {
                      rating = 3;
                    } else if (ratingTotal > 3.26 && ratingTotal <= 3.75) {
                      rating = 3.5;
                    } else if (ratingTotal > 3.76 && ratingTotal <= 4.25) {
                      rating = 4;
                    } else if (ratingTotal > 4.26 && ratingTotal <= 4.75) {
                      rating = 4.5;
                    } else if (ratingTotal > 4.76 && ratingTotal <= 5) {
                      rating = 5;
                    }

                    for (var i: any = 0; i < 5; i = i + 0.5) {
                      if (i < rating) {
                        arrayStars.push(1);
                      } else {
                        arrayStars.push(0);
                      }
                    }

                    let aux: any = [];

                    for (var j: any = 0; j < 10; j = j + 2) {
                      if (arrayStars[j] === 1 && arrayStars[j + 1] === 1) {
                        aux.push(1);
                      } else if (arrayStars[j] === 1 && arrayStars[j + 1] === 0) {
                        aux.push(0.5);
                      } else if (arrayStars[j] === 0 && arrayStars[j + 1] === 0) {
                        aux.push(0);
                      }
                    }

                    arrayStars = aux;
                  } else {
                    <></>
                  }
                  return (
                    <Link key={tour.productCode} href={tour.productType === 'TOUR' ? `/tour/${tour.productSlug}` : `/ticket/${tour.productSlug}`} >
                      <div
                        className={`${styles.category_card} grid grid-cols-1 md:grid-cols-12`}
                      >
                        <div className="col-span-4 rounded-xl">
                          <Image
                            src={tour.productType === "TOUR" ? `${tour.imagesBaseUrl}medium_${tour.productImg}` : `${tour.imagesBaseUrl}medium_${tour.productImg}`}
                            width={size.width >= 767 ? 372 : 767}
                            height={210}
                            alt={`imagem de ${tour.productName}`}
                            style={{
                              borderRadius: '12px',
                              objectFit: 'cover',
                              height: '210px',
                            }}
                          />
                        </div>
                        <div className="col-span-8">
                          <div className="grid grid-cols-1 md:grid-cols-3">
                            <div className="col-span-12 md:col-span-2 md:px-4">
                              <h5 className={styles.card_title}>
                                {tour.productName}
                              </h5>
                              {tour.productIncludeItem
                                .slice(0, 3)
                                .map((includes: any, index: Key) => {
                                  return (
                                    <div key={index}>
                                      <p className="category-text mb-0">
                                        {includes.split('•	').join('')}
                                      </p>
                                    </div>
                                  );
                                })}
                            </div>
                            <div className="md:col-span-1 text-right flex flex-col align-end min-[766px]:col-start-3">
                              <div className="flex justify-end">
                                <span className="flex justify-end mr-2">
                                  {arrayStars.length > 0
                                    ? arrayStars.map((array: any, index: Key) => {
                                      if (array === 0) {
                                        return <>{IconStar('#fff', "13.78")}</>;
                                      } else if (array === 1) {
                                        return <>{IconStar('#ffc60a', "13.78")}</>;
                                      } else {
                                        return <>{IconHalfStar('#ffc60a', "13.78")}</>;
                                      }
                                    })
                                    : ''}
                                </span>
                                {tour.stars !== null ? (
                                  <>
                                    <span className="stars-qtd">
                                      {tour.stars?.toFixed(1)}
                                    </span>
                                  </>
                                ) : (
                                  ''
                                )}
                                {/* Mobile */}
                                <p className="small text-muted d-flex d-md-none mt-1">
                                  {/* <i
                                        className="far fa-clock"
                                        aria-hidden="true"
                                    ></i>
                                    <img src={`${IconTime}`} alt="time" />
                                    <span className='tour-duration'>
                                        Duração:
                                        {" " +
                                            tour.durationHours +
                                            ":" +
                                            tour.durationMinutes +
                                            " horas"}
                                    </span> */}
                                </p>
                                {/* END - Mobile */}
                              </div>
                              <span className={styles.category_price}>
                                {'R$ ' + tour.price.toFixed(2).replace('.', ',')}
                              </span>
                              <span>{dic?.perPerson}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                    </Link>
                  );
                })}

              <ActivitiesPagination totalRows={totalRows} pageCount={pageCount} setPageCount={setPageCount} />

              {/* {respCategory.length > 5 ? (
                <div className='flex justify-center'>
                  <button
                    className={`${styles.btn_see_more}`}
                    onClick={HandleMore}
                  >
                    Veja mais atividades
                  </button>
                </div>
              ) : (
                <></>
              )} */}
            </div>
          </div>
        </>
      </>
    );
  }
}

export default Category;
