import styles from "./CompanyListItem.module.css";
import Button from "./Button.jsx";
import defaultLogo from "@/assets/images/default_image.png";

function CompanyListItem({
  image,
  name,
  category,
  variant,
  status,
  onButtonClick,
  buttonText,
}) {
  return (
    <div className={styles.container}>
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
          <div className={styles.companyName}>{name}</div>
          <div className={styles.categoryText}>{category}</div>
        </div>
      </div>
      <Button variant={variant} status={status} onClick={onButtonClick}>
        {buttonText}
      </Button>
    </div>
  );
}

export default CompanyListItem;
