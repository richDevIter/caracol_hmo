import { parseCookies } from "nookies";
import TabSearchRepository from "./TabSearchRepository";

async function conectAPI(req: object | null, url: string, method: string) {

    let config = {}

    if (req === null) {
        config = {
            method,
            headers: {
                "Content-Type": "application/json",
            }
        }
    } else {
        config = {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(req),
        }
    }

    try {
        const resp: any = await fetch(
            //`${process.env.NEXT_PUBLIC_SERVER_URL_API}${url}`, config
            `${url}`, config

        );

        if (resp.status === 200) {
            const authResp: any = await resp.json();

            return authResp;
        } else {
            const error = await resp.json();
            throw new Error(JSON.stringify(error));
        }
    } catch (error) {
        return error;
    }
}

export default class TabSearchCollection implements TabSearchRepository {
    data: any;

    async getTabSearch(slug: string | undefined, lang: string, channel: number): Promise<any> {
        const cookies = parseCookies();

        const req = {
            ProductType: 0,
            term: slug,
            channel: channel,
            lang: lang,
        }

        return conectAPI(req, `${process.env.NEXT_PUBLIC_SERVER_URL_API}/Products/SearchByChannel`, "POST");
    }
}
