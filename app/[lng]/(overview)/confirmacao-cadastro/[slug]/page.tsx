'use client'
import React, { useState, useEffect } from "react";
import { IconCheckCart, IconTimesCircled } from '@/assets/icons';

function Confirmation() {
    const [sucess, setSucess] = useState<any>("Processando...");
    const [log, setLog] = useState<any>(null);

    /* Enviar para Home */
    const onConfirm = () => {
        window.location.href = "/";
    };

    useEffect(() => {
        setTimeout(() => {
            window.location.href = "/";
        }, 45000);
    }, []);
    /* END - Enviar para Home */

    /* Confirmação de Email */
    useEffect(() => {
        setTimeout(() => {
            const getConfirmAccount = async () => {

                try {
                    const resp: any = await fetch(
                        `${process.env.NEXT_PUBLIC_SERVER_URL_API}/LoginSite/ConfirmAccount`,
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                "token": window.location.href.split('confirmacao-cadastro/')[1],
                            }),
                        }
                    );
                    const userResp: any = await resp.json();

                    if (userResp.data.statusCode !== 400) {
                        setSucess(userResp.data.texto);
                        setLog(userResp.data.log);
                    } else {
                        setSucess(userResp.data.texto);
                        setLog(userResp.data.log);
                    }
                } catch (error: any) {
                    if (error?.response?.status === 400) { }
                }
            }

            getConfirmAccount();
        }, 500);
    }, []);
    /* END - Confirmação de Email */

    return (
        <>
            <>
                <div className="container py-5 confirmation">
                    <div className="card card-confirmation py-5 px-3">
                        <div>
                            {
                                log === 1 || log === "1"
                                    ?
                                    <>
                                        <div className="text-center modalPayment flex justify-center">
                                            {(IconTimesCircled(120, 120))}
                                        </div>
                                    </>
                                    :
                                    log === 0 || log === "0"
                                        ?
                                        <>
                                            <div className="text-center modalPayment flex justify-center">
                                                {IconCheckCart("#00cc79", 120, 120)}
                                            </div>
                                        </>
                                        :
                                        <div className="text-center modalPayment">
                                            <div className="load primary big" style={{ bottom: '0' }}></div>
                                        </div>
                            }
                        </div>
                        <div className="mt-5 text-center">
                            <h5>{sucess}</h5>
                        </div>
                        <div className="mt-5 text-center">
                            {log !== null &&
                            <button type="button" onClick={onConfirm}>
                                Ok
                            </button>
                            }
                        </div>
                    </div>
                </div>
            </>
        </>
    )
}

export default Confirmation;