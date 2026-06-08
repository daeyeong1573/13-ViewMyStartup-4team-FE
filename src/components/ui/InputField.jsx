import styles from "./InputField.module.css";

const INPUT_STATUS = {
  inactive: styles.inactive,
  active: styles.active,
  error: styles.error,
};

function InputField({ status = "inactive", children }) {
  const statusClass = INPUT_STATUS[status] || INPUT_STATUS.inactive;

  return (
    <div className={`${styles.container} ${statusClass}`}>
      <div className={styles.innerBox}>{children}</div>
    </div>
  );
}

export default InputField;
