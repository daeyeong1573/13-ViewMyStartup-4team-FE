import styles from "./Pagination.module.css";
import leftImg from "@/assets/icons/ic_arrow_left.png";
import rightImg from "@/assets/icons/ic_arrow_right.png";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevPage = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const pageGroupSize = 5;
  const currentGroup = Math.ceil(currentPage / pageGroupSize);
  const startPage = (currentGroup - 1) * pageGroupSize + 1;
  const endPage = Math.min(startPage + pageGroupSize - 1, totalPages);

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={styles.Pagination}>
      <button
        className={styles.pageBtn}
        onClick={handlePrevPage}
        aria-label="이전 페이지 버튼"
        disabled={currentPage === 1}
      >
        <img src={leftImg} />
      </button>

      {pageNumbers.map((pageNum) => (
        <button
          key={pageNum}
          // 현재 페이지면 styles.active를 추가하여 주황색으로 활성화
          className={`${styles.pageBtn} ${currentPage === pageNum ? styles.active : ""}`}
          onClick={() => onPageChange(pageNum)}
        >
          {pageNum}
        </button>
      ))}

      <button
        className={styles.pageBtn}
        onClick={handleNextPage}
        aria-label="다음 페이지 버튼"
        disabled={currentPage === totalPages}
      >
        <img src={rightImg} />
      </button>
    </div>
  );
};

export default Pagination;
