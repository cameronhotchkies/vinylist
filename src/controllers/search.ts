import _ from 'lodash';
import { Request, Response } from 'express';

import { Client as Discogs, SearchResult } from 'disconnect';

/**
 * @typedef SearchRequest
 * @property string q - The search query terms.
 */
type SearchRequest = {
  q: string,
}

export const dedupeSearchResults = (
  results: SearchResult[],
): SearchResult[] => {
  type ReduceMap = Map<string, SearchResult>;

  const init: ReduceMap = new Map();

  const mostCommon = (a: SearchResult, b: SearchResult) => (
    (a.community.have > b.community.have) ? a : b
  );

  const reduced = _.reduce(
    results,
    (acc: ReduceMap, n: SearchResult) => {
      const primaryId = `${n.master_id}`;
      const existing = acc.get(primaryId);

      if (!existing) {
        acc.set(primaryId, n);
      } else {
        acc.set(
          primaryId,
          mostCommon(existing, n),
        );
      }

      return acc;
    },
    init,
  );

  return Array.from(reduced.values());
};

const searchTitles = (searchTerms: string): Promise<string[]> => {
  const discogsAuth = {
    userToken: process.env.DISCOGS_TOKEN,
  };

  const client = new Discogs(discogsAuth);
  const db = client.database();

  const result = db.search(
    searchTerms,
    {
      format: 'Vinyl',
    },
  );

  return result.then((response) => {
    const { results } = response;

    const deduped = dedupeSearchResults(results);

    return deduped.map((searchResult) => {
      const {
        title,
        community,
        master_id: masterId,
        id,
      } = searchResult;

      const processed = `${title} [have: ${community.have}] <Id: ${id} : primaryId: ${masterId}>`;

      return processed;
    });
  });
};

/**
 * Search results page
 * @route POST /search
 * @param req
 * @param res
 */
export const search = (req: Request<{}, {}, SearchRequest>, res: Response) => {
  const searchContent = req.body.q;

  const asyncSearchResult = searchTitles(searchContent);

  asyncSearchResult.then((searchResult: string[]) => {
    res.render('search', {
      title: 'Search Results',
      searchTerm: searchContent,
      results: searchResult,
    });
  });
};

export default search;
