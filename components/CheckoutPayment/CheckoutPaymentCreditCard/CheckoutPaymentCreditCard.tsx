import React, { useEffect, useState } from 'react';
import { Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import CardReactFormContainer from 'react-credit-cards-2';
import MaskedInput from '@/components/MaskedInput/MaskedInput';


import styles from '../CheckoutPayments.module.css'

//import 'react-credit-cards/es/styles-compiled.css';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import useAppData from '@/data/hooks/useCartData';
import { useParams } from 'next/navigation';
import { getDictionary } from '@/dictionaries';


export interface propForm {
    control?: any,
    errors?: any,
    setValue?: any
    isForeign?: any,
    getValues?: any,
};

const CheckoutPaymentCreditCard: React.FC<propForm> = ({
    control, errors, setValue, getValues
}: propForm) => {

    const { cart } = useAppData();
    const cartCaracol: any = 'null';

    const [alertBool, setAlertBool] = useState<any>(false);
    const [alertMessage, setAlertMessage] = useState<any>('');

    const [totalCart, setTotalCart] = useState<number>(0);

    const [cvc, setCvc] = useState<string>('');
    const [expiry, setExpiry] = useState<string>('');
    const [focus, setFocus] = useState<any>('');
    const [name, setName] = useState<string>('');
    const [number, setNumber] = useState<string>('');
    const [brand, setBrand] = useState<string>('');


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
        let total = Number(cart.totalCart);

        setTotalCart(total);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleInputFocus = (e: any) => {
        setFocus(e.target.name);
    }

    const handleInputFocusOut = (e: any) => {
        setFocus('number');
    }

    const handleInputChange = (e: any) => {
        setNumber(e.target.value);
        setValue('number', e.target.value);

        if (e.target.value.length > 4 && brand === 'unknown') {
            setNumber('');
            setValue('number', '')
            setAlertMessage('Cartão Inválido');
            setAlertBool(true);

        }
    }

    const handleCallback = ({ issuer }: any, isValid: any) => {
        setBrand(issuer);
        setValue('brand', brand);
        if (isValid) {
            setValue('brand', brand);
        }

    }

    const handleInputChangeName = (e: any) => {
        setName(e.target.value);
        setValue('titular', e.target.value);
    }

    const handleInputChangeExpiry = (e: any) => {
        setExpiry(e.target.value);
        setValue('expiry', e.target.value);
    }

    const handleInputChangeCVC = (e: any) => {
        setCvc(e.target.value);
        setValue('cvc', e.target.value);
    }

    return (
        <>
            <div className={styles.accordion}>
                <div>
                    <h6 className={styles.title_payments} >{dic?.cardData}</h6>

                    <div className="credit-card" id="payment-div">
                        <CardReactFormContainer
                            cvc={getValues().cvc || ''}
                            expiry={getValues().expiry || ''}
                            focused={focus}
                            name={getValues().titular || ''}
                            number={getValues().number || ''}
                            callback={handleCallback}
                        />
                    </div>

                    {/* ROW  */}
                    <div className="grid grid-cols-12 row_controll">
                        {/*  Col 6 */}
                        <div className="col-span-12 md:col-span-6 mx-3 mb-3" >
                            <label>{dic?.nameOnCard}</label>
                            <Controller
                                control={control}
                                name="titular"
                                /* rules={{ required: { value: true, message: 'Por favor, informe o campo.' } }} */
                                render={({ field }: any) => (
                                    <input
                                        {...field}
                                        aria-invalid={errors?.compName ? "true" : ""}
                                        variant="standard"
                                        margin="normal"
                                        autoComplete="off"
                                        required
                                        value={getValues().titular}
                                        onChange={(e) => handleInputChangeName(e)}
                                        onFocus={(e) => handleInputFocus(e)}
                                        placeholder={dic?.enterCardData}
                                        className="form-control"
                                    />
                                )}
                            />
                            <ErrorMessage
                                errors={errors}
                                name="titular"
                                render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                            />

                        </div>

                        {/*  Col 6 */}
                        <div className="col-span-12 md:col-span-6 mx-3 mb-3" >
                            <label>{dic?.cardNumber}</label>
                            <Controller
                                control={control}
                                name="number"
                                /* rules={{ required: { value: true, message: 'Por favor, informe o campo.' } }} */
                                render={({ field }: any) => (
                                    <input
                                        {...field}
                                        aria-invalid={errors?.compName ? "true" : ""}
                                        variant="standard"
                                        margin="normal"
                                        autoComplete="off"
                                        required
                                        onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
                                        onChange={(e) => handleInputChange(e)}
                                        onFocus={(e) => handleInputFocus(e)}
                                        placeholder={dic?.enterCardNumber}
                                        maxLength={16}
                                        className="form-control"
                                    />
                                )}
                            />
                            <ErrorMessage
                                errors={errors}
                                name="number"
                                render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                            />

                        </div>
                    </div>
                    {/* ROW */}

                    {/* ROW  */}
                    <div className="grid grid-cols-12 row_controll">
                        {/*  Col 6 */}
                        <div className="col-span-12 md:col-span-3 mx-3 mb-3" >
                            <label>{dic?.expiration}</label>
                            <Controller
                                control={control}
                                name="expiry"
                                render={({ field }: any) => (
                                    <MaskedInput className="form-control" field={field} mask={"99/9999"} placeholder={"MM/AAAA"} />

                                )}
                            />
                            <ErrorMessage
                                errors={errors}
                                name="expiry"
                                render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                            />
                        </div>

                        {/*  Col 6 */}
                        <div className="col-span-12 md:col-span-2 mx-3 mb-3" >
                            <label>CVC/CVV</label>
                            <Controller
                                control={control}
                                name="cvc"
                                /* rules={{ required: { value: true, message: 'Por favor, informe o campo.' } }} */
                                render={({ field }: any) => (
                                    <input
                                        {...field}
                                        aria-invalid={errors?.compName ? "true" : ""}
                                        variant="standard"
                                        margin="normal"
                                        autoComplete="off"
                                        required
                                        onChange={(e) => handleInputChangeCVC(e)}
                                        onFocus={(e) => handleInputFocus(e)}
                                        onBlur={(e) => handleInputFocusOut(e)}
                                        placeholder={dic?.threeDigits}
                                        maxLength={3}
                                        className="form-control"
                                    />
                                )}
                            />
                            <ErrorMessage
                                errors={errors}
                                name="cvc"
                                render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                            />
                        </div>

                        {cart.Country === "BR" &&

                            <div className="col-span-12 md:col-span-4 mx-3 mb-3" >
                                <label>CPF:</label>
                                <Controller
                                    control={control}
                                    name="cpfTitular"
                                    rules={{ required: { value: true, message: `${dic?.errorCpf}` } }}
                                    render={({ field }: any) => (
                                        <MaskedInput className="form-control" field={field} placeholder={"000.000.000-00"} />
                                    )}
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name="cpfTitular"
                                    render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                                />
                            </div>
                        }
                        {
                            totalCart > 200 &&
                            <div className="col-span-12 md:col-span-3 mx-3 mb-3" >
                                <label>{dic?.installments}:</label>
                                <Controller
                                    control={control}
                                    name="installments"
                                    rules={{ required: { value: false, message: `${dic?.installments}` } }}
                                    render={({ field }: any) => (
                                        <select
                                            {...field}
                                            aria-invalid={errors?.clientsType ? "true" : ""}
                                            label="Parcelas"
                                            as="select"
                                            variant="standard"
                                            margin="normal"
                                            required
                                            className="form-control"
                                        >
                                            <option value="1">1x R$ {(totalCart).toFixed(2).split('.').join(',')}</option>
                                            {[...Array(Number(process.env.NEXT_PUBLIC_INSTALLMENTS))].map((x, i) => {
                                                if (totalCart / (i + 2) > 100) {
                                                    return <option key={i} value={i + 2}>{(i + 2)}x R$ {(totalCart / (i + 2)).toFixed(2).split('.').join(',')}</option>
                                                }
                                            }
                                            )}
                                        </select>
                                    )}
                                />
                                <ErrorMessage
                                    errors={errors}
                                    name="installments"
                                    render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                                />
                            </div>
                        }
                    </div>
                    {/* ROW  */}

                </div>

            </div>

        </>
    )
}

export default CheckoutPaymentCreditCard