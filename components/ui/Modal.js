"use client";
import styles from "@/styles/Modal.module.css";

function Modal({ isOpen,  children }) {
  if (!isOpen) return null;

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
       
        {children}
      </div>
    </div>
  );
}

export default Modal;
