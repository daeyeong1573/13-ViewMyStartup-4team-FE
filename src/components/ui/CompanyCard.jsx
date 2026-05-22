import styles from "./CompanyCard.module.css";
import defaultLogo from "@/assets/images/default_image.png";
import MinusIcon from "./MinusIcon";

function CompanyCard({ image, name, category, onRemove, singleSelect }) {
  const handleRemove = (e) => {
    e.stopPropagation();
    if (onRemove) onRemove();
  };

  const container = singleSelect
    ? styles.myCompanyContainer
    : styles.compareCompanycontainer;

  return (
    <div className={container}>
      {!singleSelect && (
        <button
          className={styles.removeButton}
          onClick={handleRemove}
          aria-label="기업 제거"
        >
          <MinusIcon className={styles.minusIcon} />
        </button>
      )}
      <div className={styles.contentBox}>
        <div className={styles.imageWrapper}>
          <img
            src={image || defaultLogo}
            alt={`기업 ${name} 로고`}
            className={styles.logoImage}
            onError={(e) => {
              e.target.src = defaultLogo;
            }}
          />
        </div>

        <div className={styles.infoBox}>
          <span className={styles.companyName}>{name}</span>
          <span className={styles.categoryText}>{category}</span>
        </div>
      </div>
    </div>
  );
}

export default CompanyCard;
