import { Fragment } from "react";
import DisplayLinkToCategory from "@/components/DisplayLinkToCategory";
import Link from "next/link";
import PrimaryButton from "./Button/PrimaryButton";
import { SearchIcon } from "@/Icons/SearchIcon";

export default function Header() {
  const CATEGORIES = [
    {
      id: 1,
      title: "East Coast",
    },
    {
      id: 2,
      title: "West Coast",
    },
    {
      id: 3,
      title: "Jazz",
    },
    {
      id: 4,
      title: "Classique",
    },
    {
      id: 5,
      title: "Blues",
    },
  ];

  return (
    <>
      {/* header includes logo, searchbar and navbar */}
      <header className="header">
        <div className="main-menu">
          <h1>
            <Link href="/" className="button logo link-button">
              <span className="mobile-short-label">WN</span>
              <span className="desktop-long-label">WHAT'S NEXT</span>
            </Link>
          </h1>

          {/* searchbar */}
          <form className="text-field-with-button">
            <input className="text-field main-search-field" type="search" />
            <PrimaryButton>
              <SearchIcon />
            </PrimaryButton>
          </form>

          {/* route to create a new LP */}
          <Link href="/publish-lp" className="button link-button">
            <span className="mobile-short-label">Publier</span>
            <span className="desktop-long-label">Publier un LP</span>
          </Link>
        </div>
        {/* navbar with categories implemented directly in file*/}
        <nav className="categories-navigation">
          {CATEGORIES.map((category, index) => (
            <Fragment key={category.id}>
              <DisplayLinkToCategory id={category.id} title={category.title} />
              {index < CATEGORIES.length - 1 ? " || " : ""}
            </Fragment>
          ))}
        </nav>
      </header>
    </>
  );
}
