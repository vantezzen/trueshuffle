export interface ShuffleProvider {
  getProviderName: () => string;

  shuffle: (
    tracks: SpotifyApi.PlaylistTrackObject[]
  ) => Promise<SpotifyApi.PlaylistTrackObject[]>;
}
