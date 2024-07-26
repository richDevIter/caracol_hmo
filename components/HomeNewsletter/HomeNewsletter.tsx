'use client'

import React, { useState, useEffect } from 'react';

import styles from './HomeNewsletter.module.css';

export interface propNew {
    status?: any,
    message?: any,
    onValidated?: any
}

const HomeNewsletter: React.FC<propNew> = ({
    status, message, onValidated
}: propNew) => {
    //const [t] = useTranslation();
    //const lng = i18next.language === "pt" ? "BR" : i18next.language === "en" ? "EN" : i18next.language === "es" ? "ES" : 'BR';
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [sucess, setSucess] = useState(
        <div style={{ color: "green", textAlign: "center" }}>
           {/*  {
                lng === 'BR'
                    ?
                    "Obrigado! Inscrição realizada com sucesso!"
                    :
                    lng === "EN"
                        ?
                        "Thank you! Registration successful!"
                        :
                        lng === "ES"
                            ?
                            "Gracias. ¡Registro exitoso!"
                            :
                            "Obrigado! Inscrição realizada com sucesso!"
            } */}
        </div>
    );
    const [error, setError] = useState(
        <div style={{ color: "red", textAlign: "center" }}>
            {/* {
                lng === 'BR'
                    ?
                    "E-mail já cadastrado!"
                    :
                    lng === "EN"
                        ?
                        "E-mail already registered"
                        :
                        lng === "ES"
                            ?
                            "Correo electrónico ya registrado"
                            :
                            "E-mail já cadastrado!"
            } */}
        </div>
    );
    const sending = useState(
        <div style={{ color: "blue", textAlign: "center" }}>
            {/* {
                lng === 'BR'
                    ?
                    "Carregando..."
                    :
                    lng === "EN"
                        ?
                        "Loading..."
                        :
                        lng === "ES"
                            ?
                            "Cargando"
                            :
                            "Carregando..."
            } */}
        </div>
    );

    const handleSubmit = (e: any) => {
        if (process.env.REACT_APP_CLIENT_NAME === "Bondinho") {
            e.preventDefault();
            email &&
                firstName &&
                email.indexOf("@") > -1 &&
                onValidated({
                    EMAIL: email,
                    MERGE1: firstName,
                    "group[46362][8]": 8 // Grupo Bondinho
                });
        } else {
            e.preventDefault();
            email &&
                firstName &&
                email.indexOf("@") > -1 &&
                onValidated({
                    EMAIL: email,
                    MERGE1: firstName,
                    "group[46362][4]": 4 // Grupo Caracol
                });
        }
    }

    useEffect(() => {
        if (status === "success") {
            clearFields();

            setTimeout(() => {
                setSucess(<div></div>)
            }, 10000);
        }
        setSucess(
            <div style={{ color: "green", textAlign: "center" }}>
                {/* {
                    lng === 'BR'
                        ?
                        "Obrigado! Inscrição realizada com sucesso!"
                        :
                        lng === "EN"
                            ?
                            "Thank you! Registration successful!"
                            :
                            lng === "ES"
                                ?
                                "Gracias. ¡Registro exitoso!"
                                :
                                "Obrigado! Inscrição realizada com sucesso!"
                } */}
            </div>
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status])

    const clearFields = () => {
        setFirstName('');
        setEmail('');
    }

    useEffect(() => {
        if (status === "error") {
            setTimeout(() => {
                setError(<div></div>)
            }, 10000);
        }
        setError(
            <div style={{ color: "red", textAlign: "center" }}>
                {/* {
                    lng === 'BR'
                        ?
                        "E-mail já cadastrado!"
                        :
                        lng === "EN"
                            ?
                            "E-mail already registered"
                            :
                            lng === "ES"
                                ?
                                "Correo electrónico ya registrado"
                                :
                                "E-mail já cadastrado!"
                } */}
            </div>
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status])

    return (
        <>
            <div className={`${styles.bg_newsletter}`} style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_NEWSLETTER})` }}>
                <div className={`${styles.bg_newsletter_bottom}`}>
                    <div className="container-page newsletter py-4">
                        <div className="grid grid-cols-12 px-3 mx-0 pt-5 pb-3">
                            <div className={`${styles.text_newsletter} col-span-12`}>
                                <h2 className={`${styles.newsletter_title}`}>Fique por dentro</h2>
                                {
                                    process.env.REACT_APP_CLIENT_NAME === "Bondinho"
                                        ?
                                        <>
                                            <p className={`${styles.text_newsletter}`}>FIQUE POR DENTRO!</p>
                                            <p className={`${styles.text_newsletter} ${styles.fw_normal}`}>Inscreva-se para receber novidades, promoções, eventos e muitos mais!</p>
                                        </>
                                        :
                                        <>
                                            <p className={`${styles.text_newsletter} ${styles.fw_normal}`}>Inscreva-se para receber novidades, promoções, eventos e muitos mais!</p>
                                        </>
                                }
                            </div>
                            <div className="col-span-12">
                                <form method="post" onSubmit={(e) => handleSubmit(e)} action={process.env.REACT_APP_MAILCHIMP}>
                                    <div className="grid grid-cols-12 mt-6 mb-2 gap-8">
                                        <div className="col-span-12 md:col-span-5">
                                            <input
                                                type="text"
                                                name="firstName"
                                                id="firstName"
                                                placeholder="Nome"
                                                className="mb-2 md:mb-0"
                                                value={firstName}
                                                onChange={(e: any) => setFirstName(e.target.value)}
                                            />
                                        </div>
                                        <div className='hidden'><input type="hidden" name="tags" value="7316242" /></div>
                                        <div className="col-span-12 md:col-span-5">
                                            <input
                                                type="email"
                                                name="E-mail"
                                                id="email"
                                                placeholder="Email"
                                                className="mb-2 md:mb-0"
                                                value={email}
                                                onChange={(e: any) => setEmail(e.target.value)}
                                            />
                                        </div>
                                        <div className="col-span-12 md:col-span-2">
                                            <button
                                                type="submit"
                                                className={`${styles.btn_newsletter}`}>
                                                    Enviar
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className='message-newsletter'>
                            {status === "sending" &&
                                <div className='pb-3'>{}</div>
                            }
                            {status === "error" &&
                                <div className='pb-3'>{error}</div>
                            }
                            {status === "success" &&
                                <div className='pb-3'>{sucess}</div>
                            }
                        </div>

                        {/* {
                            process.env.REACT_APP_CLIENT_NAME === "Caracol"
                                ?
                                i18next.language === "pt"
                                    ? */}
                                    <div className='flex justify-center pb-6'>
                                        <small className={`${styles.text_newsletter}`} style={{ lineHeight: "1.5rem", fontSize: ".85rem" }}>Ao informar seus dados, você concorda em receber newsletter do Parque do Caracol e concorda com a nossa <a href="/aviso-de-privacidade" style={{ color: "#FFCF01" }}>Política de Privacidade</a>. Você pode se descadastrar a qualquer momento.</small>
                                    </div>
                                    {/* :
                                    i18next.language === "en"
                                        ?
                                        <div className='d-flex justify-content-center'>
                                            <small className="text-newsletter" style={{ lineHeight: "1.5rem", fontSize: ".85rem" }}>By providing your data, you agree to receive a newsletter from Parque do Caracol and agree with our <a href="/aviso-de-privacidade" style={{ color: "#FFCF01" }}>Privacy Policy</a>. You can unsubscribe at any time.
                                            </small>
                                        </div>
                                        :
                                        i18next.language === "es"
                                            ?
                                            <div className='d-flex justify-content-center'>
                                                <small className="text-newsletter" style={{ lineHeight: "1.5rem", fontSize: ".85rem" }}>Al proporcionar sus datos, acepta recibir un boletín de noticias del Parque do Caracol y está de acuerdo con nuestra <a href="/aviso-de-privacidade" style={{ color: "#FFCF01" }}>Política de privacidad</a>. Puedes darte de baja en cualquier momento.</small>
                                            </div>
                                            :
                                            <div className='d-flex justify-content-center'>
                                                <small className="text-newsletter" style={{ lineHeight: "1.5rem", fontSize: ".85rem" }}>Ao informar seus dados, você concorda em receber newsletter do Parque do Caracol e concorda com a nossa <a href="/aviso-de-privacidade" style={{ color: "#FFCF01" }}>Política de Privacidade</a>. Você pode se descadastrar a qualquer momento.</small>
                                            </div>
                                :
                                <>
                                </>
                        } */}

                    </div>
                </div>
            </div >
        </>
    );
}

export default HomeNewsletter;