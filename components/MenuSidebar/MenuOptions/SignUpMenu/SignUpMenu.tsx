import React, { useState } from 'react';

import styles from './SignUpMenu.module.css';

export interface props {
    setOpen: any;
    setMenuSelection: any;
}

const SignUpMenu: React.FC<props> = ({
    setOpen, setMenuSelection
}: props) => {
    const [loading, setLoading] = useState<any>(false);

    const onSubmit = (e: any) => {
        e.preventDefault();

        /* const getAuthenticate = async () => {
            try {
                const { data } = await api.post('/api/signupSite/Authenticate', { ///signup API
                    "email": e.target.email.value,
                    "password": e.target.cust_pass.value,
                    "facebookId": '',
                    "googleId": '',
                });
                if (data.status !== 400) {
                    localStorage.setItem("crcSiteAuth", data.data !== null ? JSON.stringify(data.data) : '{}');
                    if (data.statusCode === 400) {
                        setLoading(false)
                        setErrorMessage(data.errorMessage);
                    } else if (window.location.pathname === "/signup") {
                        window.location.href = "/";
                    } else if (data.data.log === 1) {
                        setAlertMessage(data.data.texto);
                        setAlertBool(true);
                        setLoading(false)
                    } else {
                        window.location.reload();
                    }

                } else {
                }

            } catch (error: any) {
                setLoading(false)
                if (error?.response?.status === 400) {
                    setErrorMessage(error.response.data.errorMessage)
                }

            }
        }

        getAuthenticate(); */
    };

    return (
        <>
            <div className="menu-options-container">
                <div className={`${styles.signup_menu}`}>
                    <div className={`${styles.header_menu}`}>
                        <div className='text-center w-full'>
                            <h3 className='signup-menu-title text-[24px] font-medium'>Criar Conta</h3>
                        </div>
                        <button id="menu-close-button-signup" className={`${styles.close_button}`} onClick={() => { setOpen(false) }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" viewBox="0 0 20.252 20.252" fill="#333A41">
                                <path d="M11.769 10.126l8.142 8.142a1.162 1.162 0 11-1.643 1.644l-8.143-8.143-8.142 8.143A1.162 1.162 0 01.34 18.268l8.142-8.142L.34 1.984A1.162 1.162 0 011.983.34l8.142 8.143 1.643 1.643zm8.142-8.142s-4.642 4.666-6.5 6.5a1.162 1.162 0 11-1.644-1.644c2.027-2.035 6.5-6.5 6.5-6.5a1.162 1.162 0 011.643 1.643z"></path>
                            </svg>
                        </button>
                    </div>
                    <div className="flex flex-col">
                        <button className={`${styles.facebook}`}>FACEBOOK</button>
                        <button className={`${styles.google}`}>GOOGLE</button>
                    </div>
                    <div className={`${styles.divisor}`}>
                        <hr />
                        <span>ou crie usando email</span>
                        <hr />
                    </div>
                    <div className="auth-signup">
                        <form className="user" name="signup_form" onSubmit={(e: any) => onSubmit(e)}>
                            <div className='grid grid-cols-12 gap-2'>
                                <div className="form-group mb-2 col-span-6">
                                    <input type="text" name="name" className={`${styles.signup_form}`} id="exampleInputName" autoComplete="off" placeholder='Nome' />
                                </div>
                                <div className="form-group mb-2 mb-md-3 col-span-6">
                                    <input type="text" name="last_name" className={`${styles.signup_form}`} id="exampleInputLastName" autoComplete="off" placeholder='Sobrenome' />
                                </div>
                            </div>
                            <div className="form-group mb-2 grid grid-cols-12">
                                <div className='col-span-12'>
                                    <input type="email" name="email" className={`${styles.signup_form}`} id="exampleInputEmail" autoComplete="off" placeholder='Email' />
                                </div>
                            </div>
                            <div className='grid grid-cols-12 gap-2'>
                                <div className="form-group mb-2 col-span-6">
                                    <input type="password" name="password" className={`${styles.signup_form}`} id="exampleInputPassword" autoComplete="off" placeholder='Senha' />
                                </div>
                                <div className="form-group mb-2 mb-md-3 col-span-6">
                                    <input type="password" name="confirm-password" className={`${styles.signup_form}`} id="exampleInputConfirmPassword" autoComplete="off" placeholder='Confirmar Senha' />
                                </div>
                            </div>
                            <div className="form-group mb-1 mb-md-0">
                                <div className={`${styles.custom_control} flex pb-0 md:pb-2 my-2`}>
                                    <input type="checkbox" name="remember" className={`${styles.check_input} form-check-input`} value="1" id="customCheck" />
                                    <label className="custom-control-label px-2 m-0" htmlFor="customCheck">
                                        Sim, quero receber novidades sobre excursões, atrações, ofertas e descontos. É possível cancelar a inscrição a qualquer momento clicando em <span className='text-primary pointer'>unsubscribe.</span>
                                    </label>
                                </div>
                            </div>
                            <button type="submit" className={`${styles.btn_enter} btn btn-primary w-full`} onClick={() => { setLoading(true) }} >{loading === true ? <div className="load small white"></div> : "Entrar"}</button>
                        </form>
                        <div className={`${styles.menu_footer}`}>
                            <span>Já tem uma conta? <span className='text-primary pointer' onClick={() => { setMenuSelection(1) }}>Entrar!</span></span>
                            <span>Ao fazer login ou criar uma conta, você concorda condições dos <span className='text-primary pointer' onClick={() => { }}>Termos de Uso</span> e <span className='text-primary pointer' onClick={() => { }}>Política de Privacidade.</span></span>
                        </div>

                        <hr className='my-3'/>

                        <div className="flex justify-between">
                            <span className='text-primary pointer font-medium' onClick={() => { }}>Termos de Uso </span>
                            <span className='text-primary pointer font-medium' onClick={() => { }}>Política de Privacidade.</span>
                            <span></span>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default SignUpMenu;