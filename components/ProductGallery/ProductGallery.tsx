import React, { Key, useEffect, useState } from 'react'
import Slider from 'react-slick';
import Image from 'next/image';


// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import styles from './ProductGallery.module.css'
import { useParams } from 'next/navigation';
import { getDictionary } from '@/dictionaries';
import useWindowSize from '@/data/hooks/useWindowSize';

export interface propGallery {
    tourResponse: any;
    setShowModal: any;
}

const ProductGallery: React.FC<propGallery> = ({
    tourResponse, setShowModal
}: propGallery) => {

    const [dic, setDic] = useState<any>(null);
    
    const searchParams = useParams();

    useEffect(() => {
        const fetchDictionary = async () => {
            const dictionary = await getDictionary(searchParams.lng as "pt" | "en" | "es", 'productTour');
            setDic(dictionary);
        };
    
        fetchDictionary();
    
    }, [searchParams.lng])


    //const [modalShow, setModalShow] = React.useState(false);

    const size = useWindowSize();

    const settings = {
        arrows: true,
        infinite: false,
        dots: true,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 500,
    };

    if (size.width > 767) {
        if (tourResponse.images[1] === undefined) {
            return (
                <>
                    <div className={styles.tour_gallery}>
                        <div className="grid grid-cols-12 row_controll">
                            {/*  Col 12 */}
                            <div className="col-span-12 overflow-hidden mx-3 relative" >
                                <div className={`${styles.tour_gallery_custom_1} overflow-hidden rounded-3xl`} style={{ maxHeight: '380px' }}>
                                    <div className={`${styles.bg_tour_gallery_btn_img} `} onClick={() => setShowModal(true)}>
                                        {dic?.tour?.gallery.seeAll} {tourResponse.images.length} {dic?.tour?.gallery.images}</div>
                                    <Image
                                        src={`${tourResponse.imagesBaseUrl}${tourResponse.images[0]}`}
                                        alt="Image"
                                        width={766}
                                        height='380'
                                        className=''
                                    />
                                </div>
                            </div>
                            {/*  END: Col 12 */}
                        </div>
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <div className={styles.tour_gallery}>
                        <div className="grid grid-cols-12 row_controll ">
                            {/*  Col 8 */}
                            <div className="col-span-8 overflow-hidden mx-3 relative" >
                                <div className=" overflow-hidden rounded-3xl " style={{ maxHeight: '380px' }}>
                                    <div className={`${styles.bg_tour_gallery_btn_img} `} onClick={() => setShowModal(true)}>
                                        {dic?.tour?.gallery.seeAll} {tourResponse.images.length} {dic?.tour?.gallery.images}</div>
                                    <Image
                                        src={`${tourResponse.imagesBaseUrl}${tourResponse.images[0]}`}
                                        alt="Image"
                                        width={766}
                                        height='380'
                                        className=''
                                    />
                                </div>
                            </div>
                            {/*  END: Col 8 */}
                            <div className="col-span-4 px-3">
                                <div className="grid grid-cols-12">
                                    {
                                        tourResponse.images[1] !== undefined
                                            ?
                                            <div className="col-span-12 overflow-hidden rounded-3xl mb-2" style={{ maxHeight: '180px' }}>
                                                <Image
                                                    src={`${tourResponse.imagesBaseUrl}${tourResponse.images[1]}`}
                                                    alt="Image"
                                                    width={766}
                                                    height='380'
                                                />
                                            </div>
                                            :
                                            ""
                                    }
                                    {
                                        tourResponse.images[2] !== undefined
                                            ?
                                            <div className="col-span-12 overflow-hidden rounded-3xl mt-2" style={{ maxHeight: '180px' }}>
                                                <Image
                                                    src={`${tourResponse.imagesBaseUrl}${tourResponse.images[2]}`}
                                                    alt="Image"
                                                    width={766}
                                                    height='380'
                                                />
                                                {/* <div style={{ backgroundImage: `url(${tourResponse.imagesBaseUrl}large_${tourResponse.images[2]})` }} className="tour-img-duo"></div> */}
                                            </div>
                                            :
                                            ""
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )
        }
    } else {
        return (
            <div className="tour-gallery-mobile">
                <Slider {...settings}>
                    {
                        tourResponse.images.map((image: any, index: Key) => {

                            return (
                                <div key={index} className="py-4">
                                    <div
                                        style={{ backgroundImage: `url(${tourResponse.imagesBaseUrl}${image})` }}
                                        className={`${styles.bg_tour_gallery_img}`}
                                    >
                                        <div className={`${styles.bg_tour_gallery_btn_img} `} onClick={() => setShowModal(true)}>
                                            {dic?.tour?.gallery.seeAll} {tourResponse.images.length} {dic?.tour?.gallery.images}</div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </Slider>
                {/* <ModalGallery
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    tourResponse={tourResponse}
                /> */}
            </div>
        )
    }
}

export default ProductGallery