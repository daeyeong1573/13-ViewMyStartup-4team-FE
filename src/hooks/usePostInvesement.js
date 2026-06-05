import investmentService from "@/services/investmentService";

export default function usePostInvesement() {
  async function postInvesement(data = {}) {
    try {
      const result = await investmentService.createInvestment(data);
      return result;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }

  return { postInvesement };
}
