export interface Report {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export interface ReportContextType {
  loading: boolean;
  reports: Report[] | undefined;
  deleteReport: (id: string) => void;
  summarizeReport: (id: string) => void;
  updateReport: (report: Report) => void;
  reorderReports: (ids: string[]) => void;
  setReports: (reports: Report[]) => void;
  addReport: (report: Omit<Report, "id" | "createdAt">) => void;
}
