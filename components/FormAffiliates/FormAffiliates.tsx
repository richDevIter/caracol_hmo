'use client'
import React, { useEffect, useState } from "react";

/* import FormAddress from "./components/FormAddress/FormAddress";
import FormBank from "./components/FormBank/FormBank";
import FormDocuments from "./components/FormDocuments/FormDocuments";
import PostShipping from "../../../../components/Modal/PostShipping/PostShipping"; */

import styles from "./FormAffiliates.module.css";
import FormPersonal from "../FormPersonal/FormPersonal";
import FormAddress from "../FormAddress/FormAddress";
import FormDocuments from "../FormDocuments/FormDocuments";
import FormBank from "../FormBank/FormBank";
import Modal from "../base/Modal/Modal";
import { IconCheckCircle, IconSpinner, IconTimes } from "@/assets/icons";


import { useParams, useRouter } from "next/navigation";
import { getDictionary } from "@/dictionaries";

function FormAffiliates() {

    const router = useRouter();

    const [stepCtrl, setStepCtrl] = useState<number>(0);
    const [choice, setChoice] = useState<boolean>(false);

    const [supplierControlObject, setSupplierControlObject] = useState<any>();
    const [supplierObject, setSupplierObject] = useState<any>();

    /* Success Modal (Inserir) */
    const [modalSuccess, setModalSuccess] = useState<any>(false);
    const [responseText, setResponseText] = useState<any>();
    const [modalContent, setModalContent] = useState<any>();
    const [log, setLog] = useState<any>();
    /* END - Success Modal (Inserir) */

    /* Recaptcha */
    const [loading, setLoading] = useState<any>(false);
    const [isRecaptcha, setIsRecaptcha] = useState<any>(null);
    /* END - Recaptcha */

    const searchParams = useParams();
    const [dic, setDic] = useState<any>(null);
  
    useEffect(() => {
        const fetchDictionary = async () => {
            const dictionary = await getDictionary(searchParams.lng as "pt" | "en" | "es", 'formAffiliates');
            setDic(dictionary);
        };
    
        fetchDictionary();
    
    }, [searchParams.lng])

    const handleNext = (newObject: any) => {
        setSupplierObject(newObject);
        setStepCtrl(stepCtrl + 1);
    };

    //const groupId: any = localStorage.getItem("GroupId");

    const handleFinished = (objectFinished: any) => {
        //objectFinished.groupId = parseInt(groupId);
        sendAffiliates(objectFinished);
    }

    const sendAffiliates = async (obj: object) => {
        setModalContent("loading");

        const str = obj;
        
        const resp: any = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/Affiliate/CreateAffiliateContractAsync`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(str)
        })
        const userAffiliate: any = await resp.json();

        if (userAffiliate.statusCode !== 400) {
            setResponseText(userAffiliate.data.texto);
            setLog(userAffiliate.data.log);
            if (userAffiliate.data.log === 0) {
                setModalContent("success");
                setTimeout(() => {
                    window.location.reload();
                }, 2500);
            } else {
                setModalContent("error");
            }
        } else {
            setResponseText(userAffiliate?.errorMessage);
            setLog(1);
            setModalContent("error");
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
            }, 50);
            setIsRecaptcha(null);
        }
    }

    useEffect(() => {
        setSupplierControlObject((prevState: any) => {
            return { ...prevState, ...supplierObject };
        });
    }, [supplierObject]);

    useEffect(() => {
        if (stepCtrl >= 4) {
            handleFinished(supplierControlObject);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [supplierControlObject]);

    return (
        <>
            <div className={`${styles.steps_guide} container`}>
                <div>
                    <div className={`flex items-center px-3 pb-1 px-md-0 col`}>
                        <div className={`${styles.step} ${styles.complete}`}>
                            1
                            <br />
                            <span className={`${styles.completeText}`}>
                                {dic?.personalData}
                            </span>
                        </div>
                        <div
                            className={
                                stepCtrl > 0 ? `${styles.stepline} ${styles.complete}` : `${styles.stepline}`
                            }
                        ></div>
                        <div className={stepCtrl > 0 ? `${styles.step} ${styles.complete}` : `${styles.step}`}>
                            2
                            <br />
                            <span className={stepCtrl > 0 ? `${styles.completeText}` : ""}>
                                {dic?.address}
                            </span>
                        </div>
                        <div
                            className={
                                stepCtrl > 1 ? `${styles.stepline} ${styles.complete}` : `${styles.stepline}`
                            }
                        ></div>
                        <div className={stepCtrl > 1 ? `${styles.step} ${styles.complete}` : `${styles.step}`}>
                            3
                            <br />
                            <span className={stepCtrl > 1 ? `${styles.completeText}` : ""}>
                                {dic?.documents}
                            </span>
                        </div>
                        <div
                            className={
                                stepCtrl > 2 ? `${styles.stepline} ${styles.complete}` : `${styles.stepline}`
                            }
                        ></div>
                        <div className={stepCtrl > 2 ? `${styles.step} ${styles.complete}` : `${styles.step}`}>
                            4
                            <br />
                            <span className={stepCtrl > 2 ? `${styles.completeText}` : ""}>
                                {dic?.bankData}
                            </span>
                        </div>
                    </div>
                </div>
                <div className={`${styles.forms_affiliates}`}>
                    {stepCtrl === 0 ? (
                        <FormPersonal
                            action={handleNext}
                            choice={setChoice}
                            supplierControlObject={supplierControlObject}
                        />
                    ) : (
                        "   "
                    )}
                    {stepCtrl === 1 ? (
                        <FormAddress
                            action={handleNext}
                            back={setStepCtrl}
                            supplierControlObject={supplierControlObject}
                        />
                    ) : (
                        " "
                    )}
                    {stepCtrl === 2 ? (
                        <FormDocuments
                            action={handleNext}
                            back={setStepCtrl}
                            choice={choice}
                            supplierControlObject={supplierControlObject}
                        />
                    ) : (
                        " "
                    )}
                    {stepCtrl > 2 ? (
                        <FormBank
                            action={handleNext}
                            setModalSuccess={setModalSuccess}
                            back={setStepCtrl}
                            supplierControlObject={supplierControlObject}
                            loading={loading}
                            isRecaptcha={isRecaptcha}
                            setIsRecaptcha={setIsRecaptcha}
                        />
                    ) : (
                        " "
                    )}
                </div>

                {/* Pós-envio */}
                <Modal
                    btnClose={false}
                    showModal={modalSuccess}
                    setShowModal={setModalSuccess}
                >
                    <div
                        style={{ height: '340px', maxWidth: "480px" }}
                        className={`${styles.modal_body} rounded-lg bg-white w-full py-4 px-6 flex flex-col justify-evenly items-center m-auto`}
                    >
                        <div>
                            {log === 1 ? (
                                <>{IconTimes("92", "92")}</>
                            ) : log === 0 ? (
                                <>{IconCheckCircle}</>
                            ) : (
                                <>{IconSpinner}</>
                            )}
                        </div>
                        <div className="text-center">
                            <h5 className="mb-1 text-2xl font-medium">
                                {log === 1
                                    ? `Erro na validação!`
                                    : log === 0
                                        ? `Sucesso`
                                        : `Esperando validação!`}
                            </h5>

                            <p className={`${styles.error_msg}`}>{responseText}</p>
                        </div>
                        <div>
                            <button
                                onClick={() => {
                                    setModalSuccess(false);
                                    if (log === 0) {
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
                {/* <PostShipping
                    modalSuccess={modalSuccess}
                    setModalSuccess={setModalSuccess}
                    modalContent={modalContent}
                    log={log}
                    responseText={responseText}
                    redirectOnSuccess={'/afiliados'}
                /> */}
                {/* END - Pós-envio */}
            </div>
        </>
    )
}

export default FormAffiliates;