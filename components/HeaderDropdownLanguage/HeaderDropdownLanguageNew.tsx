'use client'
import Link from 'next/link';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

// Components
import DropDown from '../base/DropDown/DropDown';

import iconBrazil from "../../assets/icons/icon-language/icons8-brazil-48.png";
import iconBretanha from "../../assets/icons/icon-language/icons8-gra-bretanha-48.png";
import iconSpain from "../../assets/icons/icon-language/icons8-spain-48.png";


//CSS
import styles from './HeaderDropdownLanguage.module.css';
import { useParams, usePathname} from 'next/navigation';


export interface propDropDownLanguage {
    messageCart?: any,
}

const HeaderDropdownLanguage: React.FC<propDropDownLanguage> = () => {
    const searchParams = useParams();
    const lng = searchParams.lng;


    const portugues = lng === "pt" ? "Português" : lng === "en" ? "Portuguese" : lng === "es" ? "Portugués" : "Português";
    const ingles = lng === "pt" ? "Inglês" : lng === "en" ? "English" : lng === "es" ? "Inglés" : "Inglês";
    const espanhol = lng === "pt" ? "Espanhol" : lng === "en" ? "Spanish" : lng === "es" ? "Español" : "Espanhol";

    
    const otherLocales =['pt', 'es', 'en'];

    
    const pathname = usePathname()

    function isObjectInUrlPath(params: object, locale: string) {
        if (typeof window !== 'undefined') {
            const url = window.location;
            
            // Extrai o caminho da URL e divide em segmentos
            let pathSegments = new URL(url as any).pathname.split('/').filter(segment => segment);
    
            // Verifica se o caminho contém '/tour/' ou '/ticket/'
            const path = new URL(url as any).pathname;
            let newURL = path;
            
    
            // Verifica cada par chave-valor no objeto 
            // Remover os valor de parametros da URL
            for (const [key, value] of Object.entries(params)) {
                newURL = newURL.split(`/${value}`).join('');
            }

            if (path.includes('/tour/') || path.includes('/ticket/')) {
                const getURL = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("productSlug") || '{}') : ''; 
                let newSlug = locale === "pt" ? getURL?.slugBR : locale === "en" ? getURL?.slugEN : locale === "es" ? getURL?.slugES : getURL?.slugBR;
                
                if(locale === "pt"){
                    newURL = newURL+ "/" + newSlug;
                }else{
                    newURL = "/"+locale+ newURL+"/" + newSlug;
                }
            }else{
                if(locale === "pt"){
                    newURL = `${newURL === '' ? "/" : newURL}`;
                }else{
                    newURL = "/"+locale +newURL;
                }
            }
    
            // Se todos os valores estiverem presentes nos segmentos do caminho, retorna verdadeiro
            return newURL;
        }else {
            return '';
        }
    }
    

    return (
        <DropDown style={styles.dropdown} styleHeader={styles.dropdownHeader} className="nav-link">
            {
                lng === "pt"
                    ?
                    <>{portugues}</>
                    :
                    lng === "en"
                        ?
                        <>{ingles}</>
                        :
                        lng === "es"
                            ?
                            <>{espanhol}</>
                            :
                            <>{portugues}</>
            }
            {otherLocales?.map((locale, key) => {
                const urlFinal = isObjectInUrlPath(searchParams, locale);
                
                return (
                    <Link className={styles.option} key={"locale-" + locale} href={urlFinal} as={urlFinal} locale={locale}> 
                        <span>
                            {
                                locale === "en"
                                    ?
                                    <Image src={iconBretanha} alt="icon English" />
                                    :
                                    locale === "pt"
                                        ?
                                        <Image src={iconBrazil} alt="icon Brazil" />
                                        :
                                        locale === "es"
                                            ?
                                            <Image src={iconSpain} alt="icon Spain" />
                                            :
                                            null}

                            {locale === "en" ? <>{ingles}</> : locale === "pt" ? <>{portugues}</> : locale === "es" ? <>{espanhol}</> : null}
                        </span>
                    </Link>
                );
            })}
        </DropDown>
    )
}



export default HeaderDropdownLanguage