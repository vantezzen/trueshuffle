import MutedText from "@/components/MutedText";
import { usePlayerState } from "@/lib/player/playerState";
import { Modal } from "@geist-ui/core";
import { List } from "@geist-ui/icons";
import React from "react";
import { TrackWithAmountPlayed } from "@/lib/player/shuffleProviders/NotRecentlyPlayedShuffleProvider";

function QueueModal() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const queue = usePlayerState((state) => state.queue);

  return (
    <>
      <button
        className="flex items-center rounded-full bg-white hover:bg-zinc-50 duration-200 transition-all p-2"
        onClick={() => setIsModalOpen(true)}
      >
        <List size={20} strokeWidth={2} />
      </button>

      <Modal visible={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Title>Queue</Modal.Title>
        <Modal.Content>
          {queue?.length === 0 && (
            <MutedText className="text-center">
              Queue is empty. Select a playlist to shuffle tracks
            </MutedText>
          )}
          <ul className="mt-6">
            {queue?.map((track) => (
              <li
                key={track.track?.id}
                className="flex justify-center mb-3 flex-col"
              >
                <b>{track.track?.name}</b>
                <MutedText>
                  {track.track?.artists.map((artist) => artist.name).join(", ")}
                </MutedText>
                {(track as TrackWithAmountPlayed).amountPlayed && (
                  <MutedText className="text-zinc-300">
                    Played{" "}
                    <b>{(track as TrackWithAmountPlayed).amountPlayed}x</b>{" "}
                    recently
                  </MutedText>
                )}
              </li>
            ))}
          </ul>
        </Modal.Content>
      </Modal>
    </>
  );
}

export default QueueModal;
