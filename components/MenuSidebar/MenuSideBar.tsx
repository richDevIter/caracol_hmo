import React, { useState, useEffect, useRef } from 'react';

import styles from './MenuSideBar.module.css';
import dynamic from 'next/dynamic';
import { IconClose } from '@/assets/icons';

const DynamicMainMenu = dynamic(
    () => import('./MenuOptions/MainMenu/MainMenu'),
    {
        ssr: false,
    }
);

const DynamicLoginMenu = dynamic(
    () => import('./MenuOptions/LoginMenu/LoginMenu'),
    {
        ssr: false,
    }
);

const DynamicSignUpMenu = dynamic(
    () => import('./MenuOptions/SignUpMenu/SignUpMenu'),
    {
        ssr: false,
    }
);

const DynamicLanguageMenu = dynamic(
    () => import('./MenuOptions/LanguageMenu/LanguageMenu'),
    {
        ssr: false,
    }
);

function MenuSideBar(props: any) {
    //const [t] = useTranslation();
    const [menuSelection, setMenuSelection] = useState<any>(0); //0 - main | 1 - login | 2 - criar conta | 3 - atividades | 4 - perfil | 5 - cart | 6 - favs | 7 - idioma | 8 - moeda | 9 - esqueceu senha

    useEffect(() => {
        if (props.open === true) {
            document.getElementById('menuSideBar')!.style.right = 'calc(100% - 341px)';
            document.getElementById('shadow')!.style.display = 'block';
        } else {
            document.getElementById('menuSideBar')!.style.right = '100%';
            document.getElementById('shadow')!.style.display = 'none';

            setTimeout(() => {
                setMenuSelection(0);
            }, 100);
        }
    }, [props.open]);

    /* Detecta clique fora da div#wrapper para fechar o menuSideBar */

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    function useOutsideAlerter(ref: any) {
        useEffect(() => {
            function handleClickOutside(event: any) {
                if (ref.current && !ref.current.contains(event.target)) {
                    props.setOpen(false);
                }
            }
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, [ref]);
    }

    /* //Detecta clique fora da div#wrapper para fechar o menuSideBar\\ */

    return (
        <>
            <div
                id="menuSideBar"
                className={
                    [1, 2, 9].includes(menuSelection)
                        ? `${styles.menuSideBar} ${styles.originalSize} block`
                        : `${styles.menuSideBar} block`
                }
            >
                <div data-v-403394da="" className="fixed">
                    <div>
                        <div data-v-403394da="" className="flex justify-end w-full">
                            <div className={`${styles.customScroll}`}>
                                <div onClick={() => props.setOpen(false)} style={{ cursor: 'pointer' }}>
                                    {IconClose("16px", "16px", "var(--primary)")}
                                </div>
                                <div className="menu-options-container">
                                    <div className={`${styles.menu_options}`}>
                                        <ul>
                                            <li className="mb-4">
                                                <a href="/" className="">
                                                    <span>Home</span>
                                                </a>
                                            </li>
                                            <li className="mb-4">
                                                <a href="/sobre-nos" className="">
                                                    <span>O Parque</span>
                                                </a>
                                            </li>
                                            <li className="mb-4">
                                                <a href="/lojas" className="">
                                                    <span>Lojas</span>
                                                </a>
                                            </li>
                                            <li className="mb-4">
                                                <a href="/termos-de-uso" className="">
                                                    <span>Termos de Uso</span>
                                                </a>
                                            </li>
                                            <li className="mb-4">
                                                <a href="/aviso-de-privacidade" className="">
                                                    <span>Aviso de Privacidade</span>
                                                </a>
                                            </li>
                                            <li className="mb-4">
                                                <a href="/termos-de-compra" className="">
                                                    <span>
                                                        Termos de Compra
                                                    </span>
                                                </a>
                                            </li>
                                            <li className="mb-4">
                                                <a href="/cookies" className="">
                                                    <span>
                                                        Política de Cookies
                                                    </span>
                                                </a>
                                            </li>
                                            <li className="mb-4">
                                                <a href="https://sac.parquecaracol.com.br/hc/pt-br" target="_blank" className="text-decoration-none" rel="noopener noreferrer">
                                                    <span>
                                                        Fale Conosco
                                                    </span>
                                                </a>
                                            </li>
                                            <li className="mb-4">
                                                <a
                                                    href='/contato'
                                                    //target="_blank"
                                                    className=""
                                                >
                                                    <span>
                                                        Eventos
                                                    </span>
                                                </a>
                                            </li>
                                            <li className="mb-4">
                                                <a href="/regras-de-acesso" className="">
                                                    <span>
                                                        Regras de Acesso
                                                    </span>
                                                </a>
                                            </li>
                                            <li className="mb-4">
                                                <a
                                                    href="https://grupoiter.gupy.io/"
                                                    target="_blank"
                                                    className="text-decoration-none"
                                                    rel="noopener noreferrer"
                                                >
                                                    <span>
                                                        Trabalhe Conosco
                                                    </span>
                                                </a>
                                            </li>
                                            {/* <li className="mb-4">
                        <a
                          href={{ pathname: "https://novocaracoltainhas.sharepoint.com/:f:/s/ContratodeConcessoeanexos/EgeNMheevUNHny5Ob4vEnM4BO2ivB2ZWMu_bW9drfynnNg?e=tMXi88" }}
                          target="_blank"
                          className="text-decoration-none"
                          rel="noopener noreferrer"
                        >
                          <span>{t("navHeader.sideBar.judicialFiles")}</span>
                        </a>
                      </li> */}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div id="shadow" className={`${styles.shadow}`}></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MenuSideBar;
