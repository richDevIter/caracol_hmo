'use client'
import { BannerHomeSkeleton } from '@/app/[lng]/(overview)/ui/skeletons';
import Slider from 'react-slick'
import Image from "next/image";


// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BannerHome from '@/components/HomeBanner/HomeBannerServer';
import Link from 'next/link';
import { Suspense } from 'react';

import styles from './Slider.module.css';


export interface propPage {
    lng?: any,
  }
    
  const SliderHome: React.FC<propPage> = ({
        lng
      }) => {

    async function getBanner(){
        return await BannerHome(lng);

    }
     
    return (
        <div className="bg-main-banner" >
            <Suspense fallback={<BannerHomeSkeleton />}>                
                <BannerHomeComponent sliders={getBanner()}/>
            </Suspense> 
            
        </div >
    );
}

export interface propBanner {
    sliders?: any,
}

const BannerHomeComponent: React.FC<propBanner> = async ({
    sliders
}) => {

    const settings = {
        /* dots: true, */
        useTransform: true,
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1500,
        autoplaySpeed: 5500,
        cssEase: "ease-out",
        
    };

    let allBanners: any = await sliders.then((result: any) => {
        if (result === "Error") {         
          return( <div>
                    <Slider {...settings}>
                        <div >
                            <Link
                                href={{
                                    pathname: '#',
                                }}
                                rel="noopener noreferrer"
                                className='hidden lg:block'

                            >
                                <div className={`bg-secondary banner-home p-0 m-0 ${styles.banner_home}` } >                                                 
                                    <Image
                                        className={`p-0 m-0 ${styles.banner_image}` }
                                        src='/images/bannerHomeCaracol/cartao-postal-desktop.webp'
                                        alt='Banner Desktop Default'
                                        width='1920'
                                        height={'533'}
                                        quality={90}
                                        priority={true}
                                        loading='eager'
                                    />     
                                </div>
                            </Link>
                            <Link
                                href={{
                                    pathname: '#',
                                }}
                                target="_blank"
                                rel="noopener noreferrer"
                                className='hidden md:block lg:hidden'
                            >
                                <div className={`bg-secondary banner-home p-0 m-0` } >                                                    
                                        <Image
                                            className="p-0 m-0"
                                            src='/images/bannerHomeCaracol/cartao-postal-mobile.webp'
                                            alt='Banner Desktop Default'
                                            width='1920'
                                            height={'533'}
                                            quality={90}
                                            priority={true}
                                            loading='eager'
                                        />                                                    
                                </div>
                            </Link>
                            <Link
                                href={{
                                    pathname: '#',
                                }}
                                target="_blank"
                                rel="noopener noreferrer"
                                className='block sm:hidden'
                            >
                                <div className={`bg-secondary banner-home p-0 m-0` } >
                                    <div className="p-0 m-0" >
                                        <div className="p-0 m-0">                                                        
                                                <Image
                                                    className="p-0 m-0"
                                                    src='/images/bannerHomeCaracol/cartao-postal-mobile.webp'
                                                    alt='Banner Desktop Default'
                                                    width='1920'
                                                    height={'533'}
                                                    quality={90}
                                                    priority={true}
                                                    loading='eager'
                                                />                                                    
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>

                    </Slider>
                </div>
          )
          
        }else{
            return(
                <div>
                <Slider {...settings}>
                    {
                        (result).map((bannerElem: any, bannerIndex: number) => {
                            let bannerSize: any = bannerElem.image.filter((elem: any) => elem.size === "Desktop")[0];
                            let bannerSizeTablet: any = bannerElem.image.filter((elem: any) => elem.size === "Medium")[0];
                            let bannerSizeMobile: any = bannerElem.image.filter((elem: any) => elem.size === "Mobile")[0];

                            return (
                                <div key={bannerIndex}>
                                    <Link
                                        href={{
                                            pathname: bannerSize.link,
                                        }}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className='hidden lg:block'

                                    >
                                        <div className={`bg-secondary banner-home p-0 m-0 ${styles.banner_home}` } >                                                 
                                            <Image
                                                className={`p-0 m-0 ${styles.banner_image}` }
                                                src={bannerSize.image}
                                                alt={bannerSize.alt}
                                                width='1920'
                                                height={'533'}
                                                quality={90}
                                                priority={bannerIndex === 0 ? true: false}
                                                loading={bannerIndex === 0 ? 'eager': 'lazy'}
                                            />     
                                        </div>
                                    </Link>
                                    <Link
                                        href={{
                                            pathname: bannerSizeTablet.link,
                                        }}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className='hidden md:block lg:hidden'
                                    >
                                        <div className={`bg-secondary banner-home p-0 m-0` } >                                                    
                                                <Image
                                                    className="p-0 m-0"
                                                    src={bannerSizeTablet.image}
                                                    alt={bannerSizeTablet.alt}
                                                    width='1920'
                                                    height={'533'}
                                                    quality={90}
                                                    priority={bannerIndex === 0 ? true: false}
                                                    loading={bannerIndex === 0 ? 'eager': 'lazy'}
                                                />                                                    
                                        </div>
                                    </Link>
                                    <Link
                                        href={{
                                            pathname: bannerSizeMobile.link,
                                        }}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className='block sm:hidden'
                                    >
                                        <div className={`bg-secondary banner-home p-0 m-0` } >
                                            <div className="p-0 m-0" >
                                                <div className="p-0 m-0">                                                        
                                                        <Image
                                                            className="p-0 m-0"
                                                            src={bannerSizeMobile.image}
                                                            alt={bannerSizeMobile.alt}
                                                            width='1920'
                                                            height={'533'}
                                                            quality={90}
                                                            priority={bannerIndex === 0 ? true: false}
                                                            loading={bannerIndex === 0 ? 'eager': 'lazy'}
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
                </div>
            )
            
        }            
      }); 
     
    return await allBanners;
    
};


export default SliderHome;