import { Fragment, useEffect, useState } from "react";
import { SearchIcon } from "@/components/Icons/SearchIcon";
import { PrimaryButton } from "../Button/PrimaryButton";

import * as styled from "./Header.styled";
import { ButtonLikeLink, Logo } from "../Link/ButtonLikeLink";
import { MainSearchField } from "../FormElements/Input/Input";
import { BaseLink } from "../Link/BaseLink";
import ResponsiveLabel from "../ResponsiveLabel/ResponsiveLabel";
import { Loader } from "../Loader/Loader.styled";
import { Category } from "@/types";

export default function Header() {
  const [categories, setCategories] = useState<Category[] | null >(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("/api/categories");
      const { categories } = (await response.json()) as { categories: Category[]};
      setCategories(categories);
    };

    fetchCategories();
  }, []);

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
        {categories ? (
          categories.map((category, index) => (
            <Fragment key={category.id}>
              <BaseLink href={`/categories/${category.id}`}>
                {category.title}
              </BaseLink>
              {index < categories.length - 1 ? " • " : ""}
            </Fragment>
          ))
        ) : (
          <Loader />
        )}
      </styled.CategoriesNavigation>
    </styled.Header>
  );
}
