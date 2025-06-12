export interface Report {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export interface ReportContextType {
  reports: Report[] | undefined;
  addReport: (report: Omit<Report, "id" | "createdAt">) => void;
  updateReport: (report: Report) => void;
  deleteReport: (id: string) => void;
  reorderReports: (ids: string[]) => void;
  loading: boolean;
}
