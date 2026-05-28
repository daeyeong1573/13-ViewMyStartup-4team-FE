import MyCompanyApi from "@/services/myCompanyService";

const company = new MyCompanyApi();

export default function usePostCompareCompany() {
  async function postCompare(data = {}) {
    try {
      const result = await company.postCompareCompany(data);
      return result;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }

  return { postCompare };
}
