export const isGenerateDraftData = (
  data: unknown
): data is { prompt: string } => {
  return typeof data === "object" && data !== null && "prompt" in data;
};
