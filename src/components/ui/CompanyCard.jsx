import style from "./CompanyCard.module.css";
import defaultLogo from "../../assets/images/default_image.png";
import MinusIcon from "./MinusIcon";

function CompanyCard({ image, name, category, onRemove }) {
  const handleRemove = (e) => {
    e.stopPropagation();
    if (onRemove) onRemove();
  };

  return (
    <div className={style.container}>
      <button className={style.removeButton} onClick={handleRemove}>
        <MinusIcon className={style.minusIcon} />
      </button>

      <div className={style.contentBox}>
        <div className={style.imageWrapper}>
          <img
            src={image || defaultLogo}
            alt={`기업 ${name} 로고`}
            className={style.logoImage}
            onError={(e) => {
              e.target.src = defaultLogo;
            }}
          />
        </div>

        <div className={style.infoBox}>
          <span className={style.companyName}>{name}</span>
          <span className={style.categoryText}>{category}</span>
        </div>
      </div>
    </div>
  );
}

export default CompanyCard;
