Vinylist
========

A dynamic gift registry for building a record collection. The underlying
album lookup is powered by Discogs.


Usage
-----

The service can be started with `yarn serve` or `yarn watch`.


### Required Environment

The following environment variables are expected by Vinylist for normal
operation.

  * `DISCOGS_TOKEN`
    * This is a personal access token (PAT) provided by Discogs.com for the [Developers API][0]
  * `DISCOGS_FOLDER`
    * This is the collection where items added to the registry should be added. This separates from the normal collection.


[0]: https://www.discogs.com/settings/developers
