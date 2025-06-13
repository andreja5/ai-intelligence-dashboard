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
import { useToast } from "../notifications/ToastContext";
import { getErrorMessage } from "../../utils/getErrorMessage";

const LOCAL_KEY =
  import.meta.env.VITE_LOCAL_STORAGE_KEY || "ai-dashboard-reports";
const INIT_KEY =
  import.meta.env.VITE_LOCAL_STORAGE_INIT_KEY ||
  "ai-dashboard-reports-initialized";
const VITE_API_URL = import.meta.env.VITE_API_URL;

const ReportContext = createContext<ReportContextType | undefined>(undefined);

/**
 * ReportProvider component provides a context for managing reports.
 * It handles fetching, adding, updating, deleting, and summarizing reports.
 *
 * @param {ReactNode} children - The child components to be wrapped by the provider.
 * @returns {JSX.Element} The ReportProvider component.
 */
export const ReportProvider = ({ children }: { children: ReactNode }) => {
  const [reports, setReports] = useState<Report[] | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const { showToast } = useToast();

  const summarizeReport = useCallback(
    async (id: string) => {
      const target = reports?.find((r) => r.id === id);

      if (!target) return;

      try {
        // Call API to summarize content
        const res = await fetch(`${VITE_API_URL}/api/summarize`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: target.content }),
        });

        const data = await res.json();

        if (data.error) {
          throw new Error(data.error || "Failed to summarize content");
        }

        const summary =
          data.choices?.[0]?.message?.content || "No summary available.";

        // Update the specific report
        const updated = reports?.map((r) =>
          r.id === id ? { ...r, summary } : r
        );

        // Update state and localStorage
        setReports(updated);

        localStorage.setItem(LOCAL_KEY, JSON.stringify(updated));
      } catch (error) {
        const errorMessage = getErrorMessage(error);

        showToast(errorMessage);
      }
    },
    [reports]
  );

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

  // Improvements: Add caching
  const fetchReports = useCallback(async () => {
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
      const errorMessage = getErrorMessage(error);

      console.error("Failed to fetch reports:", errorMessage);
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
    setLoading,
    setReports,
    updateReport,
    deleteReport,
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
