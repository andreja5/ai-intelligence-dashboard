import { CreateReportModal } from "../CreateReportModal";
import { useModal } from "../../../context/modal/ModalContext";

export const ModalRenderer = () => {
  const { modalType, modalData, isOpen, closeModal } = useModal();

  switch (modalType) {
    case "create":
      return <CreateReportModal open={isOpen} onClose={closeModal} />;
    case "edit":
      return (
        <CreateReportModal
          open={isOpen}
          onClose={closeModal}
          report={modalData}
        />
      );
    default:
      return null;
  }
};
