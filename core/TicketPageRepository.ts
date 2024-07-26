import Ticket from "./TicketPage";

export default interface TicketRepository{
   getTicket(slug: string | undefined, lang: string, channel: number): Promise<Ticket[]>
   getTicketIntegrate(dateB: string, code: string, modCode:string): Promise<Ticket[]>
   getCalendarTicket(dateB: string, dateE: string, code: string, tarCode: string, modCode:string, lang: string, channel: number): Promise<Ticket[]>
}