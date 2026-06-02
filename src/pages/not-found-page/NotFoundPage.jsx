import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

function NotFoundPage() {
  return (
    <main className={styles.mainContainer}>
      <div className={styles.contentWrapper}>
        <svg
          className={styles.icon}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M12 7V13"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="12" cy="16" r="1.5" fill="currentColor" />
        </svg>

        <h1 className={styles.title}>404</h1>
        <p className={styles.description}>
          원하시는 페이지를 찾을 수 없습니다.
        </p>
        <p className={styles.subDescription}>
          입력하신 주소가 정확한지 다시 한번 확인해 주세요.
        </p>

        <Link to="/" className={styles.homeButton}>
          홈으로 돌아가기
        </Link>
      </div>
    </main>
  );
}

export default NotFoundPage;
