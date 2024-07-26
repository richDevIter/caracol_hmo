import config from "../infra/config.json";

import GoogleMapsRepository from "./GoogleMapsRepository";

async function conectAPI(req: object | null, url: string, method: string) {
  let config = {};

  config = {
    method,
  };

  try {
    const resp: any = await fetch(`${url}`, config);
    if (resp) {
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

export default class GoogleMapsCollection implements GoogleMapsRepository {
  async getMaps(term: any): Promise<[]> {
    const req: any = {
      address: term,
      key: config.GOOGLE_KEYS.GOOGLE_MAPS,
    };

    return conectAPI(
      null,
      `https://maps.googleapis.com/maps/api/geocode/json?address=${req.address}&key=${req.key}`,
      "GET"
    );
  }
}
