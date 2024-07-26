'use client'
import React, { useEffect, useState } from 'react';
import HomeDestinowApp from '@/components/HomeDestinowApp/HomeDestinowApp';

import styles from './minhas-atividades.module.css';
import NextActivities from '@/components/MyActivities/NextActivities';
import PerformedActivities from '@/components/MyActivities/PerformedActivities';
import Modal from '@/components/base/Modal/Modal';
import {
  IconCheck,
  IconSpinner,
  IconTimes,
} from '@/assets/icons';
import Head from 'next/head';
import { useParams } from 'next/navigation';
import { getDictionary } from '@/dictionaries';

const MyActivities = () => {
    
  
    const searchParams = useParams();

    const lang = searchParams.lng === "pt" ? "BR" : searchParams.lng === "en" ? "EN" : searchParams.lng === "es" ? "ES" : "BR";

    const [dic, setDic] = useState<any>(null);

    useEffect(() => {
        const fetchDictionary = async () => {
            const dictionary = await getDictionary(searchParams.lng as "pt" | "en" | "es", 'myActivities');
            setDic(dictionary);
        };
        fetchDictionary();
    }, [searchParams.lng])
    


    const [respActivities, setRespActivities] = useState<any>(null);
    const [reservation, setReservation] = useState<any>();
    const [modalShow, setModalShow] = useState<any>(false);
    const [confirm, setConfirm] = useState<any>(
        'Tem certeza que deseja cancelar esse item?'
    );
    const [modalContent, setModalContent] = useState<any>();
    const [log, setLog] = useState<any>();

  useEffect(() => {
    const ReservationList = async () => {
      const token = localStorage.getItem('crcSiteAuth') || '{}';
      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL_API}/NewReservations/GetMyReservationsAsync`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${JSON.parse(token).token.token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const activitiesResp = await resp.json();
      setRespActivities(activitiesResp);
    };
    ReservationList();
  }, [lang]);

  const getVoucher = (idNewItems: any) => {
    const getVou = async () => {
      const token = localStorage.getItem('crcSiteAuth') || '{}';
      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL_API}/checkout/PdfSecondWay/${idNewItems}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${JSON.parse(token).token.token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const voucherResp = await resp.json();
      if (voucherResp.status !== 400) {
        if (voucherResp.data.log === 0 || voucherResp.data.log === '0') {
          //alert(voucherResp.data.texto);
          const link = document.createElement('a');
          link.href = `data:${voucherResp.data.data.voucherFile.contentType};base64, ${voucherResp.data.data.voucherFile.content}`;
          link.setAttribute(
            'download',
            voucherResp.data.data.voucherFile.fileName
          );

          // Append to html link element page
          document.body.appendChild(link);

          // Start download
          link.click();

          // // Clean up and remove the link
          link?.parentNode?.removeChild(link);
        } else if (voucherResp.data.log === 1 || voucherResp.data.log === '1') {
          /* setAlertMessage(voucherResp.data.data); */
          /* setAlertBool(true); */
          //alert(voucherResp.data.data);
        }
      }
    };
    getVou();
  };

  function cancelReservation(item: any) {
    setModalShow(true);
    //   setModalContent('loading');
    const cancelamento = async () => {
      const token = localStorage.getItem('crcSiteAuth') || '{}';
      const data: any = {
        idItem: item.idNewItems,
        bookingLoc: item.reservaC2,
        cancelamentoTotal: false, // isso é pra saber se é pra cancelar a reserva toda ou nao, como no site é so um item poem false
      };
      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL_API}/Reservations/TryCancelItemSite`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${JSON.parse(token).token.token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );
      const dataResp: any = await resp.json();
      if (dataResp.status !== 400) {
        if (dataResp.data.log === 0 || dataResp.data.log === '0') {
          setConfirm(dataResp.data.texto);
          setLog(dataResp.data.log);
          setModalContent('sucesso');
        } else {
          setConfirm(dataResp.data.texto);
          setLog(dataResp.data.log);
          setModalContent('error');
        }
        /* setCancelTextResponse(dataResp.data.texto); */
      } else {
        setConfirm(
          'Erro ao processar operação<br />Por favor, entre em contato com o nosso suporte'
        );
        setLog(1);
        setModalContent('error');
      }

      if (dataResp?.response?.status === 401) {
        setConfirm(
          'Erro ao processar operação<br />Por favor, entre em contato com o nosso suporte'
        );
        setLog(1);
        setModalContent('error');
      } //
    };

    cancelamento();
  }

  // useEffect(() => {
  //   const location: any = localStorage.getItem("geoLocation");
  //   if (location) {
  //     const latitude: any = JSON.parse(location).latitude;
  //     const longitude: any = JSON.parse(location).longitude;

  //     Geocode.setApiKey("AIzaSyBv2aZ2YO_aW4PIEmXoxHgxC8Ps8DB0o-s");
  //     Geocode.fromLatLng(latitude, longitude).then(
  //       (response: any) => {
  //         //const address = response.results[0].formatted_address;
  //       },
  //       (error: any) => {
  //         console.error(error);
  //       }
  //     );
  //   }
  // }, []);

  return (
    <>
      <Head>
        <title>Minhas Atividades - {process.env.NEXT_PUBLIC_SERVER_NAME}</title>
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
          content={`Minhas Atividades | ${process.env.NEXT_PUBLIC_SERVER_NAME}`}
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
        <div className="container_content md:p-0 ">
          <h1 className={styles.title}>{dic?.myActivities}</h1>

          <NextActivities
            setModalShow={setModalShow}
            setReservation={setReservation}
            getVoucher={getVoucher}
            activities={respActivities}
            title={dic?.nextActivities}
            cancelReservation={cancelReservation}
          />

          <PerformedActivities
            activities={respActivities}
            title={dic?.performedActivities}
          />

          <Modal
            btnClose={false}
            showModal={modalShow}
            setShowModal={setModalShow}
          >
            <div
              style={{ height: '340px' }}
              className={`${styles.modal_body} `}
            >
              {modalContent !== 'loading' ? (
                <>
                  <div className="space-modal">
                    {log === 1 || log === '1'
                      ? IconTimes(96, 96)
                      : log === 0 || log === '0'
                      ? IconCheck('#034C43', 96, 96)
                      : IconSpinner}
                  </div>
                  <div className="space-modal">
                    <h5 className="mb-1">
                      {log === 1
                        ? 'Erro na validação!'
                        : log === 0
                        ? 'Sucesso!'
                        : 'Confirmação de cancelamento!'}
                    </h5>
                    <small
                      id="description"
                      dangerouslySetInnerHTML={{
                        __html: confirm,
                      }}
                    ></small>
                  </div>
                  {log === 1 || log === '1' || log === 0 || log === '0' ? (
                    <div className="space-modal">
                      <button
                        className={`btn ${styles.modal_outline_button}`}
                        onClick={() => {
                          setModalShow(false);
                          setTimeout(() => {
                            setConfirm(
                              'Tem certeza que deseja cancelar esse item?'
                            );
                            setLog(undefined);
                          }, 1000);
                          window.location.reload();
                        }}
                      >
                        Sair
                      </button>
                    </div>
                  ) : (
                    <div className="space-modal">
                      <button
                        className={`btn ${styles.modal_outline_button}`}
                        onClick={() => {
                          setModalShow(false);
                          setConfirm(
                            'Tem certeza que deseja cancelar esse item?'
                          );
                          setLog(undefined);
                        }}
                      >
                        Recusar
                      </button>
                      <button
                        onClick={() => {
                          cancelReservation(reservation);
                          setConfirm(
                            'Tem certeza que deseja cancelar esse item?'
                          );
                          setLog(undefined);
                        }}
                        data-btn="cancelItem"
                        title=""
                        id="73910"
                        data-controler="CDN2382"
                        data-toggle="modal"
                        className={`btn ${styles.modal_button}`}
                      >
                        Confirmar
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="modal-body">
                  <div className="text-center">
                    <div className="load"></div>
                  </div>
                  <div>
                    <h5>Esperando validação!</h5>
                    <span>Processando...</span>
                  </div>
                  <div></div>
                </div>
              )}
            </div>
          </Modal>
        </div>

        <HomeDestinowApp />
      </>
    </>
  );
};

export default MyActivities;
