import React from "react";

import styles from './Modal.module.css'

export default function Modal(props: any) {
    const [showModal, setShowModal] = React.useState(false);
    const btnClose = true;

    return (
        <>
            {props.showModal ? (
                <>
                    <div
                        className={`${styles.modal_fade} justify-center items-center flex flex-col overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 outline-none focus:outline-none`}
                    >
                        <div className={`${styles.modal}`} >
                            {props.btnClose &&
                                <div className="flex justify-end w-full">
                                    <div className={`${styles.modal_close}`} onClick={() => props.setShowModal(false)}></div>
                                </div>
                            }
                            {props.children}
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}