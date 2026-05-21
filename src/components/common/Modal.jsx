import styles from "./Modal.module.css";
import CloseIcon from "../../assets/icons/ic_delete.png";

function Modal({ title, children, onClose }) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.container}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          {title && <h2 className={styles.title}>{title}</h2>}
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="모달 닫기"
          >
            <img src={CloseIcon} alt="" />
          </button>
        </div>

        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}

export default Modal;
