import Link from "next/link";
import React from "react";
import MutedText from "../MutedText";

function Footer() {
  return (
    <>
      <div className="flex flex-col sm:flex-row gap-6 justify-center mb-3">
        <a
          href="https://vantezzen.io"
          target="_blank"
          rel="noreferrer"
          className="text-zinc-800 font-medium"
        >
          Made by vantezzen
        </a>
        <Link href="/legal/terms" className="text-zinc-800 font-medium">
          Terms of Service
        </Link>
        <Link href="/legal/privacy" className="text-zinc-800 font-medium">
          Privacy Policy
        </Link>
        <Link href="/legal/impressum" className="text-zinc-800 font-medium">
          Impressum
        </Link>
      </div>
      <div className="text-center mb-6">
        <MutedText>
          Spotify is a registered trademark of Spotify AB. TrueShuffle is not
          associated with Spotify.
        </MutedText>
      </div>
    </>
  );
}

export default Footer;
