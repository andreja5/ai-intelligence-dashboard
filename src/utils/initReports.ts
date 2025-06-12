import type { Report } from "../types/Report";

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
