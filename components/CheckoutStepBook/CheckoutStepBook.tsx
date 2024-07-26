import React, { useEffect, useState } from 'react'
import { Controller, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import MaskedInput from '@/components/MaskedInput/MaskedInput';

import Accordion from '../base/Accordion/Accordion';
import styles from './CheckoutStepBook.module.css'
import Link from 'next/link';
import useAppData from '@/data/hooks/useCartData';
import { useParams } from 'next/navigation';
import { getDictionary } from '@/dictionaries';

export interface propAction {
    action: any,
    checkoutObjectData: any,
    setCheckoutObjectData: any
};

const CheckoutStepBook: React.FC<propAction> = ({
    action, checkoutObjectData, setCheckoutObjectData
}: propAction) => {
    const { cart, addCheckoutStepBook } = useAppData();

    const [isForeign, setIsForeign] = useState<any>([checkoutObjectData?.isForeign === 1 ? true : false]);
    const [allAttractions, setAllAttractions] = useState<any>(false);

    const [dic, setDic] = useState<any>(null);
    const searchParams = useParams();

    useEffect(() => {
        const fetchDictionary = async () => {
            const dictionary = await getDictionary(searchParams.lng as "pt" | "en" | "es", 'checkout');
            setDic(dictionary);
        };
    
        fetchDictionary();
    
    }, [searchParams.lng])

    const {
        control,
        handleSubmit,
        setValue,
        setError,
        register,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        setValue('firstName0', checkoutObjectData?.firstName ? checkoutObjectData?.firstName : '');
        setValue('lastName0', checkoutObjectData?.lastName ? checkoutObjectData?.lastName : '');
        //setValue('cpf0', checkoutObjectData?.cpf && checkoutObjectData?.isForeign === 0 ? checkoutObjectData?.cpf : '');
        //setValue('id0', checkoutObjectData?.id && checkoutObjectData?.isForeign === 1 ? checkoutObjectData?.id : '');
        setValue('ddi0', checkoutObjectData?.ddi ? checkoutObjectData?.ddi : '');
        setValue('email0', checkoutObjectData?.email ? checkoutObjectData?.email : '');

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleChangeIsForeign = (str: string) => {
        setValue(str, '');
    }

    const validateCpf = (strCPF: any) => {
        var Soma;
        var Resto;
        Soma = 0;
        if (strCPF === "00000000000") return false;

        for (var i: any = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto === 10) || (Resto === 11)) Resto = 0;
        if (Resto !== parseInt(strCPF.substring(9, 10))) return false;

        Soma = 0;
        for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
        Resto = (Soma * 10) % 11;

        if ((Resto === 10) || (Resto === 11)) Resto = 0;
        if (Resto !== parseInt(strCPF.substring(10, 11))) return false;
        return true;
    }

    useEffect(() => {
        let aux: any = [];
        for (let i = 0; i < cart.dados?.length; i++) {
            aux.push(false)
        }
        aux[0] = checkoutObjectData?.isForeign === 1 ? true : false
        setIsForeign(aux);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allAttractions]);

    const checkValidation = (data: any) => {
        if (allAttractions === false) {
            if (isForeign[0] === false && validateCpf(data['cpf0']?.replaceAll(/(\.|\-|\_)/g, '')) === false) {
                //alert(`${data['cpf0']} é um cpf inválido`);
                return false;
            } else {
                data['isForeign0'] = isForeign[0] === true ? 1 : 0;
            }
        } else {
            for (let i = 0; i < isForeign.length; i++) {
                if (isForeign[i] === false && validateCpf(data[`cpf${i}`]?.replaceAll(/(\.|\-|\_)/g, '')) === false) {
                    //alert(`${data[`cpf${i}`]} é um cpf inválido`);
                    return false;
                } else {
                    data[`isForeign${i}`] = isForeign[i] === true ? 1 : 0;
                }
            }
        }

        return true;
    }

    const onSubmit = (data: any) => {
        data.cpf0 = data.cpf0?.replaceAll(/(\.|\-|\_)/g, '');

        if (checkValidation(data) === true) {

            let aux: any = 0;
            setCheckoutObjectData({
                ...checkoutObjectData,
                firstName: data[`firstName${aux}`],
                lastName: data[`lastName${aux}`],
                cpf: isForeign[0] === false ? data[`cpf${aux}`].split('.').join('').split('-').join('').split('_').join('') : undefined,
                id: isForeign[0] === true ? data[`id${aux}`] : undefined,
                ddi: data[`ddi${aux}`],
                email: data[`email${aux}`],
                isForeign: data[`isForeign${aux}`],
                DocumentNumber: data[isForeign[aux] === true ? `id${aux}` : `cpf${aux}`],
            });

            for (let i = 0; i < cart.dados.length; i++) {

                if (cart.dados[i].productType === 2) {
                    cart.dados[i].voo = data.flightNumber;
                    cart.dados[i].cia = data.flightCompany;
                }

                aux = allAttractions === false ? 0 : i;
                cart.dados[i].passengers = [{
                    "firstName": data[`firstName${aux}`],
                    "lastName": data[`lastName${aux}`],
                    "cpf": data[`cpf${aux}`],
                    "id": data[`id${aux}`],
                    "phone": data[`ddi${aux}`]?.replaceAll(/(\(|\)|\-|\_|\ )/g, ''),
                    "email": data[`email${aux}`],
                    "isForeign": data[`isForeign${aux}`],
                    "DocumentNumber": data[isForeign[aux] === true ? `id${aux}` : `cpf${aux}`]
                }]
            }

            addCheckoutStepBook?.(cart.dados);
            action(data);
        } else {
            setError('cpf0', { type: 'custom', message: `${dic?.errorInvalidCpf}` })
        }
    }

    function AddFavorite(index: any) {
        let auxForeign: any = [];

        for (let i = 0; i < isForeign.length; i++) {
            if (i === index) {
                auxForeign.push(!isForeign[i]);
            } else {
                auxForeign.push(isForeign[i]);
            }
        }

        setIsForeign(auxForeign);
    }


    const titleAccordion = () => {
        return (
            <div className="flex flex-col">
                <span className={styles.accordion_header_title}>{dic?.attractionParticipants}</span>
                <span className={styles.accordion_header_text}>{dic?.willBeResponsible}</span>
            </div>
        )
    }

    return (
        <>
            <div className='step-general'>
                <div className={styles.warning}>{dic?.mandatoryCompletion}</div>
                <form noValidate onSubmit={handleSubmit(onSubmit)} autoComplete="false">
                    <Accordion title={titleAccordion()} style={styles.accordion} styleChildren={{ height: '70px', padding: '15px 30px' }}>
                        {
                            allAttractions === false
                                ?
                                <div className={styles.accordion_body}>
                                    <div className="grid grid-cols-12 row_controll">
                                        {/*  Col 6 */}
                                        <div className="col-span-12 md:col-span-6 mx-3 mb-3" >
                                            <div className={isForeign[0] === false ? ` ${styles.form_radio} ${styles.selected}` : `${styles.form_radio}`} onClick={() => { handleChangeIsForeign('id0'); AddFavorite(0) }}>
                                                <div className="flex items-center">
                                                    <Controller
                                                        control={control}
                                                        name="isForeign0"
                                                        render={({ field }: any) => (
                                                            <input
                                                                {...field}
                                                                checked={isForeign[0] === false}
                                                                type="radio"
                                                                variant="standard"
                                                                margin="normal"
                                                                value="0"
                                                                required
                                                                className={styles.form_check_input}
                                                            />
                                                        )}
                                                    />
                                                    <label className={styles.label_form}>
                                                        {dic?.brazilian}
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        {/*  Col 6 */}
                                        <div className="col-span-12 md:col-span-6 mx-3 mb-3" >
                                            <div className={isForeign[0] === true ? ` ${styles.form_radio} ${styles.selected}` : `${styles.form_radio}`} onClick={() => { handleChangeIsForeign('cpf0'); AddFavorite(0) }}>
                                                <div className="flex items-center">
                                                    <Controller
                                                        control={control}
                                                        name="isForeign0"
                                                        render={({ field }: any) => (
                                                            <input
                                                                {...field}
                                                                checked={isForeign[0] === true}
                                                                type="radio"
                                                                variant="standard"
                                                                margin="normal"
                                                                value="1"
                                                                required
                                                                className={styles.form_check_input}
                                                            />
                                                        )}
                                                    />
                                                    <label className={styles.label_form}>
                                                        {dic?.foreign}
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-12 row_controll">
                                        {/*  Col 6 */}
                                        <div className="col-span-12 md:col-span-6 mx-3 mb-3" >
                                            <label>
                                                {dic?.name}
                                            </label>
                                            <Controller
                                                control={control}
                                                name="firstName0"
                                                rules={{ required: { value: true, message: `${dic?.errorName}` } }}
                                                //defaultValue={`${userModel?.firstName?.split(' ')[0] || ''}`}
                                                render={({ field }: any) => (
                                                    <input
                                                        {...field}
                                                        className={styles.form_control}
                                                        variant="standard"
                                                        margin="normal"
                                                        autoComplete="off"
                                                        placeholder={dic?.enterName}
                                                    />
                                                )}
                                            />
                                            <ErrorMessage
                                                errors={errors}
                                                name={`firstName0`}
                                                render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                                            />
                                        </div>

                                        {/*  Col 6 */}
                                        <div className="col-span-12 md:col-span-6 mx-3 mb-3" >
                                            <label>
                                                {dic?.lastName}
                                            </label>
                                            <Controller
                                                control={control}
                                                name="lastName0"
                                                //defaultValue={`${userModel?.surName || ''}`}
                                                rules={{ required: { value: true, message: `${dic?.errorLastName}` } }}
                                                render={({ field }: any) => (
                                                    <input
                                                        {...field}
                                                        className={styles.form_control}
                                                        variant="standard"
                                                        margin="normal"
                                                        autoComplete="off"
                                                        placeholder={dic?.enterLastName}
                                                    />
                                                )}
                                            />
                                            <ErrorMessage
                                                errors={errors}
                                                name={`lastName0`}
                                                render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                                            />
                                        </div>
                                    </div>


                                    <div className="grid grid-cols-12 row_controll">
                                        {
                                            isForeign[0] !== true
                                                ?
                                                <>
                                                    {/*  Col 6 */}
                                                    <div className="col-span-12 md:col-span-6 mx-3 mb-3" >
                                                        <label>
                                                            {dic?.cpf}
                                                        </label>
                                                        <Controller
                                                            control={control}
                                                            name={`cpf0`}
                                                            rules={{ required: { value: true, message: `${dic?.errorCpf}` } }}
                                                            defaultValue={checkoutObjectData?.cpf ? checkoutObjectData?.cpf : ''}
                                                            render={({ field }: any) => (
                                                                <MaskedInput className="form-control" field={field} placeholder={dic?.enterCpf} />
                                                            )}
                                                        />
                                                        <ErrorMessage
                                                            errors={errors}
                                                            name={`cpf0`}
                                                            render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                                                        />
                                                    </div>
                                                </>
                                                :
                                                <>
                                                    {/*  Col 6 */}
                                                    <div className="col-span-12 md:col-span-6 mx-3 mb-3" >
                                                        <label>
                                                            {dic?.id}
                                                        </label>
                                                        <Controller
                                                            control={control}
                                                            defaultValue={checkoutObjectData?.id ? checkoutObjectData?.id : ''}
                                                            name={`id0`}
                                                            rules={{ required: { value: true, message: `${dic?.errorId}` } }}
                                                            render={({ field }: any) => (
                                                                <input
                                                                    {...field}
                                                                    variant="standard"
                                                                    margin="normal"
                                                                    className={styles.form_control}
                                                                    autoComplete="off"
                                                                />
                                                            )}
                                                        />
                                                        <ErrorMessage
                                                            errors={errors}
                                                            name={`id0`}
                                                            render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                                                        />
                                                    </div>
                                                </>
                                        }
                                    </div>

                                    <div className="grid grid-cols-12 row_controll">
                                        {/*  Col 12 */}
                                        <div className="col-span-12 mx-3 mb-3" >
                                            <label>
                                                {dic?.email}
                                            </label>
                                            <Controller
                                                control={control}
                                                name="email0"
                                                //defaultValue={`${userModel?.email || ''}`}
                                                rules={{
                                                    required: {
                                                        value: true,
                                                        message: `${dic?.errorEmail}`
                                                    },
                                                    pattern: {
                                                        value: /\S+@\S+\.\S+/,
                                                        message: `${dic?.errorEmailValid}`,
                                                    },
                                                }}
                                                render={({ field }: any) => (
                                                    <input
                                                        {...field}
                                                        className={styles.form_control}
                                                        type="email"
                                                        variant="standard"
                                                        margin="normal"
                                                        autoComplete="off"
                                                        placeholder={dic?.enterEmail}
                                                        required
                                                    />
                                                )}
                                            />
                                            <ErrorMessage
                                                errors={errors}
                                                name={`email0`}
                                                render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                                            />
                                        </div>

                                    </div>

                                    <div className="grid grid-cols-12 row_controll">
                                        {/*  Col 6 */}
                                        {
                                            isForeign[0] !== true
                                                ?
                                                <div className="col-span-12 md:col-span-6 mx-3 mb-3" >
                                                    <label>
                                                        {dic?.cellPhone}
                                                    </label>
                                                    <Controller
                                                        control={control}
                                                        name="ddi0"
                                                        rules={{ required: { value: true, message: `${dic?.errorCellPhone}` } }}
                                                        defaultValue={checkoutObjectData?.ddi ? checkoutObjectData?.ddi : ''}
                                                        render={({ field }: any) => (
                                                            <MaskedInput className="form-control" field={field} mask={"(99) 99999-9999"} placeholder={dic?.enterCellPhone} />
                                                        )}
                                                    />

                                                    <ErrorMessage
                                                        errors={errors}
                                                        name={`ddi0`}
                                                        render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                                                    />
                                                </div>
                                                :
                                                <div className="col-span-12 md:col-span-6 mx-3 mb-3" >
                                                    <label>
                                                        {dic?.cellPhone}
                                                    </label>
                                                    <Controller
                                                        control={control}
                                                        name="ddi0"
                                                        rules={{ required: { value: true, message: `${dic?.errorCellPhone}` } }}
                                                        defaultValue={checkoutObjectData?.ddi ? checkoutObjectData?.ddi : ''}
                                                        render={({ field }: any) => (
                                                            <input
                                                                {...field}
                                                                variant="standard"
                                                                margin="normal"
                                                                className={styles.form_control}
                                                                autoComplete="off"
                                                                placeholder={dic?.enterCellPhone}
                                                                onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
                                                            />
                                                        )}
                                                    />

                                                    <ErrorMessage
                                                        errors={errors}
                                                        name={`ddi0`}
                                                        render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                                                    />
                                                </div>
                                        }
                                        <div className={`col-span-12 mx-3 ${styles.text_small}`}>
                                            <p>
                                                {dic?.ourContact}
                                            </p>
                                        </div>
                                    </div>

                                </div>
                                :
                                <>
                                    {
                                        cart.dados.map((item: any, index: any) => {
                                            return (
                                                <div className={styles.accordion_body} key={index}>
                                                    <div className="bg-title-form">
                                                        <h4>
                                                            {item.productName}
                                                        </h4>
                                                        <h5>{dic?.adult} {index + 1}</h5>
                                                        <small>{dic?.reservationHolder}</small>
                                                    </div>
                                                    <div className="grid grid-cols-12 row_controll">
                                                        {/*  */}
                                                        {/*  Col 6 */}
                                                        <div className="col-span-12 md:col-span-6 mx-3 mb-3" >
                                                            <div className={isForeign[index] === false ? ` ${styles.form_radio} ${styles.selected}` : `${styles.form_radio}`} onClick={() => { handleChangeIsForeign('id' + index); AddFavorite(index) }}>
                                                                <div className="flex items-center">
                                                                    <Controller
                                                                        control={control}
                                                                        name="isForeign0"
                                                                        render={({ field }: any) => (
                                                                            <input
                                                                                {...field}
                                                                                checked={isForeign[index] === false}
                                                                                type="radio"
                                                                                variant="standard"
                                                                                margin="normal"
                                                                                value="0"
                                                                                required
                                                                                className={styles.form_check_input}
                                                                            />
                                                                        )}
                                                                    />
                                                                    <label className={styles.label_form}>
                                                                        {dic?.brazilian}
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/*  Col 6 */}
                                                        <div className="col-span-12 md:col-span-6 mx-3 mb-3" >
                                                            <div className={isForeign[index] === true ? ` ${styles.form_radio} ${styles.selected}` : `${styles.form_radio}`} onClick={() => { handleChangeIsForeign('cpf' + index); AddFavorite(index) }}>
                                                                <div className="flex items-center">
                                                                    <Controller
                                                                        control={control}
                                                                        name="isForeign0"
                                                                        render={({ field }: any) => (
                                                                            <input
                                                                                {...field}
                                                                                checked={isForeign[index] === true}
                                                                                type="radio"
                                                                                variant="standard"
                                                                                margin="normal"
                                                                                value="1"
                                                                                required
                                                                                className={styles.form_check_input}
                                                                            />
                                                                        )}
                                                                    />
                                                                    <label className={styles.label_form}>
                                                                        {dic?.foreign}
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-12 row_controll">
                                                        {/*  Col 6 */}
                                                        <div className="col-span-12 md:col-span-6 mx-3 mb-3" >
                                                            <label>
                                                                {dic?.name}
                                                            </label>
                                                            <Controller
                                                                control={control}
                                                                name={`firstName${index}`}
                                                                rules={{ required: { value: true, message: `${dic?.errorName}` } }}
                                                                //defaultValue={`${userModel?.firstName?.split(' ')[0] || ''}`}
                                                                render={({ field }: any) => (
                                                                    <input
                                                                        {...field}
                                                                        className={styles.form_control}
                                                                        variant="standard"
                                                                        margin="normal"
                                                                        autoComplete="off"
                                                                        placeholder={dic?.enterName}
                                                                    />
                                                                )}
                                                            />
                                                            <ErrorMessage
                                                                errors={errors}
                                                                name={`firstName${index}`}
                                                                render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                                                            />
                                                        </div>

                                                        {/*  Col 6 */}
                                                        <div className="col-span-12 md:col-span-6 mx-3 mb-3" >
                                                            <label>
                                                                {dic?.lastName}
                                                            </label>
                                                            <Controller
                                                                control={control}
                                                                name={`lastname${index}`}
                                                                //defaultValue={`${userModel?.surName || ''}`}
                                                                rules={{ required: { value: true, message: `${dic?.errorLastName}` } }}
                                                                render={({ field }: any) => (
                                                                    <input
                                                                        {...field}
                                                                        className={styles.form_control}
                                                                        variant="standard"
                                                                        margin="normal"
                                                                        autoComplete="off"
                                                                        placeholder={dic?.enterLastName}
                                                                    />
                                                                )}
                                                            />
                                                            <ErrorMessage
                                                                errors={errors}
                                                                name={`lastname${index}`}
                                                                render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-12 row_controll">
                                                        {
                                                            isForeign[index] !== true
                                                                ?
                                                                <>
                                                                    {/*  Col 6 */}
                                                                    <div className="col-span-12 md:col-span-6 mx-3 mb-3" >
                                                                        <label>
                                                                            {dic?.cpf}
                                                                        </label>
                                                                        <Controller
                                                                            control={control}
                                                                            name={`cpf${index}`}
                                                                            rules={{ required: { value: true, message: `${dic?.errorCpf}` } }}
                                                                            defaultValue={checkoutObjectData?.cpf ? checkoutObjectData?.cpf : ''}
                                                                            render={({ field }: any) => (
                                                                                <MaskedInput className="form-control" field={field} placeholder={dic?.enterCpf} />
                                                                            )}
                                                                        />
                                                                        <ErrorMessage
                                                                            errors={errors}
                                                                            name={`cpf${index}`}
                                                                            render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                                                                        />
                                                                    </div>
                                                                </>
                                                                :
                                                                <>
                                                                    {/*  Col 6 */}
                                                                    <div className="col-span-12 md:col-span-6 mx-3 mb-3" >
                                                                        <label>
                                                                            {dic?.id}
                                                                        </label>
                                                                        <Controller
                                                                            control={control}
                                                                            defaultValue={checkoutObjectData?.id ? checkoutObjectData?.id : ''}
                                                                            name={`id${index}`}
                                                                            rules={{ required: { value: true, message: `${dic?.errorId}` } }}
                                                                            render={({ field }: any) => (
                                                                                <input
                                                                                    {...field}
                                                                                    variant="standard"
                                                                                    margin="normal"
                                                                                    className={styles.form_control}
                                                                                    autoComplete="off"
                                                                                />
                                                                            )}
                                                                        />
                                                                        <ErrorMessage
                                                                            errors={errors}
                                                                            name={`id${index}`}
                                                                            render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                                                                        />
                                                                    </div>
                                                                </>
                                                        }
                                                    </div>

                                                    <div className="grid grid-cols-12 row_controll">
                                                        {/*  Col 12 */}
                                                        <div className="col-span-12 mx-3 mb-3" >
                                                            <label>
                                                                {dic?.email}
                                                            </label>
                                                            <Controller
                                                                control={control}
                                                                name={`email${index}`}
                                                                //defaultValue={`${userModel?.email || ''}`}
                                                                rules={{ required: { value: true, message: `${dic?.errorEmail}` } }}
                                                                render={({ field }: any) => (
                                                                    <input
                                                                        {...field}
                                                                        className={styles.form_control}
                                                                        type="email"
                                                                        variant="standard"
                                                                        margin="normal"
                                                                        autoComplete="off"
                                                                        placeholder={dic?.enterEmail}
                                                                    />
                                                                )}
                                                            />
                                                            <ErrorMessage
                                                                errors={errors}
                                                                name={`email${index}`}
                                                                render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                                                            />
                                                        </div>

                                                    </div>

                                                    <div className="grid grid-cols-12 row_controll">
                                                        {/*  Col 6 */}
                                                        {
                                                            isForeign[index] !== true
                                                                ?
                                                                <div className="col-span-12 md:col-span-6 mx-3 mb-3" >
                                                                    <label>
                                                                        {dic?.cellPhone}
                                                                    </label>
                                                                    <Controller
                                                                        control={control}
                                                                        name={`ddi${index}`}
                                                                        rules={{ required: { value: true, message: `${dic?.errorCellPhone}` } }}
                                                                        defaultValue={checkoutObjectData?.ddi ? checkoutObjectData?.ddi : ''}
                                                                        render={({ field }: any) => (
                                                                            <MaskedInput className="form-control" field={field} mask={"(99) 99999-9999"} placeholder={dic?.enterCellPhone} />
                                                                        )}
                                                                    />

                                                                    <ErrorMessage
                                                                        errors={errors}
                                                                        name={`ddi${index}`}
                                                                        render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                                                                    />
                                                                </div>
                                                                :
                                                                <div className="col-span-12 md:col-span-6 mx-3 mb-3" >
                                                                    <label>
                                                                        {dic?.cellPhone}
                                                                    </label>
                                                                    <Controller
                                                                        control={control}
                                                                        name={`ddi${index}`}
                                                                        rules={{ required: { value: true, message: `${dic?.errorCellPhone}` } }}
                                                                        defaultValue={checkoutObjectData?.ddi ? checkoutObjectData?.ddi : ''}
                                                                        render={({ field }: any) => (
                                                                            <input
                                                                                {...field}
                                                                                className={styles.form_control}
                                                                                type="email"
                                                                                variant="standard"
                                                                                margin="normal"
                                                                                autoComplete="off"
                                                                                placeholder={dic?.enterCellPhone}
                                                                                onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
                                                                            />
                                                                        )}
                                                                    />

                                                                    <ErrorMessage
                                                                        errors={errors}
                                                                        name={`ddi${index}`}
                                                                        render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                                                                    />
                                                                </div>
                                                        }

                                                        <div className={`col-span-12 mx-3 ${styles.text_small}`}>
                                                            <p>
                                                                {dic?.ourContact}
                                                            </p>
                                                        </div>
                                                    </div>

                                                </div>
                                            )
                                        })
                                    }
                                </>
                        }
                    </Accordion>

                    {/* <div className="bg-checkout-all-attractions">
                        {
                            allAttractions === false
                                ?
                                <p onClick={() => setAllAttractions(true)} style={{ cursor: 'pointer' }}>
                                    {dic?.eachAttractionHolder}
                                </p>
                                :
                                <p onClick={() => setAllAttractions(false)} style={{ cursor: 'pointer' }}>
                                    {dic?.allAttractionsHolder}
                                </p>
                        }
                    </div> */}

                    <div className={styles.bg_checkout_back_next}>
                        <Link href="/cart">
                            {/* <FontAwesomeIcon
                                icon={["fal", "arrow-left"]}
                                className="mr-2"
                            /> */}
                            {dic?.prevScreen}
                        </Link>
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

export default CheckoutStepBook