'use client'

import React, { useEffect, useState } from 'react';
import HomeDestinowApp from '@/components/HomeDestinowApp/HomeDestinowApp';
import styles from './perfil.module.css';
import PersonalData from '@/components/UserProfile/PersonalData';
import Safety from '@/components/UserProfile/Safety';
import PaymentData from '@/components/UserProfile/PaymentData';
import EmailNotification from '@/components/UserProfile/EmailNotification';
import { IconAddUser, IconPadLock } from '@/assets/icons';
import Head from 'next/head';
import { useParams } from 'next/navigation';
import { getDictionary } from '@/dictionaries';



export interface propProfile {}

const ProfilePage: React.FC<propProfile> = ({}) => {

  const searchParams = useParams();

  const [dic, setDic] = useState<any>(null);

  useEffect(() => {
      const fetchDictionary = async () => {
          const dictionary = await getDictionary(searchParams.lng as "pt" | "en" | "es", 'profile');
          setDic(dictionary);
      };
      fetchDictionary();
  }, [searchParams.lng])

  // personal data
  const [tab, setTab] = useState<any>(0);
  const [profileImg, setProfileImg] = useState<any>(null);
  const [profileNameImg, setProfileNameImg] = useState<any>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [passport, setPassport] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [cep, setCEP] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('');
  // personal data

  const imageHandler = (e: any) => {
    if (
      e.target.files[0].type === 'image/jpeg' ||
      e.target.files[0].type === 'image/png'
    ) {
      if (e.target.files[0].size <= 2097152) {
        //2MB -> 2097152
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setProfileImg(reader.result);
            //.log(reader.result)
            update(reader.result);
          }
        };
        reader.readAsDataURL(e.target.files[0]);
        setProfileNameImg(e.target.files[0].name);
      } else {
        alert('O tamanho da imagem tem que ser menor que 2MB!');
      }
    } else {
      alert('Anexe um arquivo no formato solicitado!');
    }
  };

  const renderTabs = () => {
    if (tab === 0) {
      return (
        <PersonalData
          firstName={firstName}
          setFirstName={setFirstName}
          email={email}
          setEmail={setEmail}
          cpf={cpf}
          setCpf={setCpf}
          phone={phone}
          setPhone={setPhone}
          profileImg={profileImg}
          imageHandler={imageHandler}
          update={update}
        />
      );
    } else if (tab === 1) {
      return <Safety />;
    } else if (tab === 2) {
      return <PaymentData />;
    } else {
      return <EmailNotification />;
    }
  };
  const handlerTab = (index: any) => {
    var selectAll = document.querySelectorAll('.tab-option');
    var selected = document.querySelector(`.tab-${index}`);
    setTab(index);
    for (let i = 0; i < selectAll.length; i++) {
      selectAll[i]?.classList.remove(`${styles.option_selected}`);
    }
    if (selectAll[index] === selected) {
      selected.classList.add(`${styles.option_selected}`);
    } else {
      selectAll[index]?.classList.remove(`${styles.option_selected}`);
    }
  };

  function update(newPicture: any = null) {
    const token = localStorage.getItem('crcSiteAuth') || '{}';
    const getAuthenticateAccount = async () => {
      const dataUser: any = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        cellphone: phone,
        Whatsapp: null,
        photo: newPicture === null ? profileImg : newPicture,
        userComplement: {
          address: null,
          postCode: null,
          city: null,
          state: null,
          country: null,
        },
      };
      const resp: any = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL_API}/LoginSite/UpdateLogin`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${JSON.parse(token)?.token?.token}`,
          },
          body: JSON.stringify(dataUser),
        }
      );
      const pictureResp: any = await resp.json();
      if (dataUser.status !== 415) {
        //window.location.reload();
      }
    };
    getAuthenticateAccount();
  }

  useEffect(() => {
    const token = localStorage.getItem('crcSiteAuth') || '{}';
    const getAuthenticateAccount = async () => {
      const resp: any = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL_API}/LoginSite/GetPerfil`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${JSON.parse(token)?.token?.token}`,
          },
        }
      );
      const profileResp: any = await resp.json();
      if (profileResp.status !== 400) {
        setFirstName(profileResp.data.firstName);
        setLastName(profileResp.data.lastName);
        setCpf(profileResp.data.cpf);
        setPassport(profileResp.data.passport);
        setPhone(profileResp.data.phone);
        setWhatsapp(profileResp.data.whatsapp);
        setEmail(profileResp.data.email);
        setProfileImg(profileResp.data.photo);
        setCEP(profileResp.data.userComplement?.postCode);
        setState(profileResp.data.userComplement?.state);
        setCity(profileResp.data.userComplement?.city);
        setAddress(profileResp.data.userComplement?.address);
        setCountry(profileResp.data.userComplement?.country);
        }else{
        }
    };
    getAuthenticateAccount();
  }, []);

  return (
    <>
      <Head>
        <title>Minha conta - {process.env.NEXT_PUBLIC_SERVER_NAME}</title>
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
          content={`Minha Conta | ${process.env.NEXT_PUBLIC_SERVER_NAME}`}
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
        <div className="container_content mt-6  h-screen">
          <div className="md:grid grid-cols-12 gap-8">
            <div
              style={{ height: 'fit-content', backgroundColor: '#f2f0f0' }}
              className={`col-span-3  rounded-lg px-6 mb-6 `}
            >
              <div
                onClick={() => handlerTab(0)}
                className={`${styles.option} ${styles.option_selected} tab-option tab-0`}
              >
                {IconAddUser('#000000', 21, 16)} {dic?.personalData}
              </div>
              <div
                onClick={() => handlerTab(1)}
                className={`${styles.option} tab-option tab-1`}
              >
                {IconPadLock('#000000', 21, 16)}
                {dic?.security}
              </div>
              {/* <div onClick={()=>handlerTab(2)} className={`${styles.option} tab-option tab-2`}>Dados de Pagamento</div>
              <div onClick={()=>handlerTab(3)} className={`${styles.option} tab-option tab-3`}>Notificações por e-mail</div> */}
            </div>
            {renderTabs()}
          </div>
        </div>
        {/* <HomeDestinowApp /> */}
      </>
    </>
  );
};

export default ProfilePage;
