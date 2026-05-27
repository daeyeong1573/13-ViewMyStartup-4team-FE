import React from "react";
import styles from "./MyCompanyModalItem.module.css";
import CompanyListItem from "@/components/ui/CompanyListItem";

export default function MyCompanyModalItem({
  title = "",
  total = 0,
  list = {},
  handleClick,
  buttonText = "선택하기",
  status = "active",
  variant = "outline",
  selectedIds = [], // ← 추가: 이미 선택된 기업 id 배열
}) {
  return (
    <>
      <h3 className={styles.modalHeader}>
        {title} ({total})
      </h3>
      {list.map((company) => {
        const isSelected = selectedIds.includes(company.id); // ← 선택 여부 판별

        return (
          <CompanyListItem
            key={company.id}
            image={company.imgUrl}
            name={company.name}
            category={company.category}
            variant={variant}
            status={isSelected ? "done" : status} // ← 분기
            buttonText={isSelected ? "선택완료" : buttonText} // ← 분기
            onButtonClick={() => handleClick(company)}
          />
        );
      })}
    </>
  );
}
