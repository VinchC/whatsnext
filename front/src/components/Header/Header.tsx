import { Fragment } from "react";
import { SearchIcon } from "@/components/Icons/SearchIcon";
import { PrimaryButton } from "../Button/PrimaryButton";

import * as styled from "./Header.styled";
import { ButtonLikeLink, Logo } from "../Link/ButtonLikeLink";
import { MainSearchField } from "../FormElements/Input/Input";
import { BaseLink } from "../Link/BaseLink";
import ResponsiveLabel from "../ResponsiveLabel/ResponsiveLabel";

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
    <styled.Header>
      <styled.MainMenu>
        <styled.MainTitle>
          <Logo href="/">
          <ResponsiveLabel mobileLabel="WN" desktopLabel="WHAT'S NEXT" />
          </Logo>
        </styled.MainTitle>
        <styled.TextFieldWithButton>
          <MainSearchField type="search" />
          <PrimaryButton>
            <SearchIcon />
          </PrimaryButton>
        </styled.TextFieldWithButton>
        <ButtonLikeLink href="/publish-lp">
        <ResponsiveLabel
            mobileLabel="Publier"
            desktopLabel="Publier une annonce"
          />
        </ButtonLikeLink>
      </styled.MainMenu>
      <styled.CategoriesNavigation>
        {CATEGORIES.map((category, index) => (
          <Fragment key={category.id}>
            <BaseLink href={`/categories/${category.id}`}>
              {category.title}
            </BaseLink>
            {index < CATEGORIES.length - 1 ? " • " : ""}
          </Fragment>
        ))}
      </styled.CategoriesNavigation>
    </styled.Header>
  );
}
