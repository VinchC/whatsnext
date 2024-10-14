import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { removeQueryParameter } from "@/utils";
import { Article } from "@/types";
import Modal from "@/components/Modal/Modal";
import { PrimaryButton } from "@/components/Button/PrimaryButton";
import LpDetails from "@/components/LpDetails/LpDetails";
import Loader from "@/components/Loader/Loader";

const AlertBox = styled.div`
  padding: 8px;
  display: grid;
  gap: 8px;
`;

export default function LpPage() {
  const router = useRouter();

  const { id, publishConfirmation } = router.query as {
    id: string;
    publishConfirmation: string | undefined;
  };

  const [article, setArticle] = useState<Article | null>(null);

  const [showPublishConfirmation, setShowPublishConfirmation] = useState(false);

  const showModal = () => {
    setShowPublishConfirmation(true);
  };

  const hideModal = () => {
    setShowPublishConfirmation(false);
  };

  useEffect(() => {
    if (publishConfirmation) {
      showModal();
      removeQueryParameter("publishConfirmation");
    }
  }, [publishConfirmation]);

  useEffect(() => {
    const fetchLp = async (articleId: string) => {
      const response = await fetch(`/api/lps/${articleId}`);
      const { lp } = (await response.json()) as { lp: Article };
      setArticle(lp);
    };

    if (id) {
      fetchLp(id);
    }
  }, [id]);

  return article ? (
    <>
      <LpDetails {...article} />
      {showPublishConfirmation && (
        <Modal onClose={hideModal}>
          <AlertBox>
            L'article {article.title} a bien été créé.
            <PrimaryButton onClick={hideModal}>OK</PrimaryButton>
          </AlertBox>
        </Modal>
      )}
    </>
  ) : (
    <Loader global />
  );
}
