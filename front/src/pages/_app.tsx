import Layout from "@/components/Layout/Layout";
import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import createApolloClient from "./apollo-client";

export default function App({ Component, pageProps }: AppProps) {
  const client = createApolloClient();

  return (
    <>
    {/* Apollo Client should be placed at the top level of the app */}
      <ApolloProvider client={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </>
  );
}
