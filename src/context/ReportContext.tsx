import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import type { Report, ReportContextType } from "../types/Report";

const ReportContext = createContext<ReportContextType | undefined>(undefined);

export const ReportProvider = ({ children }: { children: ReactNode }) => {
  const [reports, setReports] = useState<Report[]>([]);

  const addReport = useCallback((report: Omit<Report, "id" | "createdAt">) => {
    setReports((prev) => [
      ...prev,
      {
        ...report,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      },
    ]);
  }, []);

  const updateReport = useCallback((id: string, updates: Partial<Report>) => {
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...updates } : r))
    );
  }, []);

  const deleteReport = useCallback((id: string) => {
    setReports((prev) => prev.filter((r) => r.id !== id));
  }, []);

  const reorderReports = useCallback((ids: string[]) => {
    setReports((prev) =>
      ids.map((id) => prev.find((r) => r.id === id)!).filter(Boolean)
    );
  }, []);

  const value = {
    reports,
    addReport,
    updateReport,
    deleteReport,
    reorderReports,
  };

  return (
    <ReportContext.Provider value={value}>{children}</ReportContext.Provider>
  );
};

export const useReports = (): ReportContextType => {
  const context = useContext(ReportContext);

  if (!context)
    throw new Error("useReports must be used within a ReportProvider");

  return context;
};
