import Combo from "./ComboPage";

export default interface ComboRepository{
   getTour(slug: string | undefined, lang: string): Promise<Combo[]>
}