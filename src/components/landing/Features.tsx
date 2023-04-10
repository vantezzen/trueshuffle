import { Card, Text } from "@geist-ui/core";
import React from "react";
import MutedText from "../MutedText";
import GetStartedButton from "./GetStartedButton";

function Features() {
  return (
    <div className="flex items-center flex-col">
      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <Card>
          <Text h3 className="mb-6">
            Truly Random Shuffle
          </Text>
          <MutedText>
            Say goodbye to the same songs Spotify played 3x already. TrueShuffle
            uses a truly random shuffle algorithm to ensure that every song on
            your playlist has an equal chance of being played.
          </MutedText>
        </Card>
        <Card>
          <Text h3 className="mb-6">
            Seamless Integration
          </Text>
          <MutedText>
            With TrueShuffle, you can continue using the Spotify app and all its
            built-in features while enjoying a truly random shuffle. TrueShuffle
            uses Spotify Connect to connect to any device, so you don't have to
            switch between apps.
          </MutedText>
        </Card>
        <Card>
          <Text h3 className="mb-6">
            Ready in seconds
          </Text>
          <MutedText>
            TrueShuffle is easy to use and takes only a few seconds to set up.
            Simply log in with your Spotify account, choose a playlist, and let
            TrueShuffle do the rest.
          </MutedText>
        </Card>
        <Card>
          <Text h3 className="mb-6">
            "Not Recently Played" Mode
          </Text>
          <MutedText>
            With TrueShuffle's "Not Recently Played" mode, TrueShuffle will play
            songs that have been recently played less frequently, ensuring you
            don't hear the same songs over and over again.
          </MutedText>
        </Card>
        <Card>
          <Text h3 className="mb-6">
            Privacy-Friendly
          </Text>
          <MutedText>
            TrueShuffle doesn't collect your spotify data - and all
            communication is done directly with Spotify's servers, ensuring your
            data is safe and secure.
          </MutedText>
        </Card>
        <Card>
          <Text h3 className="mb-6">
            Fully open-source
          </Text>
          <MutedText>
            TrueShuffle is open-source{" "}
            <a
              href="https://github.com/vantezzen/trueshuffle"
              target="_blank"
              rel="noreferrer"
            >
              on GitHub
            </a>
            , which means you can inspect the code and even contribute to its
            development. Join our community of developers and music lovers and
            help us make TrueShuffle even better.
          </MutedText>
        </Card>
      </div>
      <GetStartedButton />
    </div>
  );
}

export default Features;
