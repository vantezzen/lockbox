import type { AppProps } from "next/app";
import { GeistProvider, CssBaseline } from "@geist-ui/core";
import "./globals.css";
import Head from "next/head";

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
    </GeistProvider>
  );
}
