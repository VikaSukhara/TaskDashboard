import { createPortal } from "react-dom";

import styles from "./Modal.module.scss";
import { Plus } from "lucide-react";
import { useEffect } from "react";

type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  width?: string;
  height?: string;
};

const Modal: React.FC<ModalProps> = ({
  children,
  isOpen,
  onClose,
  width,
  height,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  return createPortal(
    // backgrop
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={styles.content}
        onClick={(e) => e.stopPropagation()}
        style={{ width, height }}
      >
        <button className={styles.btnCross} onClick={onClose}>
          <Plus style={{ transform: "rotate(45deg)" }} />
        </button>
        {children}
      </div>
    </div>,
    document.getElementById("modal")!
  );
};
export default Modal;
