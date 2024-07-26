import React from "react";

import styles from './Card.module.css';

export default function Card(props:any){

    return (

        <div className={styles.card}>
            {props.children}
        </div>
        
    );
};