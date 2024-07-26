import React, { useEffect, useState } from "react";

import styles from "./PostPurchasePaymentDetails.module.css"

//backgroung
import Mastercard from "@/assets/img/mastercard.png";
import IconCard from "@/assets/icons/bi_credit-card-2-back-fill.svg";
import IconElo from "@/assets/icons/elo-logo.svg";
import IconHiper from "@/assets/icons/hipercard-logo.svg";
import IconVisa from "@/assets/icons/VISA-logoeps.com.png";
import iconPix from "@/assets/icons/svg/icon-pix.svg";
import Image from "next/image";
import iconPicpay from "@/assets/icons/picpay_logo.png";
import { useParams } from "next/navigation";
import { getDictionary } from "@/dictionaries";
//backgroung

export interface purchase {
    items: any;
}

const PurchasePaymentDetails: React.FC<purchase> = ({
    items
}: purchase) => {

    const [dic, setDic] = useState<any>(null);
    const searchParams = useParams();
  
    useEffect(() => {
      const fetchDictionary = async () => {
          const dictionary = await getDictionary(searchParams.lng as "pt" | "en" | "es", 'order');
          setDic(dictionary);
      };
  
      fetchDictionary();
  
  }, [searchParams.lng])

    const [info, setInfo] = useState<any>({});

    useEffect(() => {
        setInfo(JSON.parse(localStorage.getItem('checkoutInfo') || '{}'));
    }, [])

    return (
        <div className={styles.payment_details}>
            <div className="container mx-auto p-0">
                <div className="grid grid-cols-12 row_controll w-full m-auto">
                    <div className='col-span-12 flex justify-between'>
                        <div>
                            <h6><strong>{dic?.subtotal}</strong></h6>
                        </div>
                        <div>
                            <h6>{Number(items?.totalCart || 0).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</h6>
                        </div>
                    </div>
                </div>
                {
                    items?.cupom?.type !== 0
                        ?
                        <div className="grid grid-cols-12 row_controll w-full m-auto">
                            <div className='col-span-12 flex justify-between'>
                                <div>
                                    <h6>{dic?.discount}</h6>
                                </div>
                                <div>
                                    {
                                        items?.cupom?.type === 4 || items?.cupom?.type === 3
                                            ?
                                            <h6>{items?.cupom?.value}%</h6>
                                            :
                                            items?.cupom?.type === 2
                                                ?
                                                <h6>{items?.cupom?.value?.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</h6>
                                                :
                                                <h6>{items?.cupom?.value}%</h6>
                                    }
                                </div>
                            </div>
                        </div>
                        :
                        ""
                }
                <div className="grid grid-cols-12 row_controll w-full m-auto">
                    <div className='col-span-12 flex justify-between'>
                        <div className="border-b-2 border-gray w-full mt-5 mb-4"></div>
                    </div>
                </div>
                <div className="grid grid-cols-12 row_controll w-full m-auto">
                    <div className='col-span-12 flex justify-between items-end'>
                        <div>
                            <h6 className="mb-0"><strong>{dic?.total}:</strong></h6>
                        </div>
                        <div>
                            <h6 className="d-flex align-items-end mb-0">
                                <strong>R$</strong><span className="text-primary fs-2 fw-bold text-4xl font-bold" style={{ position: "relative", top: "4px" }}>{Number(items?.totalCart || 0).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }).split("R$")}</span>
                            </h6>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-12 row_controll w-full m-auto">
                    <div className='col-span-12 flex justify-between'>
                        <div className="border-b-2 border-gray w-full mt-6 mb-5"></div>
                    </div>
                </div>
                <div className="grid grid-cols-12 row_controll w-full m-auto">
                    <div className='col-span-12'>
                        {
                            info.log !== 2 && info.log !== '2'
                                ?
                                <h6 className="pb-2">
                                    <strong>
                                        {dic?.paymentMadeWith}:
                                    </strong>
                                </h6>
                                :
                                <h6 className="pb-2">
                                    <strong>
                                        {dic?.paymentMadeWith}:
                                    </strong>
                                </h6>
                        }
                    </div>
                </div>
                <div className="grid grid-cols-12 row_controll w-full m-auto">
                    <div className='col-span-3 xs:col-span-12'>
                        {
                            items?.payments[0]?.brand === "mastercard" && items?.payments[0]?.payMethod !== 96 && items?.payments[0]?.payMethod !== 110
                                ?
                                <Image width="60" height="52" src={Mastercard} alt="Cartão" className="mr-3" style={{ width: "60px" }} />
                                :
                                items?.payments[0]?.brand === "visa" && items?.payments[0].payMethod !== 96 && items?.payments[0]?.payMethod !== 110
                                    ?
                                    <Image width="60" height="52" src={IconVisa} alt="Cartão" className="mr-3" style={{ width: "60px" }} />
                                    :
                                    items?.payments[0]?.brand === "hipercard" && items?.payments[0].payMethod !== 96 && items?.payments[0]?.payMethod !== 110
                                        ?
                                        <Image width="60" height="52" src={IconHiper} alt="Cartão" className="mr-3" style={{ width: "60px" }} />
                                        :
                                        items?.payments[0]?.brand === "elo" && items?.payments[0].payMethod !== 96 && items?.payments[0]?.payMethod !== 110
                                            ?
                                            <Image width="60" height="52" src={IconElo} alt="Cartão" className="mr-3" style={{ width: "60px" }} />
                                            :
                                            items?.payments[0]?.payMethod === 96
                                                ?
                                                <Image width="52" height="52" src={iconPix} alt="PIX" className="mr-3" style={{ width: "52px" }} />
                                                :
                                                items?.payments[0]?.payMethod === 110
                                                    ?
                                                    <Image width="52" height="52" src={iconPicpay} alt="PICPAY" className="mr-3" style={{ width: "52px" }} />
                                                    :
                                                    <Image width="52" height="52" src={IconCard} alt="Cartão" className="mr-3" style={{ width: "52px" }} />
                        }
                    </div>
                    <div className='col-span-9 xs:col-span-12'>
                        <h6 className="my-0 text-capitalize">{items?.payments[0]?.payMethod !== 96 ? items?.payments[0]?.brand : "PIX"}</h6>
                        <p className="my-0">{items?.payments[0]?.installments}x de {(items?.totalCart / items?.payments[0]?.installments).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })} {dic?.noTaxes}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PurchasePaymentDetails;
