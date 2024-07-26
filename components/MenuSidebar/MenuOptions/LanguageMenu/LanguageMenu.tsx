import React, { useState, useEffect } from 'react';

import { IconCheckMobile } from "../../../../assets/icons/index";

import styles from "./LanguageMenu.module.css";
import { useRouter } from 'next/router';
import { useParams } from 'next/navigation';
import { getDictionary } from '@/dictionaries';
import Link from 'next/link';

export interface props {
    setOpen: any;
}

const LanguageMenu: React.FC<props> = ({
    setOpen
}: props) => {

    const [dic, setDic] = useState<any>(null);
    const searchParams = useParams();

    useEffect(() => {
        const fetchDictionary = async () => {
            const dictionary = await getDictionary(searchParams.lng as "pt" | "en" | "es", 'menuSideBar');
            setDic(dictionary);
        };
    
        fetchDictionary();
    
    }, [searchParams.lng])


    const router = useRouter();

    const { locales, locale: activeLocale } = router;

    const otherLocales = locales?.filter(
        (locale) => locale !== "default"
    );

    return (
        <>
            <div className="menu-options-container">
                <div className="menu-options language-menu">
                    <div className={`${styles.header_menu}`}>
                        <div className='w-full'>
                            <h3 className='language-menu-title'>{dic?.LanguageMenu.selectLanguage}</h3>
                        </div>
                        <button id="menu-close-button-language-menu" className={`${styles.close_button}`} onClick={() => { setOpen(false) }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" viewBox="0 0 20.252 20.252" fill="#333A41">
                                <path d="M11.769 10.126l8.142 8.142a1.162 1.162 0 11-1.643 1.644l-8.143-8.143-8.142 8.143A1.162 1.162 0 01.34 18.268l8.142-8.142L.34 1.984A1.162 1.162 0 011.983.34l8.142 8.143 1.643 1.643zm8.142-8.142s-4.642 4.666-6.5 6.5a1.162 1.162 0 11-1.644-1.644c2.027-2.035 6.5-6.5 6.5-6.5a1.162 1.162 0 011.643 1.643z"></path>
                            </svg>
                        </button>
                    </div>

                    {otherLocales?.map((locale) => {
                        const { pathname, query, asPath } = router;

                        return (
                            <Link className={styles.option} key={"locale-" + locale} href={{ pathname, query }} as={asPath} locale={locale}>
                                <span>
                                    {
                                        locale === "en"
                                            ?
                                            <div className={`${styles.header_menu}`}>
                                                <div className='flex items-center gap-4'>
                                                    <span>{dic?.LanguageMenu.ingles}</span> {activeLocale === 'en' ? IconCheckMobile("#65E587", "15", "18") : <></>}
                                                </div>
                                            </div>
                                            :
                                            locale === "pt"
                                                ?
                                                <div className={`${styles.header_menu}`}>
                                                    <div className='flex items-center gap-4'>
                                                        <span>{dic?.LanguageMenu.portugues}</span> {activeLocale === 'pt' ? IconCheckMobile("#65E587", "15", "18") : <></>}
                                                    </div>
                                                </div>
                                                :
                                                locale === "es"
                                                    ?
                                                    <div className={`${styles.header_menu}`}>
                                                        <div className='flex items-center gap-4'>
                                                            <span>{dic?.LanguageMenu.espanhol}</span> {activeLocale === 'es' ? IconCheckMobile("#65E587", "15", "18") : <></>}
                                                        </div>
                                                    </div>
                                                    :
                                                    null}
                                </span>
                            </Link>
                        );
                    })}
                    {/* <div className={`${styles.header_menu}`} onClick={() => { changeLanguage('pt-BR') }}>
                        <div className='flex items-center gap-4'>
                            <span>{t("LanguageMenu.portugues")}</span> {lng === 'pt-BR' ? IconCheckMobile("#65E587", "15", "18") : <></>}
                        </div>
                    </div>
                    <div className={`${styles.header_menu}`} onClick={() => { changeLanguage('en') }}>
                        <div className='flex items-center gap-4'>
                            <span>{t("LanguageMenu.ingles")}</span> {lng === 'en' ? IconCheckMobile("#65E587", "15", "18") : <></>}
                        </div>
                    </div>
                    <div className={`${styles.header_menu}`} onClick={() => { changeLanguage('es') }}>
                        <div className='flex items-center gap-4'>
                            <span>{t("LanguageMenu.espanhol")}</span> {lng === 'es' ? IconCheckMobile("#65E587", "15", "18") : <></>}
                        </div>
                    </div> */}
                    {/* <div className="header-menu" onClick={() => { changeLanguage('fr') }}>
                        <div>
                            <span>Francês</span> {lng === 'fr' ? <img src={iconGreenCheck} alt="icon cart" style={{ marginLeft: "15px", width: "18px" }} /> : <></>}
                        </div>
                    </div> */}
                </div>
            </div>
        </>
    );
}

export default LanguageMenu;