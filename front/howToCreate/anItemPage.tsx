import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { removeQueryParameter } from "@/utils";
import { Article } from "@/types";
import Modal from "@/components/Modal/Modal";
import { PrimaryButton } from "@/components/Button/PrimaryButton";
import LpDetails from "@/components/LpDetails/LpDetails";

const AlertBox = styled.div`
  padding: 8px;
  display: grid;
  gap: 8px;
`;

export default function ItemPage() {
  const router = useRouter();

  const { id, publishConfirmation } = router.query as {
    id: string;
    publishConfirmation: string | undefined;
  }; // will allow thanks to router to get the id in the url and the value of the string (here: publishConfirmation) defined in the router.push(...) in the publishLp

  const [article, setArticle] = useState<Article | null>(null); // creates a state for the article, which should be null by default, and changed after fetching data from the server

  //creates a state which is false by default, the confirmation display depending on the user's action
  const [showPublishConfirmation, setShowPublishConfirmation] = useState(false);

  // manages the display of a Modal element depending on the state above
  const showModal = () => {
    setShowPublishConfirmation(true);
  };

  const hideModal = () => {
    setShowPublishConfirmation(false);
  };

  // useEffect dedicated to the management of the url and its publishConfirmation element (if read, show modal and remove it from the url)
  useEffect(() => {
    if (publishConfirmation) {
      showModal();
      removeQueryParameter("publishConfirmation");
    }
  }, [publishConfirmation]);

  useEffect(() => {
    const fetchItem = async (articleId: string) => {
      // takes and id as a parameter
      const response = await fetch(`/api/items/${articleId}`); // url address that will be fetched
      const { item } = (await response.json()) as { item: Article }; // data and its type that will be fetched from the url
      setArticle(item); // updates the state from null with the item fetched
    };

    // call to function fetchLp that will actually fetch the data thanks to its id
    if (id) {
      fetchItem(id);
    }
  }, [id]); // in the array must be defined the paramater used by the inner function

  return article ? (
    <>
      <LpDetails {...article} />
      {/* checks the value of the state and if true displays the Modal */}
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
    "Chargement de l'article…"
  );
}
