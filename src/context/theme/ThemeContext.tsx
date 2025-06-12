import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
  CssBaseline,
} from "@mui/material";

type Mode = "light" | "dark";

interface ThemeContextType {
  mode: Mode;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeMode = () => {
  const context = useContext(ThemeContext);

  if (!context)
    throw new Error("useThemeMode must be used within ThemeModeProvider");

  return context;
};

export const ThemeModeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<Mode>("light");

  const toggleMode = () =>
    setMode((prev) => (prev === "light" ? "dark" : "light"));

  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode,
        background: {
          default: mode === "light" ? "#ffffff" : "#000000",
          paper: mode === "light" ? "#f0f0f0" : "#1c1c1c",
        },
        text: {
          primary: mode === "light" ? "#000000" : "#ffffff",
        },
        primary: {
          main: mode === "light" ? "#000000" : "#ffffff", // Didn't spend time deciding on a primary color, so using black
        },
        secondary: {
          main: "#888888",
        },
      },
      typography: {
        fontFamily: "Inter, Roboto, sans-serif",
      },
      shape: {
        borderRadius: 12,
      },
    });
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
