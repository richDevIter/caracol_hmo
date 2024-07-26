'use client'
import Head from 'next/head'
import React, { Key, useEffect, useState } from 'react'


import Breadcrumb from '@/components/base/BreadCrumbs/BreadCrumbs';

import { IconMap } from '@/assets/icons';

import styles from './ticket.module.css'
import HomeDestinowApp from '@/components/HomeDestinowApp/HomeDestinowApp';
import Modal from '@/components/base/Modal/Modal';
import ProductOptionsTicket from '@/components/ProductOptions/ProductOptionsTicket';

import TagManager from "react-gtm-module";
import ProductGalleryTicket from '@/components/ProductGallery/ProductGalleryTicket';
import ProductModalGalleryTicket from '@/components/ProductModalGallery/ProductModalGalleryTicket';
import useWindowSize from '@/data/hooks/useWindowSize';
import useScrollTo from '@/data/hooks/useScrollTo';
import { useParams } from 'next/navigation';
import { getDictionary } from '@/dictionaries';

import TicketPageRepository from '@/core/TicketPageRepository';
import TicketPageCollection from '@/core/TicketPage';
import IdChannelRepository from '@/core/IdChannelRepository';
import IdChannelCollection from '@/core/IdChannel';
import { parseCookies, setCookie } from 'nookies';
import { TourTicketSkeleton } from '../../ui/skeletons';
import Accordion from '@/components/base/Accordion/Accordion';

import DiscountRulesPT from '@/components/DiscountRules/DiscountRulesPT';
import DiscountRulesEN from '@/components/DiscountRules/DiscountRulesEN';
import DiscountRulesES from '@/components/DiscountRules/DiscountRulesES';
import HowToGetPt from '@/components/HowToGet/HowToGetPt';
import HowToGetEN from '@/components/HowToGet/HowToGetEN';
import HowToGetES from '@/components/HowToGet/HowToGetES';
import AccessRulesPT from '@/components/AccessRules/AccessRulesPT';
import AccessRulesEN from '@/components/AccessRules/AccessRulesEN';
import AccessRulesES from '@/components/AccessRules/AccessRulesES';


