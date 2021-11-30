import type { TokenAuth } from './auth';
import { Database } from './database';

export declare class Client {
  constructor(auth?: TokenAuth);

  database: () => Database;

  /**
   * Return whether the client is authenticated for the optionally given access level
   * @param {number} [level] - Optional authentication level
   * @return {boolean}
   */
  authenticated: (level: number) => boolean;
}

export default Client;
