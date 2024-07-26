import React, { lazy, useEffect, useState } from 'react';
import Link from 'next/link';
import Divider from '../base/Divider/Divider';

import { Controller, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useRouter } from 'next/router';
import { useParams } from 'next/navigation';
import { getDictionary } from '@/dictionaries';

import styles from './AuthLogin.module.css';

// import ReCAPTCHA from 'react-google-recaptcha';
const ReCAPTCHA = lazy(() => import('react-google-recaptcha'));

import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { OAuth2Client } from 'google-auth-library';
import useWindowSize from '@/data/hooks/useWindowSize';


export interface propAuthLogin {
  functionClose?: any
}

const AuthLogin: React.FC<propAuthLogin> = ({ functionClose }) => {

    const [dic, setDic] = useState<any>(null);
    const searchParams = useParams();

    useEffect(() => {
        const fetchDictionary = async () => {
            const dictionary = await getDictionary(searchParams.lng as "pt" | "en" | "es", 'login');
            setDic(dictionary);
        };
    
        fetchDictionary();
    
    }, [searchParams.lng])

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const { locales, locale: activeLocale } = router;

  const [isRecaptcha, setIsRecaptcha] = useState<any>(null);
  const [loading, setLoading] = useState<any>(false);
  const [lng, setLng] = useState<any>("");
  const [errorMessage, setErrorMessage] = useState<any>(null);
  const [alertBool, setAlertBool] = useState<any>(false);
  const [alertMessage, setAlertMessage] = useState<any>("");

  const size = useWindowSize();

  const renderCaptcha = () => {
    return (
      <ReCAPTCHA
        sitekey={`${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
        onChange={handleRecaptcha}
        size="normal"
        id="ReCAPTCHA"
        hl={activeLocale}
      />)
  }
  useEffect(() => {
    async function reloadReacptcha() {
      setLng(activeLocale)
      renderCaptcha();
    }
    
    reloadReacptcha();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeLocale])



  const onSubmit = (data: any) => {

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
          }
        );
        const userResp: any = await resp.json();

        if (userResp.status !== 400) {

          localStorage.setItem("crcSiteAuth", userResp.data !== null ? JSON.stringify(userResp.data) : '{}');

          if (JSON.stringify(userResp.data) !== 'null') {
            //window.location.href = "/perfil";
          }

          if (userResp.statusCode === 400) {
            setLoading(false)
            setErrorMessage(userResp.errorMessage);
            //setIsRecaptcha(null);

          } else if (window.location.pathname === "/login") {
            /* window.location.href = "/"; */
            router.push("/");
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
      setErrorMessage("Por favor, selecione o reCAPTCHA")
    }
  };

  function handleRecaptcha(value: any) {
    setIsRecaptcha(value);
  }

  async function verify(client_id: any, jwtToken: any) {
    const client = new OAuth2Client(client_id);
    // Call the verifyIdToken to
    // varify and decode it
    const ticket = await client.verifyIdToken({
      idToken: jwtToken,
      audience: client_id,
    });

    // Get the JSON with all the user info
    const payload = ticket.getPayload();
    // This is a JSON object that contains
    // all the user info

    responseGoogle(payload);

    return payload;
  }

  const responseGoogle = (response: any) => {
    const profileObj: any = response;

    if (profileObj !== undefined) {
      const givenName = profileObj !== undefined ? profileObj.given_name : null;
      const familyName =
        profileObj !== undefined ? profileObj.family_name : null;
      const email = profileObj !== undefined ? profileObj.email : null;
      const googleId = profileObj !== undefined ? profileObj.sub : null;
      const imageUrl = profileObj !== undefined ? profileObj.picture : null;

      const getAuthenticateGoogleId = async () => {
        const data: any = {
          firstName: givenName,
          lastName: familyName,
          email: email,
          cellphone: '',
          password: '',
          googleId: googleId,
          facebookId: '',
          origem: 0,
          photo: imageUrl,
        };

        const resp: any = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL_API}/LoginSite/AccountCreate`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          }
        );

        const googleResp: any = await resp.json();

      };
      getAuthenticateGoogleId();
    }
  };

  useEffect(() => {
    setTimeout(() => setErrorMessage(null), 10000)
  }, [errorMessage, setErrorMessage]);



  return (
    <div >
      <div className="flex justify-center">
        <h5 className={`${styles.nohover} text-[24px] font-medium mb-4 hidden md:block`}>
          {dic?.makeLogin}
        </h5>
        {
          size.width > 767
            ?
            <span className="close-btn btn p-0" onClick={functionClose} style={{ fontSize: '20px', position: "absolute", right: "15px" }}>×</span>
            :
            <></>
        }
      </div>

      <div className={`${styles.google_login}`}>
        <GoogleOAuthProvider
          clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENTE_ID}`}
        >
          <GoogleLogin
            onSuccess={(response) => {
              verify(response.clientId, response.credential);
            }}
            onError={() => {
              alert('Login Failed');
            }}
            shape="pill"
            theme="outline"
            text="signin"
            size="large"
            useOneTap
          />
        </GoogleOAuthProvider>
      </div>

      <div>
        <Divider label={dic?.or} />
      </div>
      <div>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
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
                  placeholder={dic?.email}
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

          <div className="mb-4">
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
                  placeholder={dic?.password}
                  required
                  className={styles.formControlLogin}
                />
              )}
            />
          </div>
          {errorMessage !== null ?
            <div className="mt-4">
              <div className="text-red-500" style={{ display: 'block' }}>{errorMessage}</div>
            </div>
            :
            <></>
          }
          <div className="my-4">
            {
              loading === false && lng === activeLocale
                ?
                <>
                  {renderCaptcha()}
                </>
                :
                <></>
            }
          </div>

          <div className="mb-4">
            <button type="submit" className={styles.button}>
              {dic?.send}
            </button>
          </div>
        </form>
        <div className="text-left">
          <Link className={styles.link} href="/esqueci-senha" passHref>
            {dic?.forgotPass}
          </Link>
        </div>
        <div className="flex">
          <p className={styles.nohover}>
            {dic?.notRegistered}{' '}
            <Link className={styles.link} href="/criar-conta" passHref>
              {dic?.register}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLogin;