export default function Page() {

  const repo: TicketPageRepository = new TicketPageCollection();
  const repoChannel: IdChannelRepository = new IdChannelCollection();

  const cookies = parseCookies();

  const size = useWindowSize();
  const scrollTo = useScrollTo;

  const searchParams = useParams();

  const lng = searchParams.lng === "pt" ? "BR" : searchParams.lng === "en" ? "EN" : searchParams.lng === "es" ? "ES" : "BR";

  const [dic, setDic] = useState<any>(null);

  useEffect(() => {
    const fetchDictionary = async () => {
      const dictionary = await getDictionary(searchParams.lng as "pt" | "en" | "es", 'productTour');
      setDic(dictionary);
    };
    fetchDictionary();
  }, [searchParams.lng])

  const [seeMore, setSeeMore] = useState<any>(false);
  const [messageCart, setMessageCart] = useState<any>(false);

  const [showModal, setShowModal] = React.useState(false);
  const [respTicket, setRespTicket] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [errorMessage, setErrorMessage] = useState<any>(null);
  const [conectionError, setConectionError] = useState<boolean>(false);


  const handleTicket = (channel: number) => {
    repo.getTicket(searchParams.slug as string, lng as string, channel as number).then((result) => {
      if (result instanceof Error) {
        const message = JSON.parse(result.message)
        setConectionError(true);
        //setErrorMessage(message?.errors.length > 0 ? message?.errors.length : ['Erro desconhecido - Entre em contato com o Suporte'])
      } else {
        if (respTicket === null) {
          setRespTicket(result);
          setLoading(false);
        }
      }
    });
  }

  useEffect(() => {
    if (!cookies.idCanal) {
      repoChannel.getFiltered('site').then((result: any) => {
        if (result instanceof Error) {
          const message = JSON.parse(result.message)
          //setConectionError(true);
          //setErrorMessage(message?.errors.length > 0 ? message?.errors.length : ['Erro desconhecido - Entre em contato com o Suporte'])
        } else {
          setCookie(null, 'idCanal', result.data, {
            maxAge: (60 * 10), //expira em 10 minutos (60 * 10)
            path: '/',
          });
          handleTicket(result.data);
        }
      });
    } else {
      handleTicket(+cookies.idCanal);
    }
  }, []);

  const createMenuProduct = () => {
    return (
      <>
        {size.width > 767 ? (
          <div className={styles.tour_menu}>
            <div>
              <div
                className='cursor-pointer'
                onClick={() => scrollTo("session-info")}
              >
                {dic?.tour.summary}
              </div>
            </div>
            <div>
              <div
                className='cursor-pointer'
                onClick={() => scrollTo("session-highlights")}
              >
                {dic?.tour.highlights}
              </div>
            </div>
            <div>
              <div
                className='cursor-pointer'
                onClick={() => scrollTo("session-details")}
              >
                {dic?.tour.details}
              </div>
            </div>

          </div>
        )
          :
          <>
          </>
        }
      </>
    )

  }

  function handleDescription() {
    if (seeMore === false) {
      setSeeMore(true);
    } else {
      setSeeMore(false);
    }
  }

  const trigerViewItem = (product: any) => {
    TagManager.dataLayer({
      dataLayer: {
        event: "view_item",
        currency: "BRL",
        value: product.modalities[0].tarif.price,
        items: [
          {
            item_name: product.productName,
            item_id: product.productCode,
            price: product.modalities[0].tarif.price,
            affiliation: "Parque Caracol",
            item_brand: "Parque Caracol",
            category: "Ticket",
            currency: "BRL",
          },
        ],
      },
    });
  };

  useEffect(() => {
    if (respTicket !== null) {
      trigerViewItem(respTicket);
    }
  }, [respTicket])

  let aux: any = [];

  let index;

  if (respTicket !== null) {

    const urlProducts = {
      slugBR: respTicket.slugBR,
      slugEN: respTicket.slugEN,
      slugES: respTicket.slugES,
    }

    for (let i = 0; i < respTicket.modalities?.length; i++) {
      aux.push((respTicket.modalities[i].tarif.price) - (respTicket.modalities[i].tarif.price * (respTicket.modalities[i].tarif?.percDesc / 100)));
    }

    typeof window !== 'undefined' ? localStorage.setItem("productSlug", JSON.stringify(urlProducts)) : '';

    index = aux.indexOf(Math.min(...aux)); // Pega a posição do menor valor
  }

  const renderDiscountRules = () => {
    if (searchParams.lng === 'br') {
      return <DiscountRulesPT tourResponse={respTicket} />
    } else if (searchParams.lng === 'en') {
      return <DiscountRulesEN tourResponse={respTicket} />
    } else if (searchParams.lng === 'es') {
      return <DiscountRulesES tourResponse={respTicket} />
    } else {
      return <DiscountRulesPT tourResponse={respTicket} />
    }
  }

  const renderHowToGet = () => {
    if (searchParams.lng === 'br') {
      return <HowToGetPt />
    } else if (searchParams.lng === 'en') {
      return <HowToGetEN />
    } else if (searchParams.lng === 'es') {
      return <HowToGetES />
    } else {
      return <HowToGetPt />
    }
  }

  const renderAccessRules = () => {
    if (searchParams.lng === 'br') {
      return <AccessRulesPT />
    } else if (searchParams.lng === 'en') {
      return <AccessRulesEN />
    } else if (searchParams.lng === 'es') {
      return <AccessRulesES />
    } else {
      return <AccessRulesPT />
    }
  }

  if (loading === true) {
    return (
      <TourTicketSkeleton />
    )
  } else {
    return (
      <>
        {respTicket !== null &&
          <>
            <Head>
              <title>
                {respTicket.productName +
                  " | " +
                  process.env.NEXT_PUBLIC_SERVER_NAME}
              </title>
              <meta
                name="description"
                content={respTicket?.productInfo?.replace(/<[^>]*>?/gm, "")}
              />
              <link rel='icon' href='/favicon.ico' />
            </Head>
            <>
              <div className='container_content'>
                <>
                  {/* <Breadcrumb tourResponse={respTicket} /> */}

                  <div className={styles.tour_title_span}>
                    <div className='flex mt-4'>
                      {IconMap}
                      <span className='ml-2'>{respTicket?.eventLocation?.split(",")[0]}</span>
                    </div>

                    <h1 className={styles.tour_title_h1}>
                      {
                        searchParams.lng === "pt" ?
                          respTicket.productNameBR
                          :
                          searchParams.lng === "en" ?
                            respTicket.productNameEN
                            :
                            searchParams.lng === "es" ?
                              respTicket.productNameES
                              :
                              respTicket.productNameBR
                      }</h1>
                  </div>

                  <ProductGalleryTicket tourResponse={respTicket} setShowModal={setShowModal} />

                  {createMenuProduct()}

                  <div className="grid grid-cols-12 row_controll">
                    {/*  Col 8 */}
                    <div className="col-span-12 md:col-span-8 overflow-hidden mx-3" >
                      {/* Content */}
                      <div id="session-about-us" className={`${styles.tour_about_us} mb-5`}> {/* A experiência */}
                        <h3>{dic?.tour.theExp}</h3>
                        <div className="tour-text-about">
                          {seeMore === false ? (
                            <>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html:
                                    respTicket?.productDescription?.split(
                                      "</p>"
                                    )[0],
                                }}
                              ></div>
                              <span>...</span>
                              <br />
                            </>
                          ) : (
                            <div
                              dangerouslySetInnerHTML={{
                                __html: respTicket.productDescription,
                              }}
                            ></div>
                          )}
                          <button
                            className={`${styles.tour_btn_see_more} pt-2`}
                            onClick={handleDescription}
                          >
                            {seeMore === false ? (
                              <>{dic?.tour.readMore}</>
                            ) : (
                              `${dic?.tour.collapse}`
                            )}
                          </button>
                        </div>
                      </div>

                      <div id="session-info" className={styles.tour_experience}> {/* resumo */}
                        <h3>{dic?.tour.otherInformation}</h3>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: respTicket.productInfo,
                          }}
                        ></div>
                      </div>

                      {/* <div id="session-highlights" className={styles.tour_experience}>
                        <h3>{dic?.tour.highlights}</h3>
                        <ul className="tour-list-experience">
                          {respTicket.highlights?.map(
                            (high: any, index: Key) => {
                              return <li key={index}>{high}</li>;
                            }
                          )}
                        </ul>
                      </div> */}

                      <div id="product_options" className={`${styles.tour_experience} flex flex-col gap-8`} >
                        <ProductOptionsTicket
                          optionTour={respTicket.modalities}
                          tourResponse={respTicket}
                          setMessageCart={setMessageCart}
                          isTicket={true}
                        //setShowModal={setShowModal}
                        />
                      </div>

                      <Accordion
                        title={dic?.tour?.discountRules}
                        style={styles.accordion}
                        startClosed={true}
                        styleChildren={
                          {
                            width: '100%',
                            borderRadius: 'calc(.65rem - 1px)',
                            backgroundColor: 'transparent',
                            color: 'var(--primary)',
                            cursor: 'pointer',
                            textTransform: 'uppercase',
                            fontSize: '1.5rem',
                          }
                        }
                        classIcon={styles.bg_ri_accordion}
                      >
                        {renderDiscountRules()}
                      </Accordion>

                      <Accordion
                        title={dic?.tour?.howToGet}
                        style={styles.accordion}
                        startClosed={false}
                        styleChildren={
                          {
                            width: '100%',
                            borderRadius: 'calc(.65rem - 1px)',
                            backgroundColor: 'transparent',
                            color: 'var(--primary)',
                            cursor: 'pointer',
                            textTransform: 'uppercase',
                            fontSize: '1.5rem',
                          }
                        }
                        classIcon={styles.bg_ri_accordion}
                      >
                        {renderHowToGet()}

                        <div className="embed-responsive embed-responsive-16by9 h-100 w-100">
                          <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3478.9900151897073!2d-50.85569252499975!3d-29.311968547697074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x951ecd5b1eff3555%3A0x8f7d9481de645462!2sParque%20do%20Caracol!5e0!3m2!1spt-BR!2sbr!4v1672078196497!5m2!1spt-BR!2sbr"
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            title="how to get"
                            allow="autoplay; fullscreen; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </div>
                      </Accordion>

                      <Accordion
                        title={dic?.tour?.accessRules}
                        style={styles.accordion}
                        startClosed={false}
                        styleChildren={
                          {
                            width: '100%',
                            borderRadius: 'calc(.65rem - 1px)',
                            backgroundColor: 'transparent',
                            color: 'var(--primary)',
                            cursor: 'pointer',
                            textTransform: 'uppercase',
                            fontSize: '1.5rem',
                          }
                        }
                        classIcon={styles.bg_ri_accordion}
                      >
                        {renderAccessRules()}
                      </Accordion>
                      {/* END:Content */}

                    </div>

                    {/*  Col 4 */}
                    <div className='col-span-12 md:col-span-4 px-3 order-first md:order-last'>
                      <div className={`${styles.tour_side_card} `}>

                        {respTicket?.modalities[index].allTarif[0].percDesc !== 0 ? (
                          <>
                            <h5>

                              {dic?.tour.pricePerAdult2}
                            </h5>
                            <p className={`${styles.tour_text_price} `}>
                              <span className="text-price mb-3 w-100 text-center">
                                {dic?.tour.of}{' '}R${" "}
                                <b className="fs-3 text-decoration-line-through text-center">
                                  {respTicket?.modalities[index].allTarif[0].price.toFixed(2).replace(".", ",")}
                                </b>
                              </span>
                            </p>
                            <p className={`${styles.tour_side_price} `}>
                              <small>{dic?.tour.for}</small>{" "}
                            </p>
                          </>
                        ) : (
                          <>
                            <p className="text-price mb-3 w-100 fs-4 text-center">
                              {respTicket.idSellingType === '1' ? dic?.tour?.pricePerGroup : dic?.tour?.pricePerAdult}
                            </p>
                          </>
                        )}

                        <p className={`${styles.tour_side_price} mt-3 text-center`}>
                          R$
                          <b>
                            {Math.min(...aux)
                              .toFixed(2)
                              .replace(".", ",")}
                          </b>
                        </p>

                        <button className={`${styles.tour_side_btn_price} btn btn-primary mt-4`} onClick={() => scrollTo("product_options")}>
                          {dic?.tour.buyTickets}
                        </button>

                      </div>


                    </div>

                  </div>

                </>
              </div>

              <Modal
                setShowModal={setShowModal}
                showModal={showModal}
                btnClose={true}
              >
                <div className={`modal-gallery`}>
                  <ProductModalGalleryTicket ticketResponse={respTicket} />
                </div>
              </Modal>

            </>
          </>
        }
      </>

    )
  }
}
