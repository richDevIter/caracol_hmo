'use client'
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { ErrorMessage } from "@hookform/error-message";

import styles from "./FormPersonal.module.css";
import MaskedInput from "../MaskedInput/MaskedInput";
import SingleCalendarBirthday from "../Calendar/SingleCalendarBirthday";
import Modal from "../base/Modal/Modal";
import { IconCheckCircle, IconSpinner, IconTimes } from "@/assets/icons";
import { useParams, useRouter } from "next/navigation";
import { getDictionary } from "@/dictionaries";

React.useLayoutEffect = React.useEffect;

export interface propForm {
    action: any,
    choice: any,
    supplierControlObject: any
};

const Formpersonal: React.FC<propForm> = /* React.memo */(({
    action, choice, supplierControlObject
}: propForm) => {


    const searchParams = useParams();
    const [dic, setDic] = useState<any>(null);
  
    useEffect(() => {
        const fetchDictionary = async () => {
            const dictionary = await getDictionary(searchParams.lng as "pt" | "en" | "es", 'affiliate');
            setDic(dictionary);
        };
    
        fetchDictionary();
    
    }, [searchParams.lng])

    
    const router = useRouter();

    const [isLegal, setIsLegal] = useState<boolean>(true);
    const [date, setDate] = useState<any>([]);
    //const [cpf, setCpf] = useState<any>([]);

    const [cpfValidation, setCpfValidation] = useState<boolean>(false);   ///usado nos atributos "isValid" e "isInvald" do cpf
    const [passwordStr, setPasswordStr] = useState<any>(0);
    const [passwordStrColor, setPasswordStrColor] = useState<any>('#ccc');
    const [passwordStrText, setPasswordStrText] = useState<any>('');
    const [passwordValidation, setPasswordValidation] = useState<boolean>(false);   ///usado nos atributos "isValid" e "isInvald" dos inputs

    const [modalShow, setModalShow] = useState<any>(false);
    const [modalMessage, setModalMessage] = useState<any>('Carregando');
    const [modalLog, setModalLog] = useState<any>(null);

    choice(isLegal);

    var regex = /^(?=.*[a-z]{1})(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    var regexLetter = /^(?=.*[A-Za-z]{1})/;
    var regexNumber = /^(?=.*\d)/;
    var regexSymble = /^(?=.*[@$!%*#?&])/;

    const validated = false;

    const {
        control,
        handleSubmit,
        watch,
        setValue,
        getValues,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            compType: supplierControlObject ? supplierControlObject.compType : '',
            /* Pessoa Física */
            clientsType: supplierControlObject ? supplierControlObject.clientsType : '9',
            firstName: supplierControlObject ? supplierControlObject.firstName : '',
            lastName: supplierControlObject ? supplierControlObject.lastName : '',
            email: supplierControlObject ? supplierControlObject.email : '',
            cellPhone: supplierControlObject ? supplierControlObject.cellPhone : '',
            cpf: supplierControlObject ? supplierControlObject.cpf : '',
            rg: supplierControlObject ? supplierControlObject.rg : '',
            orIssuer: supplierControlObject ? supplierControlObject.orIssuer : '',
            password: supplierControlObject ? supplierControlObject.password : '',
            confirm: supplierControlObject ? supplierControlObject.password : '',

            /* Pessoa Jurídica */
            fantasyName: supplierControlObject ? supplierControlObject.fantasyName : '',
            socialReason: supplierControlObject ? supplierControlObject.socialReason : '',
            clientsTypeJuridico: supplierControlObject ? supplierControlObject.clientsType : '2',
            cnpj: supplierControlObject ? supplierControlObject.cnpj : '',
            companyEmail: supplierControlObject ? supplierControlObject.companyEmail : '',
            municipalId: supplierControlObject ? supplierControlObject.municipalId : '',
            estadualId: supplierControlObject ? supplierControlObject.estadualId : '',
            phone: supplierControlObject ? supplierControlObject.phone : '',
        },
    });

    useEffect(() => {
        setValue('cpf', supplierControlObject?.cpf);
        setDate(supplierControlObject?.birthDate?.split("-").reverse().join("/"));
    }, [setValue, supplierControlObject?.birthDate, supplierControlObject?.cpf])

    useEffect(() => {
        Validation();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function Validation() {
        var strength: any = 0;
        var password = (document.getElementById('password') as HTMLInputElement)?.value;

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

    const category = watch(`clientsType`, "9");
    const categoryJuridico = watch(`clientsTypeJuridico`, "2");

    //supplierType e compType

    const onSubmit = (data: any) => {
        if (isLegal === true && data.phone.replaceAll("_", "").replaceAll("(", "").replaceAll(")", "").replaceAll("-", "").replaceAll(" ", "").length < 10) {
            setModalShow(true);
            setModalMessage("Por favor, preencha um telefone da empresa válido!");
            setModalLog(1);

            return;
        }

        if (data.cellPhone.replaceAll("_", "").replaceAll("(", "").replaceAll(")", "").replaceAll("-", "").replaceAll(" ", "").length < 10) {
            setModalShow(true);
            setModalMessage("Por favor, preencha um telefone válido!");
            setModalLog(1);

            return;
        }


        if (date === undefined) {
            setModalShow(true);
            setModalMessage("Por favor, preencha a data de nascimento!");
            setModalLog(1);

            return;
        }

        if (data.password !== data.confirm) {
            setModalShow(true);
            setModalMessage("Senhas diferentes!");
            setModalLog(1);

            return;
        }

        if (CpfValidator(data.cpf) === false) {
            setModalShow(true);
            setModalMessage("CPF inválido!!");
            setModalLog(1);

            return;
        }

        if (isLegal !== false) {
            if (typeof data.municipalId === typeof '') {
                data.municipalId = Number(data.municipalId.split('.').join(''));
            }
            if (typeof data.estadualId === typeof '') {
                data.estadualId = Number(data.estadualId.split('.').join(''));
            }
        } else {
            data.municipalId = 0;
            data.estadualId = 0;
        }

        if (data.password.length >= 8 && passwordValidation === true) {
            //setRegexValid(false);
            data.compType = isLegal === false ? 2 : 1;
            data.clientsType = isLegal === false ? Number(getValues('clientsType')) : Number(getValues('clientsTypeJuridico'));
            data.clientsTypeJuridico = undefined
            data.birthDate = date.length > 1 ? date.split("/").reverse().join("-") : date[0].split("/").reverse().join("-");
            /* data.municipalId = isLegal !== false ? data.municipalId : '0';
            data.estadualId = isLegal !== false ? data.estadualId : '0'; */
            data.supplierIdentity = "";
            data.confirm = undefined;
            data.cpf = data.cpf?.split(".").join("").replace("-", "");
            data.cnpj = data.cnpj?.split(".").join("").replace("-", "").replace("/", "");
            data.cellPhone = data.cellPhone?.replace("_", "").replace("(", "").replace(")", "").replace("-", "").replace(" ", "");
            data.phone = data.phone.replace("_", "").replace("(", "").replace(")", "").replace("-", "").replace(" ", "");
            action(data);

        } else {
            //setRegexValid(true);
            setModalShow(true);
            setModalMessage("Senha fraca!!");
            setModalLog(1);
        }

    }

    function CpfValidator(strCPF: any) {
        strCPF = strCPF.replace(/\./g, '').replace(/-/g, '').replace(/_/g, '');  //remove ".", "-" e "-" que a máscara coloca
        var Soma;
        var Resto;
        Soma = 0;

        if (strCPF === "00000000000") {
            setCpfValidation(false)
            return false;
        }

        for (var i: any = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto === 10) || (Resto === 11)) Resto = 0;
        if (Resto !== parseInt(strCPF.substring(9, 10))) {
            setCpfValidation(false)
            return false;
        }

        Soma = 0;
        for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto === 10) || (Resto === 11)) Resto = 0;
        if (Resto !== parseInt(strCPF.substring(10, 11))) {
            setCpfValidation(false)
            return false;
        }

        setCpfValidation(true)
        return true;
    }

    useEffect(() => {
        reset();
        //setValue('compType','');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLegal])

    const handleBlurConfirmPassword = () => {
        let data: any = getValues();

        if (data.password !== data.confirm) {
            setModalShow(true);
            setModalMessage("Senhas diferentes!");
            setModalLog(1);
        }
    }

    return (
        <>
            <div>
                <form noValidate onSubmit={handleSubmit(onSubmit)} autoComplete="false">
                    <div className="grid grid-cols-12 mb-4">
                        <div className="col-span-12 md:col-span-1 flex items-center">
                            <span>Eu sou *</span>
                        </div>
                        <div className="col-span-12 md:col-span-2">
                            <div className="flex items-center">
                                <Controller
                                    control={control}
                                    name="compType"
                                    render={({ field }: any) => (
                                        <input
                                            {...field}
                                            onClick={() => { setIsLegal(true) }}
                                            checked={true}
                                            type="radio"
                                            variant="standard"
                                            margin="normal"
                                            value="2"
                                            required
                                            className={`${styles.form_check} mx-2`}
                                        />
                                    )}
                                />
                                <label className="mb-0">
                                Pessoa Jurídica
                                </label>
                            </div>
                        </div>
                    </div>
                    {
                        isLegal === false
                            ?
                            <>
                                <div className="grid grid-cols-12 gap-0 md:gap-6">
                                    <div className="col-span-12 md:col-span-6 mb-3">
                                        <label>
                                            {dic?.name}
                                        </label>
                                        <Controller
                                            control={control}
                                            name="firstName"
                                            rules={{
                                                required: {
                                                    value: true,
                                                    message: dic?.formError
                                                },
                                                minLength: {
                                                    value: 3,
                                                    message: dic?.valCaracteres3,
                                                }
                                            }}
                                            render={({ field }: any) => (
                                                <input
                                                    {...field}
                                                    aria-invalid={errors?.firstName ? "true" : ""}
                                                    variant="standard"
                                                    margin="normal"
                                                    autoComplete="off"
                                                    className={`${styles.form_control}`}
                                                    onKeyPress={(e: any) => !/[a-zA-Z ]/.test(e.key) && e.preventDefault()}

                                                />
                                            )}
                                        />
                                        <ErrorMessage
                                            errors={errors}
                                            name="firstName"
                                            render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                                        />
                                    </div>
                                    <div className="col-span-12 md:col-span-6 mb-3">
                                        <label>
                                            {dic?.lastName}
                                        </label>
                                        <Controller
                                            control={control}
                                            name="lastName"
                                            rules={{
                                                required: {
                                                    value: true,
                                                    message: dic?.formError
                                                },
                                                minLength: {
                                                    value: 3,
                                                    message: dic?.valCaracteres3,
                                                }
                                            }}
                                            render={({ field }: any) => (
                                                <input
                                                    {...field}
                                                    aria-invalid={errors?.lastName ? "true" : ""}
                                                    variant="standard"
                                                    margin="normal"
                                                    autoComplete="off"
                                                    className={`${styles.form_control}`}
                                                    onKeyPress={(e: any) => !/[a-zA-Z ]/.test(e.key) && e.preventDefault()}
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
                                <div className="grid grid-cols-12 gap-0 md:gap-6">
                                    <div className="col-span-12 md:col-span-6 flex flex-col mb-3">
                                        <label>
                                            {dic?.birthDate}
                                        </label>
                                        {/* <InputGroup
                                            className=""
                                            size="sm"
                                            placeholder="Quando?"
                                        > */}
                                        <SingleCalendarBirthday setValue={setDate} defaultTime={date} />
                                        {/* </InputGroup> */}
                                    </div>
                                    <div className="col-span-12 md:col-span-6 mb-3">
                                        <label>
                                            {dic?.email}
                                        </label>
                                        <Controller
                                            control={control}
                                            name="email"
                                            rules={{
                                                required: {
                                                    value: true,
                                                    message: dic?.formError
                                                },
                                                pattern: {
                                                    value: /\S+@\S+\.\S+/,
                                                    message: dic?.valEmailInval,
                                                },
                                            }}
                                            render={({ field }: any) => (
                                                <input
                                                    {...field}
                                                    type="email"
                                                    aria-invalid={errors?.email ? "true" : ""}
                                                    variant="standard"
                                                    margin="normal"
                                                    autoComplete="off"
                                                    className={`${styles.form_control}`}
                                                />
                                            )}
                                        />
                                        <ErrorMessage
                                            errors={errors}
                                            name="email"
                                            render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-12 gap-0 md:gap-6">
                                    <div className="col-span-12 md:col-span-6 mb-3">
                                        <label>
                                            {dic?.phone}
                                        </label>
                                        <Controller
                                            control={control}
                                            name="cellPhone"
                                            rules={{
                                                required: {
                                                    value: true,
                                                    message: dic?.formError
                                                }
                                            }}
                                            render={({ field }: any) => (
                                                <MaskedInput className={styles.form_control} field={field} mask="(99) 99999-9999" placeholder="" />
                                            )}
                                        />
                                        <ErrorMessage
                                            errors={errors}
                                            name="cellPhone"
                                            render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                                        />
                                    </div>
                                    <div className="col-span-12 md:col-span-6 mb-3">
                                        <label>
                                            {dic?.cpf}
                                        </label>
                                        <Controller
                                            control={control}
                                            name="cpf"
                                            rules={{ required: { value: true, message: dic?.formError } }}
                                            render={({ field }: any) => (
                                                <MaskedInput className={styles.form_control} field={field} mask="999.999.999-99" placeholder="" />
                                            )}
                                        />
                                        <ErrorMessage
                                            errors={errors}
                                            name="cpf"
                                            render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-12 gap-0 md:gap-6">
                                    <div className="col-span-12 md:col-span-6 mb-3">
                                        <label className="notranslate">
                                            {dic?.rg}
                                        </label>
                                        <Controller
                                            control={control}
                                            name="rg"
                                            rules={{
                                                required: {
                                                    value: true,
                                                    message: dic?.formError
                                                },
                                                minLength: {
                                                    value: 6,
                                                    message: dic?.valCaracteres6,
                                                }
                                            }}
                                            render={({ field }: any) => (
                                                <input
                                                    {...field}
                                                    aria-invalid={errors?.rg ? "true" : ""}
                                                    variant="standard"
                                                    margin="normal"
                                                    autoComplete="off"
                                                    onKeyPress={(e: any) => !/[0-9]/.test(e.key) && e.preventDefault()}
                                                    className={`${styles.form_control}`}
                                                />
                                            )}
                                        />
                                        <ErrorMessage
                                            errors={errors}
                                            name="rg"
                                            render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                                        />
                                    </div>
                                    <div className="col-span-12 md:col-span-6 mb-3">
                                        <label>
                                            {dic?.issuingBody}
                                        </label>
                                        <Controller
                                            control={control}
                                            name="orIssuer"
                                            rules={{ required: { value: true, message: dic?.formError } }}
                                            render={({ field }: any) => (
                                                <input
                                                    {...field}
                                                    aria-invalid={errors?.orIssuer ? "true" : ""}
                                                    variant="standard"
                                                    margin="normal"
                                                    autoComplete="off"
                                                    className={`${styles.form_control}`}
                                                    onKeyPress={(e: any) => !/[a-zA-Z ]/.test(e.key) && e.preventDefault()}
                                                />
                                            )}
                                        />
                                        <ErrorMessage
                                            errors={errors}
                                            name="orIssuer"
                                            render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-12 gap-0 md:gap-6">
                                    <div className="col-span-12 md:col-span-6 mb-3">
                                        <label>
                                            {dic?.categoria}
                                        </label>
                                        <Controller
                                            control={control}
                                            name="clientsType"
                                            //rules={{ required: { value: true, message: t("formError") } }}
                                            defaultValue={category}
                                            render={({ field }: any) => (
                                                <select
                                                    {...field}
                                                    aria-invalid={errors?.clientsType ? "true" : ""}
                                                    label="Categoria"
                                                    as="select"
                                                    variant="standard"
                                                    margin="normal"
                                                    className={`${styles.form_control}`}
                                                    required
                                                >
                                                    {/* <option value="" selected disabled>Selecione</option> */}
                                                    <option value="9">Guia Turistico</option>
                                                    <option value="11">Motorista</option>
                                                    <option value="12">Recepcionista</option>
                                                    <option value="13">Outros</option>
                                                </select>
                                            )}
                                        />
                                        {/* <ErrorMessage
                                        errors={errors}
                                        name="supplierVehicleTypeModel"
                                        render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                                    /> */}
                                    </div>
                                </div>
                                <div className="grid grid-cols-12 gap-0 md:gap-6 mb-3">
                                    <div className="col-span-12 md:col-span-6 mb-3">
                                        <label>
                                            {dic?.password}
                                        </label>
                                        <Controller
                                            control={control}
                                            name="password"
                                            rules={{ required: { value: true, message: dic?.formError } }}
                                            render={({ field }: any) => (
                                                <input
                                                    {...field}
                                                    type="password"
                                                    aria-invalid={errors?.password ? "true" : ""}
                                                    variant="standard"
                                                    id="password"
                                                    margin="normal"
                                                    autoComplete="off"
                                                    onInput={() => Validation()}
                                                    className={`${styles.form_control}`}
                                                />
                                            )}
                                        />
                                        <div className={`${styles.password_strength_container} flex justify-evenly`}>
                                            <div className={`${styles.password_strength} flex items-center col-span-3`} style={{ borderColor: `${passwordStr >= 1 ? passwordStrColor : ''}` }}></div>
                                            <div className={`${styles.password_strength} flex items-center col-span-3`} style={{ borderColor: `${passwordStr >= 2 ? passwordStrColor : ''}` }}></div>
                                            <div className={`${styles.password_strength} flex items-center col-span-3`} style={{ borderColor: `${passwordStr >= 3 ? passwordStrColor : ''}` }}></div>
                                            <div className={`${styles.password_strength} flex items-center col-span-3`} style={{ borderColor: `${passwordStr >= 4 ? passwordStrColor : ''}` }}></div>
                                        </div>
                                        <div className="flex justify-center" style={{ color: `${passwordStrColor}` }}>
                                            {passwordStrText}
                                        </div>
                                        <small style={{ fontSize: ".8rem", opacity: ".7" }}>{dic?.passwordRule}</small>

                                    </div>
                                    <div className="col-span-12 md:col-span-6 mb-3">
                                        <label>
                                            {dic?.confirmPassword}
                                        </label>
                                        <Controller
                                            control={control}
                                            name="confirm"
                                            rules={{ required: { value: true, message: dic?.formError } }}
                                            render={({ field }: any) => (
                                                <input
                                                    {...field}
                                                    type="password"
                                                    aria-invalid={errors?.confirm ? "true" : ""}
                                                    variant="standard"
                                                    margin="normal"
                                                    onBlur={() => { handleBlurConfirmPassword() }}
                                                    autoComplete="off"
                                                    className={`${styles.form_control}`}
                                                />
                                            )}
                                        />
                                    </div>
                                </div>
                            </>
                            :
                            <>
                                <div className="grid grid-cols-12 gap-0 md:gap-6">
                                    <div className="col-span-12 md:col-span-6 mb-3">
                                        <label>
                                            {dic?.fantasyName}
                                        </label>
                                        <Controller
                                            control={control}
                                            name="fantasyName"
                                            rules={{ required: { value: true, message: dic?.formError } }}
                                            render={({ field }: any) => (
                                                <input
                                                    {...field}
                                                    aria-invalid={errors?.fantasyName ? "true" : ""}
                                                    variant="standard"
                                                    margin="normal"
                                                    autoComplete="off"
                                                    className={`${styles.form_control}`}
                                                />
                                            )}
                                        />
                                        <ErrorMessage
                                            errors={errors}
                                            name="fantasyName"
                                            render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                                        />
                                    </div>
                                    <div className="col-span-12 md:col-span-6 mb-3">
                                        <label>
                                            {dic?.social}
                                        </label>
                                        <Controller
                                            control={control}
                                            name="socialReason"
                                            rules={{ required: { value: true, message: dic?.formError } }}
                                            render={({ field }: any) => (
                                                <input
                                                    {...field}
                                                    aria-invalid={errors?.socialReason ? "true" : ""}
                                                    variant="standard"
                                                    margin="normal"
                                                    autoComplete="off"
                                                    className={`${styles.form_control}`}
                                                />
                                            )}
                                        />
                                        <ErrorMessage
                                            errors={errors}
                                            name="socialReason"
                                            render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-12 gap-0 md:gap-6">
                                    <div className="col-span-12 md:col-span-6 mb-3">
                                        <label>
                                            {dic?.cnpj}
                                        </label>
                                        <Controller
                                            control={control}
                                            name="cnpj"
                                            rules={{ required: { value: true, message: dic?.formError } }}
                                            render={({ field }: any) => (
                                                <MaskedInput className={styles.form_control} field={field} mask="99.999.999/9999-99" placeholder="" />
                                            )}
                                        />
                                        <ErrorMessage
                                            errors={errors}
                                            name="cnpj"
                                            render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                                        />
                                    </div>
                                    <div className="col-span-12 md:col-span-6 mb-3">
                                        <label>
                                            {dic?.companyName}
                                        </label>
                                        <Controller
                                            control={control}
                                            name="companyEmail"
                                            rules={{
                                                required: {
                                                    value: true,
                                                    message: dic?.formError
                                                },
                                                pattern: {
                                                    value: /\S+@\S+\.\S+/,
                                                    message:  dic?.valEmailInval,
                                                },
                                            }}
                                            render={({ field }: any) => (
                                                <input
                                                    {...field}
                                                    aria-invalid={errors?.companyEmail ? "true" : ""}
                                                    variant="standard"
                                                    margin="normal"
                                                    autoComplete="off"
                                                    className={`${styles.form_control}`}
                                                />
                                            )}
                                        />
                                        <ErrorMessage
                                            errors={errors}
                                            name="companyEmail"
                                            render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-12 gap-0 md:gap-6">
                                    <div className="col-span-12 md:col-span-6 mb-3">
                                        <label>
                                            {dic?.companyPhone}
                                        </label>
                                        <Controller
                                            control={control}
                                            name="phone"
                                            rules={{ required: { value: true, message: dic?.formError } }}
                                            render={({ field }: any) => (
                                                <MaskedInput className={styles.form_control} field={field} mask="(99) 99999-9999" placeholder="" />
                                            )}
                                        />
                                        <ErrorMessage
                                            errors={errors}
                                            name="phone"
                                            render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                                        />
                                    </div>
                                    <div className="col-span-12 md:col-span-6 mb-3">
                                        <label>
                                            {dic?.categoria}
                                        </label>
                                        <Controller
                                            control={control}
                                            defaultValue={categoryJuridico}
                                            name="clientsTypeJuridico"
                                            rules={{ required: { value: false, message: dic?.formError } }}
                                            render={({ field }: any) => (
                                                <select
                                                    {...field}
                                                    aria-invalid={errors?.clientsTypeJuridico ? "true" : ""}
                                                    label="Categoria"
                                                    as="select"
                                                    variant="standard"
                                                    margin="normal"
                                                    className={`${styles.form_control}`}
                                                    required
                                                >
                                                    <option value='1'>OTA</option>
                                                    <option value="2">Operadora Turística</option>
                                                    <option value="3">Agência de Viagem</option>
                                                    <option value="4">DMC</option>
                                                    <option value='5'>Hotéis</option>
                                                    <option value="6">Empresa</option>
                                                    {/* <option value="7">Pessoa Física</option> */}
                                                    <option value="8">Fornecedores</option>
                                                    {/* <option value='10'>Cliente Interno</option> */}
                                                </select>
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-12 gap-0 md:gap-6">
                                    <div className="col-span-12 md:col-span-6 mb-3">
                                        <label>
                                            {dic?.municipalRegistration}
                                        </label>
                                        <Controller
                                            control={control}
                                            name="municipalId"
                                            rules={{ required: { value: true, message: dic?.formError } }}
                                            render={({ field }: any) => (
                                                <input
                                                    {...field}
                                                    aria-invalid={errors?.municipalId ? "true" : ""}
                                                    variant="standard"
                                                    margin="normal"
                                                    autoComplete="off"
                                                    onKeyPress={(e: any) => !/[0-9]/.test(e.key) && e.preventDefault()}
                                                    maxLength={15}
                                                    className={`${styles.form_control}`}
                                                />
                                            )}
                                        />
                                        <ErrorMessage
                                            errors={errors}
                                            name="municipalId"
                                            render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                                        />
                                    </div>
                                    <div className="col-span-12 md:col-span-6 mb-3">
                                        <label>
                                            {dic?.stateRegistration}
                                        </label>
                                        <Controller
                                            control={control}
                                            name="estadualId"
                                            rules={{ required: { value: false, message: dic?.formError } }}
                                            render={({ field }: any) => (
                                                <input
                                                    {...field}
                                                    aria-invalid={errors?.estadualId ? "true" : ""}
                                                    variant="standard"
                                                    margin="normal"
                                                    autoComplete="off"
                                                    onKeyPress={(e: any) => !/[0-9]/.test(e.key) && e.preventDefault()}
                                                    maxLength={15}
                                                    className={`${styles.form_control}`}
                                                />
                                            )}
                                        />
                                        {/* <ErrorMessage
                                            errors={errors}
                                            name="supplierVehicleTypeModel"
                                            render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                                        /> */}
                                    </div>
                                </div>
                                <div className="grid grid-cols-12 gap-0 md:gap-6">
                                    <div className="col-span-12 md:col-span-6 mb-3">
                                        <label>
                                            {dic?.representativeName}
                                        </label>
                                        <Controller
                                            control={control}
                                            name="firstName"
                                            rules={{
                                                required: {
                                                    value: true,
                                                    message: dic?.formError
                                                },
                                                minLength: {
                                                    value: 3,
                                                    message: dic?.valCaracteres3,
                                                }
                                            }}
                                            render={({ field }: any) => (
                                                <input
                                                    {...field}
                                                    aria-invalid={errors?.firstName ? "true" : ""}
                                                    variant="standard"
                                                    margin="normal"
                                                    autoComplete="off"
                                                    className={`${styles.form_control}`}
                                                    onKeyPress={(e: any) => !/[a-zA-Z ]/.test(e.key) && e.preventDefault()}
                                                />
                                            )}
                                        />
                                        <ErrorMessage
                                            errors={errors}
                                            name="firstName"
                                            render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                                        />
                                    </div>
                                    <div className="col-span-12 md:col-span-6 mb-3">
                                        <label>
                                            {dic?.representativeLastName}
                                        </label>
                                        <Controller
                                            control={control}
                                            name="lastName"
                                            rules={{ 
                                                required: { 
                                                    value: true,
                                                    message: dic?.formError 
                                                },
                                                minLength: {
                                                    value: 3,
                                                    message: dic?.valCaracteres3,
                                                } 
                                            }}
                                            render={({ field }: any) => (
                                                <input
                                                    {...field}
                                                    aria-invalid={errors?.lastName ? "true" : ""}
                                                    variant="standard"
                                                    margin="normal"
                                                    autoComplete="off"
                                                    className={`${styles.form_control}`}
                                                    onKeyPress={(e: any) => !/[a-zA-Z ]/.test(e.key) && e.preventDefault()}
                                                />
                                            )}
                                        />
                                        <ErrorMessage
                                            errors={errors}
                                            name="lastName"
                                            render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                                        />
                                        {/* <ErrorMessage
                                            errors={errors}
                                            name="supplierVehicleTypeModel"
                                            render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                                        /> */}
                                    </div>
                                </div>
                                <div className="grid grid-cols-12 gap-0 md:gap-6">
                                    <div className="col-span-12 md:col-span-6 mb-3">
                                        <label>
                                            {dic?.representativeEmail}
                                        </label>
                                        <Controller
                                            control={control}
                                            name="email"
                                            rules={{
                                                required: {
                                                    value: true,
                                                    message: dic?.formError
                                                },
                                                pattern: {
                                                    value: /\S+@\S+\.\S+/,
                                                    message: dic?.valEmailInval,
                                                }
                                            }}
                                            render={({ field }: any) => (
                                                <input
                                                    {...field}
                                                    type="email"
                                                    aria-invalid={errors?.email ? "true" : ""}
                                                    variant="standard"
                                                    margin="normal"
                                                    autoComplete="off"
                                                    className={`${styles.form_control}`}
                                                />
                                            )}
                                        />
                                        <ErrorMessage
                                            errors={errors}
                                            name="email"
                                            render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                                        />
                                    </div>
                                    <div className="col-span-12 md:col-span-6 mb-3">
                                        <label>
                                            {dic?.representativePhone}
                                        </label>
                                        <Controller
                                            control={control}
                                            name="cellPhone"
                                            rules={{ required: { value: true, message: dic?.formError } }}
                                            render={({ field }: any) => (
                                                <MaskedInput className={styles.form_control} field={field} mask="(99) 99999-9999" placeholder="" />
                                            )}
                                        />
                                        <ErrorMessage
                                            errors={errors}
                                            name="cellPhone"
                                            render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-12 gap-0 md:gap-6">
                                    <div className="col-span-12 md:col-span-6 mb-3">
                                        <label>
                                            {dic?.representativeCpf}
                                        </label>
                                        <Controller
                                            control={control}
                                            name="cpf"
                                            rules={{ required: { value: true, message: dic?.formError } }}
                                            render={({ field }: any) => (
                                                <MaskedInput className={styles.form_control} field={field} mask="999.999.999-99" placeholder="" />
                                            )}
                                        />
                                        <ErrorMessage
                                            errors={errors}
                                            name="cpf"
                                            render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                                        />
                                    </div>
                                    <div className="col-span-12 md:col-span-6 mb-3">
                                        <label>
                                            {dic?.representativeRG}
                                        </label>
                                        <Controller
                                            control={control}
                                            name="rg"
                                            rules={{ 
                                                required: { 
                                                    value: true, 
                                                    message: dic?.formError 
                                                },
                                                minLength: {
                                                    value: 6,
                                                    message: dic?.valCaracteres6 ,
                                                }
                                            }}
                                            render={({ field }: any) => (
                                                <input
                                                    {...field}
                                                    aria-invalid={errors?.rg ? "true" : ""}
                                                    variant="standard"
                                                    margin="normal"
                                                    autoComplete="off"
                                                    onKeyPress={(e: any) => !/[0-9]/.test(e.key) && e.preventDefault()}
                                                    className={`${styles.form_control}`}
                                                />
                                            )}
                                        />
                                        <ErrorMessage
                                            errors={errors}
                                            name="rg"
                                            render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-12 gap-0 md:gap-6">
                                    <div className="col-span-12 md:col-span-6 mb-3">
                                        <label>
                                            {dic?.representativeBirthDate}
                                        </label>
                                        <SingleCalendarBirthday setValue={setDate} defaultTime={date} />
                                    </div>
                                </div>
                                <div className="grid grid-cols-12 gap-0 md:gap-6">
                                    <div className="col-span-12 md:col-span-6 mb-3">
                                        <label>
                                            {dic?.password}
                                        </label>
                                        <Controller
                                            control={control}
                                            name="password"
                                            rules={{ required: { value: true, message: dic?.formError } }}
                                            render={({ field }: any) => (
                                                <input
                                                    {...field}
                                                    type="password"
                                                    aria-invalid={errors?.password ? "true" : ""}
                                                    id="password"
                                                    variant="standard"
                                                    margin="normal"
                                                    autoComplete="off"
                                                    onInput={() => Validation()}
                                                    className={`${styles.form_control}`}
                                                />
                                            )}
                                        />
                                        <div className={`${styles.password_strength_container} flex justify-evenly`}>
                                            <div className={`${styles.password_strength} flex items-center col-span-3`} style={{ borderColor: `${passwordStr >= 1 ? passwordStrColor : ''}` }}></div>
                                            <div className={`${styles.password_strength} flex items-center col-span-3`} style={{ borderColor: `${passwordStr >= 2 ? passwordStrColor : ''}` }}></div>
                                            <div className={`${styles.password_strength} flex items-center col-span-3`} style={{ borderColor: `${passwordStr >= 3 ? passwordStrColor : ''}` }}></div>
                                            <div className={`${styles.password_strength} flex items-center col-span-3`} style={{ borderColor: `${passwordStr >= 4 ? passwordStrColor : ''}` }}></div>
                                        </div>
                                        <div className="flex justify-center" style={{ color: `${passwordStrColor}` }}>
                                            {passwordStrText}
                                        </div>
                                        <small style={{ fontSize: ".8rem", opacity: ".7" }}>{dic?.passwordRule}</small>
                                    </div>
                                    <div className="col-span-12 md:col-span-6 mb-3">
                                        <label>
                                            {dic?.confirmPassword}
                                        </label>
                                        <Controller
                                            control={control}
                                            name="confirm"
                                            rules={{ required: { value: true, message: dic?.formError } }}
                                            render={({ field }: any) => (
                                                <input
                                                    {...field}
                                                    type="password"
                                                    aria-invalid={errors?.confirm ? "true" : ""}
                                                    variant="standard"
                                                    margin="normal"
                                                    onBlur={() => { handleBlurConfirmPassword() }}
                                                    autoComplete="off"
                                                    className={`${styles.form_control}`}
                                                />
                                            )}
                                        />
                                        {/* <ErrorMessage
                                            errors={errors}
                                            name="supplierVehicleTypeModel"
                                            render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                                        /> */}
                                    </div>
                                </div>
                            </>
                    }

                    <div className="grid grid-cols-12 pt-12">
                        <div className="col-span-12 md:col-start-10 md:col-span-3">
                            <button type="submit" className={`${styles.btn_continue} btn btn-primary`}>{dic?.continue}</button>
                        </div>
                    </div>

                </form>
                {/* <Modal
                    className="modalAuth modal-validation"
                    show={modalShow}
                    onHide={() => {
                        setModalLog(null);
                        setModalMessage("Carregando");
                        setModalShow(false);
                    }}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <>
                        <Modal.Body
                            className="modal-body text-center sucess-pos modal-default d-flex flex-column justify-content-evenly px-4"
                        >
                            {modalLog === null ? (
                                <>
                                    <div className="loading-modal">
                                        <div className="load"></div>
                                    </div>
                                </>
                            ) : (
                                <div>
                                    {modalLog === 0 ? (
                                        <FontAwesomeIcon
                                            icon={["fal", "check"]}
                                            size="5x"
                                        />
                                    ) : (
                                        <FontAwesomeIcon
                                            icon={["fal", "times"]}
                                            size="5x"
                                        />
                                    )}
                                </div>
                            )}
                            <div>
                                <h5 className="mb-1">{modalLog === 1 ? "Erro na validação!" : modalLog === 0 ? "Sucesso!" : "Esperando validação!"}</h5>
                                <small style={{ color: "#707070" }}>{modalMessage}</small>
                            </div>
                            <div className="d-flex justify-content-center pt-3">
                                <button
                                    onClick={() => {
                                        setModalLog(null);
                                        setModalMessage("Carregando");
                                        setModalShow(false);
                                    }}
                                    className="btn btn-primary mx-2 w-25"
                                >
                                    Confirmar
                                </button>
                            </div>
                        </Modal.Body>
                    </>
                </Modal> */}

                <Modal
                    btnClose={false}
                    showModal={modalShow}
                    setShowModal={setModalShow}
                >
                    <div
                        style={{ height: '340px', maxWidth: "480px" }}
                        className={`${styles.modal_body} rounded-lg bg-white w-full py-4 px-6 flex flex-col justify-evenly items-center m-auto`}
                    >
                        <div>
                            {modalLog === 1 ? (
                                <>{IconTimes("92", "92")}</>
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
            </div>
        </>
    )
});

export default Formpersonal;