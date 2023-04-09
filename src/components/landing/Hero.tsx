import { Text } from "@geist-ui/core";
import React from "react";
import MutedText from "../MutedText";
import Balancer from "react-wrap-balancer";
import GetStartedButton from "./GetStartedButton";

function Hero() {
  return (
    <div className="text-center my-24 max-w-3xl mx-auto">
      <Text h1 className="mb-6 font-black text-7xl">
        <Balancer>Finally a Spotify shuffle that works!</Balancer>
      </Text>
      <MutedText>
        Tired of Spotify's predictable shuffle playing the same songs on repeat?
        TrueShuffle for Spotify brings true randomness to your playlists. Simply
        connect your Spotify account and start enjoying your favorite tunes
        randomly.
      </MutedText>

      <GetStartedButton />
    </div>
  );
}

export default Hero;
