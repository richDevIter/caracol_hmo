import React, { useEffect, useRef, useState } from "react";

// import iconCart from '../../assets/icons/eva_shopping-cart-outline.svg';

import Link from "next/link";
import { IconCart, IconCheckCart, IconTimes, IconTrash } from "@/assets/icons";

import styles from './HeaderDropDownCart.module.css';
import CartAlert from "../CartAlert/CartAlert";
import Image from "next/image";
import useAppData from "@/data/hooks/useCartData";
import { useParams } from "next/navigation";
import { getDictionary } from "@/dictionaries";

export interface propCartHeader {
    messageCart?: any,
}

const HeaderDropDownCart: React.FC<propCartHeader> = ({
    messageCart
}) => {
    const { cart, removeTotalCart, removeItemCart, removeCupomCart } = useAppData();
    const [updateCart, setUpdateCart] = useState<boolean>(true);

    const [dic, setDic] = useState<any>(null);

    const searchParams = useParams();

    useEffect(() => {
        const fetchDictionary = async () => {
            const dictionary = await getDictionary(searchParams.lng as "pt" | "en" | "es", 'cart');
            setDic(dictionary);
        };

        fetchDictionary();

    }, [searchParams.lng]);

    let totalCart = 0;

    /* Detecta clique fora da div#wrapper para fechar o dropdown de login */
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    function useOutsideAlerter(ref: any) {
        useEffect(() => {
            function handleClickOutside(event: any) {
                if (ref.current && !ref.current.contains(event.target)) {
                    var elem: any = document.getElementById("authCartDropdown");
                    if (elem) {
                        elem.classList.remove('active');
                    }
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    /* //Detecta clique fora da div#wrapper para fechar o dropdown de login\\ */

    function keepDropdownOpen(e: any) {
        var elem: any = document.getElementById("authCartDropdown");

        if (elem && !elem.classList.contains('active') && !e?.target?.classList.contains('close-btn')) {
            elem.classList.add('active');
        }
    }

    function keepDropdownClosed() {
        var elem: any = document.getElementById("authCartDropdown");

        if (elem && elem.classList.contains('active')) {
            elem.classList.remove('active');
        }

        elem.classList.add('hidden');

        let timer2 = setTimeout(() => {
            elem.classList.remove('hidden');
        }, 100);

        return () => {
            clearTimeout(timer2);
        };

    }

    //UseEffect criado apenas para atualizar o carrinho de forma mais rápida
    useEffect(() => {
        RenderCart();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updateCart])

    const RenderCart = () => {
        if (cart.dados.length === 0) { //Carrinho vazio
            return (
                <>
                    <ul className="navbar-nav ml-auto" id="wrapper" ref={wrapperRef}>
                        <li className={`${styles.dropdown} carrinho nav-item-c2`}
                            data-cart="item"
                            onClick={keepDropdownOpen}
                        >
                            <Link
                                className={`${styles.nav_link} text-primary text-center`}
                                data-cart="btn"
                                href="#"
                                id="navbarDropdownCarrinho"
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <div className="flex">
                                    <span style={{ marginRight: "8px" }}>{IconCart("#000000", "24", "24")}</span>
                                    <div className={styles.indicate_number}>{cart.dados.length}</div>
                                    <span className="hidden md:block" style={{ marginRight: "8px", lineHeight: "28px" }}>{dic?.title}</span>
                                </div>
                            </Link>
                            <div
                                className={` ${styles.dropdown_menu} cart`}
                                id="authCartDropdown"
                                aria-labelledby="navbarDropdownCarrinho"
                                data-cart="divMenu"
                                style={{ zIndex: 1040 }}
                            >
                                <div className={` ${styles.titleCart} bg-light font-medium flex justify-center items-center`}>
                                    {dic?.emptyCart}
                                </div>
                            </div>
                        </li>
                    </ul>
                </>
            )
        } else {
            return (
                <ul className="navbar-nav ml-auto" id="wrapper" ref={wrapperRef}>
                    <li className={`${styles.dropdown} carrinho nav-item-c2`}
                        data-cart="item"
                        onClick={keepDropdownOpen}
                    >
                        <Link
                            className={`${styles.nav_link} text-primary text-center`}
                            data-cart="btn"
                            href="#"
                            id="navbarDropdownCarrinho"
                            role="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <div className="flex">
                                <span style={{ marginRight: "8px" }}>{IconCart("#000000", "24", "24")}</span>
                                <div className={styles.indicate_number}>{cart.dados.length}</div>
                                <span className="hidden md:block" style={{ marginRight: "8px", lineHeight: "28px" }}>
                                    {dic?.title}
                                </span>
                            </div>
                        </Link>
                        <div
                            className={`${styles.dropdown_menu} cart`}
                            id="authCartDropdown"
                            aria-labelledby="navbarDropdownCarrinho"
                            data-cart="divMenu"
                            style={{ zIndex: 1040 }}
                        >
                            <div className={`${styles.titleCart} bg-light font-medium flex place-content-between items-center`}>
                                <p><strong>
                                    {dic?.title},</strong> {cart.dados.length} {dic?.items}</p> <b className="close-btn" style={{ fontSize: "1.375rem", cursor: "pointer" }} onClick={keepDropdownClosed}>×</b>
                            </div>
                            {
                                messageCart !== false
                                    ?
                                    <div className="messages">
                                        <CartAlert
                                            alertType="success"
                                        >
                                            <div className="flex items-center">
                                                {IconCheckCart("#00cc79", "18", "18")}
                                            </div>
                                            <div>
                                                {dic?.addedToCart}
                                            </div>
                                        </CartAlert>
                                    </div>
                                    :
                                    <></>
                            }
                            <div className={styles.listItens}>
                                {cart.dados.length >= 1
                                    ? cart?.dados.map((cItem: any, index: any) => {
                                        let priceProduct = (
                                            (Number(cItem.adults) * Number(cItem.priceAdults))
                                            + (Number(cItem.childs) * Number(cItem.priceChilds))
                                            + (Number(cItem.infants) * Number(cItem.priceInfants))
                                            + (Number(cItem.elders) * Number(cItem.priceElders))
                                            + (Number(cItem.student) * Number(cItem.priceStudent))
                                            + (Number(cItem.globalPeople) * (Number(cItem.priceGlobalPeople)))
                                        );

                                        if (cItem.isCombo) {
                                            priceProduct = cItem.price;
                                        }

                                        totalCart = Number(totalCart) + (priceProduct - (priceProduct * (cItem.discount / 100)));

                                        return (
                                            <div className={`${styles.lineItemCart} border-b grid grid-cols-12 m-0`} key={index}>
                                                <div className="col-span-4 p-0" style={{ position: "relative" }}>
                                                    <div className="controlImage">
                                                        <Image
                                                            width={123}
                                                            height={85}
                                                            src={cItem.productType === 1
                                                                ?
                                                                cItem.imagesBaseUrl + `medium_` + cItem.imgCart
                                                                :
                                                                cItem.imagesBaseUrl + cItem.imgCart
                                                            }
                                                            className={styles.card_img}
                                                            alt="..."

                                                        />
                                                    </div>

                                                </div>
                                                <div className="col-span-8 px-3 controlInfo">

                                                    <div className={styles.infoCart}>
                                                        <h6 title={`${cItem.productName}`} className={styles.titleItem}>
                                                            {
                                                                searchParams.lng === "BR"
                                                                    ?
                                                                    cItem.productNameBR
                                                                    :
                                                                    searchParams.lng === "EN"
                                                                        ?
                                                                        cItem.productNameEN
                                                                        :
                                                                        searchParams.lng === "ES"
                                                                            ?
                                                                            cItem.productNameES
                                                                            :
                                                                            cItem.productName
                                                            }
                                                        </h6>
                                                        {
                                                            !cItem.isCombo &&
                                                            <div className="flex place-content-between">
                                                                <div>
                                                                    {dic?.date} {String(cItem.date).split('-').reverse().join('/')}
                                                                </div>
                                                                <div>
                                                                    {
                                                                        cItem.productType === 2 && cItem.sellingType === 2
                                                                            ?
                                                                            <>
                                                                                {cItem.globalPeople}
                                                                            </>
                                                                            :
                                                                            cItem.productType === 2 && cItem.sellingType === 1
                                                                                ?
                                                                                <>
                                                                                    {cItem.totalPeople}
                                                                                </>
                                                                                :
                                                                                <>
                                                                                    {
                                                                                        cItem.sellingType === 2
                                                                                            ?
                                                                                            (Number(cItem.adults) + Number(cItem.childs) + Number(cItem.infants) + Number(cItem.elders) + Number(cItem.student))
                                                                                            :
                                                                                            cItem.sellingType === 1
                                                                                                ?
                                                                                                (Number(cItem.totalPeople))
                                                                                                :
                                                                                                (Number(cItem.adults) + Number(cItem.childs) + Number(cItem.infants) + Number(cItem.elders) + Number(cItem.student))
                                                                                    }
                                                                                </>

                                                                    }
                                                                    {
                                                                        (Number(cItem.adults) + Number(cItem.childs) + Number(cItem.infants) + Number(cItem.elders) + Number(cItem.student)) > 1 || cItem.globalPeople > 1 || cItem.totalPeople > 1
                                                                            ?
                                                                            <>{dic?.people}</>
                                                                            :
                                                                            <>{dic?.person}</>
                                                                    }



                                                                </div>
                                                            </div>
                                                        }
                                                    </div>
                                                    <div className="priceControl flex items-center place-content-between">
                                                        <div className="flex items-center">
                                                            <small>R$ &nbsp;</small>{" "}<div className="priceItem ml-1">{(priceProduct - (priceProduct * (cItem.discount / 100))).toFixed(2).split(".").join(",")}</div>
                                                        </div>
                                                        <div>
                                                            <span
                                                                style={{ cursor: 'pointer' }}
                                                                onClick={() => { removeItemCart?.(cItem), setUpdateCart(!updateCart) }}
                                                            >
                                                                {IconTrash}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                    :
                                    <></>
                                }
                            </div>
                            <div className={` ${styles.subTotalControl} bg-light`}>
                                {
                                    cart?.cupom?.type === 2
                                        ?
                                        <>
                                            <div className="flex justify-between py-3">
                                                <small className="flex justify-between items-center">
                                                    <p className='mb-0'>
                                                        {cart.cupom.codeName}
                                                    </p>
                                                </small>
                                                <small className='flex items-center text-right'>
                                                    <span className='mb-0'>
                                                        {cart.cupom.value.toFixed(2).split(".").join(",")}
                                                    </span>
                                                    <span className='exclude-cupom'
                                                        onClick={() => removeCupomCart?.()}>
                                                        <span style={{ marginLeft: "6px" }} className='flex'>{IconTimes("16px", "16px")}</span>
                                                    </span>
                                                </small>
                                            </div>
                                            <div className={` ${styles.bg_cart_price_total}`} style={{ paddingTop: "0" }}>
                                                <div>
                                                    <p className="mb-0">{dic?.subtotal}</p>
                                                </div>
                                                <div>
                                                    <p className="mb-0">
                                                        R$
                                                        <b>{Number(cart?.totalCart).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }).split('R$')[1]}</b>
                                                    </p>
                                                </div>
                                            </div>
                                        </>
                                        :
                                        cart?.cupom?.type === 4
                                            ?
                                            <>
                                                <div className="flex justify-between py-3">
                                                    <small className="flex justify-between items-center">
                                                        <p className='mb-0'>
                                                            {cart.cupom.codeName}
                                                        </p>
                                                    </small>
                                                    <small className='flex items-center text-right'>
                                                        <span className='mb-0'>
                                                            {cart.cupom.value.toFixed(2).split(".").join(",")}
                                                        </span>
                                                        <span className='exclude-cupom'
                                                            onClick={() => removeCupomCart?.()}>
                                                            <span style={{ marginLeft: "6px" }} className='flex'>{IconTimes("16px", "16px")}</span>
                                                        </span>
                                                    </small>
                                                </div>
                                                <div className={` ${styles.bg_cart_price_total}`} style={{ paddingTop: "0" }}>
                                                    <div>
                                                        <p>{dic?.subtotal}</p>
                                                    </div>
                                                    <div>
                                                        <p>
                                                            R$
                                                            <b>{Number(cart?.totalCart)?.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }).split('R$')[1]}</b>
                                                        </p>
                                                    </div>
                                                </div>
                                            </>
                                            :
                                            <div className={` ${styles.bg_cart_price_total}`}>
                                                <div>
                                                    <p>{dic?.subtotal}</p>
                                                </div>
                                                <div>
                                                    <p>
                                                        R$
                                                        <b>{Number(cart?.totalCart)?.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }).split('R$')[1]}</b>
                                                    </p>
                                                </div>
                                            </div>
                                }
                            </div>
                            <div className="p-3 bg-primary-dark" >
                                <div className="flex place-content-between">
                                    <button
                                        type="button"
                                        className={`btn text-white border-white ${styles.btn_cart}`}
                                        onClick={() => (removeTotalCart?.(cart?.dados), setUpdateCart(!updateCart))}
                                    >
                                        {dic?.clearCart}
                                    </button>

                                    <Link
                                        href="/cart"
                                        className={`btn btn-primary ${styles.btn_cart}`}
                                    >
                                        {dic?.buyNow}
                                    </Link>
                                </div>
                                {/* <div className="cart-cancel">
                                    <h6>Cancelamento grátis</h6>
                                    <small>Até 24 horas de antecedência do checkin com 100% de reembolso.</small>
                                </div> */}
                            </div>

                        </div>
                    </li>
                </ul>
            )
        }
    }


    return (
        <>
            {/* <RenderCart /> */}
            {RenderCart()}
        </>
    )


}

export default HeaderDropDownCart;