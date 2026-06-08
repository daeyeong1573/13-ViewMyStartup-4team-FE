import { StartupDetailApi } from "@/services/startupDetailService";
import { useState } from "react";

export function useInvestmentModalActions(startupId, refetch) {
  const [password, setPassword] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [openKebabId, setOpenKebabId] = useState(null);
  const [selectedInvestment, setSelectedInvestment] = useState(null);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isErrorPopupOpen, setIsErrorPopupOpen] = useState(false);
  const [successModal, setSuccessModal] = useState({
    isOpen: false,
    message: "",
  });

  function handleOpenDeleteModal(id) {
    setDeletingId(id);
    setIsDeleteModalOpen(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false);
    setDeletingId(null);
    setPassword("");
  }

  function handleOpenEditModal(item) {
    setSelectedInvestment(item);
    setIsEditModalOpen(true);
    setOpenKebabId(null);
  }

  function handleCloseEditModal() {
    setIsEditModalOpen(false);
    setSelectedInvestment(null);
  }

  async function handleConfirmDelete() {
    try {
      await StartupDetailApi.deleteInvestment(deletingId, password);
      console.log(`${deletingId} 항목 삭제 실행`);
      handleCloseDeleteModal();
      refetch();
    } catch (error) {
      console.error(error.message);
      setIsDeleteModalOpen(false);
      setIsErrorPopupOpen(true);
      setPassword("");
    }
  }

  async function handleConfirmEdit(submittedData) {
    try {
      await StartupDetailApi.updateInvestment(selectedInvestment.id, {
        investorName: submittedData.investorName,
        amount: submittedData.amount,
        comment: submittedData.comment,
        password: submittedData.password,
      });
      handleCloseEditModal();

      setSuccessModal({
        isOpen: true,
        message: "투자 정보가 수정되었어요!",
      });

      refetch();
    } catch (error) {
      console.error(error.message);
      alert(error.message || "수정에 실패했습니다.");
    }
  }

  async function handleCreateInvestmentSubmit(submittedData) {
    try {
      (await StartupDetailApi.createInvestment({
        startupId,
        investorName: submittedData.investorName,
        amount: submittedData.amount,
        comment: submittedData.comment,
        password: submittedData.password,
      }),
        setIsCreateModalOpen(false));

      setSuccessModal({
        isOpen: true,
        message: "투자가 완료되었어요!",
      });

      refetch();
    } catch (error) {
      console.error(error.message);
      alert(error.message || "투자 생성에 실패했습니다.");
    }
  }

  return {
    state: {
      password,
      selectedInvestment,
      openKebabId,
      isCreateModalOpen,
      isEditModalOpen,
      isDeleteModalOpen,
      isErrorPopupOpen,
      successModal,
    },
    handlers: {
      handleCreateInvestmentSubmit,
      setIsCreateModalOpen,
      handleOpenEditModal,
      handleCloseEditModal,
      handleConfirmEdit,
      handleOpenDeleteModal,
      handleCloseDeleteModal,
      handleConfirmDelete,
      setIsErrorPopupOpen,
      setOpenKebabId,
      setPassword,
      setSuccessModal,
    },
  };
}
