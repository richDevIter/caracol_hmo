// Hook
export default function useScrollTo(id: any) {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/

    const scrolltoId = () => {
        var scroll:any = document.getElementById(id);
        scroll?.scrollIntoView({ 
            behavior: 'smooth',
            block: "start", 
        }, true);
    }

    return scrolltoId();
}
