import _ from 'lodash';
import { Request, Response } from 'express';

import { Client as Discogs, Release, SearchResult } from 'disconnect';
/**
 * @typedef SearchRequest
 * @property string q - The search query terms.
 */
type SearchRequest = {
  q: string,
}

type ReleaseResult = (SearchResult & Release);

export const dedupeSearchResults = (
  results: ReleaseResult[],
): ReleaseResult[] => {
  type ReduceMap = Map<string, ReleaseResult>;

  const init: ReduceMap = new Map();

  const mostCommon = (a: ReleaseResult, b: ReleaseResult) => (
    (a.community.have > b.community.have) ? a : b
  );

  const reduced = _.reduce(
    results,
    (acc: ReduceMap, n: ReleaseResult) => {
      const primaryId = `${n.master_id}`;
      const existing = acc.get(primaryId);

      const { in_collection: inCollection } = n.user_data;

      if (!existing || inCollection) {
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

type CompactAlbum = {
  title: string,
  coverUrl: string,
}

const searchTitles = (searchTerms: string): Promise<CompactAlbum[]> => {
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
        thumb,
        user_data: userData,
        id: albumId,
        master_id: rootId,
      } = searchResult;

      const unowned = !userData.in_collection;

      return {
        title,
        coverUrl: thumb,
        unowned,
        albumId,
        rootId,
      };
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

  asyncSearchResult.then((searchResult: CompactAlbum[]) => {
    res.render('search', {
      title: 'Search Results',
      searchTerm: searchContent,
      results: searchResult,
    });
  });
};

export default search;
