import { Request, Response } from 'express';

import {
  Client as Discogs,
  Folder,
  MasterRelease,
  Release,
  User,
} from 'disconnect';

import { toNumber } from 'lodash';

const discogsClient = (): Discogs => {
  const discogsAuth = {
    userToken: process.env.DISCOGS_TOKEN,
  };

  const client = new Discogs(discogsAuth);
  return client;
};

const getRelease = (albumId: number, rootId: number): Promise<Release> => {
  const client = discogsClient();
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
        albumId,
        releaseId: release.id,
        albumImage: release.images[0].resource_url,
        selectedArtist,
      });
    });
};

const discogsFolder = (): string => process.env.DISCOGS_FOLDER;

export const confirmGiftAlbum = (req: Request, res: Response) => {
  const { releaseId } = req.body;

  const client = discogsClient();
  const user: User = client.user();
  const db = client.database();

  const identityResult = client.getIdentity();

  const collection = user.collection();

  const usernameAs: Promise<string> = identityResult.then(
    (ident) => ident.username,
  );

  usernameAs
    .then((username) => collection.getFolders(username))
    .then((folderResponse) => {
      const { folders } = folderResponse;

      const folderName = discogsFolder();

      const registryFolder = folders.find(
        (folder: Folder) => folder.name === folderName,
      );

      if (!registryFolder) {
        console.log('[!] Registry folder is undefined. Ensure DISCOGS_FOLDER is set.');
      }

      // Find a way to keep this extracted
      usernameAs.then((username) => {
        const folderId = registryFolder.id;

        collection.addRelease(
          username,
          folderId,
          releaseId,
        )
          .then(() => db.getRelease(releaseId))
          .then((release: Release) => {
            const { title, artists } = release;

            const confirmedArtist = artists.map(
              (artist) => `${artist.name} ${artist.join}`,
            ).join(' ');
            res.render('confirmed', { confirmedTitle: title, confirmedArtist });
          });
      });
    });
};

export default {
  giftAlbum,
  confirmGiftAlbum,
};
