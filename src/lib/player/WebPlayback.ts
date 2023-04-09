import SpotifyWebApi from "spotify-web-api-node";
import { usePlayerState } from "../../components/app/player/playerState";
import debugging from "debug";
const debug = debugging("app:player:WebPlayback");

export default class WebPlayback {
  private player: Spotify.Player | null = null;

  constructor(private token: string) {
    debug("Constructor");

    this.loadSpotifyPlaybackSDK();
  }

  private loadSpotifyPlaybackSDK() {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "TrueShuffle for Spotify",
        getOAuthToken: (cb) => {
          cb(this.token);
        },
        volume: 0.5,
      });

      this.player = player;

      player.addListener("ready", ({ device_id }) => {
        debug("Ready with Device ID", device_id);
      });

      player.addListener("not_ready", ({ device_id }) => {
        debug("Device ID has gone offline", device_id);
      });

      player.connect();
    };
  }
}
