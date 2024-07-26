import React, { useState, useEffect } from "react";

import { Controller, useForm } from "react-hook-form";
//import { ErrorMessage } from '@hookform/error-message';

/* import apiGoogleMaps from "../../../../../../services/apiGoogleMaps";
import configData from "../../../../../../config/config.json"; */

//import Form from 'react-bootstrap/Form';
//import GetCountrysAffiliates from "../../../../../../components/C2Points/GetCountrysAffiliates";
//import GetCitysByState from "../../../../../../components/C2Points/GetCitysByState";
import { ErrorMessage } from "@hookform/error-message";
//import GetStates from "../../../../../../components/C2Points/GetStates";
import styles from "./FormAddress.module.css";
import GetStates from "../base/DestPoints/GetStates";
import GetCitysByState from "../base/DestPoints/GetCitysByState";
import { useParams } from "next/navigation";
import { getDictionary } from "@/dictionaries";
import GetStreetCode from "../base/DestPoints/GetStreetCode";
import GetDistrictCode from "../base/DestPoints/GetDistrictCode";

export interface propForm {
    action: any,
    back: any,
    supplierControlObject: any
};

const FormAddress: React.FC<propForm> = ({
    action, back, supplierControlObject
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

    const [cep] = useState('' || supplierControlObject?.cep);
    const [state, setState] = useState('' || supplierControlObject?.state);
    //const [city, setCity] = useState('' || supplierControlObject.city);
    const [address, setAddress] = useState('' || supplierControlObject?.address);
    const [district, setDistrict] = useState('' || supplierControlObject?.district);
    const validated = false;

    const {
        control,
        handleSubmit,
        register,
        formState: { errors },
        setValue,
        watch,
    } = useForm({
        defaultValues: {
            country: supplierControlObject?.country ? { id: supplierControlObject?.country, description: supplierControlObject?.countryDesc } : '',
            cep: supplierControlObject ? supplierControlObject?.cep : '',
            streetCode: supplierControlObject ? supplierControlObject?.streetCode : '',
            address: supplierControlObject ? supplierControlObject?.address : '',
            districtCode: supplierControlObject ? supplierControlObject?.districtCode : '',
            district: supplierControlObject ? supplierControlObject?.district : '',
            city: supplierControlObject?.city ? { id: supplierControlObject?.city, description: supplierControlObject?.city } : '',
            state: supplierControlObject?.state ? { id: supplierControlObject?.state, description: supplierControlObject?.stateDesc } : '',
            number: supplierControlObject ? supplierControlObject?.number : '',
            complement: supplierControlObject ? supplierControlObject?.complement : '',
        },
    });

    const watchState: any = watch(`state`, '');

    useEffect(() => {
        setValue('city', '')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watchState])

    useEffect(() => {
        setValue('district', district)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [district])

    const onSubmit = (data: any) => {
        data.countryDesc = data.country === undefined ? 'Brasil' : data.country.description;
        data.country = '30';//data.country === undefined ? 30 : Number(data.country.id);
        data.address = address;
        data.city = data.city?.description;
        data.state = watchState?.id || watchState;//state;
        data.stateDesc = watchState?.description;//state;
        data.district = district;
        data.number = Number(data.number);
        action(data);
    }

    /* useEffect(() => {
        setValue('cep', supplierControlObject?.cep);
        //setValue('address', supplierControlObject?.address);
    }, [setValue, supplierControlObject?.address, supplierControlObject?.cep]) */

    /* const searchCEP = async (term: any) => {
        const response = await apiGoogleMaps.get("/geocode/json", {
            params: {
                address: term,
                key: configData.GOOGLE_KEYS.GOOGLE_MAPS,
            },
        });

        if (response.data.status === "OK") {
            response.data.results[0].address_components.forEach(function (place: any) {
                switch (place.types[0]) {
                    case "route":
                        setValue('address', place.long_name);
                        setAddress(place.long_name);
                        (
                            document.getElementById(
                                "FormControlInput1Address"
                            ) as HTMLInputElement
                        ).value = place.long_name;
                        (
                            document.querySelector(
                                '[for="FormControlInput1Address"]'
                            ) as HTMLElement
                        ).classList.add("label-active");
                        break;

                    case "administrative_area_level_2":
                        break;

                    case "political":
                        setValue('district', place.long_name);
                        setDistrict(place.long_name);
                        break;

                    case "administrative_area_level_1":
                        setState(place.short_name);
                        (
                            document.getElementById(
                                "FormControlInput1Estado"
                            ) as HTMLInputElement
                        ).value = place.short_name;
                        (
                            document.querySelector(
                                '[for="FormControlInput1Estado"]'
                            ) as HTMLElement
                        ).classList.add("label-active");
                        break;

                    default:
                }
            });
        }
    }; */

    /* const handleBlurCEP = (event: any) => {
        searchCEP(event.target.value);
    }; */

    return (
        <>
            <div>
                <form noValidate onSubmit={handleSubmit(onSubmit)} autoComplete="false" className="form-affiliate">
                    <div className="grid grid-cols-12 gap-0 md:gap-6">
                        <div className="col-span-12 md:col-span-6 mb-3">
                            <label>
                                {dic?.country}
                            </label>
                            <Controller
                                control={control}
                                name="country"
                                //rules={{ required: { value: true, message: "Por favor, informe o nome" } }}
                                render={({ field }: any) => (
                                    <input
                                        {...field}
                                        //aria-invalid={errors?.cep ? "true" : ""}
                                        variant="standard"
                                        margin="normal"
                                        autoComplete="off"
                                        value={'Brasil'}
                                        className={`${styles.form_control}`}
                                    />
                                )}
                            />
                            {/*  <ErrorMessage
                                errors={errors}
                                name="country"
                                render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                            /> */}
                            {/* <GetCountrysAffiliates
                                        propsField={field}
                                        propsLabel="País"
                                        propsErrors={errors}
                                    /> */}
                        </div>
                        <div className="col-span-12 md:col-span-6 mb-3">
                            <label>
                                {dic?.cep}
                            </label>
                            <Controller
                                control={control}
                                name="cep"
                                rules={{ required: { value: true, message: dic?.formError } }}
                                render={({ field }: any) => (
                                    <input
                                        {...field}
                                        {...register("cep")}
                                        aria-invalid={errors?.cep ? "true" : ""}
                                        variant="standard"
                                        margin="normal"
                                        autoComplete="off"
                                        //onBlur={handleBlurCEP}
                                        defaultValue={cep !== null ? cep : ""}
                                        className={`${styles.form_control}`}
                                    />
                                )}
                            />
                            <ErrorMessage
                                errors={errors}
                                name="cep"
                                render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-12 gap-0 md:gap-6">
                        <div className="col-span-12 md:col-span-6 mb-3">
                            <label>
                                {dic?.state}
                            </label>
                            <Controller
                                control={control}
                                name="state"
                                rules={{ required: { value: true, message: dic?.formError } }}
                                render={({ field }: any) => (
                                    <GetStates propsField={field} propsErrors={errors} defaultValue={supplierControlObject?.state} setValue={setValue} />
                                )}
                            />
                            {/* <input
                                        {...field}
                                        {...register("state")}
                                        aria-invalid={errors?.state ? "true" : ""}
                                        variant="standard"
                                        margin="normal"
                                        id="FormControlInput1Estado"
                                        autoComplete="off"
                                        defaultValue={state !== null ? state : ""}
                                        value={state}
                                        onChange={(e: any) => { setState(e.target.value) }}
                                    /> */}
                            <ErrorMessage
                                errors={errors}
                                name="state"
                                render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                            />
                        </div>
                        <div className="col-span-12 md:col-span-6 mb-3">
                            <label>
                                {dic?.city}
                            </label>
                            <Controller
                                control={control}
                                name="city"
                                rules={{ required: { value: true, message: dic?.formError } }}
                                render={({ field }: any) => (
                                    <GetCitysByState propsField={field} propsErrors={errors} uf={watchState?.id} defaultValue={supplierControlObject?.city} setValue={setValue} />
                                )}
                            />
                            {/* <input
                                        {...field}
                                        {...register("city")}
                                        aria-invalid={errors?.city ? "true" : ""}
                                        id="FormControlInput1Cidade"
                                        variant="standard"
                                        margin="normal"
                                        autoComplete="off"
                                        defaultValue={city !== null ? city : ""}
                                        value={city}
                                        onChange={(e: any) => { setCity(e.target.value) }}
                                    /> */}
                            <ErrorMessage
                                errors={errors}
                                name="city"
                                render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-12 gap-0 md:gap-6">
                        <div className="col-span-12 md:col-span-2 mb-3">
                            <label>
                                {dic?.addressType}*
                            </label>
                            <Controller
                                control={control}
                                name="streetCode"
                                rules={{ required: { value: true, message: dic?.formError } }}
                                render={({ field }: any) => (
                                    <GetStreetCode propsField={field} propsErrors={errors} defaultValue={supplierControlObject?.streetCode} setValue={setValue} />
                                )}
                            />
                            <ErrorMessage
                                errors={errors}
                                name="address"
                                render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                            />
                        </div>
                        <div className="col-span-12 md:col-span-4 mb-3">
                            <label>
                                {supplierControlObject?.compType === 1 ? dic?.companyAddress : dic?.address  + '*'}
                            </label>
                            <Controller
                                control={control}
                                name="address"
                                rules={{ required: { value: true, message: dic?.formError } }}
                                render={({ field }: any) => (
                                    <input
                                        {...field}
                                        {...register("address")}
                                        aria-invalid={errors?.address ? "true" : ""}
                                        variant="standard"
                                        id="FormControlInput1Address"
                                        margin="normal"
                                        autoComplete="off"
                                        className={`${styles.form_control}`}
                                        //defaultValue={address !== null ? address : ""}
                                        value={address /* || supplierControlObject.address */}
                                        onChange={(e: any) => { setAddress(e.target.value) }}
                                    />
                                )}
                            />
                            <ErrorMessage
                                errors={errors}
                                name="address"
                                render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                            />
                        </div>
                        <div className="col-span-12 md:col-span-2 mb-3">
                            <label>
                                {dic?.districtType}
                            </label>
                            <Controller
                                control={control}
                                name="districtCode"
                                rules={{ required: { value: true, message: dic?.formError } }}
                                render={({ field }: any) => (
                                    <GetDistrictCode propsField={field} propsErrors={errors} defaultValue={supplierControlObject?.districtCode} setValue={setValue} />
                                )}
                            />
                            <ErrorMessage
                                errors={errors}
                                name="district"
                                render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                            />
                        </div>
                        <div className="col-span-12 md:col-span-4 mb-3">
                            <label>
                                {dic?.district}
                            </label>
                            <Controller
                                control={control}
                                name="district"
                                rules={{ required: { value: true, message: dic?.formError } }}
                                render={({ field }: any) => (
                                    <input
                                        {...field}
                                        aria-invalid={errors?.district ? "true" : ""}
                                        variant="standard"
                                        margin="normal"
                                        autoComplete="off"
                                        defaultValue={district !== null ? district : ""}
                                        value={district}
                                        onChange={(e: any) => { setDistrict(e.target.value) }}
                                        className={`${styles.form_control}`}
                                    />
                                )}
                            />
                            <ErrorMessage
                                errors={errors}
                                name="district"
                                render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-12 gap-0 md:gap-6">
                        <div className="col-span-12 md:col-span-6 mb-3">
                            <label>
                                {dic?.number}
                            </label>
                            <Controller
                                control={control}
                                name="number"
                                rules={{ required: { value: true, message: dic?.formError } }}
                                render={({ field }: any) => (
                                    <input
                                        {...field}
                                        type='number'
                                        aria-invalid={errors?.number ? "true" : ""}
                                        variant="standard"
                                        margin="normal"
                                        autoComplete="off"
                                        className={`${styles.form_control}`}
                                    />
                                )}
                            />
                            <ErrorMessage
                                errors={errors}
                                name="number"
                                render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                            />
                        </div>
                        <div className="col-span-12 md:col-span-6 mb-3">
                            <label>
                                {dic?.complement}
                            </label>
                            <Controller
                                control={control}
                                name="complement"
                                //rules={{ required: { value: true, message: dic?.formError") } }}
                                render={({ field }: any) => (
                                    <input
                                        {...field}
                                        aria-invalid={errors?.complement ? "true" : ""}
                                        variant="standard"
                                        margin="normal"
                                        autoComplete="off"
                                        className={`${styles.form_control}`}
                                    />
                                )}
                            />
                            <ErrorMessage
                                errors={errors}
                                name="complement"
                                render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-12 gap-3 md:gap-6 pt-12">
                        <div className="col-span-12 md:col-start-7 md:col-span-3">
                            <button className={`${styles.btn_back} btn w-full mb-2 mb-md-0`} onClick={() => back(0)}>{dic?.back}</button>
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

export default FormAddress;