import styles from "./SearchBar.module.css";
import CloseIcon from "./CloseIcon";
import SearchIcon from "./SearchIcon";

function SearchBar({ value, onChange, onClear, onSubmit }) {
  const isTyping = value.length > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(value);
  };

  return (
    <form
      className={`${styles.container} ${isTyping ? styles.typing : styles.default}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.innerBox}>
        {!isTyping && <SearchIcon className={styles.icon} />}

        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={!isTyping ? "검색어를 입력해주세요" : ""}
          className={styles.input}
        />

        <div className={styles.rightIconWrapper}>
          {isTyping && (
            <>
              <CloseIcon onClick={onClear} />
              <button type="submit" className={styles.searchBtn}>
                <SearchIcon className={styles.icon} />
              </button>
            </>
          )}
        </div>
      </div>
    </form>
  );
}
export default SearchBar;
