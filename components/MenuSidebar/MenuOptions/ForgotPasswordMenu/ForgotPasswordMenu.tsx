import React, { useState } from 'react';

export interface props {
    setOpen: any;
    setMenuSelection?: any;
}

const ForgotPasswordMenu: React.FC<props> = ({
    setOpen, setMenuSelection
}: props) => {
    const [loading, setLoading] = useState<any>(false);

    const onSubmit = (e: any) => {
        e.preventDefault();

        /* const getAuthenticate = async () => {
            try {
                const { data } = await api.post('/api/LoginSite/Authenticate', { ///LOGIN API
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
                    } else if (window.location.pathname === "/login") {
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
                <div className="menu-options forgot-password-menu">
                    <div className="header-menu">
                        <div className='centered'>
                            <h3 className='forgot-password-menu-title'>Recuperar Senha</h3>
                        </div>
                        <button id="menu-close-button-forgot-menu" className="x-close-button absolute" onClick={() => { setOpen(false) }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" viewBox="0 0 20.252 20.252" fill="#333A41">
                                <path d="M11.769 10.126l8.142 8.142a1.162 1.162 0 11-1.643 1.644l-8.143-8.143-8.142 8.143A1.162 1.162 0 01.34 18.268l8.142-8.142L.34 1.984A1.162 1.162 0 011.983.34l8.142 8.143 1.643 1.643zm8.142-8.142s-4.642 4.666-6.5 6.5a1.162 1.162 0 11-1.644-1.644c2.027-2.035 6.5-6.5 6.5-6.5a1.162 1.162 0 011.643 1.643z"></path>
                            </svg>
                        </button>
                    </div>
                    <div className='simple-text'>
                        <span>Digite  e-mail associado à sua conta para receber o link de <span className='text-primary'>redefinição de senha.</span></span>
                    </div>
                    <form className="user" name="forgot-password_form" onSubmit={(e: any) => onSubmit(e)}>
                        <div className="form-group mb-2">
                            <input type="email" name="email" className="forgot-password-form" id="exampleInputEmail" aria-describedby="emailHelp" autoComplete="off" placeholder='Email' />
                        </div>

                        <button type="submit" className="btn btn-primary btn-block w-100 forgot-password" onClick={() => { setLoading(true) }} >{loading === true ? <div className="load small white"></div> : "Enviar para este e-mail"}</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default ForgotPasswordMenu;