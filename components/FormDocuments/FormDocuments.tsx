import React, { useEffect, useState } from "react";

import { Controller, useForm } from "react-hook-form";
//import { ErrorMessage } from '@hookform/error-message';
import styles from "./FormDocuments.module.css";
import { useParams } from "next/navigation";
import { getDictionary } from "@/dictionaries";
import { ErrorMessage } from "@hookform/error-message";

export interface propForm {
    action: any,
    back: any,
    choice: any,
    supplierControlObject: any
};

const FormDocuments: React.FC<propForm> = /* React.memo */(({
    action, back, choice, supplierControlObject
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

    const [cpf, setCpf] = useState<any>(supplierControlObject ? supplierControlObject.cpfDoc : '');
    const [cpfName, setCpfName] = useState<any>(supplierControlObject ? supplierControlObject.cpfDocName : '');

    const [rg, setRg] = useState<any>(supplierControlObject ? supplierControlObject.rgDoc : '');
    const [rgName, setRgName] = useState<any>(supplierControlObject ? supplierControlObject.rgDocName : '');
    const [rgVal, setRgVal] = useState<boolean>(false);

    const [socialContract, setSocialContract] = useState<any>(supplierControlObject ? supplierControlObject.contractDoc : '');
    const [socialContractName, setSocialContractName] = useState<any>(supplierControlObject ? supplierControlObject.contractDocName : '');
    const [socialContractVal, setSocialContractVal] = useState<boolean>(false);

    const [cnpjRepr, setCnpjRepr] = useState<any>(supplierControlObject ? supplierControlObject.cnpjAgenciaTurDoc : '');
    const [cnpjReprName, setCnpjReprName] = useState<any>(supplierControlObject ? supplierControlObject.cnpjAgenciaTurDocName : '');
    const [cnpjReprVal, setCnpjReprVal] = useState<boolean>(false);

    const [rgTurRepr, setRgTurRepr] = useState<any>(supplierControlObject ? supplierControlObject.registroMinTurDoc : '');
    const [rgTurReprName, setRgTurReprName] = useState<any>(supplierControlObject ? supplierControlObject.registroMinTurDocName : '');
    const [rgTurReprVal, setRgTurReprVal] = useState<boolean>(false);

    const [insMunRepr, setInsMunRepr] = useState<any>(supplierControlObject ? supplierControlObject.incricaoMunicipalDoc : '');
    const [insMunReprName, setInsMunReprName] = useState<any>(supplierControlObject ? supplierControlObject.incricaoMunicipalDocName : '');
    const [insMunReprVal, setInsMunReprVal] = useState<boolean>(false);

    const [certNegRepr, setCertNegRepr] = useState<any>(supplierControlObject ? supplierControlObject.certidaoNegativaDoc : '');
    const [certNegReprName, setCertNegReprName] = useState<any>(supplierControlObject ? supplierControlObject.certidaoNegativaName : '');

    const [cpfSocRepr, setCpfSocRepr] = useState<any>(supplierControlObject ? supplierControlObject.cpfSocDoc : '');
    const [cpfSocReprName, setCpfSocReprName] = useState<any>(supplierControlObject ? supplierControlObject.cpfSocDocName : '');
    const [cpfSocReprVal, setCpfSocReprVal] = useState<boolean>(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        /* defaultValues: {
            rgDoc: supplierControlObject ? supplierControlObject.rgDoc : '',
            cpfDoc: supplierControlObject ? supplierControlObject.cpfDoc : '',
            reprrgDoc: supplierControlObject ? supplierControlObject.reprrgDoc : '',
            socialcontractDoc: supplierControlObject ? supplierControlObject.socialcontractDoc : '',
        }, */
    });

    const validated = false;

    /* Pessoa Física */
    const cpfHandler = (e: any) => {
        if (e.target.files[0].type === "image/jpeg") {
            if (e.target.files[0].size <= 5242880) { //5MB -> 5242880
                const reader = new FileReader();
                reader.onload = () => {
                    if (reader.readyState === 2) {
                        setCpf(reader.result)
                    }
                }
                reader.readAsDataURL(e.target.files[0]);
                setCpfName(e.target.files[0].name);
            } else {
                alert("O tamanho da imagem tem que ser menor que 5MB!");
            }
        } else {
            alert("Anexe um arquivo no formato solicitado!");
        }
    }

    const rgHandler = (e: any) => {
        if (e.target.files[0].type === "image/jpeg") {
            if (e.target.files[0].size <= 5242880) { //5MB -> 5242880 
                const reader = new FileReader();
                reader.onload = () => {
                    if (reader.readyState === 2) {
                        setRg(reader.result)
                    }
                }
                reader.readAsDataURL(e.target.files[0]);
                setRgName(e.target.files[0].name);
            } else {
                alert("O tamanho da imagem tem que ser menor que 5MB");
            }
        } else {
            alert("Anexe um arquivo no formato solicitado!");
        }
    }
    /* END - Pessoa Física */

    const socialContractHandler = (e: any) => {
        if (e.target.files[0].type === "application/pdf") {
            if (e.target.files[0].size <= 5242880) { //5MB -> 5242880 
                const reader = new FileReader();
                reader.onload = () => {
                    if (reader.readyState === 2) {
                        setSocialContract(reader.result)
                    }
                }
                reader.readAsDataURL(e.target.files[0]);
                setSocialContractName(e.target.files[0].name);
            } else {
                alert("O tamanho da imagem tem que ser menor que 5MB");
            }
        } else {
            alert("Anexe um arquivo no formato solicitado!");
        }
    }

    const cnpjReprHandler = (e: any) => {
        if (e.target.files[0]?.type !== undefined) {
            if (e.target.files[0]?.type === "application/pdf" || e.target.files[0]?.type === "image/jpeg") {
                if (e.target.files[0]?.size <= 5242880) { //5MB -> 5242880 
                    const reader = new FileReader();
                    reader.onload = () => {
                        if (reader.readyState === 2) {
                            let docImage: any = reader.result;
                            let changeDoc: any = docImage.split("base64");
                            const finishDoc: any = changeDoc[0] + changeDoc[1];
                            setCnpjRepr(finishDoc);
                        }
                    }
                    reader.readAsDataURL(e.target.files[0]);
                    setCnpjReprName(e.target.files[0].name);
                } else {
                    alert("O tamanho da imagem tem que ser menor que 5MB");
                }
            } else {
                alert("Anexe um arquivo no formato solicitado!");
            }
        }
    }

    const rgTurReprHandler = (e: any) => {
        if (e.target.files[0]?.type !== undefined) {
            if (e.target.files[0]?.type === "application/pdf" || e.target.files[0]?.type === "image/jpeg") {
                if (e.target.files[0]?.size <= 5242880) { //5MB -> 5242880 
                    const reader = new FileReader();
                    reader.onload = () => {
                        if (reader.readyState === 2) {
                            let docImage: any = reader.result;
                            let changeDoc: any = docImage.split("base64");
                            const finishDoc: any = changeDoc[0] + changeDoc[1];
                            setRgTurRepr(finishDoc);
                        }
                    }
                    reader.readAsDataURL(e.target.files[0]);
                    setRgTurReprName(e.target.files[0].name);
                } else {
                    alert("O tamanho da imagem tem que ser menor que 5MB");
                }
            } else {
                alert("Anexe um arquivo no formato solicitado!");
            }
        }
    }

    const insMunReprHandler = (e: any) => {
        if (e.target.files[0]?.type !== undefined) {
            if (e.target.files[0]?.type === "application/pdf" || e.target.files[0]?.type === "image/jpeg") {
                if (e.target.files[0]?.size <= 5242880) { //5MB -> 5242880 
                    const reader = new FileReader();
                    reader.onload = () => {
                        if (reader.readyState === 2) {
                            let docImage: any = reader.result;
                            let changeDoc: any = docImage.split("base64");
                            const finishDoc: any = changeDoc[0] + changeDoc[1];
                            setInsMunRepr(finishDoc);
                        }
                    }
                    reader.readAsDataURL(e.target.files[0]);
                    setInsMunReprName(e.target.files[0].name);
                } else {
                    alert("O tamanho da imagem tem que ser menor que 5MB");
                }
            } else {
                alert("Anexe um arquivo no formato solicitado!");
            }
        }
    }

    const certNegReprHandler = (e: any) => {
        if (e.target.files[0]?.type !== undefined) {
            if (e.target.files[0]?.type === "application/pdf" || e.target.files[0]?.type === "image/jpeg") {
                if (e.target.files[0]?.size <= 5242880) { //5MB -> 5242880 
                    const reader = new FileReader();
                    reader.onload = () => {
                        if (reader.readyState === 2) {
                            let docImage: any = reader.result;
                            let changeDoc: any = docImage.split("base64");
                            const finishDoc: any = changeDoc[0] + changeDoc[1];
                            setCertNegRepr(finishDoc);
                        }
                    }
                    reader.readAsDataURL(e.target.files[0]);
                    setCertNegReprName(e.target.files[0].name);
                } else {
                    alert("O tamanho da imagem tem que ser menor que 5MB");
                }
            } else {
                alert("Anexe um arquivo no formato solicitado!");
            }
        }
    }

    const cpfSocReprHandler = (e: any) => {
        if (e.target.files[0]?.type !== undefined) {
            if (e.target.files[0]?.type === "application/pdf" || e.target.files[0]?.type === "image/jpeg") {
                if (e.target.files[0]?.size <= 5242880) { //5MB -> 5242880 
                    const reader = new FileReader();
                    reader.onload = () => {
                        if (reader.readyState === 2) {
                            let docImage: any = reader.result;
                            let changeDoc: any = docImage.split("base64");
                            const finishDoc: any = changeDoc[0] + changeDoc[1];
                            setCpfSocRepr(finishDoc);
                        }
                    }
                    reader.readAsDataURL(e.target.files[0]);
                    setCpfSocReprName(e.target.files[0].name);
                } else {
                    alert("O tamanho da imagem tem que ser menor que 5MB");
                }
            } else {
                alert("Anexe um arquivo no formato solicitado!");
            }
        }
    }

    const onSubmit = (data: any) => {
        data.rgDoc = rg === undefined ? "" : rg;
        data.rgDocName = rg === undefined ? "" : rgName;

        data.cpfDoc = cpf === undefined ? "" : cpf;
        data.cpfDocName = cpf === undefined ? "" : cpfName;

        data.contractDoc = socialContract === undefined ? "" : socialContract;
        data.contractDocName = socialContract === undefined ? "" : socialContractName;

        data.cnpjAgenciaTurDoc = cnpjRepr === undefined ? '' : cnpjRepr;
        data.cnpjAgenciaTurDocName = cnpjRepr === undefined ? '' : cnpjReprName;

        data.registroMinTurDoc = rgTurRepr === undefined ? '' : rgTurRepr;
        data.registroMinTurDocName = rgTurRepr === undefined ? '' : rgTurReprName;

        data.incricaoMunicipalDoc = insMunRepr === undefined ? '' : insMunRepr;
        data.incricaoMunicipalDocName = insMunRepr === undefined ? '' : insMunReprName;

        data.certidaoNegativaDoc = certNegRepr === undefined ? '' : certNegRepr;
        data.certidaoNegativaName = certNegRepr === undefined ? '' : certNegReprName;

        data.cpfSocDoc = cpfSocRepr === undefined ? '' : cpfSocRepr;
        data.cpfSocDocName = cpfSocRepr === undefined ? '' : cpfSocReprName;

        if (supplierControlObject?.compType === 2) {
            if (data.rgDoc !== "" || data.cpfDoc !== "") {
                action(data);
            } else {
                alert("Por favor, anexe os documentos.")
            }
        } else {
            if (data.rgDoc === "" || data.contractDoc === "" || data.cnpjAgenciaTurDoc === "" || data.registroMinTurDoc === "" || data.incricaoMunicipalDoc === "" || data.cpfSocDoc === "") {
                if (data.contractDoc === "") {
                    setSocialContractVal(true);
                }
                if (data.rgDoc === "") {
                    setRgVal(true);
                }
                if (data.registroMinTurDoc === "") {
                    setRgTurReprVal(true);
                }

                if (data.cnpjAgenciaTurDoc === "") {
                    setCnpjReprVal(true);
                }

                if (data.cpfSocDoc === "") {
                    setCpfSocReprVal(true);
                }

                if (data.incricaoMunicipalDoc === "") {
                    setInsMunReprVal(true);
                }
            } else {
                action(data);
            }
        }
    };

    return (
        <>
            <form noValidate onSubmit={handleSubmit(onSubmit)} autoComplete="false">
                {
                    supplierControlObject?.compType === 2
                        ?
                        <>
                            <div className="grid grid-cols-12">
                                <div className="col-span-12 md:col-span-6 mb-3">
                                    <label>{dic?.attachRG}</label><br />
                                    <Controller
                                        control={control}
                                        name="rgDoc"
                                        render={({ field }: any) => (
                                            <input
                                                type="file"
                                                {...field}
                                                label="Anexar RG (no formato JPEG)"
                                                aria-invalid={errors?.rgDoc ? "true" : ""}
                                                fullwidth={true}
                                                variant="standard"
                                                margin="normal"
                                                id="rgDoc"
                                                accept=".jpg"
                                                onChange={rgHandler}
                                                required
                                                className={`${styles.input_file}`}
                                            />
                                        )}
                                    />
                                    <label className={`${styles.btn_file}`} htmlFor="rgDoc">{dic?.attach}</label>
                                    <small>{supplierControlObject?.rgName !== undefined ? supplierControlObject?.rgName : rgName}</small>
                                </div>
                                <div className="col-span-12 md:col-span-6 mb-3">
                                    <label>{dic?.attachCpf}</label><br />
                                    <Controller
                                        control={control}
                                        name="cpfDoc"
                                        render={({ field }: any) => (
                                            <input type="file"
                                                {...field}
                                                label="Anexar CPF (no formato JPEG)"
                                                aria-invalid={errors?.cpfDoc ? "true" : ""}
                                                fullwidth={true}
                                                variant="standard"
                                                margin="normal"
                                                id="cpfDoc"
                                                accept=".jpg"
                                                onChange={cpfHandler}
                                                required
                                                className={`${styles.input_file}`}
                                            />
                                        )}
                                    />
                                    <label className={`${styles.btn_file}`} htmlFor="cpfDoc">{dic?.attach}</label>
                                    <small>{supplierControlObject?.cpfName !== undefined ? supplierControlObject?.cpfName : cpfName}</small>

                                </div>
                            </div>
                        </>
                        :
                        <>
                            <div className="grid grid-cols-12 mb-3">
                                <div className="col-span-12 md:col-span-6 mb-4 px-2">
                                    <label>{dic?.attachRepresentativeRG}</label><br />
                                    <Controller
                                        control={control}
                                        name="rgDoc"
                                        render={({ field }: any) => (
                                            <input type="file"
                                                {...field}
                                                label="Anexar RG (no formato JPEG) do Representante"
                                                aria-invalid={errors?.rgDoc ? "true" : ""}
                                                fullwidth={true}
                                                variant="standard"
                                                margin="normal"
                                                id="rgDoc"
                                                //accept=".jpg"
                                                onChange={rgHandler}
                                                required
                                                className={`${styles.input_file}`}
                                            />
                                        )}
                                    />
                                    <label className={`${styles.btn_file}`} htmlFor="rgDoc">{dic?.attach}</label>
                                    {
                                        rgVal === true && rgName === undefined
                                            ?
                                            <small style={{ color: "red" }}>Por favor, anexe um documento</small>
                                            :
                                            <small>{supplierControlObject.rgDocName !== undefined && supplierControlObject.rgDocName === rgName ? supplierControlObject.rgDocName : rgName}</small>
                                    }
                                </div>
                                <div className="col-span-12 md:col-span-6 mb-4 px-2">
                                    <label>{dic?.attachSocialContract}</label><br />
                                    <Controller
                                        control={control}
                                        name="contractDoc"
                                        render={({ field }: any) => (
                                            <input type="file"
                                                {...field}
                                                label="Anexar contrato social em PDF"
                                                aria-invalid={errors?.socialcontractDoc ? "true" : ""}
                                                fullwidth={true}
                                                variant="standard"
                                                margin="normal"
                                                id="contractDoc"
                                                //accept=".pdf"
                                                onChange={socialContractHandler}
                                                required
                                                className={`${styles.input_file}`}
                                            />
                                        )}
                                    />
                                    <label className={`${styles.btn_file}`} htmlFor="contractDoc">{dic?.attach}</label>
                                    {
                                        socialContractVal === true && socialContractName === undefined
                                            ?
                                            <small style={{ color: "red" }}>Por favor, anexe um documento</small>
                                            :
                                            <small>{supplierControlObject.contractDocName !== undefined && supplierControlObject.contractDocName === socialContractName ? supplierControlObject.contractDocName : socialContractName}</small>
                                    }
                                </div>

                                <div className="col-span-12 md:col-span-6 mb-4 px-2">
                                    <label>
                                        Telefone e CPF dos Sócios *
                                        {/* <OverlayTrigger
                                            placement={'right'}
                                            overlay={
                                                <Tooltip id="custom-tooltip">Para entrar em contato com você, se necessário e identificar o responsável pelo cadastro, e em caso de Pessoa Jurídica, identificar o responsável final da empresa (o representante legal).</Tooltip>
                                            }>
                                            <span>
                                                <FontAwesomeIcon
                                                    icon={["fal", "info-circle"]}
                                                    size="1x"
                                                    style={{ cursor: "pointer" }} />
                                            </span>
                                        </OverlayTrigger> */}
                                    </label><br />
                                    <Controller
                                        control={control}
                                        name="cpfSocDoc"
                                        render={({ field }: any) => (
                                            <input type="file"
                                                {...field}
                                                label="Anexar RG (no formato JPG)"
                                                aria-invalid={errors?.cpfSocDoc ? "true" : ""}
                                                fullwidth={true}
                                                variant="standard"
                                                margin="normal"
                                                id="cpfSocDoc"
                                                //accept=".pdf"
                                                onChange={cpfSocReprHandler}
                                                required
                                                className={`${styles.input_file}`}
                                            />
                                        )}
                                    />
                                    <label className={`${styles.btn_file}`} htmlFor="cpfSocDoc">{dic?.attach}</label>
                                    {
                                        cpfSocReprVal === true && cpfSocReprName === undefined
                                            ?
                                            <small style={{ color: "red" }}>Por favor, anexe um documento</small>
                                            :
                                            <small>{supplierControlObject.cpfSocDocName !== undefined && supplierControlObject.cpfSocDocName === cpfSocReprName ? supplierControlObject.cpfSocDocName : cpfSocReprName}</small>
                                    }
                                    <ErrorMessage
                                        errors={errors}
                                        name="CpfSocDoc"
                                        render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                                    />
                                </div>

                                <div className="col-span-12 md:col-span-6 mb-4 px-2">
                                    <label>Registro do Ministério do Turismo *
                                        {/* <OverlayTrigger
                                            placement={'right'}
                                            overlay={
                                                <Tooltip id="custom-tooltip">Para garantir segurança e confiabilidade aos nossos usuários.</Tooltip>
                                            }>
                                            <span>
                                                <FontAwesomeIcon
                                                    icon={["fal", "info-circle"]}
                                                    size="1x"
                                                    style={{ cursor: "pointer" }} />
                                            </span>
                                        </OverlayTrigger> */}
                                    </label><br />
                                    <Controller
                                        control={control}
                                        name="registroMinTurDoc"
                                        render={({ field }: any) => (
                                            <input type="file"
                                                {...field}
                                                label="Anexar RG (no formato JPG)"
                                                aria-invalid={errors?.registroMinTurDoc ? "true" : ""}
                                                fullwidth={true}
                                                variant="standard"
                                                margin="normal"
                                                id="registroMinTurDoc"
                                                //accept=".pdf"
                                                onChange={rgTurReprHandler}
                                                required
                                                className={`${styles.input_file}`}
                                            />
                                        )}
                                    />
                                    <label className={`${styles.btn_file}`} htmlFor="registroMinTurDoc">{dic?.attach}</label>
                                    {
                                        rgTurReprVal === true && rgTurReprName === undefined
                                            ?
                                            <small style={{ color: "red" }}>Por favor, anexe um documento</small>
                                            :
                                            <small>{supplierControlObject.registroMinTurDocName !== undefined && supplierControlObject.registroMinTurDocName === rgTurReprName ? supplierControlObject.registroMinTurDocName : rgTurReprName}</small>
                                    }
                                    <ErrorMessage
                                        errors={errors}
                                        name="RegistroMinTurDoc"
                                        render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                                    />
                                </div>
                                <div className="col-span-12 md:col-span-6 mb-4 px-2">
                                    <label>CNPJ com atividade principal Agência de Turismo *</label><br />
                                    <Controller
                                        control={control}
                                        name="cnpjAgenciaTurDoc"
                                        render={({ field }: any) => (
                                            <input type="file"
                                                {...field}
                                                label="Anexar RG (no formato JPG)"
                                                aria-invalid={errors?.cnpjAgenciaTurDoc ? "true" : ""}
                                                fullwidth={true}
                                                variant="standard"
                                                margin="normal"
                                                id="cnpjAgenciaTurDoc"
                                                //accept=".pdf"
                                                onChange={cnpjReprHandler}
                                                required
                                                className={`${styles.input_file}`}
                                            />
                                        )}
                                    />
                                    <label className={`${styles.btn_file}`} htmlFor="cnpjAgenciaTurDoc">{dic?.attach}</label>
                                    {
                                        cnpjReprVal === true && cnpjReprName === undefined
                                            ?
                                            <small style={{ color: "red" }}>Por favor, anexe um documento</small>
                                            :
                                            <small>{supplierControlObject.cnpjAgenciaTurDocName !== undefined && supplierControlObject.cnpjAgenciaTurDocName === cnpjReprName ? supplierControlObject.cnpjAgenciaTurDocName : cnpjReprName}</small>
                                    }
                                    <ErrorMessage
                                        errors={errors}
                                        name="CnpjAgenciaTurDoc"
                                        render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                                    />
                                </div>
                                <div className="col-span-12 md:col-span-6 mb-4 px-2">
                                    <label>Inscrição Municipal *</label><br />
                                    <Controller
                                        control={control}
                                        name="incricaoMunicipalDoc"
                                        render={({ field }: any) => (
                                            <input type="file"
                                                {...field}
                                                label="Anexar RG (no formato JPG)"
                                                aria-invalid={errors?.incricaoMunicipalDoc ? "true" : ""}
                                                fullwidth={true}
                                                variant="standard"
                                                margin="normal"
                                                id="incricaoMunicipalDoc"
                                                //accept=".pdf"
                                                onChange={insMunReprHandler}
                                                required
                                                className={`${styles.input_file}`}
                                            />
                                        )}
                                    />
                                    <label className={`${styles.btn_file}`} htmlFor="incricaoMunicipalDoc">{dic?.attach}</label>
                                    {
                                        insMunReprVal === true && insMunReprName === undefined
                                            ?
                                            <small style={{ color: "red" }}>Por favor, anexe um documento</small>
                                            :
                                            <small>
                                                {
                                                    supplierControlObject.incricaoMunicipalDocName !== undefined && supplierControlObject.incricaoMunicipalDocName === insMunReprName
                                                        ?
                                                        supplierControlObject.incricaoMunicipalDocName
                                                        :
                                                        insMunReprName
                                                }
                                            </small>
                                    }
                                    <ErrorMessage
                                        errors={errors}
                                        name="incricaoMunicipalDoc"
                                        render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                                    />
                                </div>
                                <div className="col-span-12 md:col-span-6 mb-4 px-2">
                                    <label>Certidão Negativa (atual) de protestos e títulos</label><br />
                                    <Controller
                                        control={control}
                                        name="certidaoNegativaDoc"
                                        render={({ field }: any) => (
                                            <input type="file"
                                                {...field}
                                                label="Anexar RG (no formato JPG)"
                                                aria-invalid={errors?.certidaoNegativaDoc ? "true" : ""}
                                                fullwidth={true}
                                                variant="standard"
                                                margin="normal"
                                                id="certidaoNegativaDoc"
                                                //accept=".pdf"
                                                onChange={certNegReprHandler}
                                                required
                                                className={`${styles.input_file}`}
                                            />
                                        )}
                                    />
                                    <label className={`${styles.btn_file}`} htmlFor="certidaoNegativaDoc">{dic?.attach}</label>
                                    <small>{supplierControlObject.certidaoNegativaDoc !== undefined && supplierControlObject.certidaoNegativaName === certNegReprName ? supplierControlObject.certidaoNegativaName : certNegReprName}</small>
                                    <ErrorMessage
                                        errors={errors}
                                        name="CertidaoNegativaDoc"
                                        render={({ message }) => <small style={{ color: "red" }}>{message}</small>}
                                    />
                                </div>
                            </div>
                            <p className="mt-3 mb-0"><b>Os anexos em formato JPEG ou PDF</b></p>
                        </>
                }

                <div className="grid grid-cols-12 gap-3 md:gap-6 pt-12">
                    <div className="col-span-12 md:col-start-7 md:col-span-3">
                        <button className={`${styles.btn_back} btn w-full mb-2 mb-md-0`} onClick={() => back(1)}>{dic?.back}</button>
                    </div>
                    <div className="col-span-12 md:col-span-3">
                        <button type="submit" className="btn btn-primary w-full">{dic?.continue}</button>
                    </div>
                </div>
            </form>
        </>
    )
});

export default FormDocuments;