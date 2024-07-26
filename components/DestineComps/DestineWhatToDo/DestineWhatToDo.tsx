import React, { useState, useEffect, Key } from "react";
import Link from "next/link";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import styles from "./DestineWhatToDo.module.css";
import { IconMapMarkerAlt } from "@/assets/icons";
import useWindowSize from "@/data/hooks/useWindowSize";
import { useParams } from "next/navigation";

export interface propWhatToDo {
    info?:any,
    setLoading?:any,
    resProduct?:any
}

const DestineWhatToDo: React.FC<propWhatToDo> = ({
    info, setLoading, resProduct
})=> {

    const searchParams = useParams();

    const lng: string = searchParams.lng === "pt" ? "BR" : searchParams.lng === "en" ? "EN" : searchParams.lng === "es" ? "ES" : 'BR';

    const size = useWindowSize();

    const [whatRio, setWhatRio] = useState<any>(null);
    

    setTimeout(() => {
        setWhatRio(true);
    }, 1000);

    /* useEffect(() => {
        async function getProducts() {
            try {

                const data = {
                    categoryCode: info?.category,
                    lang: lng,
                    channel: 2,
                }

                const resp = await fetch(`https://backend.destinow.com.br/api/Products/GetProductsFromCategories`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: JSON.stringify(data)
                })
                const catResp = await resp.json()

                if (catResp.status !== 400) {
                    setResProduct(catResp.data)
                }
            } catch (error) { }
        }

        getProducts()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lng]); */

    const settings = {
        className: "center",
        dots: true,
        arrows: false,
        centerMode: true,
        infinite: true,
        centerPadding: "40px 0 0",
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 500
    };

    if (whatRio !== null && resProduct !== null) {
        if (size.width > 767) {
            return (
                <>
                    <div className={`${styles.bg_what_rio}`}>
                        <div className="container_content mt-4">
                            <div>
                                <div className="grid grid-cols-12">
                                    <div className="col-span-12 md:col-span-6">
                                        <div className={`${styles.what_text}`}>
                                            <h3>
                                                {info.summary.title}
                                            </h3>
                                            <p>
                                               {info.summary.subtitle}
                                            </p>
                                            <div className={`${styles.btn_attraction}`}>
                                                <Link href={info.summary.redirect} className="btn btn-outline-secondary">
                                                    {info.summary.meet}
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-6">
                                        <div>
                                            <div className="grid grid-cols-12 gap-x-5">
                                                {
                                                    resProduct.slice(0,4).map((tour: any, index: Key) => {
                                                        return (
                                                            <div className={`${styles.custom_position} col-span-12 md:col-span-6`} key={index}>
                                                                <div className={`${styles.card_what_rio}`} style={{ backgroundImage: `url(${tour.imagesBaseUrl}medium_${tour.productImg})` }}>
                                                                    <div>
                                                                        {/*  <div className="badge">
                                                                        <span>-30%</span>
                                                                    </div>
                                                                    <div className="favorite">
                                                                        <div className="badge-favorite" onClick={(e: any) => AddFavorite(e)}>
                                                                            <FontAwesomeIcon
                                                                                icon={[favorite === false ? "fal" : "fas", "heart"]}
                                                                                size="1x"
                                                                                style={{
                                                                                    color: favorite === false ? "#58565d" : "red",
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    </div> */}
                                                                    </div>
                                                                    <div className={`${styles.card_content}`}>
                                                                        <div className="flex pt-3 pt-md-4 pb-2 gap-x-2">
                                                                            <span style={{ marginLeft: "-2.5px" }}>{IconMapMarkerAlt("#00cc79", 24, 24)}</span>
                                                                            <span>{info.city}</span>
                                                                        </div>
                                                                        <div>
                                                                            <h4>
                                                                                {tour.productName}
                                                                            </h4>
                                                                        </div>
                                                                        <div className="what-see-details">
                                                                            <Link href={`/tour/${tour.productSlug}`}>
                                                                                Ver detalhes
                                                                            </Link>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <div>
                        <div className={`${styles.bg_what_rio} mt-4`}>
                            <div className="col-span-12 md:col-span-6">
                                <div className={`${styles.what_text} px-4`}>
                                    <h3>
                                    {info.summary.title}
                                    </h3>
                                    <p>
                                    {info.summary.subtitle}
                                    </p>
                                    <div className={`${styles.btn_attraction}`}>
                                        <Link href={info.summary.redirect} className="btn btn-outline-secondary">
                                        {info.summary.meet}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <Slider {...settings} className={`${styles.what_slider_mobile}`}>
                                {
                                    resProduct.map((tour: any, index: Key) => {
                                        return (
                                            <div key={index}>
                                                <div key={index} className={`${styles.card_what_rio} ml-3`} style={{ backgroundImage: `url(${tour.imagesBaseUrl}medium_${tour.productImg})` }}>
                                                    <div className={`${styles.card_content}`}>
                                                        <div className="flex pt-3 pt-md-4 pb-2 gap-x-2">
                                                        <span style={{ marginLeft: "-2.5px" }}>{IconMapMarkerAlt("#00cc79", 24, 24)}</span>
                                                            <span>{info.city}</span>
                                                        </div>
                                                        <div>
                                                            <h4>
                                                                {tour.productName}
                                                            </h4>
                                                        </div>
                                                        <div className="what-see-details">
                                                            <Link href={`/tour/${tour.productSlug}`}>
                                                                Ver detalhes
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </Slider>
                        </div>
                    </div>
                </>
            )
        }
    } else {
        return (
            <>
                <div className="bg-what-rio">
                    <div className="container-content mt-4">
                        <div>
                            <div className="grid grid-cols-12">
                                <div className="col-span-12 md:col-span-6">
                                    <div className="what-text">
                                        <h3>
                                        {info.summary.title}
                                        </h3>
                                        <p>
                                        {info.summary.subtitle}
                                        </p>
                                        <div className={`${styles.btn_attraction}`}>
                                            <Link href={info.summary.redirect} className="btn btn-outline-secondary">
                                            {info.summary.meet}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-12 md:col-span-6">
                                    <div>
                                        <div className="grid grid-cols-12">
                                            <div className="col-span-12 md:col-span-6">
                                                <div className="card-what-rio what-top">
                                                    <div className="animated-background" style={{ width: "100%", height: "100%", borderRadius: "13px" }}>

                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-span-12 md:col-span-6">
                                                <div className="card-what-rio what-bottom">
                                                    <div className="animated-background" style={{ width: "100%", height: "100%", borderRadius: "13px" }}>

                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-span-12 md:col-span-6">
                                                <div className="card-what-rio what-top" >
                                                    <div className="animated-background" style={{ width: "100%", height: "100%", borderRadius: "13px" }}>

                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-span-12 md:col-span-6">
                                                <div className="card-what-rio what-bottom">
                                                    <div className="animated-background" style={{ width: "100%", height: "100%", borderRadius: "13px" }}>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default DestineWhatToDo;