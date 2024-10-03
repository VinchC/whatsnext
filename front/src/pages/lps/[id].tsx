import { useParams } from "next/navigation";
import LpDetails from "@/components/LpDetails/LpDetails";
import { useEffect, useState } from "react";
import { Article } from "@/types";

export default function Lp() {
  const params = useParams();
  const id = params?.id;

  if (!id) {
    return "Loading...";
  }

  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    const fetchLp = async () => {
      const response = await fetch(`/api/lps/${id}`);
      const { lp } = (await response.json()) as { lp: Article };
      setArticle(lp);
      console.log(lp);
    };
    fetchLp();
  }, []);

  return <LpDetails />;
}
