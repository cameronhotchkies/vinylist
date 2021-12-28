import { Request, Response } from 'express';

import { Client as Discogs, MasterRelease } from 'disconnect';
import { Release } from 'disconnect/database';
import { toNumber } from 'lodash';

const getRelease = (albumId: number, rootId: number): Promise<Release> => {
  const discogsAuth = {
    userToken: process.env.DISCOGS_TOKEN,
  };

  const client = new Discogs(discogsAuth);
  const db = client.database();

  const resolvedReleaseIdResult: Promise<number> = (rootId === 0)
    ? Promise.resolve(albumId)
    : db.getMaster(rootId)
      .then((response: MasterRelease) => response.main_release);

  const releaseResult = resolvedReleaseIdResult
    .then((releaseId) => db.getRelease(releaseId));

  return releaseResult;
};

export const giftAlbum = (req:Request, res: Response) => {
  const { albumId: formAlbum, rootId: formRoot } = req.body;

  const albumId = toNumber(formAlbum);
  const rootId = toNumber(formRoot);

  getRelease(albumId, rootId)
    .then((release: Release) => {
      const { title, artists } = release;

      const selectedArtist = artists.map(
        (artist) => `${artist.name} ${artist.join}`,
      ).join(' ');

      res.render('giftAlbum', {
        selectedTitle: title,
        albumId: `${albumId} ++ ${release.id}`,
        albumImage: release.images[0].resource_url,
        selectedArtist,
      });
    });
};

export default giftAlbum;
