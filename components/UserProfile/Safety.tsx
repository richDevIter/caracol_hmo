'use client'
import React, { useEffect, useState } from 'react';
import styles from '@/app/[lng]/(overview)/perfil/perfil.module.css';
import { Controller, useForm } from 'react-hook-form';
import Modal from '../base/Modal/Modal';
import {
  IconCheckCircle,
  IconSpinner,
  IconTimeSecondary,
  IconTimes,
} from '@/assets/icons';

import { useRouter } from 'next/router';
import { useParams } from 'next/navigation';
import { getDictionary } from '@/dictionaries';

export default function Safety() {

  const [dic, setDic] = useState<any>(null);
    const searchParams = useParams();
  
    useEffect(() => {
      const fetchDictionary = async () => {
        const dictionary = await getDictionary(
          searchParams.lng as 'pt' | 'en' | 'es',
          'profile',
        );
        setDic(dictionary);
      };
  
      fetchDictionary();
    }, [searchParams.lng]);

    
  const validated = false;
  const [formPassword, setFormPassword] = useState<boolean>(false);

  const router = useRouter();

  var regex = /^(?=.*[a-z]{1})(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  const [, setErrorMessage] = useState<any>(null);

  const [passwordConfirmation, setPasswordConfirmation] =
    useState<boolean>(false);
  const [passwordValidation, setPasswordValidation] = useState<boolean>(false); ///usado nos atributos "isValid" e "isInvald" dos inputs
  const [passwordSize, setPasswordSize] = useState<number>(0); ///usado para verificar se o tamanho da senha digitada é 8
  const [, setRegexValid] = useState<any>(false);
  const [, setPasswordText] = useState<any>(''); ///usado para a verificação do passord durante a digitação para trocar a cor do feedback quando a condição for atendida
  const [, setLoading] = useState<any>(false);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('Carregando');
  const [modalLog, setModalLog] = useState<any>(null);

  const handlerChangePassword = () => {
    setFormPassword(!formPassword);
    resetField('password');
    resetField('oldPassword');
    resetField('confirmPassword');
  };

  function Validation() {
    var password = (document.getElementById('password') as HTMLInputElement)
      ?.value;
    setPasswordSize(password?.length);
    setPasswordText(password);
    if (!regex.exec(password)) {
      setPasswordValidation(false);
    } else {
      setPasswordValidation(true);
    }
    return true;
  }

  function Confirmation() {
    var password = (document.getElementById('password') as HTMLInputElement)
      .value;
    var passwordConfirmation = (
      document.getElementById('confirmPassword') as HTMLInputElement
    ).value;

    if (passwordConfirmation !== password) {
      setPasswordConfirmation(false);
    } else {
      setPasswordConfirmation(true);
    }

    return true;
  }

  const {
    control,
    handleSubmit,
    resetField,
    watch,
    formState: { errors },
  } = useForm();

  const watchOldPass = watch(`oldPassword`);
  const watchPass = watch(`password`);

  const onSubmit = (objData: any) => {
    setModalLog(null);
    setModalShow(true);

    if (passwordConfirmation === true) {
      if (passwordSize >= 8 && passwordValidation === true) {
        setLoading(true);
        setRegexValid(false);
        getAuthenticateAccount();
      } else {
        setRegexValid(true);
        setModalLog(1);
        setModalMessage('Senha muito fraca');
      }
    } else {
      setModalMessage('As senhas não correspondem');
      setModalLog(1);
    }
  };

  const token = localStorage.getItem('crcSiteAuth') || '{}';

  const getAuthenticateAccount = async () => {
    const dataPass: any = {
      password: watchPass,
      oldPassword: watchOldPass,
    };

    const resp: any = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL_API}/LoginSite/UpdatePassword`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${JSON.parse(token)?.token?.token}`,
        },
        body: JSON.stringify(dataPass),
      }
    );
    const passwordResp: any = await resp.json();
    if (passwordResp.status !== 400) {
      if (passwordResp.statusCode === 400) {
        setModalMessage(passwordResp.errorMessage);
        setErrorMessage(passwordResp.errorMessage);
        setModalLog(1);
        window.location.reload();
      } else {
        setModalMessage(passwordResp.data.texto);
        setModalLog(passwordResp.data.log);
        setLoading(false);
        /* window.location.href = "/perfil"; */
        router.push("/perfil");
      }
    } else {
    }
  };

  return (
    <div className={`col-span-9`}>
      <form onClick={formPassword === true ? (handleSubmit(onSubmit)) : ()=>{}}>
        <div className={`border-b `}>
          <div className="">
            <h1 className={`${styles.title}`}>
              {dic?.security}
            </h1>
            <h2 className="mb-4">
             {dic?.adjustSettings}
            </h2>
          </div>
        </div>
        <div className="border-b grid grid-cols-12 pt-5 pb-6 gap-2">
          <div className="col-span-2 leading-4 font-medium">
            {dic?.password}
          </div>
          {formPassword === false ? (
            <div className="col-span-8 leading-4">
              <p>
                {dic?.resetPass}
              </p>
            </div>
          ) : (
            <div className="col-span-8 leading-4">
              <div className="grid grid-cols-2">
                <div className="col-span-2 md:col-span-1">
                  <label htmlFor="">
                    {dic?.currentPass}
                  </label>
                  <Controller
                    control={control}
                    name="oldPassword"
                    rules={{
                      required: { value: true, message: `nome` },
                    }}
                    render={({ field }: any) => (
                      <input
                        {...field}
                        aria-invalid={errors?.compName ? 'true' : ''}
                        variant="standard"
                        margin="normal"
                        type="password"
                        autoComplete="off"
                        className={`mt-3 ${styles.form_password}`}
                        required
                      />
                    )}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 my-8">
                <div className="col-span-2 md:col-span-1">
                  <label htmlFor="">
                    {dic?.newPass}
                  </label>
                  <Controller
                    control={control}
                    name="password"
                    rules={{
                      required: { value: true, message: `nome` },
                    }}
                    render={({ field }: any) => (
                      <input
                        id="password"
                        {...field}
                        aria-invalid={errors?.compName ? 'true' : ''}
                        variant="standard"
                        margin="normal"
                        type="password"
                        autoComplete="off"
                        className={`mt-3 ${styles.form_password}`}
                        onInput={() => {
                          Validation();
                          Confirmation();
                        }}
                        required
                      />
                    )}
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label htmlFor="">
                    {dic?.confirmPass}
                  </label>
                  <Controller
                    control={control}
                    name="confirmPassword"
                    rules={{
                      required: { value: true, message: `nome` },
                    }}
                    render={({ field }: any) => (
                      <input
                        id="confirmPassword"
                        {...field}
                        aria-invalid={errors?.compName ? 'true' : ''}
                        variant="standard"
                        margin="normal"
                        type="password"
                        autoComplete="off"
                        onInput={() => Confirmation()}
                        className={`mt-3 ${styles.form_password}`}
                        required
                      />
                    )}
                  />
                </div>
              </div>
              <div className="grid">
                <p>
                 {dic?.useEight}
                </p>
              </div>
            </div>
          )}
          <div className="col-span-2 leading-4 text-right">
            {formPassword === false ? (
              <button
                type="button"
                onClick={() => setFormPassword(true)}
                className="font-normal text-primary"
              >
                {dic?.reset}
              </button>
            ) : (
              <div className="">
                <div>
                  <button
                    type="submit"
                    className="font-normal text-primary mb-4"
                  >
                    {dic?.reset}
                  </button>
                </div>
                <div>
                  <input type='button'
                    className="font-normal text-primary cursor-pointer"
                    onClick={() => setFormPassword(false)}
                    value={`${dic?.cancel}`}
                  />
                    
                  
                </div>
              </div>
            )}
          </div>
        </div>
        {/* <div className="border-b grid grid-cols-12 pt-5 pb-6 gap-2">
              <div className="col-span-2 leading-4 font-medium">Autenticação de 2 fatores</div>
              <div className="col-span-8 leading-4">
              <Controller
                  control={control}
                  name="phone"
                  rules={{
                    required: { value: true, message: `nome` },
                  }}
                  render={({ field }: any) => (
                    <input
                      {...field}
                      aria-invalid={errors?.compName ? 'true' : ''}
                      variant="standard"
                      margin="normal"
                      type='tel'
                      placeholder='Insira um número de telefone para configurar a autenticação em 2 fatores'
                      autoComplete="off"
                      className={styles.form_control}
                      required
                    />
                  )}
                />
                </div>
              <div className="col-span-2 leading-4 text-right">
              <button className="font-normal text-primary">Ativar</button>
              </div>
            </div>
            <div className="border-b grid grid-cols-12 pt-5 pb-6 gap-2">
              <div className="col-span-2 leading-4 font-medium">Excluir conta</div>
              <div className="col-span-8 leading-4">
              Excluir definitivamente sua conta da destinow.com
              </div>
              <div className="col-span-2 leading-4 text-right">
                <button className="font-normal text-primary">Excluir conta</button> 
              </div>
            </div>            */}
      </form>

      <Modal btnClose={false} showModal={modalShow} setShowModal={setModalShow}>
        <div
          style={{ height: '340px' }}
          className={`${styles.modal_body} rounded-lg bg-white w-full py-4 px-6 flex flex-col justify-evenly items-center`}
        >
          <div>
            {modalLog === 1 ? (
              <>{IconTimes}</>
            ) : modalLog === 0 ? (
              <>{IconCheckCircle}</>
            ) : (
              <>{IconSpinner}</>
            )}
          </div>
          <div className="text-center">
            <h5 className="mb-1 text-2xl font-medium">
              {modalLog === 1
                ? `Erro na validação!`
                : modalLog === 0
                ? `Sucesso`
                : `Esperando Validação!`}
            </h5>

            {modalLog !== null ? (
              <p className={`${styles.error_msg}`}>{modalMessage}</p>
            ) : (
              <></>
            )}
          </div>
          <div>
            <button
              onClick={() => {
                setModalShow(false);
                if (modalLog === 0) {
                  window.location.reload();
                  setModalLog(null);
                  setModalMessage('Carregando');
                  setModalShow(false);
                  setFormPassword(false);
                }
              }}
              className="btn btn-primary rounded-xl px-4 py-1.5"
            >
              Confirmar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
