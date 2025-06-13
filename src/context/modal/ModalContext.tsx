import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { ModalDataMap, ModalType } from "../../types/ModalDataMap";
import type { Report } from "../../types/Report";
import { mockData } from "../../mocks/mockModalData";

interface ModalContextValue {
  openModal: <T extends ModalType>(type: T, payload?: ModalDataMap[T]) => void;
  closeModal: () => void;
  modalType: ModalType | null;
  modalData?: ModalDataMap[ModalType];
  isOpen: boolean;
}

type ModalState =
  | { type: null; data?: undefined }
  | { type: "create"; data?: undefined }
  | { type: "edit"; data: Report }
  | { type: "generateDraft"; data: { prompt: string } };

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

/**
 * ModalProvider component provides a context for managing modals.
 * It allows components to open and close modals with specific types and data.
 *
 * @param {ReactNode} children - The child components to be wrapped by the provider.
 * @returns {JSX.Element} The ModalProvider component.
 */
export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<ModalState>({ type: null });

  const openModal = useCallback(
    <T extends ModalType>(type: T, payload?: ModalDataMap[T]) => {
      const data = payload ?? mockData[type];

      setState({ type, data } as ModalState);
    },
    []
  );

  const closeModal = () => {
    setState({ type: null });
  };

  const isOpen = state.type !== null;

  return (
    <ModalContext.Provider
      value={{
        modalType: state.type,
        modalData: state.data,
        openModal,
        closeModal,
        isOpen,
      }}
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
