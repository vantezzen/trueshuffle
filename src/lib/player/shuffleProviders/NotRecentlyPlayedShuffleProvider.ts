import SpotifyWebApi from "spotify-web-api-node";
import { ShuffleProvider } from "./ShuffleProvider";
import debugging from "debug";
const debug = debugging("app:player:NotRecentlyPlayedShuffleProvider");

export const RECENTLY_PLAYED_TRACKS_PAGES = 5;

export type TrackWithAmountPlayed = SpotifyApi.PlaylistTrackObject & {
  amountPlayed: number;
};

export default class NotRecentlyPlayedShuffleProvider
  implements ShuffleProvider
{
  private recentlyPlayedTracks: SpotifyApi.TrackObjectFull[] = [];

  constructor(private spotify: SpotifyWebApi) {}

  getProviderName() {
    return "notRecentlyPlayed";
  }

  async shuffle(
    tracks: SpotifyApi.PlaylistTrackObject[]
  ): Promise<SpotifyApi.PlaylistTrackObject[]> {
    if (!this.recentlyPlayedTracks.length) {
      await this.loadRecentlyPlayedTracks();
    }

    for (const track of tracks) {
      const amountPlayed = this.recentlyPlayedTracks.filter(
        (recentlyPlayedTrack) => {
          return recentlyPlayedTrack.id === track.track?.id;
        }
      );

      (track as TrackWithAmountPlayed).amountPlayed = amountPlayed.length;
    }

    return this.shuffleWithBias(tracks as TrackWithAmountPlayed[]);
  }

  /**
   * Shuffles the array using the Fisher-Yates shuffle algorithm.
   * The shuffle algorithm randomly swaps the current item with a randomly selected item in the array before it.
   * Because the array is sorted in descending order based on the amountPlayed property, this means that items with
   * a larger amountPlayed are less likely to be swapped with items before them in the array, and more likely
   * to stay at the end of the list.
   */
  private shuffleWithBias(
    arr: TrackWithAmountPlayed[]
  ): SpotifyApi.PlaylistTrackObject[] {
    // Sort the array in descending order based on amountPlayed
    arr.sort((a, b) => b.amountPlayed - a.amountPlayed);

    // Shuffle the array
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
  }

  private async loadRecentlyPlayedTracks() {
    let nextPage: number | undefined = undefined;
    for (let page = 0; page < RECENTLY_PLAYED_TRACKS_PAGES; page++) {
      const recentlyPlayedTracks = await this.spotify.getMyRecentlyPlayedTracks(
        {
          limit: 50,
          after: nextPage,
        }
      );

      this.recentlyPlayedTracks = [
        ...this.recentlyPlayedTracks,
        ...recentlyPlayedTracks.body.items.map((item) => item.track),
      ];

      if (recentlyPlayedTracks.body.next) {
        nextPage = recentlyPlayedTracks.body.cursors
          .before as unknown as number;
      } else {
        break;
      }
    }

    debug("Got recently played tracks", this.recentlyPlayedTracks);
  }
}
