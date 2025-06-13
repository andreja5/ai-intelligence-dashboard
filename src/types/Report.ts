/**
 * Report interface defines the structure of a report object
 * used in the application.
 * It includes properties for the report ID, title, content,
 * and creation date.
 */
export interface Report {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

/**
 * ReportContextType defines the structure of the report context
 * used in the application for managing reports.
 * It includes methods for loading, adding, updating, deleting,
 * and summarizing reports, as well as state for loading status
 * and the list of reports.
 */
export interface ReportContextType {
  loading: boolean;
  reports: Report[] | undefined;
  deleteReport: (id: string) => void;
  summarizeReport: (id: string) => void;
  updateReport: (report: Report) => void;
  setLoading: (loading: boolean) => void;
  setReports: (reports: Report[]) => void;
  addReport: (report: Omit<Report, "id" | "createdAt">) => void;
}
