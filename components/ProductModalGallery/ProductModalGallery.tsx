'use client'
import React, { useState, useEffect, Key } from 'react';

import Slider from "react-slick";

import styles from './ProductModalGallery.module.css'

function ProductModalGallery(props: any) {
    const [nav1, setNav1] = useState<any>();
    const [nav2, setNav2] = useState<any>();
    const [slider1, setSlider1] = useState<any>();
    const [slider2, setSlider2] = useState<any>();

    useEffect(() => {
        setNav1(slider1);
        setNav2(slider2);
    }, [slider1, slider2]);

    const settingsMain = {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
        asNavFor: '.slider-nav'
    };

    const settingsThumbs = {
        slidesToShow: 5,
        slidesToScroll: 1,
        asNavFor: '.slider-for',
        dots: false,
        swipeToSlide: true,
        focusOnSelect: true,
        infinite: false,
        arrows: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
        ]
    };

    return (
        <>
            <Slider
                {...settingsMain}
                asNavFor={nav2}
                ref={slider => (setSlider1(slider))}
            >
                {
                    props.tourResponse.images.map((image: any, index: Key) => {
                        return (
                            <div key={index}>
                                <div
                                    style={{ backgroundImage: `url(${props.tourResponse.imagesBaseUrl}${image})` }}
                                    className={`${styles.tour_modal_gallery} `}
                                >
                                </div>
                            </div>
                        )
                    })
                }
            </Slider>
            <div className='slider-thumbnails'>
                <Slider
                    {...settingsThumbs}
                    asNavFor={nav1}
                    ref={slider => (setSlider2(slider))}
                >
                    {
                        props.tourResponse.images.map((image: any, index: Key) => {
                            return (
                                <div key={index}>
                                    <div
                                        style={{ backgroundImage: `url(${props.tourResponse.imagesBaseUrl}${image})` }}
                                        className={`${styles.tour_modal_gallery_thumbnails} `}
                                    >
                                    </div>
                                </div>
                            )
                        })
                    }
                </Slider>
            </div>
        </>
    )
}

export default ProductModalGallery;