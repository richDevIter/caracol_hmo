import { parseCookies } from "nookies";
import HomePageRepository from "./HomePageRepository";
import { useEffect } from "react";

const cookies = parseCookies();

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

      return authResp.data;
    } else {
      const error = await resp.json();
      throw new Error(JSON.stringify(error));
    }
  } catch (error) {
    return error;
  }
}
export default class HomePageCollection implements HomePageRepository {

  async getBanner(lng: string): Promise<[]> {
    const req: any = null;
    return conectAPI(req, `${process.env.NEXT_PUBLIC_SERVER_URL_API_NODE}/banners_home/${lng}`, "GET");
  }


  async getCategories(categoryCode: string | undefined, lang: string, channel: number): Promise<[]> {
    const req: any = {
      categoryCode: [categoryCode],
      lang: lang,
      channel: channel,
    };

    return conectAPI(req, `${process.env.NEXT_PUBLIC_SERVER_URL_API}/Products/GetToursFromCategories`, "POST");
  }
}
