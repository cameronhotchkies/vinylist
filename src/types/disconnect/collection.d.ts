export interface Folder {
  id: number;
  count: number;
  name: string;
  resource_url: string;
}

type FolderResponse = {
  folders: Folder[]
}

export declare class Collection {
  /**
   * Get a list of all collection folders for the given user
   * @param {string} user - The user name
   */
  getFolders(user: string): Promise<FolderResponse>

  /**
   * Add a release instance to the (optionally) given collection folder
   * @param {string} user - The user name
   * @param {(number|string)} [folder] - The folder ID (defaults to the "Uncategorized" folder)
   * @param {(number|string)} release - The release ID
   * @returns {DiscogsClient|Promise}
   */
  addRelease(user: string, folder: number, release: number): Promise<any>
}

export default { Collection };
