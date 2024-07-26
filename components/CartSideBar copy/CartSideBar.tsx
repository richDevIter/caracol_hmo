/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from "next/image";


import CartAlert from '../CartAlert/CartAlert';
import { IconCheckCart, IconTimes, IconTrash } from '@/assets/icons';

import styles from "./CartSideBar.module.css";
import useAppData from '@/data/hooks/useCartData';
import { useParams } from 'next/navigation';
import { getDictionary } from '@/dictionaries';



export interface propOptions {
    open: any,
    setOpen: any,
    messageCart?: any,

}

const CartSideBar: React.FC<propOptions> = ({
    open, setOpen, messageCart
}) => {
    

    const searchParams = useParams();

    const [dic, setDic] = useState<any>(null);

    useEffect(() => {
        const fetchDictionary = async () => {
            const dictionary = await getDictionary(searchParams.lng as "pt" | "en" | "es", 'cart');
            setDic(dictionary);
        };
        fetchDictionary();
    }, [searchParams.lng])

    //const [t] = useTranslation();
    const [menuSelection, setMenuSelection] = useState<any>(0); //0 - main | 1 - login | 2 - criar conta | 3 - atividades | 4 - perfil | 5 - cart | 6 - favs | 7 - idioma | 8 - moeda | 9 - esqueceu senha
    const [updateCart, setUpdateCart] = useState<boolean>(true);

    const { cart, removeTotalCart, removeItemCart, removeCupomCart } = useAppData();

    let totalCart = 0;

    useEffect(() => {
        if (open === true) {
            document.getElementById("cartSideBar")!.style.left = "calc(100% - 341px)";
            document.getElementById("cartshadow")!.style.display = "block";

        } else {
            document.getElementById("cartSideBar")!.style.left = "100%";
            document.getElementById("cartshadow")!.style.display = "none";

            setTimeout(() => { setMenuSelection(0) }, 100);
        }
    }, [open])

    /* Detecta clique fora da div#wrapper para fechar o menuSideBar */

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    function useOutsideAlerter(ref: any) {
        useEffect(() => {
            function handleClickOutside(event: any) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setOpen(false);
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    /* //Detecta clique fora da div#wrapper para fechar o menuSideBar\\ */

    useEffect(() => {
        if (cart.dados.length === 0) {
            setOpen(false);
        }
    }, [cart.dados])

    useEffect(() => {
        if (messageCart === true) {
            setOpen(true)
        }
    }, [messageCart])

    return (
        <>
            <div id="cartSideBar"
                className={
                    [1, 2, 9].includes(menuSelection)
                        ? `${styles.cartSideBar} ${styles.originalSize}`
                        : `${styles.cartSideBar}`
                }>
                <div data-v-403394da="" className="fixed">
                    <div>
                        <div data-v-403394da="" className="flex justify-end w-full">
                            <div id="wrapper" ref={wrapperRef} className="custom-scroll bg-white">
                                {/* <CartHeader /> */}
                                <ul className="navbar-nav ml-auto" id="wrapper" ref={wrapperRef}>
                                    <li className=" carrinho nav-item-c2"
                                        data-cart="item"
                                    >
                                        <div
                                            className="cart bg-mobile-cart"
                                            data-cart="divMenu"
                                            style={{ zIndex: 1040 }}
                                        >
                                            <div className='h-100'>
                                                <div className={`${styles.titleCart} bg-light flex justify-between items-center`}>
                                                    <p><strong>Carrinho,</strong> {cart.dados.length} itens</p>
                                                    <button id="menu-close-button-cart" className={`${styles.close_button}`} onClick={() => { setOpen(false) }} title="Botão Fechar" aria-label="Botão Fechar">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" viewBox="0 0 20.252 20.252" fill="#333A41">
                                                            <path d="M11.769 10.126l8.142 8.142a1.162 1.162 0 11-1.643 1.644l-8.143-8.143-8.142 8.143A1.162 1.162 0 01.34 18.268l8.142-8.142L.34 1.984A1.162 1.162 0 011.983.34l8.142 8.143 1.643 1.643zm8.142-8.142s-4.642 4.666-6.5 6.5a1.162 1.162 0 11-1.644-1.644c2.027-2.035 6.5-6.5 6.5-6.5a1.162 1.162 0 011.643 1.643z"></path>
                                                        </svg>
                                                    </button>
                                                </div>
                                                {
                                                    messageCart !== false
                                                        ?
                                                        <div className="messages">
                                                            <CartAlert
                                                                alertType="success"
                                                            >
                                                                <div className="d-flex align-items-center">
                                                                    {IconCheckCart("#00cc79", "18", "18")}
                                                                </div>
                                                                <div>
                                                                    Você adicionou ao carrinho
                                                                </div>
                                                            </CartAlert>
                                                        </div>
                                                        :
                                                        <></>
                                                }
                                                <div>
                                                    <div className="listItens">
                                                        {cart.dados.length >= 1
                                                            ? cart.dados.map((cItem: any, index: any) => {

                                                                let priceProduct = (
                                                                    (Number(cItem.adults) * Number(cItem.priceAdults))
                                                                    + (Number(cItem.childs) * Number(cItem.priceChilds))
                                                                    + (Number(cItem.infants) * Number(cItem.priceInfants))
                                                                    + (Number(cItem.elders) * Number(cItem.priceElders))
                                                                    + (Number(cItem.student) * Number(cItem.priceStudent))
                                                                    + (Number(cItem.priceGlobalPeople))
                                                                );

                                                                totalCart = Number(totalCart) + (priceProduct - (priceProduct * (cItem.discount / 100)));
                                                                return (
                                                                    <div className={`${styles.lineItemCart} grid grid-cols-12 m-0 gap-3`} key={index}>
                                                                        <div className="col-span-4 p-0" style={{ position: "relative" }}>
                                                                            <div className={`${styles.controlImage}`}>
                                                                                <Image src={cItem.productType === 1 ?
                                                                                    `${cItem.imagesBaseUrl}/medium_` + cItem.imgCart
                                                                                    :
                                                                                    cItem.productType === 4
                                                                                        ?
                                                                                        `${cItem.imagesBaseUrl}` + cItem.imgCart
                                                                                        :
                                                                                        `${cItem.imagesBaseUrl}` + cItem.imgCart
                                                                                }
                                                                                    className="card-img"
                                                                                    alt="..."
                                                                                    width={60}
                                                                                    height={60}
                                                                                />
                                                                            </div>

                                                                        </div>
                                                                        <div className="col-span-8 controlInfo">
                                                                            <div className={`${styles.infoCart}`}>
                                                                                <h6 title={`${cItem.productName}`} className={`${styles.titleItem}`}>{cItem.productName}</h6>
                                                                                <div className="flex justify-between">
                                                                                    <div>
                                                                                        Data: {String(cItem.date).split('-').reverse().join('/')}
                                                                                    </div>
                                                                                    <div>
                                                                                        {
                                                                                            cItem.productType === 2
                                                                                                ?
                                                                                                <>
                                                                                                    {cItem.globalPeople}{" Pessoa"}
                                                                                                </>
                                                                                                :
                                                                                                <>
                                                                                                    {
                                                                                                        cItem.sellingType === "2"
                                                                                                            ?
                                                                                                            (Number(cItem.adults) + Number(cItem.childs) + Number(cItem.infants) + Number(cItem.elders) + Number(cItem.student)) + " Pessoa"
                                                                                                            :
                                                                                                            cItem.sellingType === "1"
                                                                                                                ?
                                                                                                                (Number(cItem.globalPeople)) + " Pessoa"
                                                                                                                :
                                                                                                                (Number(cItem.adults) + Number(cItem.childs) + Number(cItem.infants) + Number(cItem.elders) + Number(cItem.student)) + " Pessoa"
                                                                                                    }
                                                                                                </>

                                                                                        }
                                                                                        {
                                                                                            (Number(cItem.adults) + Number(cItem.childs) + Number(cItem.infants) + Number(cItem.elders) + Number(cItem.student)) > 1 || cItem.globalPeople > 1
                                                                                                ?
                                                                                                <>
                                                                                                    {'s'}
                                                                                                </>
                                                                                                :
                                                                                                <></>

                                                                                        }


                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className={`${styles.priceControl} flex justify-between items-center`}>
                                                                                <div className="flex">
                                                                                    <small>R$</small>{" "}<div className="ml-1 font-semibold">{(priceProduct - (priceProduct * (cItem.discount / 100))).toFixed(2).split(".").join(",")}</div>
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
                                                </div>
                                            </div>
                                            <div>
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
                                                                        <p>{dic?.subtotal}</p>
                                                                    </div>
                                                                    <div>
                                                                        <p>
                                                                            R$
                                                                            <b>{Number(cart.totalCart).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }).split('R$')[1]}</b>
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
                                                                                <b>{Number(cart.totalCart)?.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }).split('R$')[1]}</b>
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
                                                                            <b>{Number(cart.totalCart)?.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }).split('R$')[1]}</b>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                    }
                                                </div>
                                                <div className="p-4 bg-primary-dark" >
                                                    <div className="flex justify-between">
                                                        <button
                                                            type="button"
                                                            className={`${styles.btn_outline_light} ${styles.btn_cart}`}
                                                            onClick={() => { removeTotalCart?.(cart.dados) }}
                                                            title="Limpar Carrinho" aria-label="Limpar Carrinho"
                                                        >
                                                            Limpar Carrinho
                                                        </button>

                                                        <Link
                                                            href="/cart"
                                                            className={`${styles.btn_cart} btn btn-primary`}
                                                            title="Comprar Agora" aria-label="Comprar Agora"
                                                        >
                                                            Comprar Agora
                                                        </Link>
                                                    </div>
                                                    <div className={`${styles.cartCancel}`}>
                                                        <h6>Cancelamento grátis</h6>
                                                        <small>Até 24 horas de antecedência do checkin com 100% de reembolso.</small>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div id="cartshadow"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CartSideBar;