import IdChannelCollection from '@/core/IdChannel';
import IdChannelRepository from '@/core/IdChannelRepository';
import { setCookie, parseCookies } from "nookies";

import { useEffect, useState } from 'react';

// Hook
export default function useIdChannel() {
    const repoChannel: IdChannelRepository = new IdChannelCollection();
    const cookies = parseCookies();

    const [channel, setChannel] = useState<any>(cookies.idCanal);

    useEffect(() => {
        if (!cookies.idCanal) {
            repoChannel.getFiltered('site').then(setChannel);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    useEffect(() => {
        setCookie(null, 'idCanal', channel?.data || cookies.idCanal, {
            maxAge: (60 * 10), //expira em 10 minutos (60 * 10)
            path: '/',
        });
    }, [channel, cookies.idCanal]);
}