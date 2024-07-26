'use client'
import React, { useEffect, useState } from 'react';
import styles from './esqueci-senha.module.css';
import { Controller, useForm } from 'react-hook-form';
import Modal from '@/components/base/Modal/Modal';
import { IconCheckCircle, IconSpinner, IconTimes } from '@/assets/icons';
import Head from 'next/head';
import { useParams, useRouter } from 'next/navigation';
import { getDictionary } from '@/dictionaries';




const ForgetPassword = () => {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const searchParams = useParams();

  
  const lng: any = searchParams.lng === "pt" ? 1 : searchParams.lng === "en" ? 2 : searchParams.lng === "es" ? 3 : 1;
  const [modalMessage, setModalMessage] = useState<any>(`Carregando`);
  const [sucess, setSucess] = useState<any>('Preencher informações');
  const [modalContent, setModalContent] = useState<any>();
  const [modalShow, setModalShow] = useState<any>(false);
  const [modalLog, setModalLog] = useState<any>(null);
  const [loading, setLoading] = useState<any>(false);
  const validated = false;

  const userEmail: any = watch('email', '');

  const [dic, setDic] = useState<any>(null);

  useEffect(() => {
      const fetchDictionary = async () => {
          const dictionary = await getDictionary(searchParams.lng as "pt" | "en" | "es", 'esqueci-senha');
          setDic(dictionary);
      };
      fetchDictionary();
  }, [searchParams.lng])

  const onSubmit = (data: any) => {
    setModalShow(true)
    setLoading(true);


    const token = localStorage.getItem('c2siteAuth') || '{}';

    const getAuthenticateAccount = async () => {
      const dataPass: any = {
        email: data.email,
        language: data.lng,
        source: 'site'
      }

      const resp: any = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/LoginSite/ResetPassword`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const passResp: any = await resp.json();
      if (passResp.statusCode !== 400) {
        if (passResp.statusCode === 200) {
          setModalLog(0);
          setModalMessage(`${passResp.data.texto}`);
        } else {
          setModalLog(1);
          setModalMessage(`${passResp.data.texto}`);
        }
      }
    };


    getAuthenticateAccount();
  };

  return (
    <>
      <Head>
        <title>Esqueci a senha - {process.env.NEXT_PUBLIC_SERVER_NAME}</title>
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
          content={`Esqueci a senha - ${process.env.NEXT_PUBLIC_SERVER_NAME}`}
        />
        <meta property="og:type" content="TravelAgency" />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_SERVER_URL}${process.env.NEXT_PUBLIC_SERVER_LOGO_SHARED}`}
        />
        <meta
          property="og:url"
          content={process.env.NEXT_PUBLIC_SERVER}
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
        <div
          className={`container-page min-w-[375px] md:p-0 ${styles.forget_password}`}
        >
          <h1 className={``}>{dic?.forgot?.title}</h1>
          <h2>
          {dic?.forgot?.subtitle}
          </h2>
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="email">{dic?.forgot?.email}</label>
            <Controller
              control={control}
              name="email"
              rules={{
                required: { value: true, message: dic?.forgot?.errorEmail },
              }}
              render={({ field }: any) => (
                <input
                  {...field}
                  aria-invalid={errors?.compName ? 'true' : ''}
                  variant="standard"
                  margin="normal"
                  autoComplete="off"
                  type="email"
                  className="form-control"
                  required
                />
              )}
            />

            <div className="w-full flex justify-end mt-6">
              <button type='submit' className="btn btn-primary rounded-xl mt-20">
                {dic?.forgot?.send}
              </button>
            </div>
          </form>
        </div>

        <Modal
          btnClose={false}
          showModal={modalShow}
          setShowModal={setModalShow}
        >
          <div
            style={{ height: '340px' }}
            className={`${styles.modal_body} rounded-lg bg-white w-full py-4 px-6 flex flex-col justify-evenly items-center`}
          >
            <div className={modalLog === null ? `animate-spin` : ``}>
              {modalLog === 1 || modalMessage === "Email não encontrado" ? (
                <>{IconTimes}</>
              ) : modalLog === 0 ? (
                <>{IconCheckCircle}</>
              ) : (
                <>{IconSpinner}</>
              )}
            </div>
            <div className="text-center">


              <p className={`${styles.error_msg}`}>{modalMessage}</p>
            </div>
            <div>
              <button
                onClick={() => {
                  setModalShow(false);
                  if (modalLog === 0) {
                    /* window.location.href = "/"; */
                    router.push("/");
                  }
                }}
                className="btn btn-primary rounded-xl px-4 py-1.5"
              >
                Confirmar
              </button>
            </div>
          </div>
        </Modal>
      </>
    </>
  );
};

export default ForgetPassword;
