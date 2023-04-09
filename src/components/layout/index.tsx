import { Page } from "@geist-ui/core";
import React from "react";
import Footer from "./Footer";
import Head from "next/head";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Page dotBackdrop width="auto">
      <Head>
        <title>
          TrueShuffle for Spotify - Finally a Spotify shuffle that works!
        </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Finally a Spotify shuffle that works!"
        />
        <meta name="keywords" content="spotify,shuffle,random,playlist" />
        <meta name="author" content="vantezen" />

        <link rel="icon" href="/favicon.png" />
      </Head>

      <Page.Content style={{ minHeight: "90vh" }}>{children}</Page.Content>

      <Page.Footer className="!relative">
        <Footer />
      </Page.Footer>
    </Page>
  );
}

export default Layout;
