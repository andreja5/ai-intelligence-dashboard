import type { Report } from "../types/Report";

export const mockFetchReports = (
  query = "",
  delay = 800
): Promise<Report[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const stored = localStorage.getItem("ai-dashboard-reports");
      const reports: Report[] = stored ? JSON.parse(stored) : [];

      const filtered = query
        ? reports.filter((r) =>
            r.title.toLowerCase().includes(query.toLowerCase())
          )
        : reports;

      resolve(filtered);
    }, delay);
  });
};
