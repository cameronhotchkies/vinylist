import { SearchResult } from '../src/types/disconnect';
import { dedupeSearchResults } from '../src/controllers/search';

describe('Search controller', () => {
  it('should handle an empty set of results', () => {
    const deduped = dedupeSearchResults([]);

    expect(deduped).toEqual([]);
  });

  it('should eliminate a duplicate entry', () => {
    const sr1: SearchResult = {
      country: 'C12',
      year: '2013',
      format: ['LP14'],
      label: ['LBL15'],
      id: 16,
      title: 'Album 17',
      community: {
        have: 19,
        want: 20,
      },
      master_id: 19,
    };

    const sr1Dupe = {
      ...sr1,
      id: 23,
    };

    const altAlbum = {
      ...sr1,
      id: 28,
      master_id: 29,
    };

    const deduped = dedupeSearchResults([
      sr1,
      sr1Dupe,
      altAlbum,
    ]);

    // expect(deduped).toEqual([]);
    // Actual failcase
    expect(deduped.length).toEqual(2);
  });
});
