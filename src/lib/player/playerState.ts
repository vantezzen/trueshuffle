import { create } from "zustand";
import { devtools } from "zustand/middleware";
import SpotifyPlayer from "./SpotifyPlayer";

export enum ShuffleType {
  trueRandom = "trueRandom",
  notRecentlyPlayed = "notRecentlyPlayed",
}

export enum LoadingState {
  loadingTracks = "loadingTracks",
  loadingOtherData = "loadingOtherData",
  playing = "playing",
  notLoading = "notLoading",
}

export interface PlayerState {
  playlist: SpotifyApi.PlaylistObjectSimplified | null;
  tracks: SpotifyApi.PlaylistTrackObject[];
  queue: SpotifyApi.PlaylistTrackObject[];
  player: SpotifyPlayer | null;
  shuffleType: ShuffleType;
  loadingState: LoadingState;
  hasCompletedFirstLoad: boolean;

  setTracks: (tracks: SpotifyApi.PlaylistTrackObject[]) => void;
  setPlayer: (player: SpotifyPlayer) => void;
  setShuffleType: (shuffleType: ShuffleType) => void;
}

export const usePlayerState = create<PlayerState>()(
  devtools(
    (set) => ({
      playlist: null,
      tracks: [],
      queue: [],
      player: null,
      shuffleType: ShuffleType.trueRandom,
      loadingState: LoadingState.notLoading,
      hasCompletedFirstLoad: false,

      setTracks: (tracks) => set({ tracks }),
      setPlayer: (player) => set({ player }),
      setShuffleType: (shuffleType) => set({ shuffleType }),
    }),
    {
      name: "Player State",
    }
  )
);
