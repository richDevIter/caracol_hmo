'use client'
import BannerHome from '@/components/HomeBanner/HomeBanner';
import TransfersFilter from '@/components/TransfersFilter/TransfersFilter';

import {
  IconWatch,
  IconCalendarCheck,
  IconPeople,
  IconCase,
  IconCaseHand,
} from '@/assets/icons';


import dynamic from 'next/dynamic';
import Head from 'next/head';
import React, { Key, useEffect, useState } from 'react';


import styles from './transfers.module.css';
import HomeDestinowApp from '@/components/HomeDestinowApp/HomeDestinowApp';

import ActivitiesPagination from '@/components/ActivitiesPagination/ActivitiesPagination';
import useAppData from '@/data/hooks/useCartData';
import useWindowSize from '@/data/hooks/useWindowSize';
import { useParams } from 'next/navigation';
import { getDictionary } from '@/dictionaries';

const DynamicTabSearchs = dynamic(
  () => import('@/components/TabSearchs/TabSearchs'),
  {
    ssr: false,
  }
);



const Transfers = () => {
  const { cart, addItemCart } = useAppData();

  const searchParams = useParams();

  const [transfers, setTransfers] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [pageCount, setPageCount] = useState<any>(1);
  const [totalRows, setTotalRows] = useState<any>(0);
  const [filter, setFilter] = useState<any>();
  const [activeCarrousel, setActiveCarrousel] = useState<any>([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [notFound, setNotFound] = useState<any>(null);
  const [seeMore, setSeeMore] = useState<any>(5);

  const [messageCart, setMessageCart] = useState<any>(false);
  const [searchState, setSearchState] = useState<any>(false);
  const [transferItemJSON, setTransferItemJSON] = useState<any>(null);

  const [dic, setDic] = useState<any>(null);

    useEffect(() => {
        const fetchDictionary = async () => {
            const dictionary = await getDictionary(searchParams.lng as "pt" | "en" | "es", 'transfers');
            setDic(dictionary);
        };
        fetchDictionary();
    }, [searchParams.lng])

  useEffect(() => {
    const transferC2: any = localStorage.getItem('transferC2') || '{}';
    setTransferItemJSON(JSON.parse(transferC2))
  }, [searchState])
  
  const size = useWindowSize();

  function scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (size.width >= 767) {
      var elem: any = document.getElementById('authCartDropdown');
      elem.classList.add('active');
    }
  }

  function HandleMore() {
    if (seeMore <= transfers?.length) {
      setSeeMore(seeMore + 5);
    } else {
      setSeeMore(5);
    }
  }

  const auth = (list: any) => {
    setMessageCart(true);

    setTimeout(() => {
      setMessageCart(false);
    }, 4000);

    const timestamp = new Date().getTime();

    const item = {
      controlCart: timestamp,
      productName: list.transferVehicleType + ' ' +list.vehicleCategoryDetails.category + ' ' + list.transferServiceType,
      productNameBR:list.transferVehicleType +' ' +list.vehicleCategoryDetails.category +' ' +list.transferServiceType,
      productNameEN:
        list.transferVehicleType +
        ' ' +
        list.vehicleCategoryDetails.category +
        ' ' +
        list.transferServiceType,
      productNameES:
        list.transferVehicleType +
        ' ' +
        list.vehicleCategoryDetails.category +
        ' ' +
        list.transferServiceType,
      modalityName: '',
      imagesBaseUrl: process.env.NEXT_PUBLIC_SERVER_URL_IMG,
      imgCart:
        list.vehicleCategoryDetails.categoryImagePath +
        (list.transferVehicleType === 'Mini Van'
          ? 'minivan-transfer.webp'
          : list.transferVehicleType === 'Van'
            ? list.vehicleCategoryDetails.vanImageName
            : list.transferVehicleType === 'Ônibus'
              ? list.vehicleCategoryDetails.busImageName
              : list.transferVehicleType === 'Carro'
                ? list.vehicleCategoryDetails.carImageName
                : list.transferVehicleType === 'Micro Ônibus'
                  ? list.vehicleCategoryDetails.microBusImageName
                  : ''),
      typeProduct: 2,
      price: Number(list.preco),

      idTarif: list.idTaxa,
      idPickup: 1, //verificar

      priceAdults: 0,
      priceChilds: 0,
      priceInfants: 0,
      priceElders: 0,
      priceStudent: 0,
      priceGlobalPeople: Number(list.preco),

      sellingType: list.idSellingType,
      adults: 0,
      childs: 0,
      infants: 0,
      elders: 0,
      student: 0,
      // globalPeople: 1, // Quantidade de veículo comprado
      // totalPeople: transferItemJSON.numPeople, //
      globalPeople: list.idSellingType === 2 ? transferItemJSON.numPeople : 1,
      totalPeople: list.idSellingType === 1 ? transferItemJSON.numPeople : undefined,
      productType: 2,
      productCode: list.productCode,
      time: transferItemJSON.time,
      date: transferItemJSON.date.split('/').reverse().join('-'),
      supplier: list.supplierIdentity,
      supplierFantasyName: list.supplierFantasyName,
      typePickup: 1,
      // meetingPoint: itemOption.embarkingType === "0" ? itemOption.meetingPoint : '',
      // pickupListId: itemOption.embarkingType === "0" ? 0 : itemOption.pickupListId,
      pickup: 0,

      discount: 0,
      customValueNet: 0,
      customValueSell: 0,
      goingSource: transferItemJSON.destine,
      commingSource: transferItemJSON.origin,
      latOrigem: transferItemJSON.latOrigem,
      lngOrigem: transferItemJSON.lngOrigem,
      latDestino: transferItemJSON.latDestino,
      lngDestino: transferItemJSON.lngDestino,
      cia: '',
      voo: '',
      smallSuitcase: list.handLuggage,
      bigSuitcase: list.baggagePerPerson,
      internalNotes: ' ',
      idVeiculo: list.minMaxPeople.idTransferVehicles,
      passengers: [],
    };

    setTimeout(() => scrollTop(), 200);
    addItemCart?.(item);
  };

  return (
    <>
      <Head>
        {/* <title>{`${props.tourResponse.productName} - ${process.env.NEXT_PUBLIC_SERVER_NAME}`}</title> */}
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
        //   content={`${props.tourResponse.productName} - ${process.env.NEXT_PUBLIC_SERVER_NAME}`}
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
        <BannerHome />
        <div className={` ${styles.bg_tab_options} container_content flex flex-wrap px-0`}>
          <DynamicTabSearchs setSearchState={setSearchState} searchState={searchState} />
        </div>

        <div className="container_content px-0" style={{ marginTop: '-80px' }}>
          <div className="grid grid-cols-12">
            <div className="col-span-12 md:col-span-3 hidden md:block px-3">
              <TransfersFilter
                transfers={transfers}
                transferItemJSON={transferItemJSON}
                setTransfers={setTransfers}
                open={open}
                setOpen={setOpen}
                setFilter={setFilter}
                setActiveCarrousel={setActiveCarrousel}
                setNotFound={setNotFound}
                setTotalRows={setTotalRows}
                setPageCount={setPageCount}
                searchState={searchState}
              />
            </div>
            <div className="col-span-12 md:col-span-9 px-3">
              <div className="transfers-info-city">
                <div className="align-items-center">
                  <div>
                    <p className={`${styles.bg_transfers_list_city} `}>
                      Rio de Janeiro, {dic?.brazil}
                    </p>
                    <p className={`${styles.bg_transfers_list_activity} `}>
                      {transfers?.length !== null ? transfers?.length : 0}{' '}
                      {dic?.foundTransfers}
                    </p>
                  </div>
                </div>
              </div>
              {transfers?.length > 0
                ? transfers?.slice((pageCount - 1) * 5, ((pageCount - 1) * 5) + 5).map((list: any, index: Key) => {
                  return (
                    <div key={index}>
                      <div className={`${styles.bg_transfers_list_card} mb-4`}>
                        <div className="grid grid-cols-12">
                          <div className="col-span-12 md:col-span-4 px-3">
                            <div
                              className={`${styles.bg_transfers_list_img}`}
                              style={{
                                background: `url(${process.env.NEXT_PUBLIC_SERVER_URL_IMG
                                  }/${list.vehicleCategoryDetails.categoryImagePath
                                  }${list.transferVehicleType === 'Mini Van'
                                    ? 'minivan-transfer.webp'
                                    : list.transferVehicleType === 'Van'
                                      ? list.vehicleCategoryDetails.vanImageName
                                      : list.transferVehicleType === 'Ônibus'
                                        ? list.vehicleCategoryDetails.busImageName
                                        : list.transferVehicleType === 'Carro'
                                          ? list.vehicleCategoryDetails.carImageName
                                          : list.transferVehicleType ===
                                            'Micro Ônibus'
                                            ? list.vehicleCategoryDetails
                                              .microBusImageName
                                            : ''
                                  })`,
                              }}
                            ></div>
                          </div>
                          <div
                            className={`${styles.bg_transfers_list_text} col-span-12 md:col-span-8`}
                          >
                            <div className="grid grid-cols-12">
                              <div className="col-span-12 md:col-span-8">
                                <div>
                                  <h3>{`${list.transferServiceType}`}</h3>
                                  <h5>{`${list.transferVehicleType} ${list.vehicleCategoryDetails.category}`}</h5>
                                </div>
                                <div className="flex items-center gap-2 mb-1">
                                  {IconWatch('#034C43', '18px', '18px')}
                                  <p>
                                    {dic?.duration}:{' '}
                                    <b>
                                      {list.duracao} {dic?.hours}
                                    </b>
                                  </p>
                                </div>
                                <div className="flex items-center gap-2 mb-1">
                                  {IconCalendarCheck}
                                  <p>
                                    {dic?.departure}:{' '}
                                    <b className="time-list">
                                      {transferItemJSON.date} {dic?.at}{' '}
                                      {transferItemJSON.time}
                                      {dic?.hrs}
                                    </b>
                                  </p>
                                </div>
                                <div className="row info-travel">
                                  <div className="col-span-12">
                                    <div className="flex items-center gap-2 mb-1">
                                      {IconPeople}
                                      <p>
                                        {dic?.seats}:{' '}
                                        <b>
                                          {list.minMaxPeople.maxPassengers}{' '}
                                          {dic?.peoplePerVehicle}
                                        </b>
                                      </p>
                                    </div>
                                  </div>
                                  <div className="col-span-12">
                                    <div className="flex items-center gap-2 mb-1">
                                      {IconCase}
                                      <p>
                                        {list.handLuggage} {dic?.handbag}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="col-span-12">
                                    <div className="flex items-center gap-2 mb-1">
                                      {IconCaseHand}
                                      <p>
                                        {list.baggagePerPerson} {dic?.suitcase}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-span-12 md:col-span-4">
                                <div
                                  className={`${styles.bg_transfers_list_card_price}`}
                                >
                                  <div
                                    className={`${styles.bg_transfers_list_price}`}
                                  >
                                    <div>
                                      <h3>
                                        R${' '}
                                        {`${list.preco
                                          .toFixed(2)
                                          .replace('.', ',')}`}
                                      </h3>
                                      {list.idSellingType === 2 ? (
                                        <p
                                          className={`${styles.bg_transfers_list_people}`}
                                        >
                                          {dic?.perPeople}
                                        </p>
                                      ) : (
                                        <p
                                          className={`${styles.bg_transfers_list_people}`}
                                        >
                                          {dic?.perVehicle}
                                        </p>
                                      )}
                                    </div>
                                    <div
                                      className={`${styles.bg_transfers_list_btn_price} `}
                                    >
                                      <button
                                        onClick={() => auth(list)}
                                        className="btn btn-primary btn-list-transfers"
                                      >
                                        {dic?.addToCart}
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
                : ''}

              <ActivitiesPagination totalRows={totalRows} pageCount={pageCount} setPageCount={setPageCount} />

              {/* {transfers?.length <= 5 || transfers === false ? (
                <></>
              ) : transfers?.length > 5 && seeMore < transfers?.length ? (
                <div className={`${styles.bg_transfers_list_btn_see} `}>
                  <button
                    className="btn btn-outline-primary"
                    onClick={HandleMore}
                  >
                    {t('seeMore')}
                  </button>
                </div>
              ) : (
                <div className={`${styles.bg_transfers_list_btn_see} `}>
                  <button
                    className="btn btn-outline-primary"
                    onClick={HandleMore}
                  >
                    {t('collapseAct')}
                  </button>
                </div>
              )} */}
            </div>
          </div>
        </div>
        <HomeDestinowApp />
      </>
     
    </>
  );
};

export default Transfers;
