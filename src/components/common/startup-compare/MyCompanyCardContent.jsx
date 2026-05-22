import CompanyCard from "@/components/ui/CompanyCard";
import styles from "./MyCompanyCardContent.module.css";
import btnPlus from "@/assets/icons/btn_plus.png";

export default function MyCompanyCardContent({ myCompany, onAdd, onCancel }) {
  if (myCompany) {
    return (
      <>
        <button className={styles.cancelBtn} type="button" onClick={onCancel}>
          선택 취소
        </button>
        <CompanyCard
          key={myCompany.id}
          image={myCompany.imgUrl}
          name={myCompany.name}
          category={myCompany.category}
          singleSelect
        />
      </>
    );
  }

  return (
    <button
      className={styles.addSlot}
      type="button"
      onClick={onAdd}
      aria-label="나의 기업 추가"
    >
      <img src={btnPlus} alt="" aria-hidden="true" className={styles.addIcon} />
      <span className={styles.addLabel}>기업 추가</span>
    </button>
  );
}
