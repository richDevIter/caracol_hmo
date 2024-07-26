'use client'
import React from 'react';

import BannerDestine from '@/components/DestineComps/DestineBanner/BannerDestine';
import DestineMainTours from '@/components/DestineComps/DestineMainTours/DestineMainTours';
import DestineKnowCity from '@/components/DestineComps/DestineKnowCity/DestineKnowCity';
import DestinePopularTour from '@/components/DestineComps/DestinePopularTour/DestinePopularTour';
import DestineWhatToDo from '@/components/DestineComps/DestineWhatToDo/DestineWhatToDo';
import DestineNext from '@/components/DestineComps/DestineNext/DestineNext';
import HomeDestinowApp from '@/components/HomeDestinowApp/HomeDestinowApp';
import Head from 'next/head';

import IconCantinho from '@/assets/img/destinos/gramado/Destinow_-_Cantinho_europeu_no_Brasil.svg';
import IconSerra from '@/assets/img/destinos/gramado/Destinow_-_Serra_Gaúcha.svg';

import ImgDestineDesktop from '@/assets/img/destinos/gramado/mini-mundo-desktop.webp';
import ImgDestineMobile from '@/assets/img/destinos/gramado/mini-mundo-mobile.webp';

import MuseuDeCera from '@/assets/img/destinos/gramado/Museu-de-cera.webp';
import HarleyMotorShow from '@/assets/img/destinos/gramado/Harley-Motor-Show.webp';
import ValeDosVinhedos from '@/assets/img/destinos/gramado/vale-dos-vinhedos.webp';
import ChurrascoGaucho from '@/assets/img/destinos/gramado/churrasco-gaucho.webp';
import CervejariaArtesanal from '@/assets/img/destinos/gramado/cervejaria-artesanal-bus-bier.webp';
import ParqueOlivas from '@/assets/img/destinos/gramado/parque-olivas.webp';
import MariaFumaca from '@/assets/img/destinos/gramado/passeio-maria-fumaca.webp';
import Canela from '@/assets/img/destinos/gramado/canela.webp';
import BentoGoncalves from '@/assets/img/destinos/gramado/bento_goncalves.webp';
import Cambara from '@/assets/img/destinos/gramado/Cambara-do-Sul.webp';
import NovaPetropolis from '@/assets/img/destinos/gramado/Nova-Petrópolis.webp';
import { useRouter } from 'next/navigation';


