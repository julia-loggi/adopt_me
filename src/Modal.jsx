import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children }) => {
  const elRef = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    modalRoot.appendChild(elRef.current);
    return () => modalRoot.removeChild(elRef.current);
  }, []);

  return createPortal(
    <div className="fixed right-0 left-0 top-0 bottom-0 z-10 flex justify-center items-center bg-black opacity-90">
      {children}
    </div>,
    elRef.current
  );
};

export default Modal;
