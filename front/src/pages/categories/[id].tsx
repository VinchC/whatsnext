import { CardGrid } from "@/components/CardGrid/CardGrid";
import Loader from "@/components/Loader/Loader";
import LpCard from "@/components/LpCard/LpCard";
import { MainContentTitle } from "@/components/MainContentTitle/MainContentTitle";
import { PageContainer } from "@/components/PageContainer/PageContainer";
import { Article } from "@/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CATEGORIES } from "@/components/Layout/Layout";

export default function Category() {
  const params = useParams();
  // gets the url parameter as a fetch parameter
  const id = params?.id as string;

  const [articles, setArticles] = useState<Article[] | null>(null);

  useEffect(() => {
    // fetchLps now takes a parameter which is the same as the one used in index and in the entity method
    const fetchLps = async (categoryId: string) => {

      // the fetched server url is completed by a parameter related to the category id
      const response = await fetch(`/api/lps?category=${categoryId}`);
      const { lps } = (await response.json()) as { lps: Article[] };
      setArticles(lps);
    };

    // returns the items related to the id in the url
    if (id) {
      fetchLps(id);
    }
    // useEffect needs a parameter to work which is the id of the url parameter
  }, [id]);

  // manages the case where the category doesn't exist
  const category = CATEGORIES.find((category) => category.id === parseInt(id));
  if (!category) {
    return "La catégorie sélectionnée n'existe pas.";
  }

  return (
    <>
      <PageContainer>
        <MainContentTitle>
          Lp récents de la catégorie {category.title}
        </MainContentTitle>

        <CardGrid>
          {articles ? (
            articles.map((article) => (
              <LpCard
                key={article.id}
                id={article.id}
                picture={article.picture}
                title={article.title}
                price={article.price}
                category={article.category?.title}
              />
            ))
          ) : (
            <Loader global />
          )}
        </CardGrid>
      </PageContainer>
    </>
  );
}
