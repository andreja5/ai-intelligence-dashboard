import ReportModal from "../../components/report-modal/ReportModal";
import DraftModal from "../../components/draft-modal/DraftModal";
import { useModal } from "../../context/modal/ModalContext";
import { isGenerateDraftData } from "../../types/isGenerateDraftData";
import type { Report } from "../../types/Report";
export const ModalRenderer = () => {
  const { modalType, modalData, isOpen, closeModal } = useModal();

  switch (modalType) {
    case "create":
    case "edit":
      return (
        <ReportModal
          open={isOpen}
          onClose={closeModal}
          report={modalType === "edit" ? (modalData as Report) : undefined}
        />
      );
    case "generateDraft":
      return (
        <DraftModal
          open={isOpen}
          onClose={closeModal}
          initialPrompt={
            modalType === "generateDraft" && isGenerateDraftData(modalData)
              ? modalData?.prompt
              : undefined
          }
        />
      );
    default:
      return null;
  }
};
