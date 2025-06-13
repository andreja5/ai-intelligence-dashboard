import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
  useCallback,
  useMemo,
} from "react";
import type { User, UserRole } from "../../types/User";

const LOCAL_USER_KEY = import.meta.env.VITE_LOCAL_USER_KEY || "app_user";

interface UserContextValue {
  user: User;
  isAdmin: boolean;
  isViewer: boolean;
  setUserRole: (role: UserRole) => void;
}

const defaultUser: User = {
  id: "1",
  name: "Dev User",
  role: "viewer", // default
};

const UserContext = createContext<UserContextValue | undefined>(undefined);

/**
 * UserProvider component provides a context for managing user state.
 * It allows components to access user information and update the user's role.
 *
 * @param {ReactNode} children - The child components to be wrapped by the provider.
 * @returns {JSX.Element} The UserProvider component.
 */
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(defaultUser);

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_USER_KEY);
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  const setUserRole = useCallback((role: UserRole) => {
    setUser((prev) => {
      const updated = { ...prev, role };
      localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const value: UserContextValue = useMemo(
    () => ({
      user,
      isAdmin: user.role === "admin",
      isViewer: user.role === "viewer",
      setUserRole,
    }),
    [user, setUserRole]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) throw new Error("useUser must be used within UserProvider");

  return context;
};
