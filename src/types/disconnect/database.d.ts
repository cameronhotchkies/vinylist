import type {
  Artist, Community, Company, Format, Identifier, Image, Label, Series,
} from './discogs';

type UserData = {
  in_wantlist: boolean;
  in_collection: boolean;
}

/** Incomplete definition */
export interface Release {
  id: number;
  status: string;
  year: number;
  resource_url: string;
  uri: string;
  artists: Artist[];
  artists_sort: string;
  labels: Label[];
  series: Series[];
  companies: Company[],
  formats: Format[],
  data_quality: string;
  community: Community;
  master_id: number;
  master_url: string;
  title: string;
  country: string;
  identifiers: Identifier[];
  images: Image[];
  thumb: string;
}
export interface MasterRelease {
  id: number;
  main_release: number;
  most_recent_release: number;
  resource_url: string;
  uri: string;
  versions_url: string;
  main_release_url: string;
  most_recent_release_url: string;
  num_for_sale: number;
  lowest_price: number;
  images: Image[];
}
export interface SearchResult {
  user_data: UserData;
}

export type SearchResponse = {
  pagination: any;
  results: (Release & SearchResult)[];
}

export declare class Database {
  /**
   * Get master release data
   * @param {(number|string)} master - The Discogs master release ID
   * @param {function} [callback] - Callback function
   * @return {DiscogsClient|Promise}
   */
  getMaster(master: number, callback?: () => void): Promise<MasterRelease>;

  /**
   * Get release data
   * @param {(number|string)} release - The Discogs release ID
   * @param {function} [callback] - Callback
   * @return {DiscogsClient|Promise}
   */
  getRelease(release: number, callback?: () => void): Promise<Release>;

  /**
   * Search the database
   * @param {string} query - The search query
   * @param {object} [params] - Search parameters as defined on http://www.discogs.com/developers/#page:database,header:database-search
   * @param {function} [callback] - Callback function
   * @return {DiscogsClient|Promise}
   */
  search(query: string, params: any, callback?: () => void): Promise<SearchResponse>;
}
