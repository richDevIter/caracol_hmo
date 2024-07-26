import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';

import Accordion from '../base/Accordion/Accordion'
import useAppData from '@/data/hooks/useCartData';
import Modal from '@/components/base/Modal/Modal';
import styles from '@/styles/criar-conta.module.css';
import { IconCheckCircle, IconSpinner, IconTimes, IconTimesCircled } from '@/assets/icons';

import { useParams } from 'next/navigation';
import { getDictionary } from '@/dictionaries';

const CheckoutCupom = () => {

    const { updateCupomCart } = useAppData();

    const [dic, setDic] = useState<any>(null);
    const [modalShow, setModalShow] = useState<boolean>(false);
    const [modalLog, setModalLog] = useState<number | null>(null);
    const [modalMessage, setModalMessage] = useState<string>('Carregando');

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
        formState: { errors },
    } = useForm();

    const [/* resTourCode */, setResTourCode] = useState<any>(1);

    const onSubmit = (data: any) => {

        validateTourCode(data.name);
    };

    const validateTourCode = async (code: any) => {
        setModalShow(true);
        setModalLog(null);
        setModalMessage('Carregando');

        try {
            const resp = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/TourCode/ValidateCoupon/${code}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                }
            })
            const data = await resp.json()

            if (data.data !== null) {
                if (data.data.typeDiscount === 2) {
                    var cupom = {
                        type: data.data.typeDiscount,
                        code: data.data.code,
                        codeName: data.data.codeName,
                        value: data.data.valueDiscount,
                    };
                    updateCupomCart?.(cupom);
                    setModalLog(0);
                    setModalMessage(`${dic?.successCoupon}`);
                } else if (data.data.typeDiscount === 4) {
                    var cupom = {
                        type: data.data.typeDiscount,
                        code: data.data.code,
                        codeName: data.data.codeName,
                        value: data.data.valueDiscount,
                    };
                    updateCupomCart?.(cupom);
                    setModalLog(0);
                    setModalMessage(`${dic?.successCoupon}`);
                }
                setResTourCode(data);
            } else {
                setModalLog(1);
                setModalMessage(`${dic?.invalidCoupon}`)
                //alert(`${dic?.invalidCoupon}`)
            }

        }
        catch (error: any) {
            if (error?.response?.status === 400) {
                alert(`${dic?.invalidCoupon}`)
            }
        }
    }

    return (
        <div className="cupom-checkout" id="editResourcesForms">
            <Accordion title={dic?.promoCode} style={{}} styleChildren={{ color: '6731ff', cursor: 'pointer' }} startClosed={true}>
                <div style={{ padding: '1rem 0' }}>
                    <form onSubmit={handleSubmit(onSubmit)} autoComplete="false">
                        <div className="grid grid-cols-12 row_controll">
                            {/*  Col 12 */}
                            <div className="col-span-12 mx-3 mb-6" >
                                <Controller
                                    control={control}
                                    name="name"
                                    rules={{ required: { value: true, message: `${dic?.errorName}` } }}
                                    render={({ field }: any) => (
                                        <input
                                            {...field}
                                            aria-invalid={errors?.compName ? "true" : ""}
                                            label="Nome"
                                            variant="standard"
                                            margin="normal"
                                            autoComplete="off"
                                            placeholder={dic?.enterCoupon}
                                            className="form-control"
                                            required
                                        />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="flex">
                            <div className='flex justify-center w-full'>
                                <button type="submit" className="btn btn-primary w-full">{dic?.apply}</button>
                            </div>
                        </div>
                    </form>
                </div>
            </Accordion>

            <Modal
                btnClose={false}
                showModal={modalShow}
                setShowModal={setModalShow}
            >
                <div
                    style={{ height: '680px', maxWidth: '500px' }}
                    className={`${styles.modal_body} rounded-lg bg-white w-full py-4 px-6 flex flex-col justify-evenly items-center`}
                >
                    <div>
                        {modalLog === 1 ? (
                            <>{IconTimesCircled(120,120)}</>
                        ) : modalLog === 0 ? (
                            <>{IconCheckCircle}</>
                        ) : (
                            <>{IconSpinner}</>
                        )}
                    </div>
                    <div className="text-center">
                        {/* <h5 className="mb-1 text-2xl font-medium">
                            {modalLog === 1
                                ? `Erro na validação!`
                                : modalLog === 0
                                    ? `Sucesso`
                                    : `Esperando validação!`}
                        </h5> */}

                        <p className={`${styles.error_msg}`}>{modalMessage}</p>
                    </div>
                    <div>
                        <button
                            onClick={() => {
                                setModalLog(null);
                                setModalMessage('Carregando');
                                setModalShow(false);
                            }}
                            className="btn btn-primary rounded-xl px-4 py-1.5"
                        >
                            {dic?.close}
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default CheckoutCupom