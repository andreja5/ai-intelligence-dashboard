export interface Report {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export interface ReportContextType {
  reports: Report[];
  addReport: (report: Omit<Report, "id" | "createdAt">) => void;
  updateReport: (id: string, updates: Partial<Report>) => void;
  deleteReport: (id: string) => void;
  reorderReports: (ids: string[]) => void;
}
