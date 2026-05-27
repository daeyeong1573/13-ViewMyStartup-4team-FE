import React from "react";
import styles from "./MyCompanyModalItem.module.css";
import CompanyListItem from "@/components/ui/CompanyListItem";

export default function MyCompanyModalItem({
  title = "",
  total = 0,
  list = {},
  handleClick,
}) {
  return (
    <>
      <h3 className={styles.modalHeader}>
        {title} ({total})
      </h3>
      {list.map((company) => (
        <CompanyListItem
          key={company.id}
          image={company.imgUrl}
          name={company.name}
          category={company.category}
          variant="outline"
          status="active"
          buttonText="선택하기"
          onButtonClick={() => handleClick(company)}
        />
      ))}
    </>
  );
}
