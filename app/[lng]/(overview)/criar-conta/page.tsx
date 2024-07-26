"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

import styles from "../../../../styles/criar-conta.module.css";
import Divider from "@/components/base/Divider/Divider";
import Modal from "@/components/base/Modal/Modal";
import { IconCheckCircle, IconSpinner, IconTimes } from "@/assets/icons";

import MaskedInput from "@/components/MaskedInput/MaskedInput";
import Head from "next/head";
import { getDictionary } from "@/dictionaries";
import { useParams, useRouter } from "next/navigation";

import GoogleMapsRepository from "@/core/GoogleMapsRepository";
import GoogleMapsCollection from "@/core/GoogleMaps";
import { ErrorMessage } from "@hookform/error-message";
import GetCountrys from "@/components/base/DestPoints/GetCountrys";

React.useLayoutEffect = React.useEffect;

const ReCAPTCHA = dynamic(() => import("react-google-recaptcha"), {
  ssr: true,
});

const CreateAccount = () => {
  const repo: GoogleMapsRepository = new GoogleMapsCollection;
  const router = useRouter();
  const searchParams = useParams();
  const [dic, setDic] = useState<any>(null);

  useEffect(() => {
    const fetchDictionary = async () => {
      const dictionary = await getDictionary(
        searchParams.lng as "pt" | "en" | "es",
        "createAccount"
      );
      setDic(dictionary);
    };

    fetchDictionary();
  }, [searchParams.lng]);

  const [lng, setLng] = useState<any>("");

  const [passwordValidation, setPasswordValidation] = useState<boolean>(false); ///usado nos atributos "isValid" e "isInvald" dos inputs
  const [invalidCpf, setInvalidCpf] = useState<boolean>(false);

  const [nacionalityBr, setNacionalityBr] = useState<any>("checked");

  const [passwordStr, setPasswordStr] = useState<any>(0);
  const [passwordStrColor, setPasswordStrColor] = useState<any>("#ccc");
  const [passwordStrText, setPasswordStrText] = useState<any>("");
  const [modalShow, setModalShow] = useState<any>(false);
  const [modalMessage, setModalMessage] = useState<any>(`Carregando...`);
  const [modalLog, setModalLog] = useState<any>(null);
  const [alertBool, setAlertBool] = useState<any>(false);
  const [alertMessage, setAlertMessage] = useState<any>("");
  const [errorMessage, setErrorMessage] = useState<any>(null);
  const [cpfValidation, setCpfValidation] = useState<boolean>(false);   ///usado nos atributos "isValid" e "isInvald" do cpf
  const [passwordErrorBlur, setPasswordErrorBlur] = useState<any>(false);
  const [passwordConfirmation, setPasswordConfirmation] = useState<boolean>(false);

  const [regexValid, setRegexValid] = useState<any>(false);

  const [loading, setLoading] = useState<any>(false);
  const [isRecaptcha, setIsRecaptcha] = useState<any>(null);

  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('BR');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');

  const [disableState, setDisableState] = useState(false);
  const [disableCity, setDisableCity] = useState(false);
  const [disableAddress, setDisableAddress] = useState(false);

  const [emailErrorBlur, setEmailErrorBlur] = useState<any>(false);

  var regex = /^(?=.*[a-z]{1})(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  var regexLetter = /^(?=.*[A-Za-z]{1})/;
  var regexNumber = /^(?=.*\d)/;
  var regexSymble = /^(?=.*[@$!%*#?&])/;

  const ref = useRef(null);
  const inputRef = useRef(null);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const watchCountry: any = watch("country");

  function CpfValidator(strCPF: any) {
    strCPF = strCPF
      .replace(regexLetter, "")
      .replace(/\./g, "")
      .replace(/-/g, "")
      .replace(/_/g, ""); //remove ".", "-" e "-" que a máscara coloca
    var Soma;
    var Resto;
    Soma = 0;

    if (strCPF === "00000000000") {
      return false;
    }

    for (var i: any = 1; i <= 9; i++)
      Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if (Resto === 10 || Resto === 11) Resto = 0;
    if (Resto !== parseInt(strCPF.substring(9, 10))) {
      return false;
    }

    Soma = 0;
    for (i = 1; i <= 10; i++)
      Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if (Resto === 10 || Resto === 11) Resto = 0;
    if (Resto !== parseInt(strCPF.substring(10, 11))) {
      return false;
    }
    return true;
  }

  function Validation() {
    var strength: any = 0;
    var password = (document.getElementById("password") as HTMLInputElement)
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
      setPasswordStrColor("#ccc");
      setPasswordStrText("");
    } else if (strength === 1) {
      setPasswordStrColor("red");
      setPasswordStrText(dic?.weak);
    } else if (strength === 2 || strength === 3) {
      setPasswordStrColor("#e0e00d");
      setPasswordStrText(dic?.medium);
    } else {
      setPasswordStrColor("green");
      setPasswordStrText(dic?.strong);
    }

    setPasswordStr(strength);

    return true;
  }

  ////////////////////ONSUBMIT/////////////////////////
  const onSubmit = (data: any) => {
    setModalShow(true);
    setModalLog(null);
    setModalMessage(`Carregando...`);

    const dataUser: any = {
      firstName: data?.firstName,
      lastName: data?.lastName,
      cpf: nacionalityBr !== "checked" ? null : data?.cpf?.split('.').join('').split('-').join(''),
      email: data?.email,
      cellphone: data?.cellphone.replaceAll("_", ""),
      password: data?.password,
      Whatsapp: data?.whatsapp,
      photo: null,
      origem: 0,
      foreign: nacionalityBr === "checked" ? 2 : 1,
      passport: nacionalityBr === "checked" ? null : data?.passport?.split('.').join('').split('-').join(''),
      userComplement: {
        address: nacionalityBr === "checked" ? data?.address : null,
        postCode: nacionalityBr === "checked" ? data?.zipCode : null,
        city: nacionalityBr === "checked" ? data?.city : null,
        state: nacionalityBr === "checked" ? data?.state : null,
        country: nacionalityBr === "checked" ? 'BR' : watchCountry?.id,
        complement: nacionalityBr === "checked" && data?.complement ? data?.complement : null,
        number: nacionalityBr === "checked" ? data?.number : null
      },
      aceitePolitica: undefined,
      aceiteComunicacao: false
    };
    console.log(dataUser, data, watchCountry)

    if (passwordValidation === false) {
      setModalMessage(`Senha fraca!!`);
      setModalLog(1);

      return;
    }

    if (isRecaptcha === null) {
      setModalMessage(`Por favor, selecione o reCAPTCHA!`);
      setModalLog(1);

      return;
    }

    if (nacionalityBr === "checked") {
      if (CpfValidator(data.cpf) === false) {
        setInvalidCpf(true);
        setModalMessage(`CPF inválido!!`);
        setModalLog(1);

        return;
      }
    }

    if (data.password !== data.passwordConfirm) {
      setModalMessage(`Senhas diferentes!!`);
      setModalLog(1);

      return;
    }


    const getAuthenticateAccount = async () => {
      setInvalidCpf(false);

      const resp: any = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL_API}/LoginSite/AccountCreate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataUser),
        }
      );
      const userResp: any = await resp.json();

      setModalMessage(userResp.data);
      if (userResp.statusCode !== 400) {
        if (userResp.statusCode === 200) {
          if (userResp.data === "Já existe cadastro com essas credenciais") {
            setModalLog(1);
            setModalMessage(`${userResp.data}`);
          } else {
            setModalLog(0);
            setModalMessage(`${userResp.data}`);
          }
        } else {
          setModalLog(1);
          setModalMessage(`${userResp.data}`);
        }
      } else {
        setModalLog(1);
        setModalMessage(`${userResp.errorMessage}`);
      }
    };

    getAuthenticateAccount();
  };

  function handleRecaptcha(value: any) {
    setIsRecaptcha(value);
  }

  const passwordStrength = () => {
    return (
      <div
        className={`${styles.password_strength_container} grid grid-cols-12`}
      >
        <div
          className={`${styles.password_strength} col-span-3`}
          style={{
            borderColor: `${passwordStr >= 1 ? passwordStrColor : ""}`,
          }}
        ></div>
        <div
          className={`${styles.password_strength} col-span-3`}
          style={{
            borderColor: `${passwordStr >= 2 ? passwordStrColor : ""}`,
          }}
        ></div>
        <div
          className={`${styles.password_strength} col-span-3`}
          style={{
            borderColor: `${passwordStr >= 3 ? passwordStrColor : ""}`,
          }}
        ></div>
        <div
          className={`${styles.password_strength} col-span-3`}
          style={{
            borderColor: `${passwordStr >= 4 ? passwordStrColor : ""}`,
          }}
        ></div>
      </div>
    );
  };

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

  const searchCEP = async (term: any) => {
    setDisableState(false);
    setDisableCity(false);
    setDisableAddress(false);

    setValue("address", "");
    setAddress("");

    setValue("city", "");
    setCity("");

    setValue("state", "");
    setState("");

    const resp = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${term}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}`,
      {
        method: 'GET'
      }
    );
    const response = await resp.json();

    if (response.status === "OK") {
      response.results[0].address_components.forEach(function (place: any) {
        switch (place.types[0]) {
          case "route":
            setDisableAddress(true);
            setValue("address", place.long_name);
            setAddress(place.long_name);
            break;

          case "administrative_area_level_2":
            setDisableCity(true);
            setValue("city", place.long_name);
            setCity(place.long_name);
            break;

          case "locality":
            (
              document.getElementById(
                "FormControlInput1Cidade"
              ) as HTMLInputElement
            ).value = place.long_name;
            (
              document.querySelector(
                '[for="FormControlInput1Cidade"]'
              ) as HTMLElement
            ).classList.add("label-active");
            break;

          case "administrative_area_level_1":
            setDisableState(true);
            setValue("state", place.long_name);
            setState(place.long_name);
            break;

          default:
        }
      });
    } else {
      setDisableState(false);
      setDisableCity(false);
      setDisableAddress(false);
    }
  };

  const handleBlurCEP = (event: any) => {
    searchCEP(event.target.value);
  };

  const verifyBlurEmail = () => {
    var email = (document.getElementById('email') as HTMLInputElement).value;
    var emailConfirmation = (document.getElementById('confirmEmail') as HTMLInputElement).value;

    if (emailConfirmation !== email && emailConfirmation !== '') {
      setEmailErrorBlur(true);
    } else {
      setEmailErrorBlur(false);
    }
  };

  const verifyBlurPassword = () => {
    var password = (document.getElementById('password') as HTMLInputElement).value;
    var passwordConfirmation = (document.getElementById('confirmPassword') as HTMLInputElement).value;

    if (passwordConfirmation !== password && passwordConfirmation !== '') {
      setPasswordErrorBlur(true);
    } else {
      setPasswordErrorBlur(false);
    }
  };

  const showNacionality = (e: any) => {

    if (nacionalityBr === false) {
      setCpfValidation(false)
      setNacionalityBr("checked");
    } else {
      setCpfValidation(true)
      setNacionalityBr(false);
    }
  };

  const BrChecked = () => {
    return (
      <>
        <div data-nacion="cpf" className="col-span-12 md:col-span-6 mb-3">
          <label>
            CPF*
          </label>
          <Controller
            control={control}
            name="cpf"
            rules={{ required: { value: true, message: 'Por favor, informe o cpf' } }}
            render={({ field }: any) => (
              <MaskedInput className="form-control" field={field} placeholder={"000.000.000-00"} />
            )}
          />
          <ErrorMessage
            errors={errors}
            name="cpf"
            render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
          />
          {invalidCpf === true ? <small style={{ color: "red" }}>Por favor, informe um cpf válido</small> : ''}
        </div>
      </>
    )
  }

  const EstChecked = () => {
    return (
      <>
        <div className="col-span-12 md:col-span-6 mb-3 md:mt-0">
          <label>
            Passaporte*
          </label>
          <Controller
            control={control}
            name="passport"
            rules={{ required: { value: true, message: 'Por favor, informe o passaporte' } }}
            render={({ field }: any) => (
              <input
                {...field}
                className="form-control"
                aria-invalid={errors?.passport ? "true" : ""}
                type="text"
                required
              />
            )}
          />
          <ErrorMessage
            errors={errors}
            name="passport"
            render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
          />
        </div>
      </>
    )
  }

  function Confirmation() {
    var password = (document.getElementById('password') as HTMLInputElement).value;
    var passwordConfirmation = (document.getElementById('confirmPassword') as HTMLInputElement).value;

    if (passwordConfirmation !== password) {
      setPasswordConfirmation(false);
    }
    else {
      setPasswordConfirmation(true);
    }

    return true;
  }

  return (
    <>
      <Head>
        <title>Criar conta - {process.env.NEXT_PUBLIC_SERVER_NAME}</title>
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
          content={`Criar conta - ${process.env.NEXT_PUBLIC_SERVER_NAME}`}
        />
        <meta property="og:type" content="TravelAgency" />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_SERVER_URL}${process.env.NEXT_PUBLIC_SERVER_LOGO_SHARED}`}
        />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_SERVER_URL} />

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
          className={`container-page min-w-[375px] md:p-0 ${styles.create_account}`}
        >
          <h1 className={styles.title}>{dic?.createAccount}</h1>

          <form
            noValidate
            className={styles.form}
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="new-password"
          >
            <div className="grid md:grid-cols-12 row_controll">
              <div className="md:col-span-6 mx-3 mb-6">
                <label>{dic?.name}</label>
                <Controller
                  control={control}
                  name="firstName"
                  rules={{
                    required: { value: true, message: `${dic?.errorName}` },
                  }}
                  render={({ field }: any) => (
                    <input
                      {...field}
                      aria-invalid={errors?.compName ? "true" : ""}
                      variant="standard"
                      margin="normal"
                      autoComplete="new-password"
                      className="form-control"
                      required
                    />
                  )}
                />
                <ErrorMessage
                  errors={errors}
                  name="firstName"
                  render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                />
              </div>

              <div className="md:col-span-6 mx-3 mb-6">
                <label>{dic?.lastname}</label>
                <Controller
                  control={control}
                  name="lastName"
                  rules={{
                    required: { value: true, message: `${dic?.errorLastName}` },
                  }}
                  render={({ field }: any) => (
                    <input
                      {...field}
                      aria-invalid={errors?.compName ? "true" : ""}
                      variant="standard"
                      margin="normal"
                      autoComplete="new-password"
                      className="form-control"
                      required
                    />
                  )}
                />
                <ErrorMessage
                  errors={errors}
                  name="lastName"
                  render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-12 row_controll">
              <div className="md:col-span-6 mx-3 mb-6">
                <label>{dic?.email}</label>
                <Controller
                  control={control}
                  name="email"
                  rules={{
                    required: { value: true, message: `${dic?.errorEmail}` },
                  }}
                  render={({ field }: any) => (
                    <input
                      {...field}
                      id="email"
                      aria-invalid={errors?.compName ? "true" : ""}
                      variant="standard"
                      margin="normal"
                      autoComplete="new-password"
                      type="email"
                      className="form-control"
                      onInput={verifyBlurEmail}
                      required
                    />
                  )}
                />
                <ErrorMessage
                  errors={errors}
                  name="email"
                  render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                />
              </div>

              <div className="md:col-span-6 mx-3 mb-6">
                <label>{dic?.confirmEmail}</label>
                <Controller
                  control={control}
                  name="confirmEmail"
                  rules={{
                    required: { value: true, message: `${dic?.errorConfirmEmail}` },
                  }}
                  render={({ field }: any) => (
                    <input
                      {...field}
                      id="confirmEmail"
                      aria-invalid={errors?.compName ? "true" : ""}
                      variant="standard"
                      margin="normal"
                      autoComplete="new-password"
                      type="email"
                      className="form-control"
                      onPaste={(e) => {
                        e.preventDefault()
                        return false;
                      }}
                      onCopy={(e) => {
                        e.preventDefault()
                        return false;
                      }}
                      onInput={verifyBlurEmail}
                      required
                    />
                  )}
                />
                <ErrorMessage
                  errors={errors}
                  name="confirmEmail"
                  render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                />
                {emailErrorBlur === true ? <small style={{ color: "red" }}>{dic?.validatedConfirmEmail}</small> : <></>}
              </div>
            </div>

            <div className="grid md:grid-cols-12 row_controll">
              <div className="md:col-span-6 mx-3 mb-6 flex flex-col justify-center">
                <div className="grid grid-cols-12">
                  <div className="col-span-6">
                    <label className={styles.form_radio} htmlFor="radio1">
                      <Controller
                        control={control}
                        name="BR"
                        render={({ field }: any) => (
                          <input
                            {...field}
                            className="form-check-input"
                            type="radio"
                            id="radio1"
                            name="radio"
                            value="1"
                            defaultChecked={true}
                            onChange={showNacionality}
                            required
                          />
                        )}
                      />
                      <span>{dic?.brazilian}</span>
                    </label>
                  </div>
                  <div className="col-span-6">
                    <label className={styles.form_radio} htmlFor="radio2">
                      <Controller
                        control={control}
                        name="EST"
                        render={({ field }: any) => (
                          <input
                            {...field}
                            className="form-check-input"
                            type="radio"
                            id="radio2"
                            name="radio"
                            value="2"
                            onChange={showNacionality}
                            required
                          />
                        )}
                      />
                      <span>{dic?.foreign}</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="md:col-span-6 mx-3 mb-6">
                {nacionalityBr === "checked" ?
                  <BrChecked />
                  :
                  <EstChecked />
                }
              </div>
            </div>

            <div className="grid md:grid-cols-12 row_controll">
              <div className="md:col-span-6 mx-3 mb-6">
                <label>{dic?.cellphone}</label>
                <Controller
                  control={control}
                  name="cellphone"
                  rules={{
                    required: { value: true, message: `${dic?.errorCellphone}` },
                  }}
                  render={({ field }: any) => (
                    <MaskedInput className="form-control" field={field} mask={nacionalityBr === "checked" ? "(99) 99999-9999" : "999999999999999"} placeholder={""} />
                  )}
                />
                <ErrorMessage
                  errors={errors}
                  name="cellphone"
                  render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                />
              </div>

              <div className="md:col-span-6 mx-3 mb-6">
                <label>Whatsapp</label>
                <Controller
                  control={control}
                  name="whatsapp"
                  render={({ field }: any) => (
                    <MaskedInput className="form-control" field={field} mask={nacionalityBr === "checked" ? "(99) 99999-9999" : "999999999999999"} placeholder={""} />
                  )}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-12 row_controll">
              <div className="md:col-span-6 mx-3 mb-6">
                <label>{dic?.password}</label>
                <Controller
                  control={control}
                  name="password"
                  rules={{
                    required: { value: true, message: `${dic?.errorPassword}` },
                  }}
                  render={({ field }: any) => (
                    <input
                      {...field}
                      aria-invalid={errors?.compName ? "true" : ""}
                      id="password"
                      variant="standard"
                      type="password"
                      margin="normal"
                      autoComplete="new-password"
                      className="form-control"
                      onInput={() => { Validation(); Confirmation(); verifyBlurPassword() }}
                      maxLength={20}
                      required
                    />
                  )}
                />

                <ErrorMessage
                  errors={errors}
                  name="password"
                  render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                />

                {passwordStrength()}

                <div
                  className="flex justify-center"
                  style={{ color: `${passwordStrColor}` }}
                >
                  {passwordStrText}
                </div>
                <small style={{ fontSize: ".8rem", opacity: ".7" }}>
                  {dic?.useEight}
                </small>
              </div>

              <div className="md:col-span-6 mx-3 mb-6">
                <label>{dic?.confirmPassword}</label>
                <Controller
                  control={control}
                  name="passwordConfirm"
                  rules={{
                    required: {
                      value: true,
                      message: `${dic?.errorConfirmPassword}`,
                    },
                  }}
                  render={({ field }: any) => (
                    <input
                      {...field}
                      id="confirmPassword"
                      aria-invalid={errors?.compName ? "true" : ""}
                      type="password"
                      variant="standard"
                      margin="normal"
                      autoComplete="new-password"
                      onInput={() => { Confirmation(); verifyBlurPassword() }}
                      className="form-control"
                      required
                    />
                  )}
                />
                <ErrorMessage
                  errors={errors}
                  name="passwordConfirm"
                  render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                />
                {passwordErrorBlur === true ? <small style={{ color: "red" }}>{dic?.differentPassword}</small> : <></>}
              </div>
            </div>

            <hr className="mb-6" />

            {
              nacionalityBr === "checked"
                ?
                <>
                  <div className="grid md:grid-cols-12 row_controll">
                    <div className="md:col-span-6 mx-3 mb-6">
                      <label>{dic?.zipCode}</label>
                      <Controller
                        control={control}
                        name="zipCode"
                        rules={{
                          required: { value: true, message: `${dic?.errorZipCode}` },
                        }}
                        render={({ field }: any) => (
                          <MaskedInput className="form-control" field={field} mask={"99999-999"} placeholder={""} onBlur={handleBlurCEP} />
                        )}
                      />
                      <ErrorMessage
                        errors={errors}
                        name="zipCode"
                        render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                      />
                    </div>

                    <div className="md:col-span-6 mx-3 mb-6">
                      <label>{dic?.state}</label>
                      <Controller
                        control={control}
                        name="state"
                        rules={{
                          required: { value: true, message: `${dic?.errorState}` },
                        }}
                        render={({ field }: any) => (
                          <input
                            {...field}
                            id="FormControlInput1Estado"
                            aria-invalid={errors?.state ? "true" : ""}
                            variant="standard"
                            margin="normal"
                            type="text"
                            className="form-control"
                            value={state}
                            onChange={(e: any) => { setState(e.target.value) }}
                            disabled={disableState}
                            autoComplete="new-password"
                            required
                          />
                        )}
                      />
                      <ErrorMessage
                        errors={errors}
                        name="state"
                        render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-12 row_controll">
                    <div className="md:col-span-6 mx-3 mb-6">
                      <label>{dic?.city}</label>
                      <Controller
                        control={control}
                        name="city"
                        rules={{
                          required: { value: true, message: `${dic?.errorCity}` },
                        }}
                        render={({ field }: any) => (
                          <input
                            {...field}
                            id="FormControlInput1Cidade"
                            aria-invalid={errors?.city ? "true" : ""}
                            variant="standard"
                            margin="normal"
                            type="text"
                            className="form-control"
                            autoComplete="new-password"
                            value={city}
                            onChange={(e: any) => { setCity(e.target.value) }}
                            disabled={disableCity}
                            required
                          />
                        )}
                      />
                      <ErrorMessage
                        errors={errors}
                        name="city"
                        render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                      />
                    </div>

                    <div className="md:col-span-6 mx-3 mb-6">
                      <label>{dic?.address}</label>
                      <Controller
                        control={control}
                        name="address"
                        rules={{
                          required: { value: true, message: `${dic?.errorAddress}` },
                        }}
                        render={({ field }: any) => (
                          <input
                            {...field}
                            id="FormControlInput1Address"
                            aria-invalid={errors?.address ? "true" : ""}
                            variant="standard"
                            margin="normal"
                            type="text"
                            className="form-control"
                            required
                            value={address}
                            onChange={(e: any) => { setAddress(e.target.value) }}
                            disabled={disableAddress}
                            autoComplete="new-password"
                          />
                        )}
                      />
                      <ErrorMessage
                        errors={errors}
                        name="address"
                        render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-12 row_controll">
                    <div className="md:col-span-6 mx-3 mb-6">
                      <label>{dic?.number}</label>
                      <Controller
                        control={control}
                        name="number"
                        render={({ field }: any) => (
                          <input
                            {...field}
                            aria-invalid={errors?.number ? "true" : ""}
                            variant="standard"
                            margin="normal"
                            autoComplete="new-password"
                            type="number"
                            className="form-control"
                          />
                        )}
                      />
                    </div>
                    <div className="md:col-span-6 mx-3 mb-6">
                      <label>{dic?.complement}</label>
                      <Controller
                        control={control}
                        name="complement"
                        render={({ field }: any) => (
                          <input
                            {...field}
                            aria-invalid={errors?.complement ? "true" : ""}
                            variant="standard"
                            margin="normal"
                            autoComplete="new-password"
                            type="text"
                            className="form-control"
                          />
                        )}
                      />
                    </div>
                  </div>
                </>
                :
                <>
                  <div className="grid md:grid-cols-12 row_controll bg-new-account">
                    <div className="md:col-span-6 mx-3 mb-6">
                      <label>{dic?.country}</label>
                      <Controller
                        control={control}
                        name="country"
                        rules={{
                          required: { value: true, message: `${dic?.errorCountry}` },
                        }}
                        render={({ field }: any) => (
                          <div className="mt-2">
                            <GetCountrys propsField={field} propsLabel={'Estado*'} propsErrors={errors} />
                          </div>
                        )}
                      />
                      <ErrorMessage
                        errors={errors}
                        name="country"
                        render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                      />
                    </div>
                  </div>
                </>
            }

            <div className="flex flex-col items-end">
              <div className="mt-4">
                {loading === false && lng === searchParams.lng ? (
                  <>{renderCaptcha()}</>
                ) : (
                  <></>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="btn btn-primary md:col-span-2 rounded-md my-4"
                >
                  {dic?.save}
                </button>

              </div>
              <p>
                {dic?.haveAccount}{" "}
                <span className={styles.link}>
                  <Link href="/login"> {dic?.login}</Link>
                </span>
              </p>
            </div>
          </form>

          <Divider lines={1} />

          <div className="flex justify-end">
            <div className="md:col-span-4 text-primary font-medium flex justify-start gap-4">
              <Link href="/termos-de-compra"> {dic?.terms}</Link>
              <Link href="/politica-de-privacidade">{dic?.privacy}</Link>
            </div>
          </div>
        </div>
        <Modal
          btnClose={false}
          showModal={modalShow}
          setShowModal={setModalShow}
        >
          <div
            style={{ height: "340px" }}
            className={`${styles.modal_body} rounded-lg bg-white w-full py-4 px-6 flex flex-col justify-evenly items-center`}
          >
            <div>
              {modalLog === 1 ? (
                <>{IconTimes("5rem", "5rem")}</>
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
      </>
    </>
  );
};

export default CreateAccount;
