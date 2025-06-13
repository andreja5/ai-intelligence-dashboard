import { createContext, useContext, useState, type ReactNode } from "react";
import type { Report } from "../../types/Report";

type ModalType = "create" | "edit" | null;

interface ModalContextValue {
  openModal: (type: ModalType, payload?: Report) => void;
  closeModal: () => void;
  modalType: ModalType;
  modalData?: Report;
  isOpen: boolean;
}

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

/**
 * ModalProvider component provides a context for managing modals.
 * It allows components to open and close modals with specific types and data.
 *
 * @param {ReactNode} children - The child components to be wrapped by the provider.
 * @returns {JSX.Element} The ModalProvider component.
 */
export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalType, setModalType] = useState<ModalType>(null);
  const [modalData, setModalData] = useState<Report | undefined>(undefined);

  const openModal = (type: ModalType, payload?: Report) => {
    setModalType(type);
    setModalData(payload);
  };

  const closeModal = () => {
    setModalType(null);
    setModalData(undefined);
  };

  const isOpen = modalType !== null;

  return (
    <ModalContext.Provider
      value={{ modalType, modalData, openModal, closeModal, isOpen }}
    >
      {children}
    </ModalContext.Provider>
  );
};

/**
 * useModal hook provides access to the modal context.
 *
 * @returns {ModalContextValue} The context value containing modal management functions and state.
 */
export const useModal = () => {
  const context = useContext(ModalContext);

  if (!context) throw new Error("useModal must be used within ModalProvider");

  return context;
};
