import { GeistProvider, CssBaseline } from "@geist-ui/core";
import { SessionProvider } from "next-auth/react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import Layout from "@/components/layout";
import { useEffect } from "react";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    localStorage.debug = "app:*";
  });

  return (
    <SessionProvider session={pageProps.session}>
      <GeistProvider>
        <CssBaseline />
        <div className={inter.className}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </div>

        <Script src="https://scripts.simpleanalyticscdn.com/latest.js" />
        <noscript>
          {/* eslint-disable @next/next/no-img-element */}
          <img
            src="https://queue.simpleanalyticscdn.com/noscript.gif"
            alt=""
            referrerPolicy="no-referrer-when-downgrade"
          />
        </noscript>
      </GeistProvider>
    </SessionProvider>
  );
}
