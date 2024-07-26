'use client'
import React, { Key, Suspense, useEffect, useState } from 'react';
import Slider from 'react-slick';
import Image from 'next/image';


import styles from './HomeCarrouselMainAttractions.module.css';
import Link from 'next/link';
import { IconHalfStar, IconMap, IconStar } from '@/assets/icons';

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getDictionary } from '@/dictionaries';
import { useParams } from 'next/navigation';
import HomePageRepository from '@/core/HomePageRepository';
import HomePageCollection from '@/core/HomePage';
import { parseCookies, setCookie } from 'nookies';
import IdChannelCollection from '@/core/IdChannel';
import IdChannelRepository from '@/core/IdChannelRepository';
import { channel } from 'diagnostics_channel';
import { HomeCarrouselMainAttractionsSkeleton } from '@/app/[lng]/(overview)/ui/skeletons';

interface CategoriesProps {
    listCategories?: any
}

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
    className: `center slider-attractions`,
    arrows: true,
    centerMode: true,
    infinite: false,
    centerPadding: "40px 0px 0px",
    slidesToShow: 4,
    slidesToScroll: 1,
    speed: 500,
    initialSlide: 2,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
        {
            breakpoint: 2561,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
                infinite: false,
            }
        },
        {
            breakpoint: 1921,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
                infinite: false,
                centerPadding: "0",
            }
        },
        {
            breakpoint: 1601,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: false,
                centerPadding: "40px 0px 0px",
            }
        },
        {
            breakpoint: 1124,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
                arrows: false,
                centerPadding: "60px",
            }
        },
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
                centerPadding: "80px",
            }
        }
    ]
};

const CarrouselMainAttractionsNew = (props: CategoriesProps) => {

    const [dic, setDic] = useState<any>(null);

    const searchParams = useParams();

    useEffect(() => {
        const fetchDictionary = async () => {
            const dictionary = await getDictionary(searchParams?.lng as "pt" | "en" | "es", 'carrouselMainAttractions');
            setDic(dictionary);
        };

        fetchDictionary();

    }, [searchParams.lng]);

    return (
        <div className={`${styles.bg_home_carrousel_main}`}>
            <Suspense fallback={<HomeCarrouselMainAttractionsSkeleton />}>
                <HandlerCarrousel/>
            </Suspense>
        </div>
    )
}

