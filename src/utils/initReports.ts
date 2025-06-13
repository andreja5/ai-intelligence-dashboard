import type { Report } from "../types/Report";

/**
 * initializeSampleReports function creates an array of sample reports.
 *
 * @returns An array of sample reports with unique IDs and current timestamps.
 */
export const initializeSampleReports = (): Report[] => {
  return [
    {
      id: crypto.randomUUID(),
      title: "First Sample Report",
      content: "<p>This is a sample report content.</p>",
      createdAt: new Date().toISOString(),
    },
    {
      id: crypto.randomUUID(),
      title: "Second Sample Report",
      content: "<p>This is a second sample report content.</p>",
      createdAt: new Date().toISOString(),
    },
    {
      id: crypto.randomUUID(),
      title: "Third Sample Report",
      content: "<p>This is a third sample report content.</p>",
      createdAt: new Date().toISOString(),
    },
  ];
};
