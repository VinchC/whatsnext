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
  const id = params?.id as string;

  const [articles, setArticles] = useState<Article[] | null>(null);

  useEffect(() => {
    const fetchLps = async (categoryId: string) => {

      const response = await fetch(`/api/lps?category=${categoryId}`);
      const { lps } = (await response.json()) as { lps: Article[] };
      setArticles(lps);
    };

    if (id) {
      fetchLps(id);
    }
  }, [id]);

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
