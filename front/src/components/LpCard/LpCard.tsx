import * as styled from "./LpCard.styled";
import { BaseLink } from "../Link/BaseLink";

export default function LpCard({
  id,
  title,
  price,
  currency, // add a data and its type below
}: {
  id: number;
  title: string;
  price: number;
  currency: "EURO" | "DOLLAR"; // add data's type defined in state in the parent component
}) {
  return (
    <>
      <styled.Container>
        <BaseLink href={`/lps/${id}`}>
          <styled.Image src={`/images/${id}.webp`} />
          <styled.Text>
            <styled.Title>{title}</styled.Title>
            <styled.Price>
              {price} {(currency != "EURO" ? "$" : "€")} {/* ternary function that checks the currency value of the item and updates the symbol */}
            </styled.Price>
          </styled.Text>
        </BaseLink>
      </styled.Container>
    </>
  );
}
