import LpCard from "@/components/LpCard/LpCard";
import { CardGrid } from "@/components/CardGrid/CardGrid";
import styled from "styled-components";
import { CheckboxLabel } from "../components/FormElements/CheckBoxLabel/CheckBoxLabel";
import { useState } from "react";

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
const euroToDollarChangeRate = 1.10723;

const Checkbox = styled.input`
  margin: 6px 0 12px;
`;

export default function Home() {
  // creates a state which will be used to change currency, default value is "EURO"
  const [currency, setCurrency] = useState<"EURO" | "DOLLAR">("EURO");

  // creates a function that will switch between two currencies
  const toggleCurrency = () => {
    return setCurrency(currency === "EURO" ? "DOLLAR" : "EURO");
  };

  return (
    <>
      <main className="main-content">
        <h2>Ajouts récents</h2>
        {/* front element that will allow to switch currency */}
        <CheckboxLabel>
          <Checkbox type="checkbox" onChange={toggleCurrency} />
          Afficher les prix en dollars
        </CheckboxLabel>
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
      </main>
    </>
  );
}