function HandlerCarrousel() {
  const repo: HomePageRepository = new HomePageCollection();
  const repoChannel: IdChannelRepository = new IdChannelCollection();

  const cookies = parseCookies();
  const [categories, setCategories] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<any>(null);
  const [conectionError, setConectionError] = useState<boolean>(false);

  const [dic, setDic] = useState<any>(null);

  const searchParams = useParams();

  useEffect(() => {
    const fetchDictionary = async () => {
      const dictionary = await getDictionary(
        searchParams.lng as 'pt' | 'en' | 'es',
        'carrouselMainAttractions',
      );
      setDic(dictionary);
    };

    fetchDictionary();
  }, [searchParams.lng]);

  const handleInfoCarrousel = (channel: number) => {
    const lng =
      searchParams.lng === 'pt'
        ? 'BR'
        : searchParams.lng === 'en'
        ? 'EN'
        : searchParams.lng === 'es'
        ? 'ES'
        : 'BR';

    repo
      .getCategories(process.env.NEXT_PUBLIC_CATEGORY, lng, channel)
      .then((result) => {
        if (result instanceof Error) {
          const message = JSON.parse(result.message);
          setConectionError(true);
          setErrorMessage(
            message?.errors.length > 0
              ? message?.errors.length
              : ['Erro desconhecido - Entre em contato com o Suporte'],
          );
        } else {
          if (categories === null) {
            setCategories(result);
          }
        }
      });
  };

  useEffect(() => {
    if (!cookies.idCanal) {
      repoChannel.getFiltered('site').then((result: any) => {
        if (result instanceof Error) {
          const message = JSON.parse(result.message);
          //setConectionError(true);
          //setErrorMessage(message?.errors.length > 0 ? message?.errors.length : ['Erro desconhecido - Entre em contato com o Suporte'])
        } else {
          setCookie(null, 'idCanal', result.data, {
            maxAge: 60 * 10, //expira em 10 minutos (60 * 10)
            path: '/',
          });
          handleInfoCarrousel(result.data);
        }
      });
    } else {
      handleInfoCarrousel(+cookies.idCanal);
    }
  }, []);

  if (categories !== null) {
    return (
      <>
        <div className="container_content p-0">
          <div className={`${styles.main_attractions} px-4 md:px-0`}>
            <h3 className={`${styles.title_main_attractions} pb-2`}>
              {dic?.mainTitle}
            </h3>
            <p className={`${styles.subtitle_main_attractions}`}>
              {dic?.mainSubtitle}
            </p>
          </div>
        </div>
        <Slider {...settings}>
          {categories.map((item: any, index: Key) => {
            const ratingTotal = item.stars;
            let rating: any;
            let arrayStars: any = [];

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

            return (
              <a
                key={index}
                href={`/tour/${item.productSlug}`}
                className={`${styles.card_main_attractions}`}
              >
                {item?.percDesc !== 0 ? (
                  <div className={`${styles.badge_main_attractions}`}>
                    <span>-{item.percDesc}%</span>
                  </div>
                ) : (
                  ''
                )}
                <Image
                  src={`${categories[0].imagesBaseUrl}medium_${item.productImg}`}
                  alt="Carrousel Atrações Principais"
                  width={357}
                  height={280}
                  className={`${styles.img_main_attractions}`}
                  quality={90}
                  loading="lazy"
                  sizes="(max-width: 357px) 100vw"
                />
                <div className={`${styles.card_content_main_attractions}`}>
                  <div className="flex pt-4 md:pt-6 pb-2 items-center gap-1">
                    {IconMap}
                    <span className={`${styles.span_city_main_attractions}`}>
                      {item.eventLocation.split(',')[0]}
                    </span>
                  </div>
                  <div>
                    <h4
                      className={`${styles.h4_main_attractions} ${styles.bg_wrap}`}
                    >
                      {item.productName}
                    </h4>
                  </div>
                  {item?.stars !== null ? (
                    <div className="star-attractions flex">
                      <span
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          height: 'auto',
                        }}
                      >
                        {arrayStars.length > 0
                          ? arrayStars.map((array: any, index: Key) => {
                              if (array === 0) {
                                return (
                                  <div key={index}>
                                    {IconStar('#fff', '13.78')}
                                  </div>
                                );
                              } else if (array === 1) {
                                return (
                                  <div key={index}>
                                    {IconStar('#ffc60a', '13.78')}
                                  </div>
                                );
                              } else {
                                return (
                                  <div key={index}>
                                    {IconHalfStar('#ffc60a', '13.78')}
                                  </div>
                                );
                              }
                            })
                          : ''}
                      </span>
                      <span className="ml-2">{item.stars}</span>
                    </div>
                  ) : (
                    <></>
                  )}

                  <div className="price-attractions">
                    {item.percDesc !== 0 ? (
                      <div>
                        <p
                          className={`${styles.p_main_attractions} mb-1`}
                          style={{ textDecoration: 'line-through' }}
                        >
                          de R$ {item?.price.toFixed(2).replace('.', ',')}
                        </p>
                        <p className={`${styles.p_main_attractions} flex`}>
                          <span
                            className={`${styles.strong_main_attractions} mr-2`}
                          >
                            R${' '}
                            {((1 - item.percDesc / 100) * item?.price)
                              .toFixed(2)
                              .replace('.', ',')}
                          </span>{' '}
                          {dic?.cperPeople}
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className={`${styles.p_main_attractions} flex`}>
                          <span
                            className={`${styles.strong_main_attractions} mr-2`}
                            style={{ color: '#2A2146' }}
                          >
                            R$ {item?.price.toFixed(2).replace('.', ',')}
                          </span>{' '}
                          {dic?.cperPeople}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </a>
            );
          })}
        </Slider>
      </>
    );
  } else {
    return (
      <>
        <HomeCarrouselMainAttractionsSkeleton />
      </>
    );
  }
}



export default CarrouselMainAttractionsNew