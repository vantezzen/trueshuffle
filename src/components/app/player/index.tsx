import React, { useEffect } from "react";
import { usePlayerState } from "../../../lib/player/playerState";
import MiniPlayer from "./MiniPlayer";
import useSessionToken from "@/lib/hooks/useSessionToken";
import SpotifyPlayer from "../../../lib/player/SpotifyPlayer";
import { useToasts } from "@geist-ui/core";

function Player() {
  const player = usePlayerState((state) => state.player);
  const setPlayer = usePlayerState((state) => state.setPlayer);
  const { setToast } = useToasts();
  const token = useSessionToken();

  useEffect(() => {
    if (token && !player) {
      setPlayer(new SpotifyPlayer(token, setToast));
    }
  }, [token]);

  return <MiniPlayer />;
}

export default Player;
