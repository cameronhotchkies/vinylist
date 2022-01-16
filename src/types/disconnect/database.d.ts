/* eslint-disable no-unused-vars */
import type {
  Artist, Community, CommunityMember, Company, Format, Identifier, Image, Label, Series,
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
export interface ReleaseVersion {
  id: number;
  label: string;
  country: string;
  title: string,
  major_formats: string[],
  format: string;
  catno: string;
  released: string;
  status: string;
  resource_url: string;
  thumb: string;
  stats: { community: Community, user: CommunityMember };
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
  versions: ReleaseVersion[];
}
export interface SearchResult {
  user_data: UserData;
}

export type SearchResponse = {
  pagination: any;
  results: (Release & SearchResult)[];
}

export type MasterVersionsResponse = {
  versions: ReleaseVersion[]
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
   * Get the release versions contained in the given master release
   * @param {(number|string)} master - The Discogs master release ID
   * @param {object} [params] - optional pagination params
   * @param {function} [callback] - Callback function
   * @return {Promise<MasterVersionsResponse>}
   */
  getMasterVersions(
    master: number, params?: any, callback?: () => void
  ): Promise<MasterVersionsResponse>;

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
