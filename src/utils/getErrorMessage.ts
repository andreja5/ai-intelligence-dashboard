/**
 * Extracts a human-readable error message from an unknown error value.
 *
 * @param error - The error value to extract the message from. Can be of any type.
 * @returns A string representing the error message. If the error is an instance of `Error`, returns its message.
 *          If the error is a string, returns it directly. If the error is an object, returns its JSON string representation.
 *          Otherwise, returns a generic unknown error message.
 */
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;

  if (typeof error === "string") return error;

  if (typeof error === "object" && error !== null) {
    return JSON.stringify(error);
  }

  return "An unknown error occurred";
};
