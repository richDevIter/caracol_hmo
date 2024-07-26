import React, { useEffect, useState, Key } from "react";

import styles from './TourListFilter.module.css'
import { IconStar } from '@/assets/icons';

import { Range } from 'react-range';
/* import InputRange from "react-input-range";
import 'react-input-range/lib/css/index.css'; */
import { useRouter } from "next/router";
import { IRenderThumbParams, IRenderTrackParams } from "react-range/lib/types";
import { relative } from "path";
import { useParams } from "next/navigation";
import { getDictionary } from "@/dictionaries";

import ActivitiesRepository from "@/core/ActivitiesPageRepository";
import ActivitiesPageCollection from "@/core/ActivitiesPage";
import { channel } from "diagnostics_channel";
import IdChannelRepository from "@/core/IdChannelRepository";
import IdChannelCollection from "@/core/IdChannel";
import { parseCookies, setCookie } from "nookies";
export interface propFilter {
    value: any,
    setTourList: any,
    activeCarrousel: any,
    setActiveCarrousel?: any,
    setCarrouselCat?: any,
    slug: any;
    setTotalRows: any;
    setPageCount: any;
    setLoading: any;
};

const FilterTour: React.FC<propFilter> = ({
    value, setTourList, activeCarrousel, setActiveCarrousel, setCarrouselCat, slug, setTotalRows, setPageCount, setLoading
}: propFilter) => {
    const repo: ActivitiesRepository = new ActivitiesPageCollection;
    const repoChannel: IdChannelRepository = new IdChannelCollection();

    const cookies = parseCookies();

    const [dic, setDic] = useState<any>(null);
    const searchParams = useParams();

    useEffect(() => {
        const fetchDictionary = async () => {
            const dictionary = await getDictionary(searchParams.lng as "pt" | "en" | "es", 'tourListFilter');
            setDic(dictionary);
        };

        fetchDictionary();
    }, [searchParams.lng]);

    const lang: string = searchParams.lng === "pt" ? "BR" : searchParams.lng === "en" ? "EN" : searchParams.lng === "es" ? "ES" : 'BR';
    const [arrTour, setArrTour] = useState<any>([]);
    const [arrStars, setArrStars] = useState<any>([]);
    const [arrTypes, setArrTypes] = useState<any>([]);
    /* const [value, setValue] = useState<any>({ min: 0, max: 2500 }); */
    /* const [value, setValue] = useState<any>(null); */

    const [tourFirst, setTourFirst] = useState<any>([]);
    //const [tourFilterPriceRange, setTourFilterPriceRange] = useState<any>({ min: 0, max: 1000 });
    const [tourFilterPriceRange, setTourFilterPriceRange] = useState<any>({ values: [50] });
    const [tourFilterType, setTourFilterType] = useState<any>([]);
    const [tourFilterCategorie, setTourFilterCategorie] = useState<any>([]);
    const [tourFilterStars, setTourFilterStars] = useState<any>([]);

    const [objCat, setObjCat] = useState<any>();

    const [cat, setCat] = useState<any>([]);

    enum AuxCat {
        /* "Arte, Design e Moda" = 0 as any,
        "História e Cultura" = 1 as any,
        "Estilo de Vida e Celebrações" = 2 as any,
        "Natureza e Impacto Social" = 3 as any,
        "Viagem" = 4 as any,
        "Ar Livre e Aventura" = 5 as any, */
    }

    useEffect(() => {

        let aux: any = [];
        let auxIndex: any = [];
        let cat: any = document.querySelectorAll("#tours-cat input");

        for (let i = 0; i < cat.length; i++) {
            aux[i] = cat[i].id
        }

        for (let i = 0; i < cat.length; i++) {
            auxIndex.push(i)
        }

        setCat(aux);

    }, [tourFirst])

    async function searchTours(channel: number) {
        setLoading(true);
        console.log('asuhdhuasdhusda')
        repo.getActivities(`${slug.replaceAll("-", " ")}`, lang, tourFilterType.length > 1 || tourFilterType.length === 0 ? 0 : tourFilterType[0], tourFilterCategorie, tourFilterStars !== null ? tourFilterStars : [], tourFilterPriceRange.values[0], channel).then((result) => {
            if (result instanceof Error) {
                const message = JSON.parse(result.message)
                //setConectionError(true);
                //setErrorMessage(message?.errors.length > 0 ? message?.errors.length : ['Erro desconhecido - Entre em contato com o Suporte'])
                setLoading(false);
            } else {
                if (result !== null) {
                    setTotalRows(result.data.rowsCount);
                    setPageCount(1);
                    setTourList(result.data.rows);
                } else {
                    setTourList(false);
                }
                
                var aux: any = []
                result.data.categories.forEach((elem: any) => {
                    aux.push(elem);
                });
                setTourFirst(aux);
                setLoading(false);
            }
        });
    }

    useEffect(() => {

        handleIdChannelTours();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slug, tourFilterCategorie, tourFilterStars, tourFilterType, lang])

    function handleRangeChange(e: any) {
        /* setValue(e); */

        setTourFilterPriceRange(e);
    }

    /* Botão Filtrar Preço */
    async function handlePrice(channel: number) {
        setLoading(true);
        repo.getActivities(`${slug.replaceAll("-", " ")}`, lang, tourFilterType.length > 1 || tourFilterType.length === 0 ? 0 : tourFilterType[0], tourFilterCategorie, tourFilterStars !== null ? tourFilterStars : [], tourFilterPriceRange.values[0], channel).then((result) => {
            if (result instanceof Error) {
                setLoading(false);
                const message = JSON.parse(result.message)
                //setConectionError(true);
                //setErrorMessage(message?.errors.length > 0 ? message?.errors.length : ['Erro desconhecido - Entre em contato com o Suporte'])
            } else {
                if (result.data !== null) {
                    setTotalRows(result?.data.rowsCount);
                    setPageCount(1);
                    setTourList(result.data.rows);
                    if (tourFirst.length === 0) {
                        var aux: any = []
                        result.data.categories.forEach((elem: any) => {
                            aux.push(elem);
                            
                        });
                        
                        setTourFirst(aux);
                    }
                } else {
                    setTourList(false);
                }
                setLoading(false);
            }
        });
    }

    const handleIdChannelPrice = () => {
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
                    searchTours(result.data);
                }
            });
        } else {
            searchTours(+cookies.idCanal);
        }
    }

    const handleIdChannelTours = () => {
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
                    handlePrice(result.data);
                }
            });
        } else {
            handlePrice(+cookies.idCanal);
        }
    }

    /* END - Botão Filtrar Preço */

    function handleClickType(event: any, filterValue: any = null) {
        var value: any = event.target.value;

        if (filterValue !== null) { /// somente quando o click é feito no "x" da lista de filtros selecionados
            value = filterValue;
        }

        let types = [];

        if (arrTypes.includes(value) === true) {
            for (let i = 0; i < arrTypes.length; i++) {
                if (arrTypes[i] !== value) {
                    types.push(arrTypes[i]);
                }
            }

            setTourFilterType(types);
            setArrTypes(types);
        } else {
            setTourFilterType([...arrTypes, value]);
            setArrTypes([...arrTypes, value]);
        }
    }

    function handleClickTour(event: any, filterValue: any = null) {
        var value: any = event.target.value;

        var input = event.target.id;  ///auxilia para ativar o filtro no carrousel, quando o click ocorre no checkbox
        var activeAux = activeCarrousel;      ///auxilia para ativar o filtro no carrousel, quando o click ocorre no checkbox

        if (filterValue !== null) { /// somente quando o click é feito no "x" da lista de filtros selecionados
            value = filterValue;
            input = Number(input) + 1;

            filterValue = objCat[filterValue];
            filterValue = AuxCat[filterValue]

            activeAux[filterValue] = !activeAux[filterValue];
        }

        activeAux[AuxCat[input]] = !activeAux[AuxCat[input]];       ///auxilia para ativar o filtro no carrousel, quando o click ocorre no checkbox
        setActiveCarrousel(activeAux);        ///auxilia para ativar o filtro no carrousel, quando o click ocorre no checkbox

        let tour: any = [];

        if (arrTour.includes(value) === true) {                    ///remove da lista caso ja exista
            for (let i = 0; i < arrTour.length; i++) {
                if (arrTour[i] !== value) {
                    tour.push(arrTour[i]);
                }
            }

            setTourFilterCategorie(tour);
            setArrTour(tour);
        } else {                                                   ///adiciona na lista
            setTourFilterCategorie([...arrTour, value]);
            setArrTour([...arrTour, value]);
        }
    }

    useEffect(() => {
        setTourFilterPriceRange({ values: [value.max] })
    }, [value])

    function handleClickStars(event: any, filterValue: any = null) {
        var value: any = event.target.value;

        if (filterValue !== null) { /// somente quando o click é feito no "x" da lista de filtros selecionados
            value = filterValue;
        }

        let stars = [];

        if (arrStars.includes(value) === true) {
            for (let i = 0; i < arrStars.length; i++) {
                if (arrStars[i] !== value) {
                    stars.push(arrStars[i]);
                }
            }

            setTourFilterStars(stars);
            setArrStars(stars);
        } else {
            setTourFilterStars([...arrStars, value]);
            setArrStars([...arrStars, value]);
        }
    }

    function clearFilters() {
        setTourFilterType([]);
        setArrTypes([]);
        setTourFilterCategorie([]);
        setArrTour([]);
        setTourFilterStars([]);
        setArrStars([]);
        setActiveCarrousel([false, false, false, false, false, false]);
    }

    useEffect(() => {
        setCarrouselCat(tourFirst)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tourFirst])

    useEffect(() => {
        var objeto: any = {}

        for (let i = 0; i < tourFirst.length; i++) {
            var chave = `${tourFirst[i].categorieCode}`;
            var valor = `${tourFirst[i].categorieName}`;
            objeto[chave] = valor;
        }

        setObjCat(objeto);
    }, [tourFirst])

    return (
        <>
            <div className={`${styles.bg_tour_list_filter} pt-1 p-6`}>
                <div className="mt-4 mb-5 hidden md:block">
                    {(tourFilterType.length > 0)
                        ? tourFilterType.map((filter: any, index: Key) => (
                            <div key={index} className="flex justify-between">
                                <p>{filter === "1" ? "Tour" : filter === "4" ? "Tickets" : ''}</p>
                                <p onClick={(e) => handleClickType(e, filter)} style={{ cursor: "pointer" }}>x</p>
                            </div>
                        ))
                        : ''
                    }

                    {tourFilterCategorie.length > 0
                        ? tourFilterCategorie.map((filter: any, index: Key) => (
                            <div key={index} className="flex justify-between">
                                <p>{objCat[filter]}</p>
                                <p onClick={(e) => handleClickTour(e, filter)} id={"close-" + index/* AuxTourClose[filter] */} style={{ cursor: "pointer" }}>x</p>
                            </div>
                        ))
                        : ''
                    }

                    {tourFilterStars.length > 0
                        ? tourFilterStars.map((filter: any, index: Key) => (
                            <div key={index} className="flex justify-between">
                                <p>{filter} {dic?.stars}</p>
                                <p onClick={(e) => handleClickStars(e, filter)} style={{ cursor: "pointer" }}>x</p>
                            </div>
                        ))
                        : ''
                    }

                    {tourFilterCategorie.length > 0 || tourFilterStars.length > 0 || tourFilterType.length > 0
                        ? <small className="clear-filter" onClick={clearFilters} style={{ cursor: 'pointer' }}>Limpar</small>
                        : ''
                    }


                </div>
                <div>
                    <h5
                        className={`${styles.h5_bg_tour_list_filter} mb-5 pt-1`}
                    >
                        {dic?.price}
                    </h5>
                    <div className="d-flex m-auto">
                        {value
                            ?
                            <Range
                                step={50}
                                min={value.min}
                                max={value.max}
                                values={tourFilterPriceRange.values}
                                onChange={(values: any) => setTourFilterPriceRange({ values: values })}
                                renderTrack={({ props, children }) => (
                                    <div
                                        {...props}
                                        style={{
                                            ...props.style,
                                            height: '6px',
                                            width: '100%',
                                            backgroundColor: '#034C43'
                                        }}
                                    >
                                        {children}
                                        <div style={{ position: 'relative' }}>
                                            <div className="flex justify-between" style={{ position: 'absolute', width: '110%', top: '-30px' }}>
                                                <p>{value.min}</p>
                                                <p>{value.max}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                renderThumb={({ props }) => (
                                    <div
                                        {...props}
                                        style={{
                                            ...props.style,
                                            height: '20px',
                                            width: '20px',
                                            backgroundColor: '#034C43',
                                            borderRadius: '50%'
                                        }}
                                    >
                                        <div
                                            style={{
                                                position: 'absolute',
                                                top: '20px',
                                                left: '-50%',
                                                color: '#fff',
                                                fontWeight: 'bold',
                                                fontSize: '14px',
                                                fontFamily: 'Arial,Helvetica Neue,Helvetica,sans-serif',
                                                padding: '4px',
                                                borderRadius: '4px',
                                                backgroundColor: '#034C43'
                                            }}
                                        >
                                            {tourFilterPriceRange.values}
                                        </div>
                                    </div>
                                )} />
                            : ''
                        }
                    </div>
                    <div style={{ marginTop: "50px" }}>
                        <button
                            onClick={handleIdChannelPrice}
                            className="btn btn-primary"
                            style={{ borderRadius: "100px", width: "96%" }}
                        >
                            {dic?.btnPrice}
                        </button>
                    </div>
                </div>
                <div>
                    <h5
                        className={`${styles.h5_bg_tour_list_filter} `}
                    >
                        {dic?.type}
                    </h5>
                    <div className="d-flex flex-column">
                        <div className="check-cat">
                            <input
                                checked={tourFilterType.includes("1")}
                                type="checkbox"
                                name="type"
                                id="type-1"
                                value={1}
                                onChange={handleClickType}
                            />
                            <label htmlFor="type-1">Tour</label>
                        </div>
                        <div className="check-cat">
                            <input
                                checked={tourFilterType.includes("4")}
                                type="checkbox"
                                name="type"
                                id="type-2"
                                value={4}
                                onChange={handleClickType}
                            />
                            <label htmlFor="type-2">Tickets</label>
                        </div>
                    </div>
                </div>
                <div>
                    <h5
                        className={`${styles.h5_bg_tour_list_filter} `}
                    >
                        {dic?.categories}
                    </h5>
                    <div id="tours-cat" className="d-flex flex-column">
                        {tourFirst.length > 0
                            ? tourFirst.map((tourCode: any, index: Key) => (
                                <div className="check-cat break-all" key={index}>
                                    <input
                                        checked={tourFilterCategorie.includes(tourCode.categorieCode)}
                                        type="checkbox"
                                        name={tourCode.categorieName}
                                        id={tourCode.categorieName}
                                        value={tourCode.categorieCode}
                                        onChange={handleClickTour}
                                    />
                                    <label htmlFor={tourCode.categorieName}>{tourCode.categorieName}</label>
                                </div>
                            ))
                            : ''
                        }
                    </div>
                    <div>
                        <h5
                            className={`${styles.h5_bg_tour_list_filter} `}
                        >
                            {dic?.numberStar}
                        </h5>
                        <div className="d-flex flex-column">
                            <div className={`${styles.bg_tour_list_filter_star_group}`}>
                                <input
                                    checked={tourFilterStars.includes("5")}
                                    onChange={handleClickStars}
                                    type="checkbox"
                                    name="aval-1"
                                    id="aval-1"
                                    value={5}
                                />
                                <label htmlFor="aval-1" style={{ display: "flex" }}>
                                    <div className={`${styles.bg_tour_list_filter_star}`}>{IconStar("#ffc60a", "13.78")}</div>
                                    <div className={`${styles.bg_tour_list_filter_star}`}>{IconStar("#ffc60a", "13.78")}</div>
                                    <div className={`${styles.bg_tour_list_filter_star}`}>{IconStar("#ffc60a", "13.78")}</div>
                                    <div className={`${styles.bg_tour_list_filter_star}`}>{IconStar("#ffc60a", "13.78")}</div>
                                    <div className={`${styles.bg_tour_list_filter_star}`}>{IconStar("#ffc60a", "13.78")}</div>
                                </label>
                            </div>
                            <div className={`${styles.bg_tour_list_filter_star_group}`}>
                                <input
                                    checked={tourFilterStars.includes("4")}
                                    type="checkbox"
                                    name="aval-2"
                                    id="aval-2"
                                    value={4}
                                    onChange={handleClickStars}
                                />
                                <label htmlFor="aval-2" style={{ display: "flex" }}>
                                    <div className={`${styles.bg_tour_list_filter_star}`}>{IconStar("#ffc60a", "13.78")}</div>
                                    <div className={`${styles.bg_tour_list_filter_star}`}>{IconStar("#ffc60a", "13.78")}</div>
                                    <div className={`${styles.bg_tour_list_filter_star}`}>{IconStar("#ffc60a", "13.78")}</div>
                                    <div className={`${styles.bg_tour_list_filter_star}`}>{IconStar("#ffc60a", "13.78")}</div>
                                    <div className={`${styles.bg_tour_list_filter_star}`}>{IconStar("#fff0", "13.78")}</div>
                                </label>
                            </div>
                            <div className={`${styles.bg_tour_list_filter_star_group}`}>
                                <input
                                    checked={tourFilterStars.includes("3")}
                                    type="checkbox"
                                    name="aval-3"
                                    id="aval-3"
                                    value={3}
                                    onChange={handleClickStars}
                                />
                                <label htmlFor="aval-3" style={{ display: "flex" }}>
                                    <div className={`${styles.bg_tour_list_filter_star}`}>{IconStar("#ffc60a", "13.78")}</div>
                                    <div className={`${styles.bg_tour_list_filter_star}`}>{IconStar("#ffc60a", "13.78")}</div>
                                    <div className={`${styles.bg_tour_list_filter_star}`}>{IconStar("#ffc60a", "13.78")}</div>
                                    <div className={`${styles.bg_tour_list_filter_star}`}>{IconStar("#fff0", "13.78")}</div>
                                    <div className={`${styles.bg_tour_list_filter_star}`}>{IconStar("#fff0", "13.78")}</div>
                                </label>
                            </div>
                            <div className={`${styles.bg_tour_list_filter_star_group}`}>
                                <input
                                    checked={tourFilterStars.includes("2")}
                                    type="checkbox"
                                    name="aval-4"
                                    id="aval-4"
                                    value={2}
                                    onChange={handleClickStars}
                                />
                                <label htmlFor="aval-4" style={{ display: "flex" }}>
                                    <div className={`${styles.bg_tour_list_filter_star}`}>{IconStar("#ffc60a", "13.78")}</div>
                                    <div className={`${styles.bg_tour_list_filter_star}`}>{IconStar("#ffc60a", "13.78")}</div>
                                    <div className={`${styles.bg_tour_list_filter_star}`}>{IconStar("#fff0", "13.78")}</div>
                                    <div className={`${styles.bg_tour_list_filter_star}`}>{IconStar("#fff0", "13.78")}</div>
                                    <div className={`${styles.bg_tour_list_filter_star}`}>{IconStar("#fff0", "13.78")}</div>
                                </label>
                            </div>
                            <div className={`${styles.bg_tour_list_filter_star_group}`}>
                                <input
                                    checked={tourFilterStars.includes("1")}
                                    type="checkbox"
                                    name="aval-5"
                                    id="aval-5"
                                    value={1}
                                    onChange={handleClickStars}
                                />
                                <label htmlFor="aval-5" style={{ display: "flex" }}>
                                    <div className={`${styles.bg_tour_list_filter_star}`}>{IconStar("#ffc60a", "13.78")}</div>
                                    <div className={`${styles.bg_tour_list_filter_star}`}>{IconStar("#fff0", "13.78")}</div>
                                    <div className={`${styles.bg_tour_list_filter_star}`}>{IconStar("#fff0", "13.78")}</div>
                                    <div className={`${styles.bg_tour_list_filter_star}`}>{IconStar("#fff0", "13.78")}</div>
                                    <div className={`${styles.bg_tour_list_filter_star}`}>{IconStar("#fff0", "13.78")}</div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FilterTour;
