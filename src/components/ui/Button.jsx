import styles from "./Button.module.css";
import RestartIcon from "@assets/icons/ic_restart.png";
import WhiteRestartIcon from "@assets/icons/ic_restart_white.svg";
import CheckIcon from "@assets/icons/ic_check.png";

function Button({ children, onClick, variant = "solid", status = "active" }) {
  const buttonClass = [styles.base, styles[variant], styles[status]].join(" ");

  return (
    <button
      type="button"
      className={buttonClass}
      onClick={onClick}
      disabled={status === "inactive"}
    >
      {variant === "reset" && (
        <img
          src={status === "inactive" ? RestartIcon : WhiteRestartIcon}
          alt="초기화"
          className={styles.prefixIcon}
        />
      )}

      {variant === "outline" && status === "done" && (
        <img src={CheckIcon} alt="체크" className={styles.prefixIcon} />
      )}

      <span>{children}</span>
    </button>
  );
}

export default Button;
