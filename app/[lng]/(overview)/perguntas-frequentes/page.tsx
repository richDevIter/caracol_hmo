'use client'
import React, { useEffect, useState } from 'react';
import { Metadata } from 'next';

import Head from 'next/head';
import styles from './perguntas-frequentes.module.css';
import {
  IconCogs,
  IconHeadset,
  IconInfo,
  IconMail,
  IconPhone,
  IconWhatsapp,
} from '@/assets/icons';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getDictionary } from '@/dictionaries';


const CommonQuestions = () => {

  
  const searchParams = useParams();
  const [dic, setDic] = useState<any>(null);

  useEffect(() => {
      const fetchDictionary = async () => {
          const dictionary = await getDictionary(searchParams.lng as "pt" | "en" | "es", 'commonQuestions');
          setDic(dictionary);
      };
  
      fetchDictionary();
  
  }, [searchParams.lng])
  
  const handleAccordionToggle = (index: any) => {
    let accordionHidden: any = document.querySelector(`.visible-${index}`);
    let rotate: any = document.querySelector(`.indice-${index}`);
    let accordButton: any = document.querySelector(
      `.accordion-button-${index}`
    );

    if (accordionHidden?.classList.contains('hidden')) {
      accordionHidden?.classList.remove('hidden');
      rotate?.classList.replace('rotate-0', 'rotate-180');
      accordButton?.classList.add(`${styles.accordionButton}`);
    } else {
      accordionHidden?.classList.add('hidden');
      rotate?.classList.replace('rotate-180', 'rotate-0');
      accordButton?.classList.remove(`${styles.accordionButton}`);
    }
  };

  return (
    <>
      <Head>
        <title>
          Perguntas Frequentes - {process.env.NEXT_PUBLIC_SERVER_NAME}
        </title>
        <meta
          name="description"
          content="Reserve seus passeios nos melhores Destinos do Brasil na Destinow. Encontre as melhores atrações turísticas, passeios, excursões, tours e ingressos aqui."
        />
        <meta
          name="googlebot"
          content={process.env.NEXT_PUBLIC_SERVER_ROBOTS}
        />

        {/* Essential META Tags */}
        <meta
          property="og:title"
          content={`Perguntas Frequentes - ${process.env.NEXT_PUBLIC_SERVER_NAME}`}
        />
        <meta property="og:type" content="TravelAgency" />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_SERVER_URL}${process.env.NEXT_PUBLIC_SERVER_LOGO_SHARED}`}
        />
        <meta
          property="og:url"
          content={process.env.NEXT_PUBLIC_SERVER_URL}
        />

        {/* Non-Essential, But Recommended */}
        <meta
          property="og:site_name"
          content={process.env.NEXT_PUBLIC_SERVER_NAME}
        />

        {/* Non-Essential, But Required for Analytics */}
        {/* <meta property="fb:app_id" content="your_app_id" /> */}

        <meta name="robots" content={process.env.NEXT_PUBLIC_SERVER_ROBOTS} />
        <link rel="canonical" href={process.env.NEXT_PUBLIC_SERVER_URL_API} />
        <link rel="icon" href={process.env.NEXT_PUBLIC_SERVER_ICON} />
      </Head>
        <div className="container_content p-0">
          <h1 className={styles.title}>{dic?.title}</h1>
          <div className="flex gap-6 items-center columns-1 sm:columns-1">
            <div className="w-full px-4 mb-16">
              <div id="accordionExemple" className="accordion-FAQ">
                <div className="mb-6 rounded-xl  w-full border-2 border-neutral-200 bg-white">
                  <h2 className="mb-0 w-full border-b" id="headingOne">
                    <button
                      onClick={() => handleAccordionToggle(0)}
                      className={`group relative flex w-full items-center  py-4 px-5 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none accordion-button-0 `}
                      type="button"
                      data-te-collapse-init
                      data-te-target="#collapseOne"
                      aria-expanded="false"
                      aria-controls="collapseOne"
                    >
                      <div className="flex">
                        <div className={`flex items-center ${styles.primary}`}>
                          {IconInfo}
                        </div>
                        <div className="mx-4">
                          <h3 className={styles.accordionTitle}>
                            {dic?.info.informations}
                          </h3>
                          <p className={styles.accordionSubtitle}>
                            {dic?.info.whatsTheProblem}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`indice-0 ml-auto h-5 w-5 shrink-0 rotate-0 fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="h-6 w-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                          />
                        </svg>
                      </span>
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    className={`visible visible-0 hidden`}
                    data-te-collapse-item
                    data-te-collapse-show
                    aria-labelledby="headingOne"
                    data-te-parent="#accordionExample"
                  >
                    <div className="py-4 px-5">
                      <div className={`mb-16 mt-4`}>
                        <p className={styles.subtitle}>
                          {dic?.info.howIdentify}
                        </p>
                        <p className={styles.paragraph}>
                          {dic?.info.theGuide}
                          <br />
                          {dic?.info.theGuide2}
                        </p>
                      </div>

                      <div className={`mb-16 mt-4`}>
                        <p className={styles.subtitle}>
                          {dic?.info.howDoiKnow}
                        </p>
                        <p className={styles.paragraph}>
                          {dic?.info.youllFind}
                          <br />
                          {dic?.info.youllFind2}
                        </p>
                      </div>

                      <div className={`mb-16 mt-4`}>
                        <p className={styles.subtitle}>{dic?.info.whatTime}</p>
                        <p className={styles.paragraph}>
                          {dic?.info.boardingTime}
                          <br />
                          {dic?.info.boardingTime2}
                        </p>
                      </div>

                      <div className={`mb-16 mt-4`}>
                        <p className={styles.subtitle}>
                          {dic?.info.boardingVehicle}
                        </p>
                        <p className={styles.paragraph}>{dic?.info.callUs}</p>
                      </div>

                      <div className={`mb-16 mt-4`}>
                        <p className={styles.subtitle}>
                          {dic?.info.doINeedMyPassport}
                        </p>
                        <p className={styles.paragraph}>
                          {dic?.info.activityRules}
                        </p>
                      </div>

                      <div className={`mb-16 mt-4`}>
                        <p className={styles.subtitle}>
                          {dic?.info.whatShouldIUse}
                        </p>
                        <p className={styles.paragraph}>
                          {dic?.info.noRule} &#128522;.
                        </p>
                      </div>

                      <div className={`mb-16 mt-4`}>
                        <p className={styles.subtitle}>
                          {dic?.info.veganOptions}
                        </p>
                        <p className={styles.paragraph}>
                          {dic?.info.weRecommend}
                        </p>
                      </div>

                      <div className={`mb-16 mt-4`}>
                        <p className={styles.subtitle}>
                          {dic?.info.badWeather}
                        </p>
                        <p className={styles.paragraph}>
                          {dic?.info.cancelPolicy}
                        </p>
                      </div>

                      <div className={`mb-16 mt-4`}>
                        <p className={styles.subtitle}>
                          {dic?.info.timeInSpot}
                        </p>
                        <p className={styles.paragraph}>
                          {dic?.info.activityTime}
                        </p>
                      </div>

                      <div className={`mb-16 mt-4`}>
                        <p className={styles.subtitle}>
                          {dic?.info.returnTime}
                        </p>
                        <p className={styles.paragraph}>
                          {dic?.info.dropoffTime}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-6 rounded-xl  w-full border-2 border-neutral-200 bg-white">
                  <h2 className="mb-0 w-full  border-b" id="headingOne">
                    <button
                      onClick={() => handleAccordionToggle(1)}
                      className={`group relative flex w-full items-center  py-4 px-5 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none accordion-button-1`}
                      type="button"
                      data-te-collapse-init
                      data-te-target="#collapseTwo"
                      aria-expanded="true"
                      aria-controls="collapseTwo"
                    >
                      <div className="flex">
                        <div className={`flex items-center ${styles.primary}`}>
                          {IconCogs}
                        </div>
                        <div className="mx-4">
                          <h3 className={styles.accordionTitle}>
                            {dic?.booking.bookingManage}
                          </h3>
                          <p className={styles.accordionSubtitle}>
                            {dic?.booking.bookingManage2}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`indice-1 ml-auto h-5 w-5 shrink-0 rotate-0 fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="h-6 w-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                          />
                        </svg>
                      </span>
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    className={`visible visible-1 hidden`}
                    data-te-collapse-item
                    data-te-collapse-show
                    aria-labelledby="headingTwo"
                    data-te-parent="#accordionExample"
                  >
                    <div className="py-4 px-5">
                      <div className={`mb-16 mt-4`}>
                        <p className={styles.subtitle}>
                          {dic?.booking.howDoiDo}
                        </p>
                        <p className={styles.paragraph}>
                          {dic?.booking.verify}
                          <Link
                            className={`${styles.content_footer_p} ${styles.primary}`}
                            href="/minhas-atividades"
                          >
                            {dic?.booking.myActivities}
                          </Link>
                          .
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-6 rounded-xl  w-full border-2 border-neutral-200 bg-white">
                  <h2 className="mb-0 w-full  border-b" id="headingOne">
                    <button
                      onClick={() => handleAccordionToggle(2)}
                      className={`group relative flex w-full items-center  py-4 px-5 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none accordion-button-2`}
                      type="button"
                      data-te-collapse-init
                      data-te-target="#collapseThree"
                      aria-expanded="true"
                      aria-controls="collapseThree"
                    >
                      <div className="flex">
                        <div className={`flex items-center ${styles.primary}`}>
                          {IconHeadset}
                        </div>
                        <div className="mx-4">
                          <h3 className={styles.accordionTitle}>
                            {dic?.contact.contactUs}
                          </h3>
                          <p className={styles.accordionSubtitle}>
                            {dic?.contact.getInContact}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`indice-2 ml-auto h-5 w-5 shrink-0 rotate-0 fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="h-6 w-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                          />
                        </svg>
                      </span>
                    </button>
                  </h2>
                  <div
                    id="collapseThree"
                    className={`visible visible-2 hidden`}
                    data-te-collapse-item
                    data-te-collapse-show
                    aria-labelledby="headingThree"
                    data-te-parent="#accordionExample"
                  >
                    <div className="py-4 px-5">
                      <div className="columns-1 md:columns-3">
                        <div className="flex flex-col items-center">
                          <div className="mx-auto">{IconPhone}</div>
                          <h5 className="text-center mb-2 text-primary font-bold">
                            {process.env.NEXT_PUBLIC_INFO_PHONE}
                          </h5>
                          <div className={`btn w-fit ${styles.contactButton}`}>
                            <a href={`tel:+552138280670`}>
                              {dic?.contact.clickToCall}
                            </a>
                          </div>
                        </div>

                        <div className="flex flex-col items-center my-4 md:my-0">
                          <div className="">{IconWhatsapp("#034C43", "28px", "32px")}</div>
                          <h5 className="text-center mb-2 text-primary font-bold">
                            {process.env.NEXT_PUBLIC_INFO_WHATSAPP}
                          </h5>
                          <div className={`btn w-fit ${styles.contactButton}`}>
                            <Link
                              target="_blank"
                              href={`https://wa.me/552138280670?text=Olá%20gostaria%20em%20de%20mais%20informações`}
                            >
                              {dic?.contact.clickToTalk}
                            </Link>
                          </div>
                        </div>

                        <div className="flex flex-col items-center">
                          <div className="mx-auto">{IconMail}</div>
                          <h5 className="text-center mb-2 text-primary font-bold">
                            atendimento@destinow.com.br
                          </h5>
                          <div className={`btn w-fit ${styles.contactButton}`}>
                            <Link href="mailto:atendimento@destinow.com.br">
                              {dic?.contact.sendEmail}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default CommonQuestions;
