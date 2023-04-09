import { Card, Progress } from "@geist-ui/core";
import React from "react";
import { usePlayerState } from "./playerState";
import MutedText from "@/components/MutedText";
import DeviceSelector from "./DeviceSelector";

function MiniPlayer() {
  const playlist = usePlayerState((state) => state.playlist);
  const needsToRefetch = usePlayerState((state) => state.needsToRefetch);
  const isFetching = usePlayerState((state) => state.isFetching);
  const tracks = usePlayerState((state) => state.tracks);

  let status: React.ReactNode = (
    <MutedText>Select a playlist to start</MutedText>
  );
  if (needsToRefetch) {
    status = (
      <div className="flex flex-col justify-center gap-3">
        <Progress value={tracks.length} max={playlist?.tracks.total} />
        <MutedText className="text-center">
          Loading tracks from <b>{playlist?.name}</b>
        </MutedText>
      </div>
    );
  } else if (isFetching) {
    status = (
      <div className="flex flex-col justify-center gap-3">
        <Progress value={tracks.length} max={playlist?.tracks.total} />
        <MutedText className="text-center">
          Loading other data for shuffling
        </MutedText>
      </div>
    );
  } else if (playlist) {
    status = (
      <div className="flex gap-2 items-center">
        <MutedText>Now playing:</MutedText> <b>{playlist.name}</b>
      </div>
    );
  }

  return (
    <div className="fixed w-full z-20 bottom-0 left-0">
      <div className="max-w-lg px-6 sm:px-0 mx-auto mb-6 animate-slide-in-up">
        <Card shadow>
          <div className="flex justify-between">
            <div className="flex items-center">{status}</div>
            <DeviceSelector />{" "}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default MiniPlayer;
