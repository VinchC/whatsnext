import { ReactNode } from "react";
import * as styled from "./Modal.styled";

const Modal = ({ children, onClose }: { children: ReactNode; onClose: () => void }) => { // add an onClose parameter that returns void
  return (
    <>
      <styled.ModalOverlay onClick={onClose}/> {/* add an onClick property that will close the Modal*/}
      <styled.Modal aria-modal>{children}</styled.Modal>
    </>
  );
};
export default Modal;
export { ModalContainer } from "./Modal.styled";