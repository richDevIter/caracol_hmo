'use client'
import React, { useEffect, useState } from 'react'

import { Controller, useForm } from 'react-hook-form';

import styles from '@/styles/criar-conta.module.css';
import Modal from '@/components/base/Modal/Modal';
import { IconCheckCircle, IconSpinner, IconTimes } from '@/assets/icons';
import { getDictionary } from '@/dictionaries';
import { useParams, useRouter } from 'next/navigation';



const ResetarSenha = () => {

  const router = useRouter()

  const searchParams = useParams();
  const [dic, setDic] = useState<any>(null);

  useEffect(() => {
    const fetchDictionary = async () => {
      const dictionary = await getDictionary(searchParams.lng as "pt" | "en" | "es", 'resetPassword');
      setDic(dictionary);
    };

    fetchDictionary();

  }, [searchParams.lng])

  const [sucess, setSucess] = useState<any>("Processando...");
  const [log, setLog] = useState<any>(null);

  const [passwordValidation, setPasswordValidation] = useState<boolean>(false); ///usado nos atributos "isValid" e "isInvald" dos inputs

  const [passwordStr, setPasswordStr] = useState<any>(0);
  const [passwordStrColor, setPasswordStrColor] = useState<any>('#ccc');
  const [passwordStrText, setPasswordStrText] = useState<any>('');
  const [modalShow, setModalShow] = useState<any>(false);
  const [modalMessage, setModalMessage] = useState<any>(`Carregando`);
  const [modalLog, setModalLog] = useState<any>(null);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  var regex = /^(?=.*[a-z]{1})(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  var regexLetter = /^(?=.*[A-Za-z]{1})/;
  var regexNumber = /^(?=.*\d)/;
  var regexSymble = /^(?=.*[@$!%*#?&])/;

  function Validation() {
    var strength: any = 0;
    var password = (document.getElementById('password') as HTMLInputElement)
      ?.value;

    if (regexNumber.exec(password)) {
      strength += 1;
    }

    if (regexSymble.exec(password)) {
      strength += 1;
    }

    if (regexLetter.exec(password)) {
      strength += 1;
    }

    if (!regex.exec(password)) {
      setPasswordValidation(false);
    } else {
      strength = 4;
      setPasswordValidation(true);
    }

    if (strength === 0) {
      setPasswordStrColor('#ccc');
      setPasswordStrText('');
    } else if (strength === 1) {
      setPasswordStrColor('red');
      setPasswordStrText(dic?.weak);
    } else if (strength === 2 || strength === 3) {
      setPasswordStrColor('#e0e00d');
      setPasswordStrText(dic?.medium);
    } else {
      setPasswordStrColor('green');
      setPasswordStrText(dic?.strong);
    }

    setPasswordStr(strength);

    return true;
  }

  const passwordStrength = () => {
    return (
      <div
        className={`${styles.password_strength_container} grid grid-cols-12`}
      >
        <div
          className={`${styles.password_strength} col-span-3`}
          style={{
            borderColor: `${passwordStr >= 1 ? passwordStrColor : ''}`,
          }}
        ></div>
        <div
          className={`${styles.password_strength} col-span-3`}
          style={{
            borderColor: `${passwordStr >= 2 ? passwordStrColor : ''}`,
          }}
        ></div>
        <div
          className={`${styles.password_strength} col-span-3`}
          style={{
            borderColor: `${passwordStr >= 3 ? passwordStrColor : ''}`,
          }}
        ></div>
        <div
          className={`${styles.password_strength} col-span-3`}
          style={{
            borderColor: `${passwordStr >= 4 ? passwordStrColor : ''}`,
          }}
        ></div>
      </div>
    );
  };

  ////////////////////ONSUBMIT/////////////////////////
  const onSubmit = (data: any) => {
    setModalShow(true);
    setModalMessage(`Carregando...`);

    const getAuthenticateAccount = async () => {

      try {
        const resp: any = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL_API}/LoginSite/AlterPassword`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "token": window.location.href.split('resetar-senha/')[1],
              "password": data.password,
            }),
          }
        );
        const userResp: any = await resp.json();

        if (userResp.statusCode !== 400) {
          if (userResp.statusCode === 200) {
            if (userResp.data.log === 1) {
              setModalLog(1);
              setModalMessage(`${userResp.data.texto}`);
            } else {
              setModalLog(0);
              setModalMessage(`${userResp.data.texto}`);
            }

          } else {
            setModalLog(1);
            setModalMessage(`${userResp.data}`);
          }
        }

      } catch (error: any) {
        if (error?.response?.status === 400) { }
      }
    }

    if (passwordValidation === false) {
      setModalMessage(`Senha fraca!!`);
      setModalLog(1);

      return;
    }

    if (data.password !== data.passConfirm) {
      setModalMessage(`Senhas diferentes!!`);
      setModalLog(1);

      return;
    }

    if (data.password === data.passConfirm) {
      getAuthenticateAccount();
    } else {
      alert('Senhas não compatíveis')
    }
  }

  return (
    <>
      <div
        className={`container-page min-w-[375px] md:p-0 ${styles.create_account}`}
      >
        <h1 className={styles.title}>{dic?.title}</h1>

        <form
          noValidate
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
        >
          <div className="grid md:grid-cols-12 row_controll">
            <div className="md:col-span-6 mx-3 mb-6">
              <label>{dic?.passNew}</label>
              <Controller
                control={control}
                name="password"
                rules={{
                  required: { value: true, message: `${dic?.errorPassNew}` },
                }}
                render={({ field }: any) => (
                  <input
                    {...field}
                    type="password"
                    id="password"
                    aria-invalid={errors?.compName ? 'true' : ''}
                    variant="standard"
                    margin="normal"
                    autoComplete="off"
                    className="form-control"
                    onInput={() => Validation()}
                    required
                  />
                )}
              />

              <div className="">
                {passwordStrength()}
                <div
                  className="flex"
                  style={{ color: `${passwordStrColor}` }}
                >
                  {passwordStrText}
                </div>
                <small style={{ fontSize: '.8rem', opacity: '.7' }}>
                  {dic?.textValid}
                </small>
              </div>
            </div>

            <div className="md:col-span-6 mx-3 mb-6">
              <label>
                {dic?.passConfirm}
              </label>
              <Controller
                control={control}
                name="passConfirm"
                rules={{
                  required: { value: true, message: `${dic?.errorPassConfirm}` },
                }}
                render={({ field }: any) => (
                  <input
                    {...field}
                    type="password"
                    aria-invalid={errors?.compName ? 'true' : ''}
                    variant="standard"
                    margin="normal"
                    autoComplete="off"
                    className="form-control"
                    required
                  />
                )}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-12">
            <button
              type="submit"
              className="btn btn-primary md:col-span-3 rounded-md my-4"
            >
              {dic?.resetBtn}
            </button>
          </div>


        </form>
        <Modal
          btnClose={false}
          showModal={modalShow}
          setShowModal={setModalShow}
        >
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
                    : `Esperando validação!`}
              </h5>

              <p className={`${styles.error_msg}`}>{modalMessage}</p>
            </div>
            <div>
              <button
                onClick={() => {
                  setModalShow(false);
                  if (modalLog === 0) {
                    /* window.location.href = '/'; */
                    router.push("/");
                  }
                }}
                className="btn btn-primary rounded-xl px-4 py-1.5"
              >
                {dic?.confirm}
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  )
}

export default ResetarSenha