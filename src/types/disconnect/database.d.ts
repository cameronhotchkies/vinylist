export type Community = {
  want: number;
  have: number;
}

type UserData = {
  in_wantlist: boolean;
  in_collection: boolean;
}
export interface SearchResult {
  country: string;
  year: string;
  format: string[];
  label: string[];
  id: number;
  title: string;
  community: Community;
  master_id: number;
  thumb: string;
  user_data: UserData;
}

export type SearchResponse = {
  pagination: any;
  results: SearchResult[];
}

export declare class Database {
  /**
   * Search the database
   * @param {string} query - The search query
   * @param {object} [params] - Search parameters as defined on http://www.discogs.com/developers/#page:database,header:database-search
   * @param {function} [callback] - Callback function
   * @return {DiscogsClient|Promise}
   */
  search(query: string, params: any, callback?: () => void): Promise<SearchResponse>;
}
