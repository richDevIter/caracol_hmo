import GoogleMaps from "./GoogleMaps";

export default interface GoogleMapsRepository{
   getMaps(term: any): Promise<GoogleMaps[]>
}