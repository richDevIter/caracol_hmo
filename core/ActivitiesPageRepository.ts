import Activities from "./ActivitiesPage";

export default interface ActivitiesRepository{
   getActivities(slug: string | undefined, lang: string, type: string | number, cat: string[], stars: string[], priceE: string | number, channel: number): Promise<Activities>
}