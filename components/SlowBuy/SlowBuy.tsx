'use client'

import React, { useState, useEffect } from "react";

import SlowBuyTour from "./components/SlowBuyTour";
import SlowBuyTicket from "./components/SlowBuyTicket";

import TagManager from 'react-gtm-module';

import { useParams } from "next/navigation";

import { getDictionary } from "@/dictionaries";

import IdChannelRepository from '@/core/IdChannelRepository';
import TourPageRepository from "@/core/TourPageRepository";
import TourPageCollection from "@/core/TourPage";
import TicketPageRepository from "@/core/TicketPageRepository";
import TicketPageCollection from "@/core/TicketPage";
import IdChannelCollection from '@/core/IdChannel';
import useWindowUrl from "@/data/hooks/useWindowUrl";
import { parseCookies, setCookie } from "nookies";
import { SlowBuySkeleton } from "@/app/[lng]/(overview)/ui/skeletons";

import styles from './SlowBuy.module.css';

function SlowBuy() {
    const cookies = parseCookies();

    const repoTicket: TicketPageRepository = new TicketPageCollection();
    const repoTour: TourPageRepository = new TourPageCollection();
    const repoChannel: IdChannelRepository = new IdChannelCollection();

    const url = useWindowUrl();

    const searchParams = useParams();

    const [tourResponse, setTourResponse] = useState<any>(null);
    const lng: string = searchParams.lng === "pt" ? "BR" : searchParams.lng === "en" ? "EN" : searchParams.lng === "es" ? "ES" : 'BR';

    const [langSelect, setLangSelect] = useState<any>(lng);
    const [count, setCount] = useState<number>(1);

    const [dic, setDic] = useState<any>(null);

    const codeUrl = url.split("/");
    const slugUrl = codeUrl[codeUrl.length - 1]?.split("?")[0];
    const isTrilha = codeUrl[4]?.split("?")[2];

    useEffect(() => {
        const fetchDictionary = async () => {
            const dictionary = await getDictionary(searchParams.lng as "pt" | "en" | "es", 'slowBuy');
            setDic(dictionary);
        };
        fetchDictionary();

    }, [searchParams.lng]);

    useEffect(() => {
        /* async function getItems() {
            const apiRequest = codeUrl[codeUrl.length - 1].split("?")[1].split('&')[0] === "type=tour" ?
                `${process.env.REACT_APP_SERVER_URL_API}/api/Products/FetchSingleTourAsync` :
                `${process.env.REACT_APP_SERVER_URL_API}/api/Products/FetchSingleTicketAsync`;
            try {
                const { data } = await api.post(apiRequest,
                    {
                        productCode: "",
                        lang: lng,
                        Slug: `${slugUrl.replaceAll("%20", " ").replaceAll("%C3%A9", "é")}`,
                        idCanal: isTrilha === "trilha" ? 7 : idChannel
                    }
                );
                if (data.status !== 400) {
                    if (data.statusCode === 204) {
                        if (count <= 3) {
                            if (data.data === null && (i18next.language === "pt-BR" || i18next.language === 'pt')) {
                                setCount(count + 1);
                                setLangSelect('EN');
                                i18next.changeLanguage('en');
                            } else if (data.data === null && i18next.language === "en") {
                                setCount(count + 1);
                                setLangSelect('ES');
                                i18next.changeLanguage('es');
                            } else {
                                setCount(count + 1);
                                setLangSelect('BR');
                                i18next.changeLanguage('pt');
                            }
                        } else {
                            window.location.href = "/404"
                        }
                    } else {
                        setTourResponse(data.data);
                    }
                }
            } catch (error) { }
        }

        const config = {
            headers: { "ngrok-skip-browser-warning": "69420" },
        };

        async function getIdChannel() {
            try {
                const { data } = await api.get(`${process.env.REACT_APP_SERVER_URL_API}/api/Products/GetChannelBySource/site`, config);
                if (data.statusCode === 200) {
                    idChannel = data.data.data;
                    getItems()
                }
            } catch (error) { }
        }

        getIdChannel(); */

       
        if (!cookies.idCanal) {
            repoChannel.getFiltered('site').then((result: any) => {
                if (result instanceof Error) {
                    const message = JSON.parse(result.message)
                    //setConectionError(true);
                    //setErrorMessage(message?.errors.length > 0 ? message?.errors.length : ['Erro desconhecido - Entre em contato com o Suporte'])
                } else {
                    setCookie(null, 'idCanal', result.data, {
                        maxAge: (60 * 10), //expira em 10 minutos (60 * 10)
                        path: '/',
                    });
                    
                    verifyType(result.data);
                }
            });
        } else {
            verifyType(cookies.idCanal);
        }

    }, [langSelect]);

    useEffect(() => {
        if (tourResponse !== null) {
            TagManager.dataLayer({
                dataLayer: {
                    ecommerce: {
                        detail: {
                            products: [{
                                name: tourResponse.productName,         // Name or ID is required.
                                id: tourResponse.productCode,
                                price: tourResponse?.modalities[0]?.tarif?.price,
                                brand: 'Caracol',
                            }]
                        }
                    }
                }
            });
        }
    }, [tourResponse]);

    const verifyType = (channel: string) => {
        if (codeUrl[codeUrl.length - 1]?.split("?")[1]?.split('&')[0] === "type=tour") {
            handleTour(channel);
        } else {
            handleTicket(channel);
        }
    }

    const handleTicket = (idCanal: string) => {
        repoTicket.getTicket(searchParams.slug as string, lng as string, +idCanal).then((result) => {
            if (result instanceof Error) {
                const message = JSON.parse(result.message)
                //setConectionError(true);
                //setErrorMessage(message?.errors.length > 0 ? message?.errors.length : ['Erro desconhecido - Entre em contato com o Suporte'])
            } else {
                if (tourResponse === null) {
                    //setLoading(false);
                    setTourResponse(result);
                }
            }
        });
    }

    const handleTour = (idCanal: string) => {
        repoTour.getTour(searchParams.slug as string, lng as string, +idCanal).then((result) => {
            if (result instanceof Error) {
                const message = JSON.parse(result.message)
                //setConectionError(true);
                //setErrorMessage(message?.errors.length > 0 ? message?.errors.length : ['Erro desconhecido - Entre em contato com o Suporte'])
            } else {
                if (tourResponse === null) {
                    //setLoading(false);
                    setTourResponse(result);
                }
            }
        });
    }

    if (tourResponse !== null) {
        return (
            <>
                {
                    tourResponse.typeProduct === "TOUR"
                        ?
                        <SlowBuyTour
                            tourResponse={tourResponse}
                            lng={lng}
                            dic={dic}
                        />
                        :
                        <SlowBuyTicket
                            tourResponse={tourResponse}
                            lng={lng}
                            dic={dic}
                        />
                }
            </>
        );
    } else {
        return (
            <>
                {SlowBuySkeleton(styles)}
            </>
        );
    }
}

export default SlowBuy;