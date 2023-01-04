import { React} from "react";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import {CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from "../modal-overlay/modal-overlay";
import modalStyles from './modal.module.css'
import PropTypes from 'prop-types';
const modalRoot = document.getElementById("react-modals");

const Modal = ({children, title, closeModal}) => {

  useEffect(() => {
    document.addEventListener('keydown', closeModal);
    return () => {
      document.removeEventListener('keydown', closeModal);
    }
  },[])

  return createPortal (
    (
      <ModalOverlay closeModal={closeModal}>
        <div className={`${modalStyles.wrapper} p-10`} onClick={e => e.stopPropagation()}>
          <div className={modalStyles.header}>
            <h2 className="text text_type_main-large">{title}</h2>
            <button className='btn-default' onClick={closeModal}>
              <CloseIcon  type="primary"/>
            </button>
          </div>
        {children}
        </div>
      </ModalOverlay>
    ), modalRoot
  )
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  closeModal: PropTypes.func,
}

export default Modal