import { usePlayerState } from "@/lib/player/playerState";
import debugging from "debug";
import SpotifyWebApi from "spotify-web-api-node";
const debug = debugging("app:player:PlaylistLoader");

export default class PlaylistLoader {
  constructor(private spotify: SpotifyWebApi) {}

  async loadTracksInPlaylist(playlist: SpotifyApi.PlaylistObjectSimplified) {
    const totalTracks = playlist.tracks.total;
    const tracksPerPage = 50;
    const pages = Math.ceil(totalTracks / tracksPerPage);

    debug("Loading tracks in playlist", playlist.name, {
      totalTracks,
      tracksPerPage,
      pages,
    });

    usePlayerState.setState({ tracks: [] });

    for (let i = 0; i < pages; i++) {
      await this.loadPlaylistPage(i, tracksPerPage, playlist);
    }

    debug("Done loading tracks in playlist", playlist.name);
  }

  private async loadPlaylistPage(
    i: number,
    tracksPerPage: number,
    playlist: SpotifyApi.PlaylistObjectSimplified
  ) {
    const offset = i * tracksPerPage;
    const tracks = await this.spotify.getPlaylistTracks(playlist.id, {
      offset,
      limit: tracksPerPage,
    });

    const cleanedTracks = this.filterUnplayableTracks(tracks.body.items);

    usePlayerState.setState((state) => ({
      tracks: [...state.tracks, ...cleanedTracks],
    }));

    debug("Got tracks", tracks);
  }

  private filterUnplayableTracks(
    tracks: SpotifyApi.PlaylistTrackObject[]
  ): SpotifyApi.PlaylistTrackObject[] {
    return tracks.filter((track) => {
      return !track.track?.is_local;
    });
  }
}
