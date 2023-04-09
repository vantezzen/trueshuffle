import { ShuffleProvider } from "./ShuffleProvider";

export default class TrueRandomShuffleProvider implements ShuffleProvider {
  getProviderName() {
    return "trueRandom";
  }

  async shuffle(
    tracks: SpotifyApi.PlaylistTrackObject[]
  ): Promise<SpotifyApi.PlaylistTrackObject[]> {
    return tracks.sort(() => Math.random() - 0.5);
  }
}
