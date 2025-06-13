import type { ModalDataMap } from "../types/ModalDataMap";

export const mockData: { [K in keyof ModalDataMap]: ModalDataMap[K] } = {
  create: undefined,
  edit: {
    id: "mock-id",
    title: "Mock Report Title",
    content: "<p>This is mock content.</p>",
    createdAt: new Date().toISOString(),
  },
  generateDraft: {
    prompt: "Generate a business pitch for a wellness startup.",
  },
};
