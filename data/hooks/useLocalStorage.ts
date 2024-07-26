import { useEffect, useState } from 'react';

// Hook
export default function useLocalStorage(item: any) {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [localOption, setLocalOption] = useState<any>('');

    useEffect(() => {
        const transferC2: any = localStorage.getItem(item);
        const transferItemJSON = JSON.parse(transferC2);

        setLocalOption(transferItemJSON);

    }, [item]); // Empty array ensures that effect is only run on mount

    return localOption;
}
