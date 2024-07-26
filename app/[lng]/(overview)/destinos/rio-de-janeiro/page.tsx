'use client'
import React, { useEffect, useState } from 'react';
import { setCookie } from 'nookies';


import Head from 'next/head';
import BannerDestine from '@/components/DestineComps/DestineBanner/BannerDestine';
import DestineMainTours from '@/components/DestineComps/DestineMainTours/DestineMainTours';
import DestineKnowCity from '@/components/DestineComps/DestineKnowCity/DestineKnowCity';
import DestinePopularTour from '@/components/DestineComps/DestinePopularTour/DestinePopularTour';
import DestineWhatToDo from '@/components/DestineComps/DestineWhatToDo/DestineWhatToDo';
import DestineNext from '@/components/DestineComps/DestineNext/DestineNext';
import DestineSecurityRio from '@/components/DestineComps/DestineSecurityRio/DestineSecurityRio';
import HomeDestinowApp from '@/components/HomeDestinowApp/HomeDestinowApp';

import iconFourty from "../../../../../assets/img/destinos/rio-de-janeiro/fourty.svg";
import iconChair from "../../../../../assets/img/destinos/rio-de-janeiro/chair.svg";

import ImgDestineDesktop from "../../../../../assets/img/destinos/rio-de-janeiro/destino_rio.png";
import ImgDestineMobile from "../../../../../assets/img/destinos/rio-de-janeiro/destino_rio_mobile.png";

import cristoRedentor from "../../../../../assets/img/destinos/rio-de-janeiro/ponto_turistico01.png";
import paoDeAcucar from "../../../../../assets/img/destinos/rio-de-janeiro/ponto_turistico02.png";
import boulevardOlimpico from "../../../../../assets/img/destinos/rio-de-janeiro/ponto_turistico03.jpg";
import parqueDaTijuca from "../../../../../assets/img/destinos/rio-de-janeiro/ponto_turistico04.webp";
import jardimBotanico from "../../../../../assets/img/destinos/rio-de-janeiro/ponto_turistico05.webp";
import escadariaSelaron from "../../../../../assets/img/destinos/rio-de-janeiro/ponto_turistico06.webp";

import nxtDest01 from "../../../../../assets/img/destinos/rio-de-janeiro/buzios.webp";
import nxtDest02 from "../../../../../assets/img/destinos/rio-de-janeiro/arraial.webp";
import nxtDest03 from "../../../../../assets/img/destinos/rio-de-janeiro/angra.webp";
import { useRouter, useParams } from 'next/navigation';
import { DestinosSkeleton } from '../../ui/skeletons';



