import Home from "./HomePage";

export default interface HomeRepository{
   getBanner(lng: string): Promise<Home[]>
   getCategories(categoryCode: string | undefined, lang: string, channel: number): Promise<Home[]>
}