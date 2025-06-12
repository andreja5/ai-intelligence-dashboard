import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
  useEffect,
} from "react";
import type { Report, ReportContextType } from "../../types/Report";
import { initializeSampleReports } from "../../utils/initReports";

const LOCAL_KEY = "ai-dashboard-reports";
const INIT_KEY = "reportsInitialized";

const ReportContext = createContext<ReportContextType | undefined>(undefined);

export const ReportProvider = ({ children }: { children: ReactNode }) => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(false);

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
    setReports((prev) => {
      const updated = prev.filter((r) => r.id !== id);
      localStorage.setItem("ai-dashboard-reports", JSON.stringify(updated));

      return updated;
    });
  }, []);

  const reorderReports = useCallback((ids: string[]) => {
    setReports((prev) =>
      ids.map((id) => prev.find((r) => r.id === id)!).filter(Boolean)
    );
  }, []);

  const fetchReports = useCallback(async () => {
    // Improvements: Add caching
    setLoading(true);
    try {
      const stored = localStorage.getItem(LOCAL_KEY);
      const isInitialized = localStorage.getItem(INIT_KEY) === "true";

      // Simulate fetching from an API
      if (!stored && !isInitialized) {
        const sampleReports: Report[] = initializeSampleReports();

        localStorage.setItem(LOCAL_KEY, JSON.stringify(sampleReports));
        localStorage.setItem(INIT_KEY, "true");

        setReports(sampleReports);
      } else {
        const fetchedReports: Report[] = stored ? JSON.parse(stored) : [];

        setReports(fetchedReports);
      }
    } catch (error) {
      console.error("Failed to fetch reports:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const value = {
    reports,
    addReport,
    updateReport,
    deleteReport,
    reorderReports,
    fetchReports,
    loading,
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
