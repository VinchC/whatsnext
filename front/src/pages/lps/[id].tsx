import { useParams } from "next/navigation";
import LpDetails from "@/components/LpDetails/LpDetails";
import { useEffect, useState } from "react";
import { Article } from "@/types";

export default function LpPage() {
  const params = useParams();
  const id = params?.id as string; // id in string format will be used in the fetch function - why ??

  const [article, setArticle] = useState<Article | null>(null); // creates a state for the article, which should be null by default, and changed after fetching data from the server

  useEffect(() => {
    const fetchLp = async (articleId: string) => {
      // takes and id as a parameter
      const response = await fetch(`/api/lps/${articleId}`); // url address that will be fetched
      const { lp } = (await response.json()) as { lp: Article }; // data and its type that will be fetched from the url
      setArticle(lp); // updates the state from null with the item fetched
    };

    // call to function fetchLp that will actually fetch the data thanks to its id
    if (id) {
      fetchLp(id);
    }
  }, [id]); // in the array must be defined the paramater used by the inner function

  return article ? <LpDetails {...article} /> : "Chargement"; // ternary function that manages the case where therr's no id and if (id), the article uses the spread operator
}
