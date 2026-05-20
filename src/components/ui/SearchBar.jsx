import { useState } from "react";
import style from "./SearchBar.module.css";
import CloseIcon from "./CloseIcon";
import SearchIcon from "./SearchIcon";

function SearchBar() {
  const [keyword, setKeyword] = useState("");
  const isTyping = keyword.length > 0;

  const handleClear = () => setKeyword("");

  return (
    <div
      className={`${style.container} ${isTyping ? style.typing : style.default}`}
    >
      <div className={style.innerBox}>
        {!isTyping && <SearchIcon className={style.icon} />}

        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder={!isTyping ? "검색어를 입력해주세요" : ""}
          className={style.input}
        />

        <div className={style.rightIconWrapper}>
          {isTyping && (
            <>
              <CloseIcon onClick={handleClear} />
              <SearchIcon className={style.icon} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
