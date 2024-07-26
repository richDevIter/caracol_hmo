import styles from './HomePark.module.css';

export default function HomePark() {
    return (
        <>
            <div className={`${styles.home_video} container-page flex flex-col items-center my-outside mb-8 pt-0 pb-6`}>
                <div className={`${styles.bg_home_main_text}`}>
                    <p className="text-primary text-center mb-0">
                        Moradores e nascidos nas cidades de CANELA E GRAMADO TÊM ENTRADA GRATUITA no Parque e promocionalmente estacionamento a R$10 apresentando comprovante na bilheteria.
                    </p>
                    <p className="text-primary text-center mb-0">
                        Estação Sonho Vivo e Observatório Panorâmico não inclusos.
                    </p>
                </div>
                <iframe src="https://www.youtube.com/embed/xcXYwo07vxI?si=TGYOZw2QVdIk6_Yi&amp;controls=0" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
            </div>
        </>
    )
}