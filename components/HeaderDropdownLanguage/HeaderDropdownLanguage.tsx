'use client'
import Link from 'next/link';
import Image from 'next/image';
import { useParams, usePathname, useSearchParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

// Components
import DropDown from '../base/DropDown/DropDown';

import iconBrazil from "../../assets/icons/icon-language/icons8-brazil-48.png";
import iconBretanha from "../../assets/icons/icon-language/icons8-gra-bretanha-48.png";
import iconSpain from "../../assets/icons/icon-language/icons8-spain-48.png";


//CSS
import styles from './HeaderDropdownLanguage.module.css';

export interface propDropDownLanguage {
    messageCart?: any,
    lng: any
}

const HeaderDropdownLanguage: React.FC<propDropDownLanguage> = ({ lng 
}) => {

    const pathname = usePathname();
    const searchParams = useParams();
    const portugues = lng === "pt" ? "Português" : lng === "en" ? "Portuguese" : lng === "es" ? "Portugués" : "Português"
    const ingles = lng === "pt" ? "Inglês" : lng === "en" ? "English" : lng === "es" ? "Inglés" : "Inglês"
    const espanhol = lng === "pt" ? "Espanhol" : lng === "en" ? "Spanish" : lng === "es" ? "Español" : "Espanhol"

    
    const otherLocales =['pt', 'es', 'en' , ]

    useEffect(() => {
        if (typeof window !== 'undefined') {
          const { protocol, host } = window.location;
          //setBaseUrl(`${protocol}//${host}`);
          console.log(`${protocol}//${host}`)
        }
      }, []);
      

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
            {otherLocales?.map((locale) => {

                let newAsPath = '';
                const getURL = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("productSlug") || '{}') : '';   
                searchParams.lng = locale;

                const segmentosInteressantes = ["/tour/", "/ticket/"];
                const segmentosIdioma = ["/pt/", "/en/", "/es/"];

                const contemSegmentos = segmentosInteressantes.some(segmento => pathname.includes(segmento));

                if (contemSegmentos) {
                    //console.log("A URL contém '/tour/' ou '/ticket/'.");
                    // Remove o segmento de idioma
                    const urlSemIdioma = segmentosIdioma.reduce((acc, segIdioma) => acc.replace(segIdioma, '/'), pathname);

                    const segmentoEncontrado = segmentosInteressantes.find(segmento => urlSemIdioma.includes(segmento)) || '';

                    if (segmentoEncontrado) {
                        const indiceSegmento = urlSemIdioma.indexOf(segmentoEncontrado);
                
                        // Verifica se indiceSegmento é um número válido
                        if (indiceSegmento !== -1) {
                            const urlAteSegmento = urlSemIdioma.slice(0, indiceSegmento + segmentoEncontrado.length);
                            console.log(`/${locale === 'pt' ? '' : locale}` + `${urlAteSegmento}`)
                            const novaUrl = `/${locale}${urlAteSegmento}`;
                            
                            newAsPath = `/${locale}${urlAteSegmento}` + (locale === "pt" ? getURL?.slugBR : locale === "en" ? getURL?.slugEN : locale === "es" ? getURL?.slugES : getURL?.slugBR) 
                            newAsPath = `${locale === 'pt' ? '' : '/' + locale}` + `${urlAteSegmento}` + (locale === "pt" ? getURL?.slugBR : locale === "en" ? getURL?.slugEN : locale === "es" ? getURL?.slugES : getURL?.slugBR) 
                            
                            //console.log(novaUrl); // Log da nova URL
                        } else {
                            //console.log('Segmento interessante não encontrado na URL.');
                        }
                    } else {
                        //console.log('Segmento interessante não encontrado na URL.');
                    }

                    
                } else {
                    //console.log("A URL não contém os segmentos interessados.");
                    const urlSemIdioma = segmentosIdioma.reduce((acc, segIdioma) => acc.replace(segIdioma, '/'), pathname);
                    //console.log(urlSemIdioma);
                    newAsPath = `/${locale === 'pt' ? '' : locale}`; 
                }
                
                return (
                    <Link className={styles.option} key={"locale-" + locale} href={{ pathname }} as={newAsPath} locale={locale}> 
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