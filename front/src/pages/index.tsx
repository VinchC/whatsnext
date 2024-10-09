import LpCard from "@/components/LpCard/LpCard";
import { CardGrid } from "@/components/CardGrid/CardGrid";
import { CheckboxLabel } from "../components/FormElements/CheckBoxLabel/CheckBoxLabel";
import { useEffect, useState } from "react";
import { Modal } from "@/components/Modal/Modal.styled";
import { Article } from "@/types";
import Loader from "@/components/Loader/Loader";
import { MainContentTitle } from "../components/MainContentTitle/MainContentTitle";
import { PageContainer } from "../components/PageContainer/PageContainer";
import { gql, useQuery } from "@apollo/client";

const euroToDollarChangeRate = 1.1;

// Apollo Client will communicate with Apollo Server via GraphQL queries and mutation like this one
const GET_LPS_HOME_PAGE = gql`
  query GetLpsHomePage {
    lps {
      id
      title
      price
      artist
    }
  }
`;

export default function HomePage() {
  // const [currency, setCurrency] = useState<"EURO" | "DOLLAR">("EURO");

  // const toggleCurrency = () => {
  //   return setCurrency(currency === "EURO" ? "DOLLAR" : "EURO");
  // };

  // const [isModalOpen, setOpen] = useState(false);

  // const toggleModal = () => {
  //   return setOpen(!isModalOpen ? true : false);
  // };

  const [articles, setArticles] = useState<Article[] | null>(null);

  // GraphQL query defined above is called here thanks to the useQuery hook
  const { data, loading, error } = useQuery(GET_LPS_HOME_PAGE);
  console.log({ data, loading, error });

  return (
    <>
      <PageContainer>
        <MainContentTitle>Ajouts récents</MainContentTitle>

        {/* <CheckboxLabel>
          <input type="checkbox" onChange={toggleCurrency} />
          Afficher les prix en dollars
        </CheckboxLabel> */}

        {/* <PrimaryButton onClick={toggleModal}>Afficher la modale</PrimaryButton> */}

        <CardGrid>
          {articles ? (
            articles.map((article) => (
              <LpCard
                key={article.id}
                id={article.id}
                picture={article.picture}
                artist={article.artist}
                title={article.title}
                price={
                  // currency === "EURO" ? 
                  article.price
                    // : article.price * euroToDollarChangeRate
                }
                category={article.category?.title}
                // currency={currency}
              />
            ))
          ) : (
            <Loader />
          )}
        </CardGrid>

        {/* {isModalOpen && <Modal>Contenu de la modale</Modal>} */}
      </PageContainer>
    </>
  );
}
