'use client'
import React, { Key, useEffect, useState } from "react";

import { IconHalfStar, IconStar, IconStarUndefined, IconWatch } from '@/assets/icons';

import styles from './atividades.module.css'

import Link from 'next/link';

import Head from "next/head";
import BannerHome from "@/components/HomeBanner/HomeBanner";
//import HomeDestinowApp from "@/components/HomeDestinowApp/HomeDestinowApp";
import TourListFilter from "@/components/TourListFilter/TourListFilter"

import dynamic from "next/dynamic";

import ActivitiesPagination from "@/components/ActivitiesPagination/ActivitiesPagination";
import { useParams } from "next/navigation";
import { getDictionary } from "@/dictionaries";
import ActivitiesPageRepository from "@/core/ActivitiesPageRepository";
import ActivitiesPageCollection from "@/core/ActivitiesPage";
import { parseCookies, setCookie } from "nookies";
import IdChannelRepository from "@/core/IdChannelRepository";
import IdChannelCollection from "@/core/IdChannel";
import { ActivitiesSkeleton } from "../../ui/skeletons";

const DynamicTabSearchs = dynamic(() => import('@/components/TabSearchs/TabSearchs'), {
    ssr: false,
})

const Atividades = () => {
    const repo: ActivitiesPageRepository = new ActivitiesPageCollection();
    const repoChannel: IdChannelRepository = new IdChannelCollection();

    const cookies = parseCookies();

    const [errorMessage, setErrorMessage] = useState<any>(null);
    const [conectionError, setConectionError] = useState<boolean>(false);

    const [dic, setDic] = useState<any>(null);
    const searchParams = useParams();

    useEffect(() => {
        const fetchDictionary = async () => {
            const dictionary = await getDictionary(searchParams.lng as "pt" | "en" | "es", 'tourList');
            setDic(dictionary);
        };

        fetchDictionary();

    }, [searchParams.lng]);


    const [tourLists, setTourList] = useState<any>(null);
    const [value, setValue] = useState<any>(null);
    const [activeCarrousel, setActiveCarrousel] = useState<any>([false, false, false, false, false, false]);
    const [carrouselCat, setCarrouselCat] = useState<any>([]);
    const [pageCount, setPageCount] = useState<any>(1);
    const [totalRows, setTotalRows] = useState<any>(0);
    const [seeMore, setSeeMore] = useState<any>(5);
    const [preLoader, setPreLoader] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);


    const lng: string = searchParams.lng === "pt" ? "BR" : searchParams.lng === "en" ? "EN" : searchParams.lng === "es" ? "ES" : 'BR';

    const handleActivities = (channel: any) => {
        setLoading(true);
        repo.getActivities(String(searchParams.slug).split('-').join(' ') as string, lng as string, 0, [], [], 0, channel).then((result) => {
            if (result instanceof Error) {
                setLoading(false);
                const message = JSON.parse(result.message)
                setConectionError(true);
                //setErrorMessage(message?.errors.length > 0 ? message?.errors.length : ['Erro desconhecido - Entre em contato com o Suporte'])
            } else {
                if (tourLists === null) {
                    setTourList(result?.data);
                }
                setLoading(false)
            }
        });
    }

    useEffect(() => {
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
                    handleActivities(result.data);
                }
            });
        } else {
            handleActivities(+cookies.idCanal);
        }
    }, [cookies.idCanal, handleActivities, repoChannel]);

    function HandleMore() {
        if (seeMore <= tourLists?.length) {
            setSeeMore(seeMore + 5);
        } else {
            setSeeMore(5);
        }
    }

    if(loading === true) {
        return (
            <>
            <Head>
                        <title>

                            {String(searchParams?.slug).split('-').join(' ').charAt(0).toUpperCase() + String(searchParams?.slug).split('-').join(' ').slice(1) +
                                " | " +
                                process.env.NEXT_PUBLIC_SERVER_NAME}
                        </title>
                        <meta
                            name="description"
                        //content={props.tourResponse.productInfo.replace(/<[^>]*>?/gm, "")}
                        />
                        <link rel='icon' href='/favicon.ico' />
                    </Head>
                    <BannerHome />

                    <div className={` ${styles.bg_tab_options} container_content flex flex-wrap px-0`}>
                        <DynamicTabSearchs />
                    </div>
            <ActivitiesSkeleton />
            </>
        )
    } else {
    return (
        <>
         <Head>
                        <title>

                            {String(searchParams?.slug).split('-').join(' ').charAt(0).toUpperCase() + String(searchParams?.slug).split('-').join(' ').slice(1) +
                                " | " +
                                process.env.NEXT_PUBLIC_SERVER_NAME}
                        </title>
                        <meta
                            name="description"
                        //content={props.tourResponse.productInfo.replace(/<[^>]*>?/gm, "")}
                        />
                        <link rel='icon' href='/favicon.ico' />
                    </Head>
                    <BannerHome />

                    <div className={` ${styles.bg_tab_options} container_content flex flex-wrap px-0`}>
                        <DynamicTabSearchs />
                    </div>

            {tourLists !== null &&
                <>
                    <section className="container_content" style={{ marginTop: "-80px" }}>
                        <div className="grid grid-cols-12">
                            <div className="col-span-3 px-2 hidden md:block">
                                <TourListFilter
                                    slug={searchParams.slug}
                                    value={0}
                                    setTourList={setTourList}
                                    activeCarrousel={activeCarrousel}
                                    setActiveCarrousel={setActiveCarrousel}
                                    setCarrouselCat={setCarrouselCat}
                                    setTotalRows={setTotalRows}
                                    setPageCount={setPageCount}
                                    setLoading={setLoading}
                                />
                            </div>
                            <div className="col-span-12 md:col-span-9 px-0 md:px-2">
                                <div className="tour-info-city px-2">
                                    <div className="grid grid-cols-12">
                                        <div className="col-span-12 md:col-span-4">
                                            <p className={`${styles.bg_tour_list_city} `}>{tourLists[0]?.eventLocation}</p>
                                            <p className={`${styles.bg_tour_list_activity} `}>
                                                {tourLists?.length !== undefined
                                                    ? tourLists?.length
                                                    : 0}{" "}
                                                {dic?.foundsAct}
                                            </p>
                                        </div>
                                        <div className="col-span-12 md:col-span-8">
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    {/* Reponsividade */}
                                    {/* <div className="d-block d-lg-none">
                                                    <ModalDefault
                                                        name={'sliders-h'}
                                                        center={'yes'}
                                                        classBody="filter-mobile"
                                                    >
                                                        <FilterTour
                                                            search={props.search}
                                                            value={value}
                                                            setTourList={setTourList}
                                                            activeCarrousel={activeCarrousel}
                                                            setActiveCarrousel={setActiveCarrousel}
                                                        />
                                                    </ModalDefault>
                                                </div> */}
                                    {/* Reponsividade */}
                                </div>
                                {tourLists?.length > 0
                                    ? tourLists
                                        .slice((pageCount - 1) * 5, ((pageCount - 1) * 5) + 5)
                                        /* .slice(0, seeMore) */
                                        .map((product: any, index: Key) => {
                                            const ratingTotal = product.stars;
                                            let rating: any;
                                            let arrayStars: any = [];
                                            if (ratingTotal !== null) {
                                                if (
                                                    ratingTotal > 0 &&
                                                    ratingTotal <= 0.75
                                                ) {
                                                    rating = 0.5;
                                                } else if (
                                                    ratingTotal > 0.76 &&
                                                    ratingTotal <= 1.25
                                                ) {
                                                    rating = 1;
                                                } else if (
                                                    ratingTotal > 1.26 &&
                                                    ratingTotal <= 1.75
                                                ) {
                                                    rating = 1.5;
                                                } else if (
                                                    ratingTotal > 1.76 &&
                                                    ratingTotal <= 2.25
                                                ) {
                                                    rating = 2;
                                                } else if (
                                                    ratingTotal > 2.26 &&
                                                    ratingTotal <= 2.75
                                                ) {
                                                    rating = 2.5;
                                                } else if (
                                                    ratingTotal > 2.76 &&
                                                    ratingTotal <= 3.25
                                                ) {
                                                    rating = 3;
                                                } else if (
                                                    ratingTotal > 3.26 &&
                                                    ratingTotal <= 3.75
                                                ) {
                                                    rating = 3.5;
                                                } else if (
                                                    ratingTotal > 3.76 &&
                                                    ratingTotal <= 4.25
                                                ) {
                                                    rating = 4;
                                                } else if (
                                                    ratingTotal > 4.26 &&
                                                    ratingTotal <= 4.75
                                                ) {
                                                    rating = 4.5;
                                                } else if (
                                                    ratingTotal > 4.76 &&
                                                    ratingTotal <= 5
                                                ) {
                                                    rating = 5;
                                                }

                                                for (var i: any = 0; i < 5; i = i + 0.5) {
                                                    if (i < rating) {
                                                        arrayStars.push(1);
                                                    } else {
                                                        arrayStars.push(0);
                                                    }
                                                }

                                                let aux: any = [];

                                                for (var j: any = 0; j < 10; j = j + 2) {
                                                    if (
                                                        arrayStars[j] === 1 &&
                                                        arrayStars[j + 1] === 1
                                                    ) {
                                                        aux.push(1);
                                                    } else if (
                                                        arrayStars[j] === 1 &&
                                                        arrayStars[j + 1] === 0
                                                    ) {
                                                        aux.push(0.5);
                                                    } else if (
                                                        arrayStars[j] === 0 &&
                                                        arrayStars[j + 1] === 0
                                                    ) {
                                                        aux.push(0);
                                                    }
                                                }

                                                arrayStars = aux;
                                            } else {
                                                <></>;
                                            }
                                            /* INICIO DO PRELOADER*/
                                            if (!loading) {
                                                return (
                                                    <div
                                                        key={index}
                                                        className={`${styles.bg_tour_list_card} p-3 mb-4`}
                                                    >
                                                        <Link
                                                            href={
                                                                product.typeProduct === "TOUR"
                                                                    ? `/tour/${product.productSlug}`
                                                                    : `/ticket/${product.productSlug}`
                                                            }
                                                        >
                                                            <div className="grid grid-cols-12">
                                                                <div
                                                                    className="col-span-12 md:col-span-4 px-0"
                                                                    style={{ overflow: "hidden" }}
                                                                >

                                                                    <div
                                                                        style={{
                                                                            backgroundImage:
                                                                                product.typeProduct ===
                                                                                    "TOUR"
                                                                                    ? `url(${product.imagesBaseUrl}medium_${product.productImg})`
                                                                                    : `url(${product.imagesBaseUrl}${product.productImg})`,
                                                                        }}
                                                                        className={`${styles.bg_tour_list_img} `}
                                                                    >
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    className={`${styles.bg_tour_list_tour_text} col-span-12 md:col-span-8`}
                                                                >

                                                                    <div className="grid grid-cols-12">
                                                                        <div className="col-span-12 md:col-span-8">
                                                                            <div>
                                                                                <h3 className={`${styles.bg_tour_list_tour_name}`}>
                                                                                    {product.productName}
                                                                                </h3>
                                                                                <p className="small text-muted items-center hidden md:flex mb-2">
                                                                                    {IconWatch("#034C43", "18px", "18px")}
                                                                                    <span className="tour-duration pl-2">
                                                                                        {dic?.duration}:
                                                                                        {" " +
                                                                                            product.durationHours +
                                                                                            ":" +
                                                                                            product.durationMinutes +
                                                                                            ` ${dic?.hours}`}
                                                                                    </span>
                                                                                </p>
                                                                                <div
                                                                                    className={`${styles.bg_tour_list_tour_info} mb-1`}
                                                                                    dangerouslySetInnerHTML={{
                                                                                        __html:
                                                                                            product.productInfo,
                                                                                    }}
                                                                                ></div>
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            className="col-span-12 md:col-span-4 px-md-0 mt-3 md:mt-0"
                                                                        >
                                                                            <div className={`${styles.bg_tour_list_bg_stars} `}>
                                                                                <div className={`${styles.bg_tour_list_count_stars} flex md:justify-end items-center`}>
                                                                                    <div className="flex w-full md:w-auto">
                                                                                        <span className="flex">
                                                                                            {arrayStars.length > 0
                                                                                                ? arrayStars.map((array: any, index: Key) => {
                                                                                                    if (array === 0) {
                                                                                                        return <>{IconStar('#fff', "13.78")}</>;
                                                                                                    } else if (array === 1) {
                                                                                                        return <>{IconStar('#ffc60a', "13.78")}</>;
                                                                                                    } else {
                                                                                                        return <>{IconHalfStar('#ffc60a', "13.78")}</>;
                                                                                                    }
                                                                                                })
                                                                                                : ''}
                                                                                        </span>
                                                                                        {product.stars !==
                                                                                            null ? (
                                                                                            <>
                                                                                                <span className={`${styles.bg_tour_list_tour_star_qtd}`}>
                                                                                                    {product.stars?.toFixed(
                                                                                                        1
                                                                                                    )}
                                                                                                </span>
                                                                                            </>
                                                                                        ) : (
                                                                                            ""
                                                                                        )}
                                                                                    </div>
                                                                                    {/* Mobile */}
                                                                                    <p className="small text-muted flex md:hidden items-center mt-1">
                                                                                        <i
                                                                                            className="far fa-clock"
                                                                                            aria-hidden="true"
                                                                                        ></i>
                                                                                        {IconWatch("#034C43", "18px", "18px")}
                                                                                        <span className="tour-duration pl-2">
                                                                                            {dic?.duration}:
                                                                                            {" " +
                                                                                                product.durationHours +
                                                                                                ":" +
                                                                                                product.durationMinutes +
                                                                                                ` ${dic?.hours}`}
                                                                                        </span>
                                                                                    </p>
                                                                                    {/* END - Mobile */}
                                                                                </div>
                                                                                <div>
                                                                                    <div>
                                                                                        <span className={`${styles.bg_tour_list_tour_price} `}>
                                                                                            {
                                                                                                product.percDesc > 0
                                                                                                    ?
                                                                                                    "R$ " +
                                                                                                    (product.price - (product.price * product.percDesc / 100))
                                                                                                        .toFixed(2)
                                                                                                        .replace(
                                                                                                            ".",
                                                                                                            ","
                                                                                                        )
                                                                                                    :
                                                                                                    "R$ " +
                                                                                                    product.price
                                                                                                        .toFixed(2)
                                                                                                        .replace(
                                                                                                            ".",
                                                                                                            ","
                                                                                                        )

                                                                                            }
                                                                                        </span>
                                                                                        <span className={`${styles.bg_tour_list_tour_people} `}>
                                                                                            {dic?.perPerson}
                                                                                        </span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                );
                                            } else {
                                                return (
                                                    <div
                                                        key={index}
                                                        className="card card-tour p-3 mb-4"
                                                    >
                                                        <div className="grid grid-cols-12">
                                                            <div
                                                                className="col-span-4 px-0"
                                                                style={{ overflow: "hidden" }}
                                                            >
                                                                <div
                                                                    className="card-img card-img-custom animated-background"
                                                                    style={{ width: "100%" }}
                                                                ></div>
                                                            </div>
                                                            <div
                                                                className="col-span-8 card-tour-text pr-0 pl-custom"
                                                            >
                                                                <Link
                                                                    href={
                                                                        product.typeProduct === "TOUR"
                                                                            ? `/tour/${product.productSlug}`
                                                                            : `/ticket/${product.productSlug}`
                                                                    }
                                                                >
                                                                    <div className="grid grid-cols-12">
                                                                        <div className="col-span-8">
                                                                            <div>
                                                                                <div
                                                                                    className="tour-name animated-background"
                                                                                    style={{
                                                                                        height: "56px",
                                                                                        width: "100%",
                                                                                        marginBottom: "8px",
                                                                                    }}
                                                                                ></div>

                                                                                <div
                                                                                    className="small text-muted d-none d-md-flex animated-background"
                                                                                    style={{
                                                                                        height: "24px",
                                                                                        width: "100%",
                                                                                        marginBottom: "8px",
                                                                                    }}
                                                                                ></div>
                                                                                <div
                                                                                    className="text-tour-info animated-background"
                                                                                    style={{
                                                                                        height: "110px",
                                                                                        width: "100%",
                                                                                        marginBottom: "16px",
                                                                                    }}
                                                                                ></div>
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            className="col-span-8 px-md-0"
                                                                        >
                                                                            <div
                                                                                className="bg-stars animated-background"
                                                                                style={{
                                                                                    height: "68px",
                                                                                    width: "100%",
                                                                                }}
                                                                            ></div>
                                                                        </div>
                                                                    </div>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            }
                                            /* FIM DO PRELOADER*/
                                        })
                                    : ""}

                                <ActivitiesPagination totalRows={totalRows} pageCount={pageCount} setPageCount={setPageCount} />

                            </div>
                        </div>
                    </section>
                    {/* <HomeDestinowApp /> */}
                </>
            }
        </>
    )
}
}

export default Atividades;