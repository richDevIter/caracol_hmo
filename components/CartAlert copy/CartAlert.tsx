import React, { useState, useEffect } from 'react';

///alertType: string -> alert / info / sucess / danger

function CartAlert(props: any) {
    const [show, setShow] = useState(true);
    const [fade, setFade] = useState<boolean>(false);
    const delay = 2;

    useEffect(() => {
        let timer1 = setTimeout(() => setShow(false), delay * 1500);
        let timer2 = setTimeout(() => setFade(true), 3000);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, [])

    return (
        <>
            {show === true
                ?
                <div className={props.alertType + " alert mb-0"} style={{ opacity: fade === true ? "0" : "1" }}>
                    <p className='flex items-center m-0 gap-2 mx-2'>{props.children}</p>
                </div>
                :
                ""
            }
        </>
    );
}

export default CartAlert;