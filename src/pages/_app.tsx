import type { AppProps } from "next/app";
import { GeistProvider, CssBaseline } from "@geist-ui/core";
import "./globals.css";
import Head from "next/head";
import Script from "next/script";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GeistProvider>
      <Head>
        <title>LockBox - Securely share secrets</title>
        <meta name="description" content="Securely share secrets" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <CssBaseline />
      <Component {...pageProps} />

      <Script
        async
        defer
        src="https://scripts.simpleanalyticscdn.com/latest.js"
        data-skip-dnt="true"
      />
      <noscript>
        <img src="https://queue.simpleanalyticscdn.com/noscript.gif" alt="" />
      </noscript>
    </GeistProvider>
  );
}
