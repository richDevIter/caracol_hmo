'use client'
import React, { useEffect, useState } from "react";
import useWindowSize from "@/data/hooks/useWindowSize";

import Image from "next/image";
import Slider from "react-slick";
import Link from "next/link";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useParams } from "next/navigation";
import HomePageRepository from "@/core/HomePageRepository";
import HomePageCollection from "@/core/HomePage";
import { BannerHomeSkeleton } from "@/app/[lng]/(overview)/ui/skeletons";

const BannerHome = () => {

    const [allBanners, setAllBanners] = useState<any>([
        {
            "id": "65d78df5cfb63df631602eec",
            "author": "",
            "status": true,
            "dateStart": "2024-02-22T00:00:00.000Z",
            "dateEnd": "2024-12-31T00:00:00.000Z",
            "lastChange": "",
            "image": [
                {
                    "image": "/images/banner-desktop-min_1.webp",
                    "alt": "",
                    "link": "",
                    "status": true,
                    "size": "Desktop",
                    "_id": "65d78df5cfb63df631602eed"
                },
                {
                    "image": "/images/banner-tablet-min_1.webp",
                    "alt": "",
                    "link": "",
                    "status": true,
                    "size": "Medium",
                    "_id": "65d78df5cfb63df631602eee"
                },
                {
                    "image": "/images/banner-mobile-min_1.webp",
                    "alt": "",
                    "link": "",
                    "status": true,
                    "size": "Mobile",
                    "_id": "65d78df5cfb63df631602eef"
                }
            ],
            "createdAt": "2024-02-22T18:09:57.322Z",
            "updatedAt": "2024-02-22T18:10:22.212Z"
        },

    ]);
    const [loadBanner, setLoadBanner] = useState(false);

    const [errorMessage, setErrorMessage] = useState<any>(null);
    const [conectionError, setConectionError] = useState<boolean>(false);


    const [typeDevice, setTypeDevice] = useState<any>('Desktop');
    const [bannerHeigth, setBannerHeigth] = useState<any>(533);
    const searchParams = useParams();
    const size = useWindowSize();

    const repo: HomePageRepository = new HomePageCollection();

    const settings = {
        /* dots: true, */
        useTransform: true,
        arrows: false,
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1500,
        autoplaySpeed: 5500,
        cssEase: "ease-out",
    };

    useEffect(() => {
        /*repo.getBanner().then((result) => {
            if (result instanceof Error) {
             
              setErrorMessage( ['Erro desconhecido - Entre em contato com o Suporte'])
              
            }else{
                console.log(result)
                if(allBanners === null){
                    setAllBanners(result);                    
                }
                
            }            
          });   */

        setTypeDevice(window.innerWidth < 480 ? "Mobile" : window.innerWidth >= 480 && window.innerWidth < 1024 ? "Medium" : "Desktop");
        setBannerHeigth(window.innerWidth < 480 ? 640 : window.innerWidth >= 480 && window.innerWidth < 1024 ? 480 : 530);
    }, []);

    return (
        <div className="bg-main-banner" >
            {allBanners?.length > 0 ?
                <>
                    <Slider {...settings}>
                        {
                            allBanners.map((bannerElem: any, bannerIndex: number) => {
                                let bannerSize: any = bannerElem.image.filter((elem: any) => elem.size === typeDevice)[0];

                                return (
                                    <div key={bannerIndex}>
                                        <Link
                                            href={{
                                                pathname: bannerSize.link,
                                            }}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <div className="bg-secondary banner-home p-0 m-0" >
                                                <div className="p-0 m-0" >
                                                    <div className="p-0 m-0">
                                                        <Image
                                                            className="p-0 m-0"
                                                            src={bannerSize.image}
                                                            alt={bannerSize.alt}
                                                            width='1920'
                                                            height={bannerHeigth}
                                                            quality={90}
                                                            priority
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })
                        }
                    </Slider>
                </>
                :
                allBanners === null ? //preLoad
                    <BannerHomeSkeleton />
                    :
                    <></>
            }
        </div >
    );
}



export default BannerHome;