import { useState } from "react";
import styles from "./Input.module.css";
import EyeOn from "@/assets/icons/btn_visibility.png";
import EyeOff from "@/assets/icons/btn_invisibility.png";

function Input({
  placeholder,
  value,
  status = "default",
  type = "text",
  onChange,
  errorMessage,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  function togglePassword() {
    setShowPassword((prev) => !prev);
  }

  const inputType = isPassword ? (showPassword ? "text" : "password") : type;
  const statusClass = errorMessage ? styles.error : styles[status];
  const wrapperClass = `${styles.wrapper} ${statusClass}`;

  return (
    <div className={styles.container}>
      <div className={wrapperClass}>
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={styles.input}
          autoComplete={isPassword ? "current-password" : undefined}
        />
        {isPassword && (
          <button
            type="button"
            onClick={togglePassword}
            className={styles.eyeIcon}
          >
            <img src={showPassword ? EyeOn : EyeOff} alt="비밀번호 보기 토글" />
          </button>
        )}
      </div>
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
    </div>
  );
}

export default Input;
