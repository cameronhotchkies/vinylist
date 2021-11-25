import { Request, Response } from 'express';

/**
 * @typedef SearchRequest
 * @property string q - The search query terms.
 */
type SearchRequest = {
  q: string,
}

/**
 * Search results page
 * @route POST /search
 * @param req
 * @param res
 */
export const search = (req: Request<{}, {}, SearchRequest>, res: Response) => {
  const searchContent = req.body.q;

  res.render('search', {
    title: 'Search Results',
    searchTerm: searchContent,
  });
};

export default search;
