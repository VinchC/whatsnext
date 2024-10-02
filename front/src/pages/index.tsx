import LpCard from "@/components/LpCard/LpCard";
import { CardGrid } from "@/components/CardGrid/CardGrid";
import styled from "styled-components";
import { CheckboxLabel } from "../components/FormElements/CheckBoxLabel/CheckBoxLabel";
import { useState } from "react";
import { PrimaryButton } from "@/components/Button/PrimaryButton";
import { Modal } from "@/components/Modal/Modal.styled";

const LPS = [
  {
    id: 1,
    title: "Black Moon - Enta Da Stage",
    price: 10,
  },
  {
    id: 2,
    title: "Dr Dre - The Chronic",
    price: 20,
  },
  {
    id: 3,
    title: "Wu-Tang Clan - Enter the Wu-Tang (36 Chambers)",
    price: 30,
  },
];

const euroToDollarChangeRate = 1.1;

const Container = styled.div`
  display: grid;
  gap: 12px;
`;
const MainContentTitle = styled.h2`
  margin: 0 0 4px;
`;

export default function Home() {
  const [currency, setCurrency] = useState<"EURO" | "DOLLAR">("EURO");

  const toggleCurrency = () => {
    return setCurrency(currency === "EURO" ? "DOLLAR" : "EURO");
  };

  const [isModalOpen, setOpen] = useState(false);

  const toggleModal = () => {
    return setOpen(!isModalOpen ? true : false);
  };

  return (
    <>
      <Container>
        <MainContentTitle>Ajouts récents</MainContentTitle>

        <CheckboxLabel>
          <input type="checkbox" onChange={toggleCurrency} />
          Afficher les prix en dollars
        </CheckboxLabel>

        <PrimaryButton onClick={toggleModal}>Afficher la modale</PrimaryButton>

        <CardGrid>
          {LPS.map((lp) => (
            <LpCard
              key={lp.id}
              id={lp.id}
              title={lp.title}
              price={
                currency === "EURO"
                  ? lp.price
                  : lp.price * euroToDollarChangeRate
              }
              currency={currency}
            />
          ))}
        </CardGrid>

        {isModalOpen && <Modal>Contenu de la modale</Modal>}
      </Container>
    </>
  );
}
