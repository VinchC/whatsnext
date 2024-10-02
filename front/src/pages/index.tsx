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

// change rate that will be used if currency is dollar
const euroToDollarChangeRate = 1.1;

const Container = styled.div`
  display: grid;
  gap: 12px;
`;
const MainContentTitle = styled.h2`
  margin: 0 0 4px;
`;

export default function Home() {
  // creates a state which will be used to change currency, default value is "EURO"
  const [currency, setCurrency] = useState<"EURO" | "DOLLAR">("EURO");

  // creates a function that will switch between two currencies
  const toggleCurrency = () => {
    return setCurrency(currency === "EURO" ? "DOLLAR" : "EURO");
  };

  // creates a false state for the modal which is false by default
  const [isModalOpen, setOpen] = useState(false);

  // creates a function that will toggle the state of the modal (false = closed and true = open)
  const toggleModal = () => {
    return setOpen(!isModalOpen ? true : false);
  };

  return (
    <>
      <Container>
        <MainContentTitle>Ajouts récents</MainContentTitle>

        {/* front element that will allow to switch currency */}
        <CheckboxLabel>
          <input type="checkbox" onChange={toggleCurrency} />
          Afficher les prix en dollars
        </CheckboxLabel>

        {/* front element that will allow to open or close modal*/}
        <PrimaryButton onClick={toggleModal}>Afficher la modale</PrimaryButton>

        <CardGrid>
          {LPS.map((lp) => (
            <LpCard
              key={lp.id}
              id={lp.id}
              title={lp.title}
              price={
                // value passed in prop depending on the state
                currency === "EURO"
                  ? lp.price
                  : lp.price * euroToDollarChangeRate
              }
              currency={currency} // value passed in props
            />
          ))}
        </CardGrid>

        {/* displays the content of the modal if its state is true */}
        {isModalOpen && <Modal>Contenu de la modale</Modal>}
      </Container>
    </>
  );
}
