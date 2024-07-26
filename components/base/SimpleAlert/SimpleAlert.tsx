import React, { useState, useEffect } from 'react';


///alertType: string -> alert / info / sucess / danger

function SimpleAlert(props: any) {
    const [show, setShow] = useState(true);
    const [fade, setFade] = useState<boolean>(false);
    const delay = 2;

    useEffect(() => {
        let timer1 = setTimeout(() => setShow(false), delay * 1000);
        let timer2 = setTimeout(() => setFade(true), 1000);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, [])

    return (
        <>
            {show === true
                ?
                <div className={props.alertType + " alert"} style={{ opacity: fade === true ? "0" : "1" }}>
                    <p className='m-0'>{props.children}</p>
                </div>
                :
                ""
            }
        </>
    );
}

export default SimpleAlert;