import { Card, Loading, Progress } from "@geist-ui/core";
import React from "react";
import { LoadingState, usePlayerState } from "@/lib/player/playerState";
import MutedText from "@/components/MutedText";
import DeviceSelector from "./DeviceSelector";
import QueueModal from "./QueueModal";

function MiniPlayer() {
  const playlist = usePlayerState((state) => state.playlist);
  const loadingState = usePlayerState((state) => state.loadingState);
  const tracks = usePlayerState((state) => state.tracks);

  let status: React.ReactNode = (
    <MutedText>Select a playlist to start</MutedText>
  );
  if (loadingState === LoadingState.loadingTracks) {
    status = (
      <div className="flex flex-col justify-center gap-3">
        <Progress value={tracks.length} max={playlist?.tracks.total} />
        <MutedText className="text-center">
          Loading tracks from <b>{playlist?.name}</b>
        </MutedText>
      </div>
    );
  } else if (loadingState === LoadingState.loadingOtherData) {
    status = (
      <div className="flex flex-col justify-center gap-3">
        <Progress value={tracks.length} max={playlist?.tracks.total} />
        <MutedText className="text-center">
          Loading other data for shuffling
        </MutedText>
      </div>
    );
  } else if (loadingState === LoadingState.playing) {
    status = (
      <div className="flex flex-col justify-center gap-3">
        <Loading />
        <MutedText className="text-center">Sending queue to Spotify</MutedText>
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
          <div className="flex">
            <div className="flex items-center flex-1">{status}</div>
            <QueueModal />
            <DeviceSelector />
          </div>
        </Card>
      </div>
    </div>
  );
}

export default MiniPlayer;
