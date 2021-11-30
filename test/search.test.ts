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
      thumb: '24',
      user_data: {
        in_collection: false,
        in_wantlist: false,
      },
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

    expect(deduped.length).toEqual(2);
  });

  it('should replace with the variant actually owned', () => {
    const baseAlbumId = 52;

    const sr1: SearchResult = {
      country: 'C55',
      year: '2013',
      format: ['LP57'],
      label: ['LBL58'],
      id: 59,
      title: 'Album 60',
      community: {
        have: 61000,
        want: 20,
      },
      master_id: baseAlbumId,
      thumb: '66',
      user_data: {
        in_collection: false,
        in_wantlist: false,
      },
    };

    const actuallyOwned = {
      ...sr1,
      id: 75,
      community: {
        have: 77,
        want: 78,
      },
      user_data: {
        in_collection: true,
        in_wantlist: false,
      },
    };

    const altAlbum = {
      ...sr1,
      id: 88,
      master_id: 89,
    };

    const deduped = dedupeSearchResults([
      sr1,
      actuallyOwned,
      altAlbum,
    ]);

    const match: SearchResult = deduped.find(
      (album: SearchResult) => album.master_id === baseAlbumId,
    );

    expect(match.id).toEqual(actuallyOwned.id);
  });
});
