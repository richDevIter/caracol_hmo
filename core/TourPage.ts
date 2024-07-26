import { parseCookies } from "nookies";
import TourPageRepository from "./TourPageRepository";

const cookies = parseCookies();

async function conectAPI(req: object | null, url: string, method: string) {
  
  let config = {}

  if( req === null){
    config = {
      method,
      headers: {
        "Content-Type": "application/json",
      }
    }
  }else{
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

export default class TourPageCollection implements TourPageRepository {
  async getTour(slug: string | undefined, lang: string, channel: number): Promise<[]> {
    const req: any = {
      Slug: slug,
      lang: lang,
      productCode: "",
      idCanal: channel
    }

    return conectAPI(req, `${process.env.NEXT_PUBLIC_SERVER_URL_API}/Products/FetchSingleTourAsync`, "POST");
  }

  async getCalendarTour(dateB: string, dateE: string, code: string, tarCode: string, modCode: string, lang: string, channel: number): Promise<[]> {
    const req: any = {
      dateStart: dateB,
      dateEnd: dateE,
      productCode: code,
      tarCode: tarCode,
      ProdModCode: modCode,
      lang: lang,
      idCanal: channel
    }

    return conectAPI(req, `${process.env.NEXT_PUBLIC_SERVER_URL_API}/Products/GetCalendarTourAsync`, "POST");
  }
}
