import useSessionToken from "@/lib/hooks/useSessionToken";
import useSpotifyData from "@/lib/hooks/useSpotifyData";
import { Card, Input, Loading, Text } from "@geist-ui/core";
import React from "react";
import { usePlayerState } from "./player/playerState";
import Player from "./player";
import PlaylistSelector from "./PlaylistSelector";
import ShuffleTypeSelector from "./ShuffleTypeSelector";
import MutedText from "../MutedText";

function MainApp() {
  return (
    <div className="max-w-lg mx-auto">
      <Text h1 font="2rem" className="text-center">
        TrueShuffle
      </Text>
      <div className="text-center">
        <MutedText className="text-center">
          Finally a Spotify shuffle that works
        </MutedText>
      </div>
      <ShuffleTypeSelector />
      <PlaylistSelector />
      <Player />
    </div>
  );
}

export default MainApp;
