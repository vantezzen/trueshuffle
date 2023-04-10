import { Select, Text } from "@geist-ui/core";
import React from "react";
import { ShuffleType, usePlayerState } from "../../lib/player/playerState";
import MutedText from "../MutedText";

function ShuffleTypeSelector() {
  const shuffleType = usePlayerState((state) => state.shuffleType);
  const setShuffleType = usePlayerState((state) => state.setShuffleType);

  return (
    <div className="mt-6">
      <div className="flex gap-4 items-center">
        <Text className="font-bold text-zinc-600 w-full whitespace-nowrap">
          Shuffle-Type
        </Text>
        <Select
          placeholder="Shuffle Type"
          initialValue="trueRandom"
          onChange={(value) => setShuffleType(value as ShuffleType)}
          value={shuffleType}
          width="100%"
        >
          {Object.values(ShuffleType).map((type) => (
            <Select.Option key={type} value={type}>
              {type}
            </Select.Option>
          ))}
        </Select>
      </div>

      <MutedText>
        {shuffleType === "trueRandom" && (
          <>
            <Text b>True Random</Text> will shuffle the playlist truly randomly,
            so the order of the songs will be different every time you shuffle
            and the probability of a song being played is equal.
          </>
        )}
        {shuffleType === "notRecentlyPlayed" && (
          <>
            <Text b>Not Recently Played</Text> will shuffle the playlist
            randomly, but with a bias of playing songs last that were played
            recently on your account. This will use your last 150 played songs.
            <br />
            Recently played songs may still be played again, but the probability
            is lower.
          </>
        )}
      </MutedText>
    </div>
  );
}

export default ShuffleTypeSelector;
