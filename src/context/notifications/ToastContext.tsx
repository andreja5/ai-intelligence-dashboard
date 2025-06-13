import { createContext, useContext, useState, type ReactNode } from "react";
import { Snackbar, Alert, type AlertColor } from "@mui/material";

interface ToastContextValue {
  showToast: (message: string, severity?: AlertColor) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

/**
 * ToastProvider component provides a context for displaying toast notifications.
 * It uses Material-UI's Snackbar and Alert components to show messages.
 *
 * @param {ReactNode} children - The child components to be wrapped by the provider.
 * @returns {JSX.Element} The ToastProvider component.
 */
export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<AlertColor>("info");

  const showToast = (msg: string, type: AlertColor = "info") => {
    setMessage(msg);
    setSeverity(type);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
};

/**
 * useToast hook provides access to the toast notification context.
 * It allows components to show toast messages.
 *
 * @returns {ToastContextValue} The context value containing the showToast function.
 * @throws {Error} If used outside of a ToastProvider.
 */
export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) throw new Error("useToast must be used within a ToastProvider");

  return context;
};
