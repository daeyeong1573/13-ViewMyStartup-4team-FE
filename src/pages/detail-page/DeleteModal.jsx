import Modal from "@/components/common/Modal";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import styles from "./DeleteModal.module.css";

function DeleteModal({
  isOpen,
  onClose,
  password,
  onPassWordChange,
  onConfirm,
  error,
}) {
  if (!isOpen) return null;

  return (
    <Modal title="삭제 권한 인증" onClose={onClose}>
      <div className={styles.innerBox}>
        <h2 className={styles.title}>비밀번호</h2>
        <Input
          type="password"
          placeholder="패스워드를 입력해주세요"
          value={password}
          onChange={(e) => onPassWordChange(e.target.value)}
          {...(error && { errorMessage: error })}
        />
        <div className={styles.BtnWrapper}>
          <Button variant="solid" status="active" onClick={onConfirm}>
            삭제하기
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteModal;
