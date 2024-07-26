import Tour from "./TourPage";

export default interface TourRepository{
   getTour(slug: string | undefined, lang: string, channel: number): Promise<Tour[]>
   getCalendarTour(dateB: string, dateE: string, code: string, tarCode: string, modCode:string, lang: string, channel: number): Promise<Tour[]>
}