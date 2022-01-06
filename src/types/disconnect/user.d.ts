/* eslint-disable import/prefer-default-export */
import { Identity } from './auth';
import { Collection } from './collection';

export declare class User {
  /**
   * Expose the collection functions and pass the client instance
   * @returns {Collection}
   */
  collection: () => Collection;

  /**
   * Test authentication by getting the identity resource for the authenticated user
   * @param {function} callback - Callback function receiving the data
   * @return {DiscogsClient|Promise}
   */
  getIdentity: () => Promise<Identity>;
}
