import { useState, useRef, useEffect } from "react";
import styles from "./Dropdown.module.css";
import ToggleIcon from "../../assets/icons/ic_toggle.png";

function Dropdown({ options = [], onSelect = () => {} }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(options[0]?.value);
  const dropdownRef = useRef(null);
  const selected = options.find((option) => option.value === selectedValue);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleToggle() {
    setIsOpen((prev) => !prev);
  }

  function handleSelect(option) {
    setSelectedValue(option.value);
    onSelect(option);
    setIsOpen(false);
  }

  return (
    <div className={styles.container} ref={dropdownRef}>
      <button className={styles.button} onClick={handleToggle} type="button">
        <span>{selected?.label}</span>
        <img
          src={ToggleIcon}
          alt="토글 아이콘"
          className={`${styles.arrow} ${isOpen ? styles.open : ""}`}
        />
      </button>

      {isOpen && (
        <ul className={styles.list} role="listbox">
          {options.map((option) => (
            <li
              key={option.value}
              className={styles.option}
              onClick={() => handleSelect(option)}
              role="option"
              aria-selected={selected?.value === option.value}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
