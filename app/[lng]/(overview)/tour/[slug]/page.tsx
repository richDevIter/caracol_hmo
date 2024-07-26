'use client'

import styles from './tour.module.css'
import { IconMap } from "@/assets/icons";
import TourPageRepository from "@/core/TourPageRepository";
import TourPageCollection from "@/core/TourPage";
import { Key, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductGallery from "@/components/ProductGallery/ProductGallery";
import useWindowSize from "@/data/hooks/useWindowSize";
import { getDictionary } from "@/dictionaries";
import useScrollTo from "@/data/hooks/useScrollTo";
import Modal from "@/components/base/Modal/Modal";
import ProductModalGallery from "@/components/ProductModalGallery/ProductModalGallery";
import HomeDestinowApp from '@/components/HomeDestinowApp/HomeDestinowApp';
import ProductOptions from '@/components/ProductOptions/ProductOptions';
import IdChannelRepository from '@/core/IdChannelRepository';
import { TourTicketSkeleton } from '../../ui/skeletons';
import IdChannelCollection from '@/core/IdChannel';
import { parseCookies, setCookie } from 'nookies';
import Head from 'next/head';
import Breadcrumb from '@/components/base/BreadCrumbs/BreadCrumbs';
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

  const repo: TourPageRepository = new TourPageCollection();
  const repoChannel: IdChannelRepository = new IdChannelCollection();

  const cookies = parseCookies();

  const [respTour, setRespTour] = useState<any>(null);
  const [loadBanner, setLoadBanner] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  const [errorMessage, setErrorMessage] = useState<any>(null);
  const [conectionError, setConectionError] = useState<boolean>(false);

  const [seeMore, setSeeMore] = useState<any>(false);
  const [showModal, setShowModal] = useState(false);
  const [messageCart, setMessageCart] = useState<any>(false);

  const scrollTo = useScrollTo;

  const size = useWindowSize();

  const searchParams = useParams();

  const lng: string = searchParams.lng === "pt" ? "BR" : searchParams.lng === "en" ? "EN" : searchParams.lng === "es" ? "ES" : 'BR';

  const [dic, setDic] = useState<any>(null);

  useEffect(() => {
    const fetchDictionary = async () => {
      const dictionary = await getDictionary(searchParams.lng as "pt" | "en" | "es", 'productTour');
      setDic(dictionary);
    };

    fetchDictionary();

  }, [searchParams.lng])

  const handleTours = (channel: number) => {
    repo.getTour(searchParams.slug as string, lng as string, channel).then((result) => {
      if (result instanceof Error) {
        const message = JSON.parse(result.message)
        setConectionError(true);
        //setErrorMessage(message?.errors.length > 0 ? message?.errors.length : ['Erro desconhecido - Entre em contato com o Suporte'])
      } else {
        if (respTour === null) {
          setLoading(false);
          setRespTour(result);
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
          handleTours(result.data);
        }
      });
    } else {
      handleTours(+cookies.idCanal);
    }
  }, [])

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

  let aux: any = [];

  let index;

  if (respTour !== null) {

    const urlProducts = {
      slugBR: respTour.slugBR,
      slugEN: respTour.slugEN,
      slugES: respTour.slugES,
    }

    for (let i = 0; i < respTour.modalities.length; i++) {
      aux.push((respTour.modalities[i].tarif.price) - (respTour.modalities[i].tarif.price * (respTour.modalities[i].tarif?.percDesc / 100)));
    }

    index = aux.indexOf(Math.min(...aux)); // Pega a posição do menor valor

    typeof window !== 'undefined' ? localStorage.setItem("productSlug", JSON.stringify(urlProducts)) : '';
  }

  const renderDiscountRules = () => {
    if (searchParams.lng === 'br') {
      return <DiscountRulesPT tourResponse={respTour} />
    } else if (searchParams.lng === 'en') {
      return <DiscountRulesEN tourResponse={respTour} />
    } else if (searchParams.lng === 'es') {
      return <DiscountRulesES tourResponse={respTour} />
    } else {
      return <DiscountRulesPT tourResponse={respTour} />
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
        {respTour !== null &&
          <>
            <Head>
              <title>
                {respTour.productName +
                  " | " +
                  process.env.NEXT_PUBLIC_SERVER_NAME}
              </title>
              <meta
                name="description"
                content={respTour?.productInfo?.replace(/<[^>]*>?/gm, "")}
              />
              <link rel='icon' href='/favicon.ico' />
            </Head>
            <>
              <div className='container_content'>
                <>
                  {/* <Breadcrumb tourResponse={respTour} /> */}

                  <div className={styles.tour_title_span}>
                    <div className='flex'>
                      {IconMap}
                      <span className='ml-2'>{respTour?.eventLocation?.split(",")[0]}</span>
                    </div>

                    <h1 className={styles.tour_title_h1}>
                      {
                        searchParams.lng === "pt" ?
                          respTour.productNameBR
                          :
                          searchParams.lng === "en" ?
                            respTour.productNameEN
                            :
                            searchParams.lng === "es" ?
                              respTour.productNameES
                              :
                              respTour.productNameBR
                      }</h1>
                  </div>

                  <ProductGallery tourResponse={respTour} setShowModal={setShowModal} />

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
                                    respTour?.productDescription?.split(
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
                                __html: respTour.productDescription,
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
                            __html: respTour.productInfo,
                          }}
                        ></div>
                      </div>

                      {/* <div id="session-highlights" className={styles.tour_experience}>
                        <h3>{dic?.tour.highlights}</h3>
                        <ul className="tour-list-experience">
                          {respTour.highlights?.map(
                            (high: any, index: Key) => {
                              return <li key={index}>{high}</li>;
                            }
                          )}
                        </ul>
                      </div> */}

                      <div id="product_options" className={`${styles.tour_experience} flex flex-col gap-8`} >
                        <ProductOptions
                          optionTour={respTour.modalities}
                          tourResponse={respTour}
                          setMessageCart={setMessageCart}
                          isTicket={true}
                        //setShowModal={setShowModal}
                        />
                      </div>

                      <Accordion
                        title={dic?.tour?.discountRules}
                        style={styles.accordion}
                        startClosed
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
                        startClosed
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
                        startClosed
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

                        {respTour?.modalities[index].allTarif[0].percDesc !== 0 ? (
                          <>
                            <h5>

                              {dic?.tour.pricePerAdult2}
                            </h5>
                            <p className={`${styles.tour_text_price} `}>
                              <span className="text-price mb-3 w-100 text-center">
                                {dic?.tour.of}{' '}R${" "}
                                <b className="fs-3 text-decoration-line-through text-center">
                                  {respTour?.modalities[index].allTarif[0].price.toFixed(2).replace(".", ",")}
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
                              {respTour.idSellingType === '1' ? dic?.tour?.pricePerGroup : dic?.tour?.pricePerAdult}
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
                  <ProductModalGallery ticketResponse={respTour} />
                </div>
              </Modal>

            </>
          </>
        }
      </>
    )
  }
}
