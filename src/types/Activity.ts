export type ActivityType = "create" | "edit" | "summarize" | "draft";

/**
 * Activity interface represents a user activity in the application.
 * It includes the activity type, user information, report ID (if applicable),
 * timestamp, and any additional metadata.
 */
export interface Activity {
  id: string;
  userId: string;
  userName: string;
  type: ActivityType;
  reportId?: string;
  timestamp: string;
  meta?: Record<string, any>;
}
