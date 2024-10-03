import { ButtonLikeLink } from "../Link/ButtonLikeLink";
import { MailIcon } from "../Icons/MailIcon";
import * as styled from "./LpDetails.styled";
import { Separator } from "../Separator/Separator";
import { Article } from "@/types";

export default function LpDetails({
  title,
  price,
  description,
  picture,
  artist,
  createdAt,
}: Article) {
  return (
    <>
      <h2>{title}</h2>
      <styled.Container>
        <styled.ImageContainer>
          <styled.Image src={picture} />
        </styled.ImageContainer>
        <styled.Info>
          <styled.Price>{price} €</styled.Price>
          <div>{description}</div>
          <Separator />
          <div>
            Annoncée publiée par <b>{artist}</b> {createdAt}.
          </div>
          <ButtonLikeLink href={`mailto:${artist}@${artist}.com`}>
            <MailIcon />
            Envoyer un email
          </ButtonLikeLink>
        </styled.Info>
      </styled.Container>
    </>
  );
}
