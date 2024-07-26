import React, { useEffect, useState } from 'react'

import Image from 'next/image';

import style from './Search.module.css'
import { IconSearch } from '@/assets/icons';

import { getDictionary } from '@/dictionaries';
import { useParams } from 'next/navigation';


const HeaderSearch = () => {

  const [dic, setDic] = useState<any>(null);

  const searchParams = useParams();


    const [searchTerm, setSearchTerm] = useState<string>("");
    const [tours, setTours] = useState<any>("");
    const [locations, setLocations] = useState<any>("");
    const [isOpen, setIsOpen] = useState<any>(false);
    const [searchValue, setSearchValue] = useState<any>('');
    const [valueSelect, setValueSelect] = useState<any>(null);

   
    function getLocations(data: any) {
        var aux: any = [];

        data?.forEach((element: any) => {
            if (!aux.includes(element.eventLocation)) {
                aux.push(element.eventLocation);
            }
        });

        setLocations(aux);
    }

    const searchTours = async () => {

        const data = {
            term: searchTerm,
            channel: 3,
            lang: "BR",
            ProductType: 0,
        }

        const resp = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL_API}/Products/SearchByChannel`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const categoryResp = await resp.json()
        setTours(categoryResp.data);
        getLocations(categoryResp.data);
        setIsOpen(true);
    };

    const convertToSlug = (text: any) => {
        const a = 'àáäâãèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;'
        const b = 'aaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------'
        const p = new RegExp(a.split('').join('|'), 'g')
        return text?.toString().toLowerCase().trim()
            .replace(p, (c: any) => b.charAt(a.indexOf(c))) // Replace special chars
            .replace(/&/g, '-and-') // Replace & with 'and'
            .replace(/[\s\W-]+/g, '-') // Replace spaces, non-word characters and dashes with a single dash (-)
    }

    const handleClickSearch = (city: any) => {
        console.log(city)
        if (city?.type === "tour") {
            /* Tratar Ticket */

            if (city?.typeSearch === "TOUR") {
                window.location.href =
                    window.location.origin + "/tour/" + city.slug;
            } else if (city?.typeSearch === "TICKET") {
                //router.push(`/ticket/${city.slug}`)
                window.location.href =
                    window.location.origin + "/ticket/" + city.slug;
            }

            /* Tratar Ticket */
        } else if (city?.type === "city") {
            //router.push(`/atividades/${city.slug}`)
            window.location.href =
                window.location.origin + "/atividades/" + city.slug;
        }
    };

    const handleClickCity = (event: React.MouseEvent<HTMLElement>) => {
        var element = (event.target as HTMLButtonElement).dataset.city;
        var typeE = (event.target as HTMLButtonElement).dataset.busca;
        setSearchValue(element);

        const tourSelect = {
            slug: convertToSlug(element?.split(",")[0].split("-")[0]),
            type: typeE
        };

        setValueSelect(tourSelect);
        setIsOpen(false);
        handleClickSearch(tourSelect);
    };

    const handleClickTour = (element: any, search: any, productCode: any, description: any, slug: any, type: any) => {
        setSearchValue(description);
        const tourSelect = {
          slug: slug,
          type: "tour",
          code: productCode,
          typeSearch: type
        };
        setValueSelect(tourSelect);
        setIsOpen(false);
        handleClickSearch(tourSelect);
      };

    useEffect(() => {
        if (searchValue.length >= 3 && valueSelect === null) {
            searchTours();
        } else if (searchValue.length < 3) {
            setIsOpen(false)
            setValueSelect(null)
        } else {
            ///momento do click
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchValue]);

    const handleFocus = () => {
        if (searchValue.length >= 3) {
            setIsOpen(true);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setSearchValue(newValue);
        setSearchTerm(newValue);
    };
    useEffect(() => {
      const fetchDictionary = async () => {
        const dictionary = await getDictionary(
          searchParams.lng as 'pt' | 'en' | 'es',
          'tabSearchs',
        );
        setDic(dictionary);
      };
  
      fetchDictionary();
    }, [searchParams.lng]);

    if (typeof window) {
        return (
            <div className='flex w-full relative p-3 pt-1 md:p-0'>
                <div className={`${style.search_header_icon}`}>
                    {IconSearch}
                </div>
                <div className={`w-full`}>
                    <input type="text"
                        className={`${style.search_header}`}
                        placeholder={dic?.searchPlaceholder}
                        aria-label="Destino"
                        aria-describedby="tourDestino"
                        style={{ paddingTop: ".7rem", paddingBottom: ".7rem" }}
                        data-input="search"
                        autoComplete="off"
                        id="searchHeader"
                        onChange={handleChange}
                        onFocus={handleFocus}
                    />
                </div>
                <div
                    id="search-header"
                    style={{
                        position: "absolute",
                        top: "100%",
                        left: "0px",
                        zIndex: 10,
                        backgroundColor: "#fff",
                        padding: "10px",
                        width: "100%",
                        color: "#000",
                    }}
                    className={isOpen === true ? `${style.search_header_hidden} block w-ful` : "hidden w-ful"}
                >
                    <div id="search-dataset-allCitys">
                        <h5
                            className="league-name"
                            style={{ fontSize: "16px" }}
                        >
                            Cidades
                        </h5>
                        {locations?.length > 0
                            ? locations.map((city: any, index: any) => (
                                <p
                                    key={index}
                                    onClick={handleClickCity}
                                    style={{ cursor: "pointer" }}
                                    className={`${style.search_header_hidden_option}`}
                                    data-busca="city"
                                    data-input="search"
                                    data-city={city}
                                >
                                    <span className="result-info city" data-busca="city"
                                    data-input="search" data-city={city} style={{ fontSize: "18px" }}>{city}</span>
                                </p>
                            ))
                            : ""}
                    </div>
                    <div id="search-dataset-allCitys">
                        <h5
                            className="league-name"
                            style={{ fontSize: "16px" }}
                        >
                            Passeios
                        </h5>
                        {tours?.length > 0
                            ? tours.map((tour: any, index: any) => (
                            <p
                                key={index}
                                onClick={() => handleClickTour("tour", "search", tour.productCode, tour.description, tour.slug, tour.productType)}
                                style={{ cursor: "pointer" }}
                                className={`${style.search_header_hidden_option}`}
                                data-busca="tour"
                                data-input="search"
                                data-code={tour.productCode}
                                data-tour={tour.description}
                                data-slug={tour.slug}
                                data-type={tour.productType}
                            >
                                <span className="content-text">
                                <span
                                    className="result-info"
                                    style={{ fontSize: "18px" }}
                                >
                                    <strong>
                                    {tour.description}
                                    </strong>
                                </span>
                                <div className="price-search">
                                    {" "}
                                    <small>a partir de</small>:{" "}
                                    <span
                                    style={{ fontSize: "18px" }}
                                    >
                                    R${" "}
                                    {tour.price
                                        .toFixed(2)
                                        .replace(".", ",")}
                                    </span>
                                </div>
                                </span>
                            </p>
                            ))
                            : ""}
                    </div>
                </div>
            </div>
        )
    } else {
        return <></>
    }



}

export default HeaderSearch