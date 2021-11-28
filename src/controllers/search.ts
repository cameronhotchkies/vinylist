import { Request, Response } from 'express';

import { Client as Discogs } from 'disconnect';

/**
 * @typedef SearchRequest
 * @property string q - The search query terms.
 */
type SearchRequest = {
  q: string,
}

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

    return results.map((searchResult) => {
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
