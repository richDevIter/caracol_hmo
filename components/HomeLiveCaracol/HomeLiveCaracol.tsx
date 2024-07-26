import styles from './HomeLiveCaracol.module.css';

export default function HomeLiveCaracol() {
    return (
        <>
            <div className="py-12">
                <h2 className={`${styles.title_our_park} text-primary text-center mb-12 px-3`}>
                    Acompanhe a Cascata do Caracol Ao Vivo
                </h2>
                <div className={`${styles.home_video} flex justify-center container-page my-outside mb-10 pt-8 pb-8`}>
                    <iframe src="https://parquedocaracol.panomax.com/" className={`${styles.real_time_video}`} allowFullScreen title="Video Real Time"></iframe>
                </div>
            </div>
        </>
    )
}