'use client';
import dynamic from 'next/dynamic';
import { getDictionary } from '@/dictionaries';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import styles from './AuthLogin.module.css';
import Divider from '@/components/base/Divider/Divider';
import { Controller, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

const ReCAPTCHA = dynamic(() => import('react-google-recaptcha'), {
  ssr: true,
})

export default function Page() {

  const router = useRouter();

  const searchParams = useParams();
  const [isRecaptcha, setIsRecaptcha] = useState<any>(null);
  const [loading, setLoading] = useState<any>(false);
  const [errorMessage, setErrorMessage] = useState<any>(null);
  const [lng, setLng] = useState<any>('');

  const [alertBool, setAlertBool] = useState<any>(false);
  const [alertMessage, setAlertMessage] = useState<any>('');

  const [dic, setDic] = useState<any>(null);

  useEffect(() => {
    const fetchDictionary = async () => {
      const dictionary = await getDictionary(
        searchParams.lng as 'pt' | 'en' | 'es',
        'login',
      );
      setDic(dictionary);
    };

    fetchDictionary();
  }, [searchParams.lng]);

  const onSubmit = (data: any) => {
    setLoading(true);

    if (isRecaptcha !== null) {
      const getAuthenticate = async () => {
        const dataUser: any = {
          email: data.email,
          password: data.password,
          facebookId: '',
          googleId: '',
        };

        const resp: any = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL_API}/LoginSite/Authenticate`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataUser),
          },
        );
        const userResp: any = await resp.json();

        if (userResp.status !== 400) {
          localStorage.setItem(
            'crcSiteAuth',
            userResp.data !== null ? JSON.stringify(userResp.data) : '{}',
          );

          if (JSON.stringify(userResp.data) !== 'null') {
            //window.location.href = "/perfil";
          }

          if (userResp.statusCode === 400) {
            setLoading(false);
            setErrorMessage(userResp.errorMessage);
            // setIsRecaptcha(null);
          } else if (window.location.pathname === '/login') {
            setLoading(false);
            router.push('/');
          } else if (userResp.data.log === 1) {
            setAlertMessage(userResp.data.texto);
            setAlertBool(true);
            setLoading(false);
            setIsRecaptcha(null);
          } else {
            window.location.reload();
          }
        } else {
        }
      };

      getAuthenticate();
    } else {
      setLoading(false);
      setErrorMessage('Por favor, selecione o reCAPTCHA');
    }
  };

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  function handleRecaptcha(value: any) {
    setIsRecaptcha(value);
  }

  const renderCaptcha = () => {
    return (
      <ReCAPTCHA
        sitekey={`${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
        onChange={handleRecaptcha}
        size="normal"
        id="ReCAPTCHA"
        hl={lng}
      />
    );
  };

  useEffect(() => {
    async function reloadReacptcha() {
      setLng(searchParams.lng);
      renderCaptcha();
    }

    reloadReacptcha();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.lng]);

  return (
    <div
      className={`container-page md:p-0 ${styles.create_account}  ${styles.container}`}
    >
      <h1 className={styles.title}>{dic?.makeLogin}</h1>

      <div>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <label>{dic?.email}</label>
            <Controller
              control={control}
              name="email"
              //   rules={{ required: { value: true, message: 'Por favor, informe o e-mail.' } }}
              render={({ field }: any) => (
                <input
                  {...field}
                  aria-invalid={errors?.compName ? 'true' : ''}
                  variant="standard"
                  margin="normal"
                  autoComplete="off"
                  required
                  className={styles.formControlLogin}
                />
              )}
            />
            <ErrorMessage
              errors={errors}
              name="email"
              render={({ message }) => (
                <small style={{ color: 'red' }}>{message}</small>
              )}
            />
          </div>

          <div className="mb-0">
            <label>{dic?.password}</label>
            <Controller
              control={control}
              name="password"
              //   rules={{ required: { value: true, message: 'Por favor, informe o senha.' } }}
              render={({ field }: any) => (
                <input
                  {...field}
                  aria-invalid={errors?.compName ? 'true' : ''}
                  variant="standard"
                  margin="normal"
                  type="password"
                  autoComplete="off"
                  required
                  className={styles.formControlLogin}
                />
              )}
            />
          </div>
          {errorMessage !== null ? (
            <div className="mt-2">
              <div className="text-red-500" style={{ display: 'block' }}>
                {errorMessage}
              </div>
            </div>
          ) : (
            <></>
          )}

          <div className="mt-4 mb-4">
            {loading === false && lng === searchParams.lng ? (
              <>{renderCaptcha()}</>
            ) : (
              <></>
            )}
          </div>

          <div className="mb-4">
            {
              loading
                ?
                <button type="submit" className={styles.button}>
                  <div className='load'></div>
                </button>
                :
                <button type="submit" className={styles.button}>
                  {dic?.send}
                </button>
            }
          </div>
        </form>
        <div className="text-left">
          <a className={styles.link} href="/esqueci-senha">
            {dic?.forgotPass}
          </a>
        </div>
        <div className="flex">
          <p className={styles.nohover}>
            {dic?.notRegistered}{' '}
            <a className={styles.link} href="/criar-conta">
              {dic?.register}
            </a>
          </p>
        </div>
      </div>

      <Divider lines={1} />
    </div>
  );
}
