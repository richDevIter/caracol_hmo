"use client"

import { useEffect, useState } from "react";
import { parseCookies, destroyCookie } from 'nookies';

declare global {
    interface Window {
        koinSessionId?: any;
        getSessionID?: any;
        SESSION_COOKIE_NAME?: any;
    }
}


export default function useKoin() {
    let koinId: any = undefined;

    //const [koin, setKoin] = useState<string>(' ');
    let koin = ' ';
    const getKoin = async () => {
        if (koinId !== undefined) {
            return window.koinSessionId;
        } else {
            if (!!window?.getSessionID) {
                destroyCookie(null, window.SESSION_COOKIE_NAME);
                
                await new Promise((resolve: any) => {
                    window.getSessionID(function (sessionId: any) {
                        window.koinSessionId = sessionId;
                        const cookies = parseCookies();
                        koin = cookies[window.SESSION_COOKIE_NAME] === sessionId ? sessionId : ' ';
                        //setKoin(cookies[window.SESSION_COOKIE_NAME] === sessionId ? sessionId : ' ');
                        resolve();
                    });
                });
                return koin;
            } else {
                return ' ';
            }
        }
    }

    return getKoin();


}
