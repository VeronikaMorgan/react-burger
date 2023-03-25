import React, { FC } from "react";
import overlayStyles from './modal-overlay.module.css';
import { IModalOverlay } from "../../utils/types/types";

const ModalOverlay: FC<IModalOverlay> = ({children, closeModal}) => {
  return (
    <div data-testid='modal__overlay' className={overlayStyles.overlay} onClick={closeModal}>
      {children}
    </div>
  )
}

export default ModalOverlay