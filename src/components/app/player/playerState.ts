import { create } from "zustand";
import { devtools } from "zustand/middleware";
import SpotifyPlayer from "../../../lib/player/SpotifyPlayer";

export enum ShuffleType {
  trueRandom = "trueRandom",
  notRecentlyPlayed = "notRecentlyPlayed",
}

export interface PlayerState {
  needsToRefetch: boolean;
  isFetching: boolean;
  playlist: SpotifyApi.PlaylistObjectSimplified | null;
  tracks: SpotifyApi.PlaylistTrackObject[];
  queue: SpotifyApi.PlaylistTrackObject[];
  player: SpotifyPlayer | null;
  shuffleType: ShuffleType;

  setPlaylist: (playlist: SpotifyApi.PlaylistObjectSimplified) => void;
  setTracks: (tracks: SpotifyApi.PlaylistTrackObject[]) => void;
  setNeedsToRefetch: (needsToRefetch: boolean) => void;
  setPlayer: (player: SpotifyPlayer) => void;
  setShuffleType: (shuffleType: ShuffleType) => void;
}

export const usePlayerState = create<PlayerState>()(
  devtools(
    (set) => ({
      needsToRefetch: false,
      isFetching: false,
      playlist: null,
      tracks: [],
      queue: [],
      player: null,
      shuffleType: ShuffleType.trueRandom,

      setPlaylist: (playlist) => set({ playlist, needsToRefetch: true }),
      setTracks: (tracks) => set({ tracks }),
      setNeedsToRefetch: (needsToRefetch) => set({ needsToRefetch }),
      setPlayer: (player) => set({ player }),
      setShuffleType: (shuffleType) => set({ shuffleType }),
    }),
    {
      name: "Player State",
    }
  )
);
