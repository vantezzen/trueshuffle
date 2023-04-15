import MutedText from "@/components/MutedText";
import { Badge, Spacer, Text } from "@geist-ui/core";
import React from "react";

function Connection() {
  return (
    <main className="max-w-xl mx-auto">
      <Text h1 className="text-xl">
        Connecting your Spotify Account to TrueShuffle
      </Text>

      <MutedText>
        <Text b>TrueShuffle</Text> needs to connect to your Spotify account to
        get tracks in your playlist and play them using Spotify Connect. This is
        done by using the Spotify Web API.
      </MutedText>
      <MutedText>
        When first connecting your account, you will be redirected to Spotify to
        authorize TrueShuffle to access your account. During this process,
        TrueShuffle will request the following permissions:
      </MutedText>

      <ul>
        <li>
          <Text b>View your Spotify account data</Text>
          <br />
          <Text i>
            Your name and username, your profile picture, how many followers you
            have on Spotify and your public playlists
          </Text>
          <Spacer />
          <MutedText>
            This permission is added automatically by Spotify. As TrueShuffle
            accesses your playlist information, this will include information
            your Spotify account. This information is only used to display the{" "}
            <Badge>by username</Badge> badge on the playlist page.
          </MutedText>
        </li>
        <li>
          <Text b>View your activity on Spotify</Text>
          <br />
          <Text i>
            Content you have recently played, The content you are playing and
            Spotify Connect devices information, Playlists you’ve made and
            playlists you follow
          </Text>
          <Spacer />
          <MutedText>
            This permission is needed to provide the "Not Recently Played" mode,
            enable showing a list of Spotify Connect devices you can play on and
            to show your playlists.
          </MutedText>
        </li>
        <li>
          <Text b>Take actions in Spotify on your behalf</Text>
          <br />
          <Text i>Control Spotify on your devices</Text>
          <Spacer />
          <MutedText>
            This permission is needed to play music on your Spotify Connect
            devices.
          </MutedText>
        </li>
      </ul>

      <MutedText>
        <Text b>TrueShuffle</Text> does not store any of your Spotify data and
        will never modify your playlists! Access tokens to your Spotify account
        is only stored temporarily on our servers to allow establishing the
        connection between your browser and Spotify. After the connection is
        established, the token is only stored in your browser cookies.
      </MutedText>

      <Spacer />

      <MutedText>
        Access can be revoked at any time at{" "}
        <a
          href="https://www.spotify.com/de/account/apps/"
          target="_blank"
          rel="noreferer"
        >
          https://www.spotify.com/de/account/apps/
        </a>
        . You can also inspect TrueShuffle's source code on{" "}
        <a
          href="https://github.com/vantezzen/trueshuffle"
          target="_blank"
          rel="noreferer"
        >
          GitHub
        </a>{" "}
        to verify these claims.
      </MutedText>
    </main>
  );
}

export default Connection;
