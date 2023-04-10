import React from "react";
import MutedText from "../MutedText";
import Image from "next/image";
import spotifyLogo from "@/assets/images/spotify.png";

function PoweredBy() {
  return (
    <div className="flex gap-2 items-center justify-end mt-6">
      <MutedText>Results provided by</MutedText>
      <Image src={spotifyLogo} width={70} alt="Spotify" />
    </div>
  );
}

export default PoweredBy;
