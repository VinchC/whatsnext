import styled from "styled-components";
import * as C from "@/styles/constants"
import { buttonStyle } from "./buttonStyle";

export const PrimaryButton = styled.button`
  ${buttonStyle}
  background-color: ${C.SECONDARY_COLOR};
  color: white;

    &:disabled {
    background-color: ${C.DISABLED_COLOR};
    cursor: not-allowed;
    border-color: ${C.DISABLED_COLOR};
  }
`;
