import React, { useEffect } from "react";
import { usePlayerState } from "./playerState";
import MiniPlayer from "./MiniPlayer";
import useSessionToken from "@/lib/hooks/useSessionToken";
import SpotifyPlayer from "../../../lib/player/SpotifyPlayer";

function Player() {
  const player = usePlayerState((state) => state.player);
  const setPlayer = usePlayerState((state) => state.setPlayer);
  const token = useSessionToken();

  useEffect(() => {
    if (token && !player) {
      setPlayer(new SpotifyPlayer(token));
    }
  }, [token]);

  return <MiniPlayer />;
}

export default Player;
