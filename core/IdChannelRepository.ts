import IdChannel from "./IdChannel";

export default interface IdChannelRepository{
   getFiltered(name: string): Promise<IdChannel[]>
}