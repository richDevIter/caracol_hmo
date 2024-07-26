import TabSearch from "./TabSearch";

export default interface TabSearchRepository{
   getTabSearch(slug: string | undefined, lang: string, channel: number): Promise<TabSearch>
}