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
import { mockFetchReports } from "../../utils/mockFetch";

const LOCAL_KEY =
  import.meta.env.VITE_LOCAL_STORAGE_KEY || "ai-dashboard-reports";
const INIT_KEY =
  import.meta.env.VITE_LOCAL_STORAGE_INIT_KEY ||
  "ai-dashboard-reports-initialized";

const ReportContext = createContext<ReportContextType | undefined>(undefined);

export const ReportProvider = ({ children }: { children: ReactNode }) => {
  const [reports, setReports] = useState<Report[] | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const summarizeReport = useCallback((id: string) => {
    // trigger summary logic here or in modal
  }, []);

  const addReport = useCallback((report: Omit<Report, "id" | "createdAt">) => {
    const newReport: Report = {
      ...report,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };

    setReports((prev) => {
      const updated = [...(prev ?? []), newReport];
      localStorage.setItem(LOCAL_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const updateReport = useCallback((updatedReport: Report) => {
    setReports((prevReports) => {
      if (!prevReports) return prevReports;

      const updatedReports = prevReports.map((report) =>
        report.id === updatedReport.id ? updatedReport : report
      );

      localStorage.setItem(LOCAL_KEY, JSON.stringify(updatedReports));

      return updatedReports;
    });
  }, []);

  const deleteReport = useCallback((id: string) => {
    setReports((prev) => {
      const updated = prev?.filter((r) => r.id !== id);
      localStorage.setItem("ai-dashboard-reports", JSON.stringify(updated));

      return updated;
    });
  }, []);

  const reorderReports = useCallback((ids: string[]) => {
    setReports((prev) =>
      ids.map((id) => prev?.find((r) => r.id === id)!).filter(Boolean)
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
        const fetchedReports: Report[] = await mockFetchReports();

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
    loading,
    reports,
    addReport,
    setReports,
    updateReport,
    deleteReport,
    reorderReports,
    fetchReports,
    summarizeReport,
  };

  return (
    <ReportContext.Provider value={value}>{children}</ReportContext.Provider>
  );
};

export const useReportContext = (): ReportContextType => {
  const context = useContext(ReportContext);

  if (!context)
    throw new Error("useReports must be used within a ReportProvider");

  return context;
};
