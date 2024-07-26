import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import iconArrow from '../../assets/icons/akar-icons_send.svg';
import styles from './Newsletter.module.css';


import { getDictionary } from '@/dictionaries';
import { useParams } from 'next/navigation';

export interface propNew {
  status: any;
  message: any;
  onValidated: any;
  lng?: any;
}

const Newsletter: React.FC<propNew> = ({
  status,
  message,
  onValidated,
  lng,
}: propNew) => {
  const [dic, setDic] = useState<any>(null);

  const searchParams = useParams();

  const [email, setEmail] = useState('');
  const [sucess, setSucess] = useState<any>();
  const [error, setError] = useState<any>();
  const sending = useState<any>(
    <div style={{ color: 'blue', textAlign: 'center' }}>
      {searchParams.lng === 'br'
        ? 'Carregando...'
        : searchParams.lng === 'en'
        ? 'Loading...'
        : searchParams.lng === 'es'
        ? 'Cargando'
        : 'Carregando...'}
    </div>,
  );

  const handleSubmit = (e: any) => {
    e.preventDefault();
    email &&
      email.indexOf('@') > -1 &&
      onValidated({
        EMAIL: email,
      });
  };

  useEffect(() => {
    const fetchDictionary = async () => {
      const dictionary = await getDictionary(
        searchParams.lng as 'pt' | 'en' | 'es',
        'footer',
      );
      setDic(dictionary);
    };

    fetchDictionary();
  }, [searchParams.lng]);

  useEffect(() => {
    if (status === 'success') {
      clearFields();

      setTimeout(() => {
        setSucess(<></>);
      }, 7500);
    }
    setSucess(
      <div style={{ color: 'green', textAlign: 'center' }}>
        {searchParams.lng === 'pt'
          ? 'Obrigado! Inscrição realizada com sucesso!'
          : searchParams.lng === 'en'
          ? 'Thank you! Registration successful!'
          : searchParams.lng === 'es'
          ? 'Gracias. ¡Registro exitoso!'
          : 'Obrigado! Inscrição realizada com sucesso!'}
      </div>,
    );
  }, [searchParams.lng, status]);

  const clearFields = () => {
    setEmail('');
  };

  useEffect(() => {
    if (status === 'error') {
      setTimeout(() => {
        setError(<></>);
      }, 7500);
    }
    setError(
      <div style={{ color: 'red', textAlign: 'center' }}>
        {searchParams.lng === 'pt'
          ? 'E-mail já cadastrado!'
          : searchParams.lng === 'en'
          ? 'E-mail already registered'
          : searchParams.lng === 'es'
          ? 'Correo electrónico ya registrado'
          : 'E-mail já cadastrado!'}
      </div>,
    );
  }, [searchParams.lng, status]);

  return (
    <>
      <form
        onSubmit={(e) => handleSubmit(e)}
        action="https://destinow.us14.list-manage.com/subscribe/post?u=b03348cfc7a73ffe8fd0e298e&id=391898e810"
      >
        <div className={`${styles.input_group}`}>
          <input
            type="email"
            name="E-mail"
            id="email"
            className={`${styles.form_control} py-2`}
            placeholder={dic?.email}
            aria-label="email"
            aria-describedby="basic-addon1"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
          />
          <div className={`${styles.input_group_append}`}>
            <button className={`${styles.input_group_button} py-2`} type="submit">
              <Image width={13} height={38} src={iconArrow} alt="pesquisar" className={`${styles.input_group_svg} py-1`} />
            </button>
          </div>
        </div>
        <div className="my-2">
          <div className="message-newsletter text-start">
            {status === 'sending' && sending}
            {status === 'error' && error}
            {status === 'success' && sucess}
          </div>
        </div>
      </form>
    </>
  );
};

export default Newsletter;
