import MutedText from "@/components/MutedText";
import { usePlayerState } from "@/lib/player/playerState";
import { Modal } from "@geist-ui/core";
import React from "react";

function FirstLoadInfoModal() {
  const hasCompletedFirstLoad = usePlayerState(
    (state) => state.hasCompletedFirstLoad
  );
  const [isModalOpen, setIsModalOpen] = React.useState(true);

  return (
    <Modal
      visible={isModalOpen && hasCompletedFirstLoad}
      onClose={() => setIsModalOpen(false)}
    >
      <Modal.Title>Playlist is now playing</Modal.Title>
      <Modal.Content>
        <MutedText>
          Your playlist should now be playing on your selected Spotify Connect
          device.
          <br />
          The shuffled songs have been added to your queue and will be played
          automatically so you can close this window if you want to.
        </MutedText>
      </Modal.Content>
      <Modal.Action passive onClick={() => setIsModalOpen(false)}>
        Close
      </Modal.Action>
    </Modal>
  );
}

export default FirstLoadInfoModal;