const DestinationRio = () => {
  
  const router = useRouter();

  const searchParams = useParams();

    const lng: string = searchParams.lng === "pt" ? "BR" : searchParams.lng === "en" ? "EN" : searchParams.lng === "es" ? "ES" : 'BR';

  const [loading, setLoading] = useState<boolean>(true)
  const [resProduct, setResProduct] = useState<any>(null);


  //BannerDestine
  const bannerDestine = {
    mainAttractionsStr: "Principais Atividades em",
    city: "Rio de Janeiro",
    subTitle: "Conheça o melhor do Rio e explore os pontos turísticos mais conhecidos da Cidade Maravilhosa.",
    ImgDestineDesktop: ImgDestineDesktop,
    ImgDestineMobile: ImgDestineMobile,
  };
  //BannerDestine

  //MainTours
  const mainTours = [
    {
      title: "Clássicos da Cidade Maravilhosa",
      subtitle:
        "Passeios imperdíveis no Rio de Janeiro com Pão de Açúcar e Cristo Redentor",
      category: "CAT-GM45333",
    },
    {
      title: "Vida Noturna carioca",
      subtitle:
        "Explore o Rio de Janeiro em uma noite inesquecível com muita música!",
      category: "CAT-ZO40084",
    },
    {
      title: "O Rio por outro ângulo",
      subtitle:
        "Se encante com as vistas únicas em passeios que sobrevoam o Rio de Janeiro e desbravam o mar carioca",
      category: "CAT-WB74238",
    },
    {
      title: "Rio Histórico e Cultural",
      subtitle:
        "Viva intensamente o Rio de Janeiro conhecendo cantinhos cheios de história e cultura",
      category: "CAT-JZ80456",
    },
  ];
  //MainTours

  //KnowTheCity
  const KnowTheRio = {
    summary: [
      "Conhecida também como Cidade Maravilhosa",
      "Te conquista de todas as formas. Com praias paradisíacas, noites badaladas, espaços culturais, cenários apaixonantes e muita diversidade. O Rio te acolhe e mostra porque é um Paraiso Tropical.",
      "Com vida diurna e noturna farta, não vão faltar experiências incríveis.",
    ],
    firstCard: [
      "Rio 40° graus",
      "No Rio todo dia é sol, alegria e muita diversão. Nunca irão faltar experiências.",
      iconFourty,
    ],
    secondCard: [
      "Paraíso Tropical",
      "São inúmeras opções de praias e atrações em meio a natureza para você.",
      iconChair,
    ],
  };

  //KnowTheCity

  // PopularTour
  const popular: any = [
    "CAT-SI47929",
    "CAT-CM00227",
    "CAT-EF64766",
    "CAT-LT27777",
    "CAT-IG43812",
    "CAT-AP94239",
    "CAT-SN93890",
    "CAT-UJ10416",
    "CAT-UJ10416",
    "CAT-UG16878",
    "CAT-KZ57561",
  ];

  useEffect(() => {
    setCookie(null, 'POPULAR_CAT', popular, {
      maxAge: 86400 * 7,
      path: '/'
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function getProducts() {
        try {

            const data = {
                categoryCode: whatInRio?.category,
                lang: lng,
                channel: 3,
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
                setResProduct(catResp.data);
                setLoading(false);
            }
        } catch (error) { }
    }

    getProducts()

    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [lng]);

  function AddInfo() {
    router.push("/categorias/populares");
  }

  const popularTours = {
    summary: [
      'Os pontos turísticos mais populares de Rio de Janeiro',
      'Conheça as principais atrações',
    ],
    tours: [
      {
        name: 'Cristo Redentor',
        summary:
          'É o principal cartão-postal do Rio de Janeiro, localizado no alto do Morro do Corcovado',
        category: '/categorias/CAT-SI47929',
        image: cristoRedentor,
      },
      {
        name: 'Pão de Açúcar',
        summary:
          'É o primeiro teleférico do Brasil e palco para um dos mais bonitos pores do sol do mundo',
        category: '/categorias/CAT-CM00227',
        image: paoDeAcucar,
      },
      {
        name: 'Boulevard Olímpico',
        summary:
          'É o grande legado carioca das Olímpiadas 2016, o novo Porto Maravilha',
        category: '/categorias/CAT-EF64766',
        image: boulevardOlimpico,
      },
      {
        name: 'Parque Nacional da Tijuca',
        summary: 'É responsável por preservar a maior floresta urbana do mundo',
        category: '/categorias/CAT-LT27777',
        image: parqueDaTijuca,
      },
      {
        name: 'Jardim Botânico',
        summary:
          'É considerado um dos jardins mais ricos e importantes do mundo',
        category: '/categorias/CAT-IG43812',
        image: jardimBotanico,
      },
      {
        name: 'Escadaria Selarón',
        summary:
          'Os degraus mais coloridos da cidade, localizados entre os boêmios bairros Santa Teresa e Lapa',
        category: '/categorias/CAT-AP94239',
        image: escadariaSelaron,
      },
    ],
    redirection: AddInfo,
  };

  // PopularTour

  // WhatToDo
  const whatInRio = {
    summary: {
      title: "O que fazer em Rio de Janeiro?",
      subtitle:
        "Com enorme diversidade de passeios para você conhecer, a cidade é abraçada pela natureza, pela agitação da vida boêmia e tem grande veia histórica e cultural. Perfeita para todos os viajantes.",
      redirect: "/atividades/rio-de-janeiro",
      meet: "Conheça os principais tours",
    },
    city: "Rio de Janeiro",
    category: ["CAT-ZT60510"],
  };
  // WhatToDo

  //NextDestination
  const nextDestination = {
    summary: {
      title: "Destinos paradisíacos imperdíveis próximos de Rio de Janeiro",
      subtitle:
        "Localizados a poucas horas da capital carioca, o litoral do Rio de Janeiro oferece paisagens deslumbrantes, mergulhos refrescantes e experiências inesquecíveis. Você irá se surpreender com as montanhas sinuosas que abraçam o mar de águas cristalinas. Destinos perfeitos para um bate e volta desde o Rio de Janeiro, você não pode deixar de incluir Arraial do Cabo, Búzios e Angra dos Reis no seu roteiro.",
    },
    slider: [
      {
        city: "Búzios",
        sliderSummary:
          "Península conhecida por suas praias e ruas de bares e restaurantes sofisticados que tornam o local um dos balneários mais charmosos do país",
        image: nxtDest01,
        category: "/categorias/CAT-TX74139",
      },
      {
        city: "Arraial",
        sliderSummary:
          "Destino litorâneo conhecido como o “Caribe Brasileiro” pelo seu mar cristalino em tons de azul",
        image: nxtDest02,
        category: "/categorias/CAT-YK34743",
      },
      {
        city: "Angra dos Reis",
        sliderSummary:
          "Cidade famosa por suas mais de 300 ilhas paradisíacas, vegetação abundante e mar verde-esmeralda",
        image: nxtDest03,
        category: "/categorias/CAT-AS27534",
      },
    ],
  };
  //NextDestination

  if (loading === true) {
    return(
      <DestinosSkeleton />
      )
  } else {
  return (
    <>
      <Head>
        <title>Rio de Janeiro - {process.env.NEXT_PUBLIC_SERVER_NAME}</title>
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
          content={`Rio de Janeiro - ${process.env.NEXT_PUBLIC_SERVER_NAME}`}
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
      <>
        <BannerDestine info={bannerDestine} />
        <DestineMainTours info={mainTours} />
        <DestineKnowCity info={KnowTheRio} />
        <DestinePopularTour info={popularTours} />
        <DestineWhatToDo setLoading={setLoading} resProduct={resProduct} info={whatInRio} />
        <DestineNext info={nextDestination} />
        <DestineSecurityRio />
        <HomeDestinowApp />
      </>
    </>
  )
}
}

export default DestinationRio;