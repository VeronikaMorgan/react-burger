import React, { FC } from "react";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from "../modal-overlay/modal-overlay";
import modalStyles from './modal.module.css';
import { IModal } from "../../utils/types";

const modalRoot:HTMLDivElement = document.getElementById("react-modals") as HTMLDivElement;

const Modal: FC<IModal> = ({ children, title, closeModal }) => {
  
  useEffect(() => {
    // ts ругается на reactKeyboardEvent
    const closeByEsc = (e: KeyboardEvent | React.KeyboardEvent) => {
      e.preventDefault()
      if (e.key === 'Escape') {
        closeModal()
      }
    }
    document.addEventListener('keydown', closeByEsc);
    return () => {
      document.removeEventListener('keydown', closeByEsc);
    }
  })

  return createPortal(
    (
      <ModalOverlay closeModal={closeModal}>
        <div className={`${modalStyles.wrapper} p-10`} onClick={e => e.stopPropagation()}>
          <div className={modalStyles.header}>
            <h2 className="text text_type_main-large">{title}</h2>
            <button className='btn-default' onClick={closeModal}>
              <CloseIcon type="primary" />
            </button>
          </div>
          {children}
        </div>
      </ModalOverlay>
    ), modalRoot
  )
}

export default Modal