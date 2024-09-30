// the Layout component will be used in the _app.tsx parent

import { ReactNode } from "react";
import Head from "next/head";
import Header from "./Header";

// the children in the parameters represent all of the things that React can render
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Head component includes title and metadata */}
      <Head>
        <title>What's next</title>
        <meta
          name="description"
          content="What's next a pour but de pratiquer les notions vues pendant la formation (React - GraphQL) et d'en renforcer le caractère accessible."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <Header />

      {/* the children  of the Layout are rendered here */}
      <div>{children}</div>
    </>
  );
}
