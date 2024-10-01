import { ReactNode } from "react";
import Head from "next/head";

import Header from "../Header/Header";
import { MainContent } from "./Layout.styled";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
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
      <MainContent>{children}</MainContent>
    </>
  );
}
