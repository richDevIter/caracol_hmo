import React, { useEffect, useState } from 'react'
import { Controller, useForm } from "react-hook-form";

import styles from './CheckoutStepData.module.css'
import { ErrorMessage } from '@hookform/error-message';
import GetStates from '../base/DestPoints/GetStates';
import GetCitysByState from '../base/DestPoints/GetCitysByState';
import Link from 'next/link';
import MaskedInput from '@/components/MaskedInput/MaskedInput';
import GetCountrys from '../base/DestPoints/GetCountrys';
import GetStatesNext from '../base/DestPoints/GetStatesNext';
import useAppData from '@/data/hooks/useCartData';
import { useParams } from 'next/navigation';
import { getDictionary } from '@/dictionaries';

export interface propAction {
    action: any;
    back: any;
    scrollTop: any;
    checkoutObjectData: any,
    setCheckoutObjectData: any
}

const CheckoutStepData: React.FC<propAction> = ({
    action,
    back,
    scrollTop,
    checkoutObjectData,
    setCheckoutObjectData
}: propAction) => {
    const { cart, addCheckoutStepData } = useAppData();
    const [hasForeign, setHasForeign] = useState(false);
    const [isBrazilian, setIsBrazilian] = useState(false);

    const [cep] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [cityDefaultDesc, setCityDefaultDesc] = useState(checkoutObjectData?.cityDesc || '');

    const [dic, setDic] = useState<any>(null);
    const searchParams = useParams();

    useEffect(() => {
        const fetchDictionary = async () => {
            const dictionary = await getDictionary(searchParams.lng as "pt" | "en" | "es", 'checkout');
            setDic(dictionary);
        };

        fetchDictionary();

    }, [searchParams.lng])

    useEffect(() => {
        setValue('cep', checkoutObjectData?.cep ? checkoutObjectData?.cep : '');
        setValue('Country', checkoutObjectData?.countryDesc && checkoutObjectData?.isForeign === 1 ? { description: checkoutObjectData?.countryDesc, id: checkoutObjectData?.countryId } : '');
        setValue('state', checkoutObjectData?.isForeign === 0 && checkoutObjectData?.stateDesc ? { description: checkoutObjectData?.stateDesc, id: checkoutObjectData?.stateId } : (checkoutObjectData?.state || ''));
        setValue('city', checkoutObjectData?.isForeign === 0 && checkoutObjectData?.cityDesc ? { description: checkoutObjectData?.cityDesc, id: checkoutObjectData?.cityId } : (checkoutObjectData?.city || ''));
        setValue('address', checkoutObjectData?.address ? checkoutObjectData?.address : '');
        setValue('number', checkoutObjectData?.number ? checkoutObjectData?.number : '');
        setValue('complement', checkoutObjectData?.complement ? checkoutObjectData?.complement : '');
        setValue('checkPolice', true);

        setCity(checkoutObjectData?.city);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onSubmit = (data: any) => {
        setCheckoutObjectData({
            ...checkoutObjectData,
            cep: data.cep,
            countryId: data.Country?.id,
            countryDesc: data.Country?.description,
            cityId: data.city?.id,
            cityDesc: data.city?.description,
            city: hasForeign === true && isBrazilian !== true ? data.city : '',
            stateId: data.state?.id,
            stateDesc: data.state?.description,
            state: hasForeign === true && isBrazilian !== true && watchCountry?.id !== "US" && watchCountry?.id !== "CA" ? data.state : '',
            address: data.address,
            number: data.number,
            complement: data.complement,
            checkPolice: data.checkPolice,
            checkNew: data.checkNew
        });

        if (isBrazilian === true || hasForeign === false) {
            data.municipioId = data.city.id;
            data.city = data.city.description;
            data.stateDesc = data.state.description
            data.state = data.state.id;
        } else if (watchCountry?.id === "US" || watchCountry?.id === "CA") {
            data.stateDesc = data.state.description
            data.state = data.state.id;
        }

        let address: any = {
            Country: hasForeign === true ? data.Country.id : 'BR',
            city: data.city,
            municipioId: data.municipioId,
            state: data.state,
            stateDesc: data.stateDesc,
            street: data.address,
            number: data.number,
            zipCode: data.cep.replaceAll(/(\.|\-|\_)/g, ''),
            complement: data.complement,
            checkNew: data.checkNew
        }

        addCheckoutStepData?.(address);
        action(data);
    }

    const {
        control,
        handleSubmit,
        register,
        watch,
        setValue,
        formState: { errors },
        getValues,
    } = useForm();

    const watchCountry = watch(`Country`);
    const watchState: any = watch(`state`, '');

    useEffect(() => {
        for (let i = 0; i < cart.dados?.length; i++) {
            if (cart.dados[i].passengers[0]?.isForeign === 1) {
                setHasForeign(true);
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {

        if (watchCountry?.id === 'BR') {
            setIsBrazilian(true);
        } else {
            if (isBrazilian === true) {
                setValue('state', '')
                setValue('city', '')
            } else if (watchCountry?.id !== "US" && watchCountry?.id !== "CA") {
                if (getValues().state.id !== undefined) {
                    setValue('state', '');
                    //setCity('');
                }
            }
            setIsBrazilian(false);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watchCountry]);

    const handleBlur = async (e: any) => {
        if (e?.target?.value?.replace(/[^0-9]/g, '')?.length > 0) {

            const resp = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${e?.target?.value?.replace(/[^0-9]/g, '')}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}`,
                {
                    method: 'GET'
                }
            );
            const response = await resp.json();

            if (response.results?.length > 0) {
                response.results[0].address_components.forEach(function (place: any) {

                    switch (place.types[0]) {
                        case 'route':
                            setValue('address', place.long_name);
                            break;

                        case 'administrative_area_level_2':
                            setCityDefaultDesc(place.long_name);
                            break;

                        case 'administrative_area_level_1':
                            setValue('state', { description: place.long_name, id: place.short_name });
                            break;

                        default:
                            ;
                    }
                });
            }
        }
    }

    return (
        <>
            <div>
                <div className={styles.warning}>{dic?.mandatoryCompletion}</div>
                <form noValidate onSubmit={handleSubmit(onSubmit)} autoComplete="false">
                    <div className={styles.accordion}>
                        <div className={styles.accordion_body} >
                            <div className="grid grid-cols-12 row_controll">
                                {/*  Col 6 */}
                                <div className="col-span-12 md:col-span-6 mx-3 mb-3" >
                                    <label>
                                        {`${dic?.cep}`}{/* {hasForeign === true ? `${t("zipCode")}` : `${t("cep")}`} */}*
                                    </label>
                                    <Controller
                                        control={control}
                                        name="cep"
                                        rules={{ required: { value: true, message: dic?.errorCep /* hasForeign === true ? `${t("errorZipCode")}`  : `${t("errorCep")}` */ } }}
                                        //defaultValue={`${cartCaracol?.zipCode || ''}`}
                                        render={({ field }: any) => (
                                            <MaskedInput className="form-control" field={field} mask={"99999-999"} placeholder={dic?.errorCep} onBlur={handleBlur} />
                                        )}
                                    />
                                    <ErrorMessage
                                        errors={errors}
                                        name={`cep`}
                                        render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                                    />
                                </div>
                                {hasForeign === true ?
                                    <>
                                        {/*  Col 6 */}
                                        <div className="col-span-12 md:col-span-6 mx-3 mb-3" >
                                            <label>
                                                {dic?.country}
                                            </label>
                                            <Controller
                                                control={control}
                                                name="Country"
                                                rules={{ required: { value: true, message: `${dic?.errorCountry}` } }}
                                                render={({ field }: any) => (
                                                    <>
                                                        <GetCountrys propsField={field} propsLabel={'Estado*'} propsErrors={errors} />
                                                    </>
                                                )}
                                            />
                                            <ErrorMessage
                                                errors={errors}
                                                name={`Country`}
                                                render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                                            />
                                        </div>
                                    </>
                                    :
                                    <></>
                                }
                            </div>
                            <div className="grid grid-cols-12 row_controll">
                                {/*  Col 6 */}
                                <div className="col-span-12 md:col-span-6 mx-3 mb-3" >
                                    <label>
                                        {dic?.state}
                                    </label>
                                    <Controller
                                        control={control}
                                        name="state"
                                        rules={{ required: { value: true, message: `${dic?.errorState}` } }}
                                        //defaultValue={cartCaracol?.stateDesc ? { description: cartCaracol?.stateDesc, id: cartCaracol?.state } : ''}
                                        render={({ field }: any) => (
                                            <>
                                                {hasForeign === true && isBrazilian !== true ?
                                                    watchCountry.id === "US" || watchCountry.id === "CA"
                                                        ?
                                                        <>
                                                            <GetStatesNext propsField={field} propsErrors={errors} setValue={setValue} countryValue={watchCountry.id} defaultValue={checkoutObjectData?.stateId} />
                                                        </>
                                                        :
                                                        <>
                                                            <input
                                                                {...field}
                                                                {...register("state")}
                                                                className={styles.form_control}
                                                                aria-invalid={errors?.state ? "true" : ""}
                                                                variant="standard"
                                                                margin="normal"
                                                                id="FormControlInput1Estado"
                                                                autoComplete="new-password"
                                                                // defaultValue={state !== null ? cartCaracol?.state : ""}
                                                                value={state}
                                                                onChange={(e: any) => { setState(e.target.value) }}
                                                            />
                                                        </>
                                                    :
                                                    <>
                                                        <GetStates propsField={field} propsLabel={'Estado*'} propsErrors={errors} defaultValue={checkoutObjectData?.stateId} setValue={setValue} />
                                                    </>
                                                }

                                            </>
                                        )}
                                    />
                                    <ErrorMessage
                                        errors={errors}
                                        name={`state`}
                                        render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                                    />
                                </div>

                                {/*  Col 6 */}
                                <div className="col-span-12 md:col-span-6 mx-3 mb-3" >
                                    <label>
                                        {dic?.city}
                                    </label>
                                    <Controller
                                        control={control}
                                        name="city"
                                        rules={{ required: { value: true, message: `${dic?.errorCity}` } }}
                                        //defaultValue={cartCaracol?.city ? { description: cartCaracol?.city, id: cartCaracol?.cityID } : ''}
                                        render={({ field }: any) => (
                                            <>
                                                {hasForeign === true && isBrazilian !== true ?
                                                    <input
                                                        {...field}
                                                        {...register("city")}
                                                        className={styles.form_control}
                                                        aria-invalid={errors?.city ? "true" : ""}
                                                        id="FormControlInput1Cidade"
                                                        variant="standard"
                                                        margin="normal"
                                                        autoComplete="new-password"
                                                        value={city}
                                                        onChange={(e: any) => { setCity(e.target.value) }}
                                                    />
                                                    :
                                                    <div className="custom-city-form">
                                                        <GetCitysByState propsField={field} propsErrors={errors} uf={watchState?.id} defaultValue={cityDefaultDesc} setValue={setValue} />
                                                    </div>
                                                }
                                            </>
                                        )}
                                    />
                                    {/* <GetCitys propsField={field} propsLabel={'Cidade*'} propsErrors={errors} /> */}
                                    <ErrorMessage
                                        errors={errors}
                                        name={`city`}
                                        render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-12 row_controll">
                                {/*  Col 9 */}
                                <div className="col-span-12 md:col-span-9 mx-3 mb-3" >
                                    <label>
                                        {dic?.address}
                                    </label>
                                    <Controller
                                        control={control}
                                        name="address"
                                        rules={{ required: { value: false, message: `${dic?.errorAddress}` } }}
                                        // defaultValue={`${cartCaracol?.address || ''}`}
                                        render={({ field }: any) => (
                                            <input
                                                {...field}
                                                {...register("address")}
                                                aria-invalid={errors?.address ? "true" : ""}
                                                variant="standard"
                                                autoComplete="new-password"
                                                id="FormControlInput1Address"
                                                margin="normal"
                                                className={styles.form_control}
                                            /* value={address}
                                            onChange={(e: any) => { setAddress(e.target.value) }} */
                                            //disabled={state !== ''? false : true}
                                            />
                                        )}
                                    />
                                    <ErrorMessage
                                        errors={errors}
                                        name={`address`}
                                        render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                                    />
                                </div>

                                {/*  Col 3 */}
                                <div className="col-span-12 md:col-span-3 mx-3 mb-3" >
                                    <label>
                                        {dic?.number}
                                    </label>
                                    <Controller
                                        control={control}
                                        name="number"
                                        rules={{ required: { value: true, message: `${dic?.errorNumber}` } }}
                                        //defaultValue={`${cartCaracol?.number || ''}`}
                                        render={({ field }: any) => (
                                            <input
                                                {...field}
                                                variant="standard"
                                                aria-invalid={errors?.cep ? "true" : ""}
                                                margin="normal"
                                                autoComplete="new-password"
                                                placeholder={dic?.enterNumber}
                                                className={styles.form_control}
                                                onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
                                            //disabled={state !== ''? false : true}
                                            />
                                        )}
                                    />
                                    <ErrorMessage
                                        errors={errors}
                                        name={`number`}
                                        render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                                    />

                                </div>
                            </div>

                            <div className="grid grid-cols-12 row_controll">
                                {/*  Col 12 */}
                                <div className="col-span-12 mx-3 mb-6" >
                                    <label>
                                        {dic?.complement}
                                    </label>
                                    <Controller
                                        control={control}
                                        name="complement"
                                        //rules={{ required: { value: true, message: "Por favor, informe o telefone" } }}
                                        //defaultValue={`${cartCaracol?.complement || ''}`}
                                        render={({ field }: any) => (
                                            <input
                                                {...field}
                                                variant="standard"
                                                margin="normal"
                                                autoComplete="new-password"
                                                className={styles.form_control}
                                            //disabled={state !== ''? false : true}
                                            />
                                        )}
                                    />
                                    <ErrorMessage
                                        errors={errors}
                                        name={`complement`}
                                        render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-12 row_controll">
                                {/*  Col 12 */}
                                <div className="col-span-12 mx-3 mb-2" >
                                    <label htmlFor="chackPolice">
                                        <div className='form-group flex gap-1.5 leading-normal'>
                                            <Controller
                                                control={control}
                                                name="checkPolice"
                                                rules={{ required: { value: true, message: `${dic?.errorPolicyAccept}` } }}
                                                render={({ field, e }: any) => (
                                                    <input
                                                        {...field}
                                                        type="checkbox"
                                                        id="chackPolice"
                                                        name="check"
                                                        className={`${styles.form_input_check} mr-2`}
                                                        defaultChecked={checkoutObjectData?.checkPolice}
                                                        required
                                                    />
                                                )}
                                            />
                                            <div><span className={`${styles.form_label_check}`}>{dic?.policyAccept1} <Link className={styles.form_label_link} href="/politica-de-privacidade"  target='_blank'>{dic?.policyAccept2}</Link> {dic?.policyAccept3} <Link className={styles.form_label_link} href="/termos-de-compra"  target='_blank'>{dic?.policyAccept4}</Link></span></div>
                                            <ErrorMessage
                                                errors={errors}
                                                name={`checkPolice`}
                                                render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                                            />
                                        </div>
                                    </label>
                                </div>
                            </div>
                            <div className="grid grid-cols-12 row_controll">
                                {/*  Col 12 */}
                                <div className="col-span-12 mx-3 mb-2" >
                                    <label htmlFor="checkNew">
                                        <div className='form-group flex gap-1.5 leading-normal'>
                                            <Controller
                                                control={control}
                                                name="checkNew"
                                                rules={{ required: { value: false, message: `${dic?.errorInfoAccept}` } }}
                                                render={({ field, e }: any) => (
                                                    <input
                                                        {...field}
                                                        id="checkNew"
                                                        type="checkbox"
                                                        name="check"
                                                        className={`${styles.form_input_check} mr-2`}
                                                        defaultChecked={checkoutObjectData?.checkNew}
                                                    />
                                                )}
                                            />
                                            <span className={`${styles.form_label_check}`}>{dic?.infoAccept}</span>
                                            <ErrorMessage
                                                errors={errors}
                                                name={`checkNew`}
                                                render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                                            />
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <div className="grid grid-cols-12 row_controll">
                                {/*  Col 12 */}
                                <div className="col-span-12 mx-3 mb-6" >
                                    <label htmlFor="checkAccessRules">
                                        <div className='form-group flex gap-1.5 leading-normal'>
                                            <Controller
                                                control={control}
                                                name="checkAccessRules"
                                                rules={{ required: { value: false, message: `${dic?.errorInfoAcceptAccessRules}` } }}
                                                render={({ field, e }: any) => (
                                                    <input
                                                        {...field}
                                                        id="checkAccessRules"
                                                        type="checkbox"
                                                        name="check"
                                                        className={`${styles.form_input_check} mr-2`}
                                                        defaultChecked={checkoutObjectData?.checkAccessRules}
                                                    />
                                                )}
                                            />
                                            <div><span className={`${styles.form_label_check}`}>{dic?.infoAcceptAccessRules1} <Link className={styles.form_label_link} href="/regras-de-acesso" target='_blank'>{dic?.infoAcceptAccessRules2}</Link> {dic?.infoAcceptAccessRules3}</span></div>

                                            <span className={`${styles.form_label_check}`}>{dic?.infoAcceptAccessRules}</span>
                                            <ErrorMessage
                                                errors={errors}
                                                name={`checkAccessRules`}
                                                render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                                            />
                                        </div>
                                    </label>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className={styles.bg_checkout_back_next}>
                        <div className="flex items-center">
                            <p onClick={() => { scrollTop(); back(0); }}>
                                {dic?.prevScreen}
                            </p>
                        </div>
                        <div>
                            <button type="submit" className="btn btn-primary">
                                {dic?.continue}
                            </button>
                        </div>
                    </div>

                </form>


            </div>
        </>
    )
}

export default CheckoutStepData