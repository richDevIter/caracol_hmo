import React, { useEffect, useState } from "react";

import { Controller, useForm } from "react-hook-form";

/* import GetBanks from "../../../../../../components/C2Points/GetBanks"; */
import ReCAPTCHA from "react-google-recaptcha";
import { ErrorMessage } from "@hookform/error-message";

import styles from "./FormBank.module.css";
import GetBanks from "../base/DestPoints/GetBanks";
import { useParams } from "next/navigation";
import { getDictionary } from "@/dictionaries";

export interface propForm {
    action: any,
    back: any,
    supplierControlObject: any,
    setModalSuccess?: any,
    loading?: any,
    isRecaptcha?: any,
    setIsRecaptcha?: any
};

const FormBank: React.FC<propForm> = ({
    action, back, supplierControlObject, setModalSuccess, loading, isRecaptcha, setIsRecaptcha
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


    const validated = false;

    const {
        control,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            codBank: supplierControlObject?.codBank ? { id: supplierControlObject.codBank, description: supplierControlObject?.codBankDesc } : '',
            accountType: supplierControlObject ? supplierControlObject?.accountType : '1',
            agency: supplierControlObject ? supplierControlObject?.agency : '',
            digitAgency: supplierControlObject ? supplierControlObject?.digitAgency : '',
            account: supplierControlObject ? supplierControlObject?.account : '',
            digitAccount: supplierControlObject ? supplierControlObject?.digitAccount : '',
            checkPolice: supplierControlObject ? supplierControlObject?.checkPolice : '',
        },
    });

    const accountType = watch(`accountType`, "1");

    useEffect(() => {

    }, [])

    const onSubmit = (data: any) => {
        if (isRecaptcha !== null) {
            data.codBankDesc = data.codBank.description;
            data.codBank = data.codBank.id;
            //data.digitAgency = undefined;
            data.digitAccount = Number(data.digitAccount);

            setModalSuccess(true)
            action(data);
        } else {
            alert("Por favor, selecione o reCAPTCHA se deseja prosseguir")
        }
    }

    function handleRacaptcha(value: any) {
        setIsRecaptcha(value);
    }

    return (
        <>
            <div>
                <form noValidate onSubmit={handleSubmit(onSubmit)} autoComplete="false" className="form-affiliate">
                    <div className="grid grid-cols-12 gap-0 md:gap-6">
                        <div className="col-span-12 md:col-span-6 mb-3">
                            <label>
                                {dic?.bank}
                            </label>
                            <Controller
                                control={control}
                                name="codBank"
                                rules={{ required: { value: true, message: dic?.formError } }}
                                render={({ field }: any) => (
                                    <GetBanks propsField={field} propsErrors={errors} propsLabel="Banco" />
                                )}
                            />
                            <ErrorMessage
                                errors={errors}
                                name="codBank"
                                render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                            />
                        </div>
                        <div className="col-span-12 md:col-span-6 mb-3">
                            <label>
                                {dic?.accountType}
                            </label>
                            <Controller
                                control={control}
                                name="accountType"
                                defaultValue={accountType}
                                rules={{ required: { value: true, message: dic?.formError } }}
                                render={({ field }: any) => (
                                    <select
                                        {...field}
                                        aria-invalid={errors?.accountType ? "true" : ""}
                                        label="Categoria"
                                        as="select"
                                        variant="standard"
                                        margin="normal"
                                        className={`${styles.form_control}`}
                                        required
                                    >
                                        {/* <option value="" selected disabled>Selecione</option> */}
                                        <option value="1" selected>Corrente</option>
                                        <option value="2">Poupança</option>
                                    </select>
                                )}
                            />
                            <ErrorMessage
                                errors={errors}
                                name="accountType"
                                render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-12 gap-0 md:gap-6">
                        <div className="col-span-12 md:col-span-4 mb-3">
                            <label>
                                {dic?.agency}
                            </label>
                            <Controller
                                control={control}
                                name="agency"
                                rules={{ required: { value: true, message: dic?.formError } }}
                                render={({ field }: any) => (
                                    <input
                                        {...field}
                                        aria-invalid={errors?.agency ? "true" : ""}
                                        variant="standard"
                                        margin="normal"
                                        autoComplete="off"
                                        className={`${styles.form_control}`}
                                    />
                                )}
                            />
                            <ErrorMessage
                                errors={errors}
                                name="agency"
                                render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                            />
                        </div>
                        <div className="col-span-12 md:col-span-2 mb-3">
                            <label>
                                {dic?.digit}
                            </label>
                            <Controller
                                control={control}
                                name="digitAgency"
                                //rules={{ required: { value: true, message: t("formError") } }}
                                render={({ field }: any) => (
                                    <input
                                        {...field}
                                        //aria-invalid={errors?.digitAgency ? "true" : ""}
                                        variant="standard"
                                        margin="normal"
                                        autoComplete="off"
                                        maxLength={1}
                                        className={`${styles.form_control}`}
                                    />
                                )}
                            />
                            {/* <ErrorMessage
                                errors={errors}
                                name="digitAgency"
                                render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                            /> */}
                        </div>
                        <div className="col-span-12 md:col-span-4 mb-3">
                            <label>
                                {dic?.account}
                            </label>
                            <Controller
                                control={control}
                                name="account"
                                rules={{ required: { value: true, message: dic?.formError } }}
                                render={({ field }: any) => (
                                    <input
                                        {...field}
                                        aria-invalid={errors?.account ? "true" : ""}
                                        variant="standard"
                                        margin="normal"
                                        autoComplete="off"
                                        className={`${styles.form_control}`}
                                    />
                                )}
                            />
                            <ErrorMessage
                                errors={errors}
                                name="account"
                                render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                            />
                        </div>
                        <div className="col-span-12 md:col-span-2 mb-3">
                            <label>
                                {dic?.digit}
                            </label>
                            <Controller
                                control={control}
                                name="digitAccount"
                                rules={{ required: { value: true, message: dic?.formError } }}
                                render={({ field }: any) => (
                                    <input
                                        {...field}
                                        aria-invalid={errors?.digitAccount ? "true" : ""}
                                        variant="standard"
                                        margin="normal"
                                        autoComplete="off"
                                        maxLength={1}
                                        className={`${styles.form_control}`}
                                    />
                                )}
                            />
                            <ErrorMessage
                                errors={errors}
                                name="digitAccount"
                                render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-12 mt-1 mb-3">
                        <div className="col-span-12">
                            <label htmlFor="checkPolice">
                                <div className="flex items-center">
                                    <Controller
                                        control={control}
                                        name="checkPolice"
                                        rules={{ required: { value: true, message: dic?.termsWarning } }}
                                        render={({ field, e }: any) => (
                                            <input
                                                {...field}
                                                type="checkbox"
                                                id="checkPolice"
                                                name="check"
                                                className={`${styles.form_check} mr-2`}
                                            />
                                        )}
                                    />
                                    <label htmlFor="checkPolice" className="leading-8">{dic?.terms}</label>
                                </div>
                                <ErrorMessage
                                    errors={errors}
                                    name="checkPolice"
                                    render={({ message }) => <small style={{ color: "red", marginLeft: "25px" }}>{message}</small>}
                                />
                            </label>
                        </div>
                    </div>

                    <div className="flex flex-col items-end pt-2">
                        <div className="mb-3 bg-profile-recaptcha">
                            {
                                loading === false
                                    ?
                                    <ReCAPTCHA
                                        sitekey={`${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
                                        onChange={handleRacaptcha}
                                        size="normal"
                                        id="ReCAPTCHA"
                                    />
                                    :
                                    <></>
                            }
                        </div>
                    </div>

                    <div className="grid grid-cols-12 gap-3 md:gap-6 pt-3">
                        <div className="col-span-12 md:col-start-7 md:col-span-3">
                            <button className={`${styles.btn_back} btn w-full mb-3 mb-md-0`} onClick={() => back(2)}>{dic?.back}</button>
                        </div>
                        <div className="col-span-12 md:col-span-3">
                            <button type="submit" className="btn btn-primary w-full">{dic?.continue}</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default FormBank;