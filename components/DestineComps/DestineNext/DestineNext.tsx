import React, { useState, useEffect } from 'react';

import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import styles from './DestineNext.module.css';
import Link from 'next/link';
import useWindowSize from '@/data/hooks/useWindowSize';

export interface propNextDestination {
  info?: any;
}

const DestineNext: React.FC<propNextDestination> = ({ info }) => {
  const [nextDestination, setNextDestination] = useState<any>(null);
  const [slider, setSlider] = useState<any>(null);

  const size = useWindowSize();

  setTimeout(() => {
    setNextDestination(true);
  }, 1000);

  const settings = {
    className: 'center',
    dots: false,
    arrows: true,
    centerMode: true,
    infinite: true,
    centerPadding: '0px',
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 500,
  };

  useEffect(() => {
    const aux = [];
    for (let i = 0; i <= 1; i++) {
      aux.push(info.slider);
    }
    setSlider(aux.flat());
  }, [info]);

  if (size.width > 767) {
    if (info.slider.lenght !== 0 && nextDestination !== null) {
      return (
        <>
          <div className={`${styles.bg_next_destine} global_bg_next_destine`}>
            <div className="container_content h-full">
              <div className="flex">
                <div className={`${styles.col_span_4_custom}`}>
                  <div className={`${styles.popular_tour}`}>
                    <div>
                      <h3>{info.summary.title}</h3>
                      <p>{info.summary.subtitle}</p>
                      {/* <div className="btn-attaction">
                                                <button className="btn btn-outline-primary">
                                                    Conheça as principais atrações
                                                </button>
                                            </div> */}
                    </div>
                  </div>
                </div>
                <div className={`${styles.col_span_8_custom} pl-12`}>
                  <div>
                    <Slider {...settings}>
                      {slider.map((obj: any) => {
                        return (
                          <>
                            <div
                              className={`${styles.img_turistico} img-turistico`}
                              style={{
                                backgroundImage: `url(${obj.image.src})`,
                              }}
                            >
                              <div className="text-turistico">
                                {/* <small>Atividades</small> */}
                                <h5>{obj.city}</h5>
                                <p>{obj.sliderSummary}</p>
                                <div className="link-turistico">
                                  <Link href={obj.category}>
                                    Ver atividades
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      })}
                    </Slider>
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
          <div className={`${styles.bg_next_destine} global_bg_next_destine`}>
            <div className="container-content h-full">
              <div className="grid grid-cols-12">
                <div className="cols-span-12 md:col-span-4">
                  <div className={`${styles.popular_tour}`}>
                    <div>
                      <h3>{info.summary.title}</h3>
                      <p>{info.summary.subtitle}</p>
                      <div className="btn-attaction">
                        <button className="btn btn-outline-primary">
                          Conheça as principais atrações
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-8">
                  <div>
                    <Slider {...settings}>
                      <div>
                        <div
                          className="img-turistico animated-background"
                          style={{ width: '100%' }}
                        ></div>
                      </div>
                      <div>
                        <div
                          className="img-turistico animated-background"
                          style={{ width: '100%' }}
                        ></div>
                      </div>
                      <div>
                        <div
                          className="img-turistico animated-background"
                          style={{ width: '100%' }}
                        ></div>
                      </div>
                      <div>
                        <div
                          className="img-turistico animated-background"
                          style={{ width: '100%' }}
                        ></div>
                      </div>
                      <div>
                        <div
                          className="img-turistico animated-background"
                          style={{ width: '100%' }}
                        ></div>
                      </div>
                      <div>
                        <div
                          className="img-turistico  animated-background"
                          style={{ width: '100%' }}
                        ></div>
                      </div>
                    </Slider>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }
  } else {
    return (
      <>
        <div className={`${styles.bg_next_destine} global_bg_next_destine`}>
          <div className="container_content h-full">
            <div className="col-span-12">
              <div className={`${styles.popular_tour} pb-3`}>
                <div>
                  <h3>{info.summary.title}</h3>
                  <p>{info.summary.subtitle}</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-12">
              <div className="col-span-12">
                <div>
                  <Slider {...settings}>
                    {slider?.map((obj: any) => {
                      return (
                        <>
                          <div
                            className={`${styles.img_turistico} img-turistico`}
                            style={{ backgroundImage: `url(${obj.image.src})` }}
                          >
                            <div className="text-turistico">
                              {/* <small>Atividades</small> */}
                              <h5>{obj.city}</h5>
                              <p>
                                <span className="text-wrap-custom">
                                  {obj.sliderSummary}
                                </span>
                              </p>
                              <div className="link-turistico">
                                <Link href={obj.category}>Ver atividades</Link>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </Slider>
                </div>
              </div>
              {/* <Col>
                                <div className='popular-tour w-100 d-flex justify-content-center'>
                                    <div>
                                        <div className="btn-attaction">
                                            <button className="btn btn-outline-primary">
                                                Conheça as principais atrações
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Col> */}
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default DestineNext;
