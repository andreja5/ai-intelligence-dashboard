import type { Report } from "../types/Report";

/**
 * Mock function to simulate fetching reports from local storage.
 *
 * @param query - The search query to filter reports by title.
 *                If empty, returns all reports.
 *                If provided, filters reports whose titles include the query (case-insensitive).
 * @param delay - The delay in milliseconds before resolving the promise.
 *                Defaults to 800ms to simulate network latency.
 *                Adjust this value to simulate faster or slower responses.
 * @returns A promise that resolves to an array of Report objects.
 *          If no reports are found, returns an empty array.
 */
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
