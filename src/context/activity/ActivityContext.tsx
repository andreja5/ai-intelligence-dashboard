import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useCallback,
} from "react";
import type { Activity, ActivityType } from "../../types/Activity";
import { useUser } from "../user/UserContext";

const ActivityContext = createContext<
  | {
      activities: Activity[];
      logActivity: (
        type: ActivityType,
        reportId?: string,
        meta?: Record<string, any>
      ) => void;
    }
  | undefined
>(undefined);

const LOCAL_ACTIVITY_KEY = "app_activities";

/**
 * ActivityProvider component provides a context for managing user activities.
 * It allows logging activities and retrieving the list of activities.
 *
 * @param {ReactNode} children - The child components to be wrapped by the provider.
 * @returns {JSX.Element} The ActivityProvider component.
 */
export const ActivityProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();

  const [activities, setActivities] = useState<Activity[]>(() => {
    const saved = localStorage.getItem(LOCAL_ACTIVITY_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const logActivity = useCallback(
    (type: ActivityType, reportId?: string, meta?: Record<string, any>) => {
      const activity: Activity = {
        id: crypto.randomUUID(),
        userId: user.id,
        userName: user.name,
        type,
        reportId,
        timestamp: new Date().toISOString(),
        meta,
      };

      const updated = [activity, ...activities];

      setActivities(updated);
      localStorage.setItem(LOCAL_ACTIVITY_KEY, JSON.stringify(updated));
    },
    [user, activities]
  );

  return (
    <ActivityContext.Provider value={{ activities, logActivity }}>
      {children}
    </ActivityContext.Provider>
  );
};

export const useActivity = () => {
  const context = useContext(ActivityContext);

  if (!context)
    throw new Error("useActivity must be used within ActivityProvider");

  return context;
};
