import { useEffect, useState } from 'react';

// Hook
export default function useWindowUrl() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowUrl, setWindowUrl] = useState<any>('');

    useEffect(() => { 
        setWindowUrl(window.location.href)
    }, []); // Empty array ensures that effect is only run on mount

    return windowUrl;
}
