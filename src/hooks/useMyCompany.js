import { useState } from "react";

export function useMyCompany() {
  const [myCompany, setMyCompany] = useState(null);

  const selectCompany = (company) => setMyCompany(company);
  const cancelCompany = () => setMyCompany(null);

  return { myCompany, selectCompany, cancelCompany };
}
