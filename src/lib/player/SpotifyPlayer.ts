import SpotifyWebApi from "spotify-web-api-node";
import { usePlayerState } from "../../components/app/player/playerState";
import debugging from "debug";
import { ShuffleProvider } from "./shuffleProviders/ShuffleProvider";
import TrueRandomShuffleProvider from "./shuffleProviders/TrueRandomShuffleProvider";
import PlaylistLoader from "./PlaylistLoader";
import NotRecentlyPlayedShuffleProvider from "./shuffleProviders/NotRecentlyPlayedShuffleProvider";
const debug = debugging("app:player:SpotifyPlayer");

export default class SpotifyPlayer {
  private spotify: SpotifyWebApi;
  private shuffleProvider: ShuffleProvider = new TrueRandomShuffleProvider();
  private playlistLoader: PlaylistLoader;

  constructor(private token: string) {
    debug("SpotifyPlayer constructor");

    this.loadShuffleProvider();
    this.addStateChangeListeners();
    this.spotify = this.getAuthenticatedSpotifyClient();
    this.playlistLoader = new PlaylistLoader(this.spotify);
  }

  private loadShuffleProvider() {
    const { shuffleType } = usePlayerState.getState();

    if (shuffleType === this.shuffleProvider.getProviderName()) {
      return;
    }

    switch (shuffleType) {
      case "trueRandom":
        this.shuffleProvider = new TrueRandomShuffleProvider();
        break;
      case "notRecentlyPlayed":
        this.shuffleProvider = new NotRecentlyPlayedShuffleProvider(
          this.spotify
        );
        break;
    }
  }

  private addStateChangeListeners() {
    usePlayerState.subscribe((state, prevState) => {
      if (
        state.needsToRefetch &&
        state.playlist &&
        !state.isFetching &&
        state.playlist.id !== prevState.playlist?.id
      ) {
        debug("Playlist changed", state.playlist);
        this.handlePlaylistSelect(state.playlist);
      }
    });
  }

  private async handlePlaylistSelect(
    playlist: SpotifyApi.PlaylistObjectSimplified
  ) {
    usePlayerState.setState({ isFetching: true });
    await this.playlistLoader.loadTracksInPlaylist(playlist);
    await this.fillQueue();
    this.playQueueTracks();
    usePlayerState.setState({ isFetching: false });
  }

  private async fillQueue() {
    const { tracks } = usePlayerState.getState();
    this.loadShuffleProvider();
    const shuffledTracks = await this.shuffleProvider.shuffle(tracks);
    usePlayerState.setState({ queue: shuffledTracks });
    debug("Queue filled", shuffledTracks);
  }

  private async playQueueTracks() {
    const { queue } = usePlayerState.getState();
    await this.spotify.play({
      uris: queue.map((track) => track.track?.uri).filter(Boolean),
    });
  }

  private getAuthenticatedSpotifyClient() {
    const spotify = new SpotifyWebApi();
    spotify.setAccessToken(this.token);
    return spotify;
  }

  setActiveDevice(deviceId: string) {
    this.spotify.transferMyPlayback([deviceId]);
  }

  stopPlayback() {
    this.spotify.pause();
  }
}
