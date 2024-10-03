import { ButtonLikeLink } from "../Link/ButtonLikeLink";
import { MailIcon } from "../Icons/MailIcon";
import * as styled from "./LpDetails.styled";
import { Separator } from "../Separator/Separator";
import { Article } from "@/types";

export default function Container({ article }: { article: Article }) {
  return (
    <>
      <h2>Table</h2>
      <styled.Container>
        <styled.ImageContainer>
          <styled.Image src={article?.picture} />
        </styled.ImageContainer>
        <styled.Info>
          <styled.Price>{article?.price}</styled.Price>
          <div>{article?.description}</div>
          <Separator />
          <div>
            Annoncée publiée par <b>{article?.artist}</b> aujourd'hui (15:28).
          </div>
          <ButtonLikeLink href={`mailto:${article?.artist}@${article?.artist}.com`}>
            <MailIcon />
            Envoyer un email
          </ButtonLikeLink>
        </styled.Info>
      </styled.Container>
    </>
  );
}
