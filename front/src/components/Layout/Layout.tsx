import { ReactNode } from "react";
import Head from "next/head";

import Header from "../Header/Header";
import { MainContent } from "./Layout.styled";

export const CATEGORIES = [
  { id: 1, title: "Rap US" },
  { id: 2, title: "Rap FR" },
  { id: 3, title: "Classique" },
  { id: 4, title: "Jazz" },
  { id: 5, title: "Blues" },
  { id: 6, title: "Metal" },
  { id: 7, title: "Soul" },
  { id: 8, title: "Rock" },
  { id: 9, title: "Electro" },
];

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
        <link rel="icon" href="favico.png" />
      </Head>

      <Header />

      {/* the children  of the Layout are rendered here */}
      <MainContent>{children}</MainContent>
    </>
  );
}
