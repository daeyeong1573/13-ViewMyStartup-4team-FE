import { useState } from "react";
import styles from "./SearchBar.module.css";
import CloseIcon from "./CloseIcon";
import SearchIcon from "./SearchIcon";

function SearchBar() {
  const [keyword, setKeyword] = useState("");
  const isTyping = keyword.length > 0;

  const handleClear = () => setKeyword("");

  return (
    <div
      className={`${styles.container} ${isTyping ? styles.typing : styles.default}`}
    >
      <div className={styles.innerBox}>
        {!isTyping && <SearchIcon className={styles.icon} />}

        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder={!isTyping ? "검색어를 입력해주세요" : ""}
          className={styles.input}
        />

        <div className={styles.rightIconWrapper}>
          {isTyping && (
            <>
              <CloseIcon onClick={handleClear} />
              <SearchIcon className={styles.icon} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
