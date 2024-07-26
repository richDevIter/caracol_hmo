'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './Footer.module.css';
import {
    IconFacebook,
    IconInstagram,
    IconLinkedin,
    IconWhatsapp,
} from '@/assets/icons';
import { getDictionary } from '@/dictionaries';

//import Destitech from '../../../../assets/img/destitech-v2.svg';
import Newsletter from '@/components/Newsletter/Newsletter';
import MailchimpSubscribe from 'react-mailchimp-subscribe';

import { useParams } from 'next/navigation';

import LogoRS from '../../../../assets/img/caracol_estado.4c4c58cb.png';

export interface propFooter {
    lng?: any;
}

const Footer: React.FC<propFooter> = ({ lng }) => {
    const postUrl = `${process.env.NEXT_PUBLIC_MAILCHIMP_INTEGRATION}`;
    const [dic, setDic] = useState<any>(null);
    const searchParams = useParams();

    useEffect(() => {
        const fetchDictionary = async () => {
            const dictionary = await getDictionary(
                searchParams.lng as 'pt' | 'en' | 'es',
                'footer',
            );
            setDic(dictionary);
        };

        fetchDictionary();
    }, [searchParams.lng]);

    return (
        <footer>
            <div className="container-page">
                <div className="grid grid-cols-12 row_controll pt-12 pb-4">
                    {/*  Col 3 */}
                    <div className="col-span-12 md:col-span-3 px-3 mb-5 mb-md-0">
                        <div className={`${styles.bg_footer_images} flex items-center`}>
                            <Image
                                src={`${process.env.NEXT_PUBLIC_CLIENT_LOGO}`}
                                alt="Logo Destinow"
                                width={100}
                                height={100}
                                className="mb-4"
                                loading="lazy"
                            />
                            <Image
                                src={LogoRS}
                                alt="Logo Destinow"
                                width={125}
                                height={100}
                                className="mb-4"
                                loading="lazy"
                            />
                        </div>
                        <div className="footer-content">
                            <>
                                <a
                                    href={`https://api.whatsapp.com/send?phone=${process.env.NEXT_PUBLIC_INFO_WHATSAPP?.replaceAll(
                                        '+55',
                                        '55',
                                    )
                                        .replaceAll(' ', '')
                                        .replaceAll('-', '')
                                        .replaceAll('(21)', '21')}`}
                                    className={`${styles.content_footer_p} ${styles.content_footer_p_hover} flex items-center gap-2 mb-5 mb-md-2`}
                                >
                                    <span>{IconWhatsapp('#FFFFFF', '20px', '20px')}</span>
                                    (54) 99976-9063
                                </a>
                            </>
                        </div>
                    </div>

                    {/*  Col 3 */}
                    <div className="col-span-12 md:col-span-2 px-3 mb-5 mb-md-0">
                        <>
                            <h5 className={`${styles.content_footer_h5} mb-4`}>
                                {dic?.company}
                            </h5>
                            <ul className="footer-content">
                                <li className="mb-3">
                                    <a
                                        className={`${styles.content_footer_p} ${styles.content_footer_p_hover}`}
                                        href={`${lng}/sobre-nos`}
                                    >
                                        {dic?.aboutUs}
                                    </a>
                                </li>
                                <li className="mb-3">
                                    <a
                                        className={`${styles.content_footer_p} ${styles.content_footer_p_hover}`}
                                        href={`${lng}/perguntas-frequentes`}
                                    >
                                        {dic?.faq}
                                    </a>
                                </li>
                                <li className="mb-3">
                                    <a
                                        className={`${styles.content_footer_p} ${styles.content_footer_p_hover}`}
                                        href={`${lng}/afiliados`}
                                    >
                                        {dic?.affiliates}
                                    </a>
                                </li>
                                <li className="mb-3">
                                    <a
                                        className={`${styles.content_footer_p} ${styles.content_footer_p_hover}`}
                                        href={`${lng}/lojas`}
                                    >
                                        {dic?.stores}
                                    </a>
                                </li>
                            </ul>
                        </>
                    </div>

                    {/*  Col 3 */}
                    <div className="col-span-12 md:col-span-2 px-3 mb-5 mb-md-0">
                        <h5 className={`${styles.content_footer_h5} mb-4`}>
                            {dic?.support}
                        </h5>
                        <ul className="footer-content">
                            <li className="mb-3">
                                <a
                                    className={`${styles.content_footer_p} ${styles.content_footer_p_hover}`}
                                    href={`${lng}/termos-de-compra`}
                                >
                                    {dic?.terms}
                                </a>
                            </li>
                            <li className="mb-3">
                                <a
                                    className={`${styles.content_footer_p} ${styles.content_footer_p_hover}`}
                                    href={`${lng}/politica-de-privacidade`}
                                >
                                    {dic?.policy}
                                </a>
                            </li>
                            <li className="mb-3">
                                <a
                                    className={`${styles.content_footer_p} ${styles.content_footer_p_hover}`}
                                    href={`${lng}/cookies`}
                                >
                                    {dic?.cookies}
                                </a>
                            </li>
                            <li className="mb-3">
                                <a
                                    className={`${styles.content_footer_p} ${styles.content_footer_p_hover}`}
                                    href="https://portaldotitular.tah.group/titular_tah"
                                    target="_blank"
                                >
                                    {dic?.portal}
                                </a>
                            </li>
                            <li className="mb-3">
                                <a
                                    className={`${styles.content_footer_p} ${styles.content_footer_p_hover}`}
                                    href={`${lng}/relacoes-com-investidores`}
                                    target="_blank"
                                >
                                    Relações com Investidores
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/*  Col 3 */}
                    <div className="col-span-12 md:col-span-3 px-3 mb-4 mb-md-0">
                        <h5 className={`${styles.content_footer_h5} mb-4`}>Newsletter</h5>
                        <div className="footer-content">
                            <p className={`${styles.content_footer_p} mb-3`}>
                                {dic?.getOffers}
                            </p>
                            <div>
                                <MailchimpSubscribe
                                    url={postUrl}
                                    render={({ subscribe, status, message }: any) => (
                                        <Newsletter
                                            status={status}
                                            message={message}
                                            onValidated={(formData: any) => subscribe(formData)}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                    </div>

                    {/*  Col 3 */}
                    <div className="col-span-12 md:col-span-2 px-3 mb-4 mb-md-0 hidden md:block">
                        <>
                            <h5 className={`${styles.content_footer_h5} mb-4`}>
                                {dic?.midia}
                            </h5>

                            <ul className="footer-content flex">
                                <li>
                                    <a
                                        href="https://www.instagram.com/destinow_oficial/"
                                        title="Icone Instagram"
                                        aria-label="Icone Instagram"
                                        rel="noreferrer"
                                        target="_blank"
                                        className={styles.footer_brands}
                                        style={{ marginRight: '10px' }}
                                    >
                                        {IconInstagram(
                                            "var(--primary)",
                                            '24px',
                                            '24px',
                                        )}
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://www.facebook.com/destinowoficial"
                                        title="Icone Facebook"
                                        aria-label="Icone Facebook"
                                        rel="noreferrer"
                                        target="_blank"
                                        className={styles.footer_brands}
                                        style={{ marginRight: '10px' }}
                                    >
                                        {IconFacebook(
                                            "var(--primary)",
                                            '24px',
                                            '24px',
                                        )}
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://www.linkedin.com/company/destinow/"
                                        title="Icone Linkedin"
                                        aria-label="Icone Linkedin"
                                        rel="noreferrer"
                                        target="_blank"
                                        className={styles.footer_brands}
                                    >
                                        {IconLinkedin(
                                            "var(--primary)",
                                            '24px',
                                            '24px',
                                        )}
                                    </a>
                                </li>
                            </ul>
                        </>
                    </div>
                </div>
                {/* <div className="flex flex-col items-center pb-2">
                    <span style={{ fontSize: '.75rem' }}>{dic?.development} </span>
                    <a href="https://destitech.com.br/" target="_blank">
                        <Image
                            src={""}
                            width={75}
                            height={37.5}
                            alt="Destitech"
                            loading="lazy"
                        />
                    </a>
                </div> */}
            </div>
        </footer>
    );
};

export default Footer;
