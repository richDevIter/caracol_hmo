import React, { useEffect, useState } from 'react';

import Link from 'next/link';

import styles from './DestineMainTours.module.css';
import Slider from 'react-slick';
import useWindowSize from '@/data/hooks/useWindowSize';
import { useParams, useRouter } from 'next/navigation';

export interface propMainTours {
  info?: any;
}

const DestineMainTours: React.FC<propMainTours> = ({ info = [] }) => {
  const searchParams = useParams();

  const lng: string = searchParams.lng === "pt" ? "BR" : searchParams.lng === "en" ? "EN" : searchParams.lng === "es" ? "ES" : 'BR';

  const size = useWindowSize();

  const [mainTours, setMainTours] = useState<any>(null);

  /* Prices */
  const [price01, setPrice01] = useState<any>(null);
  const [price02, setPrice02] = useState<any>(null);
  const [price03, setPrice03] = useState<any>(null);
  const [price04, setPrice04] = useState<any>(null);
  /* END - Prices */

  const [categoryPrice, setCategoryPrice] = useState<any>([]);
  const [categories, setCategories] = useState<any>([]);

  useEffect(() => {
    const addCat = () => {
      const aux: any = [];
      info?.map((tour: any) => {
        return aux.push(tour.category);
      });
      setCategories(aux);
    };
    addCat();
  }, [info]);

  const settingsMain = {
    dots: true,
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          arrows: false,
          centerPadding: "40px",
        }
      },
      {
        breakpoint: 820,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          arrows: false,
          centerPadding: "40px",
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          arrows: false,
          centerPadding: "-60px",
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          arrows: false,
          centerPadding: "110px",
        }
      },
      {
        breakpoint: 361,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          arrows: false,
          centerPadding: "80px",
        }
      }
    ]
  };

  setTimeout(() => {
    setMainTours(true);
  }, 1000);

  useEffect(() => {
    async function getProducts(categorys: any) {
      if (categorys) {
        try {

          const data = {
            categoryCode: [categorys],
            lang: lng,
            channel: 2,
          }

          const resp = await fetch(`https://backend.destinow.com.br/api/Products/GetProductsFromCategories`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data)
          })
          const catResp = await resp.json();

          if (catResp.status !== 400) {
            if (catResp.data[0].categoryCode === categories[0]) {
              setPrice01(catResp.data);
            } else if (catResp.data[0].categoryCode === categories[1]) {
              setPrice02(catResp.data);
            } else if (catResp.data[0].categoryCode === categories[2]) {
              setPrice03(catResp.data);
            } else if (catResp.data[0].categoryCode === categories[3]) {
              setPrice04(catResp.data);
            }
          }
        } catch (error) { }
      }
    }

    getProducts(categories[0]);
    getProducts(categories[1]);
    getProducts(categories[2]);
    getProducts(categories[3]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lng, categories]);

  useEffect(() => {
    let auxPrice: any = [0, 0, 0, 0];

    let aux0: any = [];
    let aux1: any = [];
    let aux2: any = [];
    let aux3: any = [];

    if (price01 !== null) {
      for (let j = 0; j < price01.length; j++) {
        aux0.push(price01[j]?.price);
      }
    }

    if (price02 !== null) {
      for (let j = 0; j < price02.length; j++) {
        aux1.push(price02[j]?.price);
      }
    }

    if (price03 !== null) {
      for (let j = 0; j < price03.length; j++) {
        aux2.push(price03[j]?.price);
      }
    }

    if (price04 !== null) {
      for (let j = 0; j < price04.length; j++) {
        aux3.push(price04[j]?.price)
      }
    }

    auxPrice[0] = aux0?.length > 0 ? Math.min(...aux0).toFixed(2).replace('.', ',') : 0;
    auxPrice[1] = aux1?.length > 0 ? Math.min(...aux1).toFixed(2).replace('.', ',') : 0;
    auxPrice[2] = aux2?.length > 0 ? Math.min(...aux2).toFixed(2).replace('.', ',') : 0;
    auxPrice[3] = aux3?.length > 0 ? Math.min(...aux3).toFixed(2).replace('.', ',') : 0;

    setCategoryPrice(auxPrice);
  }, [price01, price02, price03, price04])


  if (size.width > 1024) {
    if (mainTours !== null) {
      return (
        <>
          <div className={`container_content ${styles.bg_main_tours}`}>
            <div className="container mx-auto py-8">
              <div className="flex flex-wrap -mx-4">
                {info?.map((item: any, index: any) => {
                  return (
                    <>
                      <div className="w-full md:w-1/4 px-4">
                        <Link href={`/categorias/${item?.category}`}>
                          <div className={styles.card_why_reservation}>
                            <h5 className="mb-4">{item?.title}</h5>
                            {categoryPrice[index] !== 0 &&
                              <>
                                <div className={`${styles.price} mb-4`}>
                                  <small>A partir de</small>
                                  <p className="text-3xl font-bold">
                                    R${' '}
                                    <span>
                                      {categoryPrice[index]}
                                    </span>
                                  </p>
                                </div>
                              </>
                            }
                            <div className="infos">
                              <div className="mb-4">
                                <p className="text-sm font-medium">
                                  {item?.subtitle}
                                </p>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </>
                  );
                })}
              </div >
            </div >
          </div >
        </>
      );
    } else {
      return <></>;
    }
  } else {
    if (mainTours !== null) {
      return (
        <>
          <div className='container'>
            <div className={`${styles.bg_main_tours} container_content global_bg_main_tours`}>
              <Slider {...settingsMain}>
                {info?.map((item: any, index: any) => {
                  return (
                    <>
                      <Link href={`/categorias/${item?.category}`}>
                        <div className={`${styles.card_why_reservation}`}>
                          <div>
                            <h5>{item?.title}</h5>
                          </div>
                          <div className={`${styles.price}`}>
                            <small>A partir de</small>
                            <p>R$ <span>{categoryPrice[index]}</span></p>
                          </div >
                          <div className='infos'>
                            {/* <div>
                                            <small>Saídas</small>
                                        </div> */}
                            <div>
                              <p>{item?.subtitle}</p>
                            </div>
                          </div>
                        </div >
                      </Link >
                    </>
                  );
                })
                }
              </Slider >
            </div >
          </div >
        </>
      )
    } else {
  return (
    <>
      <div className="container">
        <div className={`${styles.bg_main_tours} container_content`}>
          <div className="grid grid-cols-12">
            {[1, 2, 3, 4].map(() => {
              return (
                <>
                  <div className="col-span-12 md:col-span-3">
                    <div className="card-why-reservation">
                      <div
                        className="animated-background"
                        style={{
                          height: '34px',
                          width: '100%',
                          marginBottom: '8px',
                        }}
                      ></div>
                      <div
                        className="price animated-background"
                        style={{
                          height: '53px',
                          width: '100%',
                          marginBottom: '16px',
                        }}
                      ></div>
                      <div className="infos">
                        <div
                          className="animated-background"
                          style={{
                            height: '17px',
                            width: '100%',
                            marginBottom: '7px',
                          }}
                        ></div>
                        <div
                          className="animated-background"
                          style={{
                            height: '61.5px',
                            width: '100%',
                            marginBottom: '7px',
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
  }
};

export default DestineMainTours;
