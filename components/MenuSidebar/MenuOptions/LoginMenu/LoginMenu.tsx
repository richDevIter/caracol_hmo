import React , { useState, useEffect } from 'react';
import AuthLogin from '../../../AuthLogin/AuthLogin';
import { useParams } from 'next/navigation';
import { getDictionary } from '@/dictionaries';


import styles from "./LoginMenu.module.css";

export interface props {
    setOpen: any;
    setMenuSelection: any;
}

const LoginMenu: React.FC<props> = ({
    setOpen = true, setMenuSelection
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

    return   ( <>
            <div className="menu-options-container">
                <div className={`${styles.login_menu}`}>
                    <div className={`${styles.header_menu}`}>
                        <div className='text-center w-full'>
                            <h3 className='login-menu-title text-[24px] font-medium'>{dic?.mainMenu.makeLogin}</h3>
                        </div>
                        <button id="menu-close-button-login-menu" className={`${styles.close_button}`} onClick={() => { setOpen(false) }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" viewBox="0 0 20.252 20.252" fill="#333A41">
                                <path d="M11.769 10.126l8.142 8.142a1.162 1.162 0 11-1.643 1.644l-8.143-8.143-8.142 8.143A1.162 1.162 0 01.34 18.268l8.142-8.142L.34 1.984A1.162 1.162 0 011.983.34l8.142 8.143 1.643 1.643zm8.142-8.142s-4.642 4.666-6.5 6.5a1.162 1.162 0 11-1.644-1.644c2.027-2.035 6.5-6.5 6.5-6.5a1.162 1.162 0 011.643 1.643z"></path>
                            </svg>
                        </button>
                    </div>
                    <AuthLogin />
                </div>
            </div>
        </>
    );
}

export default LoginMenu;