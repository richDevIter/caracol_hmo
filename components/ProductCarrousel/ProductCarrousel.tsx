import { useState, useEffect } from 'react';
//import i18next from 'i18next';

import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './ProductCarrousel.module.css';
import Link from 'next/link';

import { getDictionary } from '@/dictionaries';
import useWindowSize from '@/data/hooks/useWindowSize';
import { useParams } from 'next/navigation';
//import { sassFalse } from 'sass';
import Image from 'next/image';
import Ticket from '../../assets/icons/svg/ticket.svg';

export interface propAction {
    codCategory: any;
}

const ProductsCarrousel: React.FC<propAction> = ({
    codCategory,
}: propAction) => {
    const size = useWindowSize();
    const [nav1] = useState<any>();
    const [nav2] = useState<any>();
    const [, setSlider1] = useState<any>();
    //const [slider2] = useState<any>();

    const [resProduct, setResProduct] = useState<any>(null);
    const [layout, setLayout] = useState<any>(size.width);
    const [seeMore, setSeeMore] = useState<any>(
        layout < 575 ? 10 : layout < 768 ? 2 : layout < 1024 ? 3 : 4,
    );

    const [dic, setDic] = useState<any>(null);

    const searchParams = useParams();

    useEffect(() => {
        const fetchDictionary = async () => {
            const dictionary = await getDictionary(searchParams.lng as "pt" | "en" | "es", 'home');
            setDic(dictionary);
        };
        fetchDictionary();
    }, [searchParams.lng])

    //Tamanho da Tela
    /* window.addEventListener('resize', function () {
        var newWidth = window.innerWidth;
        setLayout(newWidth);
    }); */
    //Tamanho da Tela

    function HandleSeeMore() {
        if (layout < 575) {
            if (seeMore <= resProduct.length) {
                setSeeMore(seeMore + 4);
            } else {
                setSeeMore(1);
            }
        } else if (layout < 768) {
            if (seeMore <= resProduct.length) {
                setSeeMore(seeMore + 4);
            } else {
                setSeeMore(2);
            }
        } else if (layout < 1024) {
            if (seeMore <= resProduct.length) {
                setSeeMore(seeMore + 4);
            } else {
                setSeeMore(3);
            }
        } else {
            if (seeMore <= resProduct.length) {
                setSeeMore(seeMore + 4);
            } else {
                setSeeMore(4);
            }
        }
    }

    function scrollView() {
        var scrollElement = document.getElementById('buy-product');
        scrollElement?.scrollIntoView(true);
    }

    useEffect(() => {
        let idChannel: number = 1;

        async function getProducts() {
            try {
                const data = {
                    categoryCode: codCategory,
                    lang: searchParams.lng === "en" ? "EN" : searchParams.lng === "es" ? "ES" : "BR",
                    channel: idChannel
                }

                const resp = await fetch(
                    `${process.env.NEXT_PUBLIC_SERVER_URL_API}/Products/GetProductsFromCategories`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            // 'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: JSON.stringify(data),
                    }
                );
                const categorieResp = await resp.json();
                console.log(categorieResp.data)
                if (categorieResp.statusCode === 200) {
                    setResProduct(categorieResp.data);
                }
            } catch (error) { }
        }

        const config = {
            headers: { "ngrok-skip-browser-warning": "69420" },
        };

        async function getIdChannel() {
            try {
                const resp = await fetch(
                    `${process.env.NEXT_PUBLIC_SERVER_URL_API}/Products/GetChannelBySource/site`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                            // 'Content-Type': 'application/x-www-form-urlencoded',
                        },
                    })
                const channelResp = await resp.json();

                if (channelResp.statusCode === 200) {
                    // eslint-disable-next-line react-hooks/exhaustive-deps
                    idChannel = channelResp.data.data;
                    getProducts();
                }
            } catch (error) { }
        }

        getIdChannel();
    }, [codCategory, searchParams.lng]);

    const settingsMain = {
        dots: false,
        arrows: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        scrollX: false,
        responsive: [
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                    centerPadding: '60px',
                    infinite: false,
                    dots: false,
                },
            },
        ],
    };

    if (resProduct !== null) {
        return (
            <div
                id="buy-product"
                className={`container container-atividades pb-5 m-auto ${styles.my_outside}`}
            >
                <div data-category="listCategorie" className="mb-3">

                    <h1 className={`${styles.my_inside} text-primary text-center text-4xl`} style={{ fontWeight: 600 }}>
                        {
                            searchParams.lng === "pt"
                                ?
                                'Parque do Caracol'
                                :
                                searchParams.lng === "en"
                                    ?
                                    'Parque do Caracol'
                                    :
                                    searchParams.lng === "es"
                                        ?

                                        'Parque do Caracol'
                                        :
                                        'Parque do Caracol'
                        }
                    </h1>
                    <div
                        id="main-product"
                        className={`${styles.atividadesDestacadas} ${styles.atividadesDestacadasCaracol} atividadesDestacadasCaracol w-full`}
                    >
                        <Slider
                            className="pb-3"
                            {...settingsMain}
                            asNavFor={nav2}
                            ref={(slider) => setSlider1(slider)}
                        >
                            {resProduct.slice(0, seeMore).map((item: any, index: any) => {
                                return (
                                    <div
                                        key={index}
                                        className="col-span-12 sm:col-6 md:col-4 lg:col-3 p-2 product-slider"
                                    >
                                        <Link
                                            href={
                                                item.productType === 'TOUR'
                                                    ? '/compra-rapida/' + item.productSlug + '?type=tour'
                                                    : item.productCode === 'TKT-BF1234'
                                                        ? '/black-friday/' + item.productSlug + '?type=ticket'
                                                        : '/compra-rapida/' + item.productSlug + '?type=ticket'
                                            }
                                            key={item.categoryCode}
                                            className={`${styles.card} ${styles.card_slider} rounded-xl overflow-hidden`}
                                        >
                                            <div
                                                className={`${styles.activ_img}`}
                                                style={{
                                                    backgroundImage: `url(${item.imagesBaseUrl}${item.productImg})`,
                                                }}
                                            />
                                            <div className={`${styles.card_body} flex flex-col justify-between`}>
                                                <div className="mb-0 md:mb-2">
                                                    <p className={`${styles.tourName} mb-2`}>{item.productName}</p>
                                                    <div className="px-2">
                                                        {item.productIncludeItem?.slice(0,5).map(
                                                            (items: any, index: any) => {
                                                                return (
                                                                    <p
                                                                        key={index}
                                                                        className={`${styles.tourDescript} flex items-center m-0`}
                                                                        title={items.split('•	').join('')}
                                                                    >
                                                                        <Image
                                                                            src={Ticket}
                                                                            alt="ticket image"
                                                                            width={13}
                                                                            height={9}
                                                                            className="m-0 mr-1"
                                                                            loading="lazy"
                                                                        />
                                                                        {/* <FontAwesomeIcon
                                                                            className="keep-color"
                                                                            icon={['fad', 'ticket']}
                                                                            size="1x"
                                                                            style={{ marginRight: '5px' }}
                                                                        /> */}
                                                                        <span>{items.split('•	').join('')}</span>
                                                                    </p>
                                                                );
                                                            },
                                                        )}
                                                    </div>
                                                </div>
                                                <div className={`${styles.product_content}`}>
                                                    <div>
                                                        <div
                                                            className=""
                                                            style={{ marginTop: '1rem', lineHeight: '.75rem' }}
                                                        >
                                                            {item.productCode !== process.env.REACT_APP_GAUCHO ? (
                                                                <p className={`${styles.card_text} h4`}>
                                                                    <small className="uppercase">r$</small>
                                                                    {item.price.toFixed(2).split('.').join(',')}
                                                                </p>
                                                            ) : (
                                                                <>
                                                                    <small className="text-muted">
                                                                        De:{' '}
                                                                        <span
                                                                            style={{ textDecoration: 'line-through' }}
                                                                        >
                                                                            <small className="text-uppercase">R$</small>
                                                                            75,00
                                                                        </span>
                                                                    </small>
                                                                    <p className="card-text h4">
                                                                        <small className="text-muted">Por: </small>{' '}
                                                                        <small className="uppercase">R$</small>
                                                                        {item.price.toFixed(2).split('.').join(',')}
                                                                    </p>
                                                                </>
                                                            )}
                                                        </div>
                                                        <div className="buy-btn centerCenter">
                                                            <object style={{ width: '100%' }}>
                                                                <Link
                                                                    href={
                                                                        item.productType === 'TOUR'
                                                                            ? '/compra-rapida/' +
                                                                            item.productSlug +
                                                                            '?type=tour'
                                                                            : item.productCode === 'TKT-BF1234'
                                                                                ? '/black-friday/' +
                                                                                item.productSlug +
                                                                                '?type=ticket'
                                                                                : '/compra-rapida/' +
                                                                                item.productSlug +
                                                                                '?type=ticket'
                                                                    }
                                                                    className="btn btn-primary btn-natal my-1 p-0 rounded-xl btn-lg flex justify-center"
                                                                    type="button"
                                                                >
                                                                    EU QUERO {/* {t('productsCarrousel.buttonBuy')}  */}
                                                                </Link>
                                                            </object>
                                                            <object>
                                                                <Link
                                                                    href={
                                                                        item.productType === 'TOUR'
                                                                            ? '/tour/' + item.productSlug
                                                                            : item.productCode === 'TKT-BF1234'
                                                                                ? '/black-friday'
                                                                                : '/ticket/' + item.productSlug
                                                                    }
                                                                    className={`${styles.viewDetailsButton} mt-3 w-full flex justify-center`}
                                                                >
                                                                    Ver Detalhes {/* {t('productsCarrousel.seeDetails')}  */}
                                                                </Link>
                                                            </object>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                );
                            })}
                        </Slider>

                        {/* <div
                            className="d-flex justify-content-center seeMoreSection"
                            onClick={HandleSeeMore}
                        >
                            {seeMore < resProduct.length ? (
                                <button
                                    style={{ height: '40px' }}
                                    className="btn rounded btn-lg "
                                    type="button"
                                >
                                    mais
                                </button>
                            ) : (
                                <button
                                    style={{ height: '40px' }}
                                    className="btn rounded btn-lg "
                                    type="button"
                                    onClick={scrollView}
                                >
                                    
                                </button>
                            )}
                        </div> */}

                    </div>
                    {/* <div className={`${styles.bg_home_main_text}`}>
                        <p className="text-primary text-center mb-0">Moradores e nascidos nas cidades de CANELA E GRAMADO TÊM ENTRADA GRATUITA no Parque e promocionalmente estacionamento a R$10 apresentando comprovante na bilheteria.</p>
                        <p className="text-primary text-center mb-0">Estação Sonho Vivo e Observatório Panorâmico não inclusos.</p>
                    </div> */}
                </div>
            </div>
        );
    } else {
        return (
            <div
                id="buy-product"
                className={`container container-atividades pb-5 m-auto ${styles.my_outside}`}
            >
                <div data-category="listCategorie" className="mb-3">

                    <h1 className={`${styles.my_inside} text-primary text-center text-4xl`} style={{ fontWeight: 600 }}>
                        {
                            searchParams.lng === "pt"
                                ?
                                'Parque do Caracol'
                                :
                                searchParams.lng === "en"
                                    ?
                                    'Parque do Caracol'
                                    :
                                    searchParams.lng === "es"
                                        ?

                                        'Parque do Caracol'
                                        :
                                        'Parque do Caracol'
                        }
                    </h1>
                    <div
                        id="main-product"
                        className={`${styles.atividadesDestacadas} ${styles.atividadesDestacadasCaracol} atividadesDestacadasCaracol w-full`}
                    >
                        <Slider
                            className="pb-3"
                            {...settingsMain}
                            asNavFor={nav2}
                            ref={(slider) => setSlider1(slider)}
                        >
                            {[1, 1, 1, 1].map((elem: any, index: number) => {
                                return (
                                    <div
                                        key={index}
                                        className="col-12 col-sm-6 col-md-4 col-lg-3 p-2 product-slider"
                                    >
                                        <div className={`${styles.card} ${styles.card_slider} rounded-xl overflow-hidden`}>
                                            <div className={`${styles.activ_img} animated-background`}></div>
                                            <div className="card-body p-2">
                                                <p
                                                    className="animated-background"
                                                    style={{ height: '16px', maxWidth: '150px', marginBottom: '10px' }}
                                                ></p>
                                                <p
                                                    className="animated-background"
                                                    style={{ height: '16px', marginBottom: '10px' }}
                                                ></p>
                                                <p
                                                    className="animated-background"
                                                    style={{ height: '16px', marginBottom: '10px' }}
                                                ></p>
                                                <p
                                                    className="animated-background"
                                                    style={{ height: '16px', marginBottom: '10px' }}
                                                ></p>

                                                <div
                                                    className=""
                                                    style={{
                                                        height: '16px',
                                                        marginTop: '25px',
                                                        marginBottom: '30px',
                                                    }}
                                                >
                                                    <p
                                                        className="card-text h4 text-primary animated-background"
                                                        style={{ height: '16px', marginBottom: '10px' }}
                                                    ></p>
                                                    <p
                                                        className="card-text h4 text-primary animated-background"
                                                        style={{ height: '16px', marginBottom: '5px' }}
                                                    ></p>
                                                </div>

                                                <div className="centerCenter">
                                                    <button
                                                        className="btn btn-primary py-2 rounded btn-lg "
                                                        type="button"
                                                    >
                                                        Comprar
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }
};

export default ProductsCarrousel;
