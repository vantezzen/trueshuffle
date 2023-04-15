import MutedText from "@/components/MutedText";
import useSpotifyData from "@/lib/hooks/useSpotifyData";
import { Badge, Loading, Modal } from "@geist-ui/core";
import { AlertTriangle, Speaker } from "@geist-ui/icons";
import React, { useEffect } from "react";
import { usePlayerState } from "../../../lib/player/playerState";

function DeviceSelector() {
  const [highRefreshRate, setHighRefreshRate] = React.useState(true);
  const devices = useSpotifyData(
    (spotify) => spotify.getMyDevices(),
    (data) => data.devices,
    {
      updateFrequency: highRefreshRate ? 1000 : 10000,
    }
  );
  const player = usePlayerState((state) => state.player);
  const [isSelectorOpen, setIsSelectorOpen] = React.useState(true);

  useEffect(() => {
    // Refresh more frequently directly after page load as
    // the Web Playback SDK may need a few seconds to show up
    setTimeout(() => setHighRefreshRate(false), 5000);
  }, []);

  const hasActiveDevice = devices?.some((device) => device.is_active);

  return (
    <>
      <button
        className="flex items-center rounded-full bg-white hover:bg-zinc-50 duration-200 transition-all p-2"
        onClick={() => setIsSelectorOpen(true)}
        title={
          hasActiveDevice
            ? "Change Spotify Connect device"
            : "⚠️ No device selected"
        }
      >
        <Badge.Anchor>
          <Badge type="error" scale={0.5}>
            <AlertTriangle size={10} strokeWidth={3} />
          </Badge>
          <Speaker size={20} strokeWidth={2} />
        </Badge.Anchor>
      </button>

      <Modal visible={isSelectorOpen} onClose={() => setIsSelectorOpen(false)}>
        <Modal.Title>Choose a device</Modal.Title>
        <Modal.Content>
          <MutedText>
            Select a device to play music on. TrueShuffle can use Spotify
            Connect to play on any of your devices - if you don't see a device,
            make sure Spotify is open and wait a few seconds.
          </MutedText>

          <div className="mt-6">
            {devices === null && <Loading />}
            {devices?.map((device) => (
              <button
                key={device.id}
                className="flex items-center gap-3 mb-3 rounded-lg bg-zinc-50 hover:bg-zinc-100 transition-all duration-200 w-full p-3"
                onClick={() => {
                  setIsSelectorOpen(false);
                  player?.setActiveDevice(device.id!);
                }}
              >
                <div
                  className={`w-4 h-4 rounded-full ${
                    device.is_active ? "bg-green-500" : "bg-zinc-500"
                  }`}
                />
                <div>{device.name}</div>
              </button>
            ))}
          </div>
        </Modal.Content>
      </Modal>
    </>
  );
}

export default DeviceSelector;
