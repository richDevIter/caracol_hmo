import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import useAppData from '@/data/hooks/useCartData';

import styles from "./MainMenu.module.css";
import { IconCart, IconHelp, IconLanguage, IconLeave, IconSingleUser, IconTicket } from '@/assets/icons';

import ImgProfile from '../../../../assets/img/icons8-male-user-48.png';


import { useParams, useRouter } from 'next/navigation';
import { getDictionary } from '@/dictionaries';

export interface props {
    setOpen: any;
    setMenuSelection: any;
    setOpenCart: any;
}

const MainMenu: React.FC<props> = ({
    setOpen, setMenuSelection, setOpenCart
}: props) => {

    const [dic, setDic] = useState<any>(null);
    const searchParams = useParams();

    useEffect(() => {
        const fetchDictionary = async () => {
            const dictionary = await getDictionary(searchParams.lng as "pt" | "en" | "es", 'menuSideBar');
            setDic(dictionary);
        };
    
        fetchDictionary();
    
    }, [searchParams.lng])

    const router = useRouter();

    const auth = JSON.parse(localStorage.getItem('crcSiteAuth') || '{}');
    const [loggedIn, setLoggedIn] = useState<boolean>(auth.userModel ? true : false);

    const { cart, removeTotalCart, removeItemCart, removeCupomCart } = useAppData();


    function logOut() {
        localStorage.removeItem('crcSiteAuth');
        //window.location.href = "/";
        router.push("/");
    }

    return (
        <>
            <div className="menu-options-container">
                <div className="menu-options">
                    <div className={`${styles.header_menu}`}>
                        {loggedIn === false/* auth === {} || auth === null */
                            ?
                            <div className='flex items-center gap-3'>
                                <span style={{ marginLeft: "8px" }}>{IconSingleUser("#000000", "18", "18")}</span>
                                <span><span className={`${styles.pointer} text-primary`} onClick={() => { setMenuSelection(1) }}>{dic?.mainMenu.makeLogin}</span> {dic?.mainMenu.or} <Link href="/criar-conta" className={`${styles.pointer} text-primary`} /* onClick={() => { setMenuSelection(2) }} */>{dic?.mainMenu.createAccount}</Link></span>
                            </div>
                            :
                            <div className='flex items-center'>
                                {
                                    auth?.userModel.photo !== undefined && auth?.userModel.photo !== null
                                        ?
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img src={auth?.userModel.photo?.split(" ")[0]} alt="icon login" className={`${styles.menu_mobile_img}`} />
                                        :
                                        <Image alt="profile" src={ImgProfile} width={32} height={32} />
                                }
                                <span>{`${auth?.userModel.firstName?.split(" ")[0]} ${auth?.userModel.surName}`}</span>
                            </div>
                        }
                        <button id="menu-close-button-main-menu" className={`${styles.close_button}`} onClick={() => { setOpen(false) }}  title="Botão Fechar" aria-label="Botão Fechar">
                            <svg xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" viewBox="0 0 20.252 20.252" fill="#333A41">
                                <path d="M11.769 10.126l8.142 8.142a1.162 1.162 0 11-1.643 1.644l-8.143-8.143-8.142 8.143A1.162 1.162 0 01.34 18.268l8.142-8.142L.34 1.984A1.162 1.162 0 011.983.34l8.142 8.143 1.643 1.643zm8.142-8.142s-4.642 4.666-6.5 6.5a1.162 1.162 0 11-1.644-1.644c2.027-2.035 6.5-6.5 6.5-6.5a1.162 1.162 0 011.643 1.643z"></path>
                            </svg>
                        </button>
                    </div>
                    {loggedIn === true
                        ?
                        <>
                            <div className={`${styles.header_menu}`} onClick={() => { router.push("/minhas-atividades"); }}>
                                <div className="flex items-center gap-3">
                                    <span style={{ marginLeft: "8px" }}>{IconTicket("#000000", "18", "18")}</span>
                                    <span>{dic?.mainMenu.myActivities}</span>
                                </div>
                            </div>
                            <div className={`${styles.header_menu}`} onClick={() => { router.push("/perfil");}} >
                                <div className="flex items-center gap-3">
                                    <span style={{ marginLeft: "8px" }}>{IconSingleUser("#000000", "18", "18")}</span>
                                    <span>{dic?.mainMenu.myProfile}</span>
                                </div>
                            </div>
                        </>
                        :
                        <></>
                    }
                    <div className={`${styles.header_menu}`} onClick={() => {
                        if (cart.dados.length > 0) {
                            setOpenCart(true);
                            setOpen(false)
                        }
                    }}>
                        <div className="flex items-center gap-3">
                            <span style={{ marginLeft: "8px" }}>{IconCart("#000000", "18", "18")}</span>
                            <div className='flex'>
                                <span>{dic?.mainMenu.myCart}</span>
                                <span className={`${styles.indicate_number}`}>{cart.dados.length}</span>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.header_menu}`} onClick={() => { setMenuSelection(7) }}>
                        <div className="flex items-center gap-3">
                            <span style={{ marginLeft: "8px" }}>{IconLanguage("#000000", "18", "18")}</span>
                            <span>{dic?.mainMenu.chooseLanguage}</span>
                        </div>
                    </div>
                    <div className={`${styles.header_menu}`} >
                        <Link
                            href="/perguntas-frequentes" style={{ textTransform: "capitalize" }}>
                            <div className="flex items-center gap-3">
                                <span style={{ marginLeft: "8px" }}>{IconHelp("#000000", "18", "18")}</span>
                                <span className='d-flex align-items-center'>
                                {dic?.mainMenu.help}
                                </span>
                            </div>
                        </Link>
                    </div>
                    {loggedIn === false
                        ?
                        <></>
                        :
                        <div className={`${styles.header_menu}`} onClick={() => { }}>
                            <div className="flex items-center gap-3" onClick={logOut}>
                                <span style={{ marginLeft: "8px" }}>{IconLeave("#000000", "18", "18")}</span>
                                <span>{dic?.mainMenu.leave}</span>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    );
}

export default MainMenu;