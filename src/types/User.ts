export type UserRole = "admin" | "viewer";

export interface User {
  id: string;
  name: string;
  role: UserRole;
}
