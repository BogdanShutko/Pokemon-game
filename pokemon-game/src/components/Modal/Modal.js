import React, { useEffect, useRef } from "react";
import s from "../Modal/style.module.css";
import cn from "classnames";

const Modal = ({ title, children, onCloseModal, isOpen }) => {
  const modalEl = useRef();
  useEffect(() => {
    document.querySelector("body").style.overflow = isOpen ? "hidden" : null;
  }, [isOpen]);
  const handlerCloseModal = () => {
    onCloseModal && onCloseModal(false);
  };
  const handlerClickRoot = (e) => {
    if (!modalEl.current.contains(e.target)) {
      handlerCloseModal();
    }
  };
  return (
    <div
      className={cn(s.root, {
        [s.open]: isOpen,
      })}
      onClick={handlerClickRoot}
    >
      <div className={s.modal} ref={modalEl}>
        <div className={s.head}>
          {title}
          <span className={s.btnClose} onClick={handlerCloseModal}></span>
        </div>
        <div className={s.content}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
