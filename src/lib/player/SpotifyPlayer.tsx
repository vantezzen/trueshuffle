import SpotifyWebApi from "spotify-web-api-node";
import { LoadingState, usePlayerState } from "./playerState";
import debugging from "debug";
import { ShuffleProvider } from "./shuffleProviders/ShuffleProvider";
import TrueRandomShuffleProvider from "./shuffleProviders/TrueRandomShuffleProvider";
import PlaylistLoader from "./PlaylistLoader";
import NotRecentlyPlayedShuffleProvider from "./shuffleProviders/NotRecentlyPlayedShuffleProvider";
import { ToastInput } from "@geist-ui/core";
const debug = debugging("app:player:SpotifyPlayer");

export default class SpotifyPlayer {
  private spotify: SpotifyWebApi;
  private shuffleProvider: ShuffleProvider = new TrueRandomShuffleProvider();
  private playlistLoader: PlaylistLoader;

  constructor(
    private token: string,
    public setToast: (toast: ToastInput) => void
  ) {
    debug("SpotifyPlayer constructor");

    this.loadShuffleProvider();
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

  async handlePlaylistSelect(playlist: SpotifyApi.PlaylistObjectSimplified) {
    debug("handlePlaylistSelect", playlist);

    usePlayerState.setState({
      playlist,
    });

    this.setLoadingState(LoadingState.loadingTracks);
    try {
      await this.playlistLoader.loadTracksInPlaylist(playlist);
    } catch (error: any) {
      this.handleError(error);
      return;
    }

    this.setLoadingState(LoadingState.loadingOtherData);
    try {
      await this.fillQueue();
    } catch (error: any) {
      this.handleError(error, "Error creating shuffled playlist");
      return;
    }

    this.setLoadingState(LoadingState.playing);
    try {
      await this.playQueueTracks();
    } catch (error: any) {
      this.handleError(error, "Error playing playlist");
      return;
    }

    this.setLoadingState(LoadingState.notLoading);
    usePlayerState.setState({
      hasCompletedFirstLoad: true,
    });
  }

  private handleError(
    error: any,
    toastText: string = "Error loading playlist"
  ) {
    this.setToast({
      text: (
        <p>
          {toastText}: {error.message}
        </p>
      ),
      type: "error",
    });
    this.setLoadingState(LoadingState.notLoading);
  }

  private setLoadingState(loadingState: LoadingState) {
    usePlayerState.setState({
      loadingState,
    });
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

  async setActiveDevice(deviceId: string) {
    const allDevices = await this.spotify.getMyDevices();
    const activeDevice = allDevices.body.devices.find(
      (device) => device.is_active
    );

    if (activeDevice?.id === deviceId) {
      debug("Device already active");
      return;
    }

    try {
      this.spotify.transferMyPlayback([deviceId]);
    } catch (error: any) {
      this.setToast({
        text: `Error setting active device: ${error.message}`,
        type: "error",
      });
    }

    debug("Active device set to", deviceId);
  }

  stopPlayback() {
    this.spotify.pause();
  }
}
