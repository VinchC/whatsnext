import Layout from "@/components/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* Layout will include every  other component of the future page */}
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
