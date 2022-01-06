import type { Identity, TokenAuth } from './auth';
import { Database } from './database';
import { User } from './user';

export declare class Client {
  constructor(auth?: TokenAuth);

  database: () => Database;

  /**
   * Return whether the client is authenticated for the optionally given access level
   * @param {number} [level] - Optional authentication level
   * @return {boolean}
   */
  authenticated: (level: number) => boolean;

  /**
  * Test authentication by getting the identity resource for the authenticated user
  * @param {function} callback - Callback function receiving the data
  * @return {DiscogsClient|Promise}
  */
  getIdentity: () => Promise<Identity>;

  /**
   * Expose the user functions and pass the current instance
   * @return {User}
   */
  user: () => User;
}

export default Client;
