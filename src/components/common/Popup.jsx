import styles from "./Popup.module.css";
import CloseIcon from "@/assets/icons/ic_delete.png";
import Button from "../ui/Button";

function Popup({
  children,
  onClose,
  onCancel,
  onConfirm,
  confirmText = "확인",
}) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.container}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className={styles.closeButton} onClick={onClose}>
          <img src={CloseIcon} alt="닫기 버튼" />
        </button>

        <div className={styles.content}>{children}</div>

        <div className={styles.buttonWrapper}>
          {onCancel && (
            <Button variant="solidOutline" status="active" onClick={onCancel}>
              취소
            </Button>
          )}
          <Button variant="solid" onClick={onConfirm}>
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Popup;
