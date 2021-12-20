import { createPortal } from "react-dom";

interface ModalProps {
  children?: React.ReactNode;
}

const Modal = ({ children }: ModalProps) => {
  if (!process.browser || typeof window === undefined) {
    return null;
  }

  const portalElement = document.querySelector("#portal");

  if (!portalElement) {
    throw new Error("portal NOT exist");
  }

  return createPortal(children, portalElement);
};

export default Modal;