const DestinationGramado = () => {
  const router = useRouter();

  //BannerDestine
  const bannerDestine = {
    mainAttractionsStr: 'Principais Atividades em',
    city: 'Gramado',
    subTitle:
      'Conheça o melhor de Gramado e arredores e explore os encantos da Serra Gaúcha.',
    ImgDestineDesktop: ImgDestineDesktop,
    ImgDestineMobile: ImgDestineMobile,
  };
  //BannerDestine

  //MainTours
  const mainTours = [
    {
      title: 'Enoturismo | Vinícolas',
      subtitle:
        'Deguste os saborosos vinhos gaúchos, região de maior produção do país.',
      category: 'CAT-SC92130',
    },
    {
      title: 'Gastronomia Gaúcha',
      subtitle: 'Explore a famosa culinária de Gramado com bastante música.',
      category: 'CAT-NE69699',
    },
    {
      title: 'Cidades vizinhas',
      subtitle:
        'Viva intensamente Gramado e seus arredores conhecendo cantinhos cheios de história, cultura e aventura!',
      category: 'CAT-HG46737',
    },
    {
      title: 'Gramado Histórico e Cultural',
      subtitle:
        'Se surpreenda com as histórias de Gramado, conhecida por sua arquitetura e tradições europeias.',
      category: 'CAT-GE48154',
    },
  ];
  //MainTours

  const KnowGramado = {
    summary: [
      'Conhecida também como Europa do Brasil',
      'O ar fresco e o clima de montanhas junto da memorável arquitetura e culinária da cidade são o charme de Gramado. Marcado pelas fortes influências das culturas italiana e alemã, o turismo da cidade e arredores abrange diferentes experiências para todas as idades. Gramado te impressiona e mostra o melhor cantinho europeu para chamar de nosso. ',
      'Com experiências incríveis durante todo o ano, Gramado também é conhecida pelos seus eventos e megaespetáculos únicos, como o Natal Luz, o maior espetáculo natalino do país. ',
    ],
    firstCard: [
      'Cantinho europeu no Brasil',
      'Não é só pelo clima ameno que Gramado lembra a Europa, mas também pela culinária e arquitetura.',
      IconCantinho,
    ],
    secondCard: [
      'Serra Gaúcha',
      'Gramado é um lugar onde prevalece a alegria e a emoção. Entre os maiores atrativos da cidade, destacam-se seus famosos eventos ao longo do ano. ',
      IconSerra,
    ],
  };

  //PopularTours
  function AddInfo() {
    var redirect = router.push(`/atividades/gramado`);
    return redirect;
  }

  const popularTours: any = {
    summary: [
      'Os pontos turísticos mais populares de Gramado',
      'Conheça as principais atrações',
    ],
    tours: [
      {
        name: 'Dreamland Museu de Cera',
        summary:
          'É o primeiro museu de cera da América Latina, onde você vai encontrar réplicas das suas celebridades preferidas',
        category: '/tour/passaporte-5-parques-museus-de-grupo-dreams',
        image: MuseuDeCera,
      },
      {
        name: 'Harley Motor Show',
        summary:
          'É um bar de rock perfeito para fãs de velocidade, localizados na avenida que liga Gramado e Canela',
        category: '/tour/passaporte-5-parques-museus-de-grupo-dreams',
        image: HarleyMotorShow,
      },
      {
        name: 'Passeio de Maria Fumaça',
        summary:
          'Uma viagem no tempo pelas paisagens encantadoras da serra passando por diferentes cidades',
        category: '/tour/tour-uva-e-vinho-com-trem',
        image: MariaFumaca,
      },
      {
        name: 'Parque Olivas',
        summary:
          'É um parque com grande legado na gastronomia gaúcha, localizado em cima de um canyon',
        category: '/tour/tour-olivas-com-cafe-da-colonia',
        image: ParqueOlivas,
      },
      {
        name: 'Vale dos Vinhedos',
        summary:
          'Com paisagens apaixonantes, é Patrimônio Histórico e Cultural do Rio Grande do Sul',
        category: '/tour/tour-gran-reserva-vinicolas-no-vale-dos-vinhedos',
        image: ValeDosVinhedos,
      },
      {
        name: 'Cervejaria Artesanal',
        summary: 'Mergulhe e deguste as deliciosas cervejas da região',
        category: '/tour/bus-bier-tour-pt',
        image: CervejariaArtesanal,
      },
      {
        name: 'Churrasco Gaúcho',
        summary:
          'Parte importante da identidade cultural do Rio Grande do Sul e do Brasil, o prato típico é conhecido internacionalmente',
        category: '/tour/noite-gaucha-jantar-show-transporte',
        image: ChurrascoGaucho,
      },
    ],
    redirection: AddInfo,
  };

  //PopularTours

  //WhatToDo
  const whatInGramado: any = {
    summary: {
      title: 'O que fazer em Gramado?',
      subtitle:
        'Com enorme diversidade de passeios para você conhecer, a cidade é abraçada pela natureza, pela diversidade culinária e tem forte veia histórica e cultural. Perfeita para todos os viajantes.',
      redirect: '/atividades/gramado',
      meet: 'Conheça os principais tours',
    },
    city: 'Gramado',
    category: ['CAT-HG46737'],
  };
  //WhatToDo

  //NextDestination
  const nextDestination: any = {
    summary: {
      title: 'Destinos culturais imperdíveis próximos de Gramado',
      subtitle:
        'Localizados a poucas horas da capital, os arredores de Gramado oferecem paisagens deslumbrantes, momentos de sossego ou aventura. Você irá se surpreender com os campos de plantação e parques. Destinos perfeitos para completar o roteiro da Serra Gaúcha, você não pode deixar de incluir Canela, Cambará do Sul e Bento Gonçalves no seu roteiro.',
    },
    slider: [
      {
        city: 'Canela',
        sliderSummary:
          'Conhecida pelas experiências radicais à céu aberto, Canela é a opção perfeita para você que gosta de passeios de aventura',
        image: Canela,
        category: '/categorias/CAT-SN35314',
      },
      {
        city: 'Bento Gonçalves',
        sliderSummary:
          'Famosa pela produção de vinhos e espumantes, é o destino perfeito para quem busca sossego, natureza, boa gastronomia e dias românticos. Além de abrigar a maior vinícola do Brasil',
        image: BentoGoncalves,
        category: '/categorias/CAT-FS97983',
      },
      {
        city: 'Nova Petrópolis',
        sliderSummary:
          'Repleto de cultura alemã na simbólica arquitetura e tradição da cidade, aproveite para fazer compras em lojas típicas e cheias de graciosidades',
        image: NovaPetropolis,
        category: '/categorias/CAT-HY00952',
      },
      {
        city: 'Cambará do Sul',
        sliderSummary:
          'Destino que faz divisão entre os estados do Rio Grande do Sul e de Santa Catarina, é palco para o maior cânion da América Latina: Cânion Itaimbezinho',
        image: Cambara,
        category: '/categorias/CAT-OQ74240',
      },
    ],
  };
  //NextDestination

  return (
    <>
      <Head>
        <title>Gramado - {process.env.NEXT_PUBLIC_SERVER_NAME}</title>
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
        <DestineKnowCity info={KnowGramado} />
        <DestinePopularTour info={popularTours} />
        <DestineWhatToDo info={whatInGramado} />
        <DestineNext info={nextDestination} />
        <HomeDestinowApp />
      </>
    </>
  );
};

export default DestinationGramado;
