import Link from "next/link";

import * as styled from "./LpCard.styled";
import { BaseLink } from "../Link/BaseLink";

export default function LpCard({
  id,
  title,
  price,
}: {
  id: number;
  title: string;
  price: number;
}) {
  return (
    <>
    <styled.Container>
      <BaseLink className="lp-card-link" href={`/lps/${id}`}>
        <styled.Image
          className="lp-card-image"
          src={`/images/${id}.webp`}
        />
        <styled.Text>
          <styled.Title>{title}</styled.Title>
          <styled.Price>{price} €</styled.Price>
        </styled.Text>
      </BaseLink>
    </styled.Container>
    </>
  );
}
