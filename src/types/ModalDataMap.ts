import type { Report } from "./Report";

export type ModalType = "create" | "edit" | "generateDraft";

export type ModalDataMap = {
  create: undefined;
  edit: Report;
  generateDraft: { prompt: string };
};
