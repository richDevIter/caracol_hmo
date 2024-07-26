

import React, { useEffect, useState } from 'react'

import styles from '../CheckoutPayments.module.css'
import { useParams } from 'next/navigation';
import { getDictionary } from '@/dictionaries';

const CheckoutPaymentPix = () => {

    const [dic, setDic] = useState<any>(null);
    const searchParams = useParams();

    useEffect(() => {
        const fetchDictionary = async () => {
            const dictionary = await getDictionary(searchParams.lng as "pt" | "en" | "es", 'checkout');
            setDic(dictionary);
        };
    
        fetchDictionary();
    
    }, [searchParams.lng])

    return (
        <>
            <div className={styles.accordion}>
                <div>
                    <h6 className={styles.title_payments} >{dic?.completePixPayment}</h6>
                    <div className="mb-3">
                        <div id="payment-div">
                            <p className='mb-0'>{dic?.payWithPix1}<br />{dic?.payWithPix2}<br />{dic?.payWithPix3}</p>
                            <br />
                            <div>
                                <p>
                                {dic?.pixStep1}<br />
                                {dic?.pixStep2}<br />
                                {dic?.pixStep3}<br />
                                </p>
                            </div>
                        </div>
                    </div>
                        
                </div>
            </div>
        </>
    )

}

export default CheckoutPaymentPix