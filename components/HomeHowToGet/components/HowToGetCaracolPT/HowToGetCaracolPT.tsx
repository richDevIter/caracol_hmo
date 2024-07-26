import React from "react";

import styles from '../../HomeHowToGet.module.css';

function HowToGetCaracolPT() {
    return (
        <>
            <div className={`${styles.how_to_get_caracol}`}>
                <div className={`${styles.how_to_get_top}`}>
                    {/* <FontAwesomeIcon icon={["fas", "map-marker-alt"]} /> */}
                    <span>Como chegar</span>
                </div>

                <div className={`${styles.how_to_get_description}`}>
                    <p>
                        O <b>Parque do Caracol</b> fica a aproximadamente 8,7 km do centro da cidade de Canela/RS. Basta seguir em direção a Gramado/RS, pegando a RS 466.
                    </p>
                    <p>
                        Estacionamento cobrado no local.
                    </p>
                </div>

                <div>
                    <button className="outline-primary mb-5">
                        Conheça as principais atrações
                    </button>
                </div>
            </div>
        </>
    )
}

export default HowToGetCaracolPT;