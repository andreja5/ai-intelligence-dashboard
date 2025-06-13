import type { ChangeEvent } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useThemeMode } from "../../context/theme/ThemeContext";
import { useModal } from "../../context/modal/ModalContext";
import { useUser } from "../../context/user/UserContext";

interface Props {
  onSearchChange: (value: string) => void;
}

/**
 * Header component
 *
 * Displays the dashboard title, a search input, a button to create a new report,
 * and a theme toggle button (light/dark mode).
 *
 * @param {object} props - Component props.
 * @param {(value: string) => void} props.onSearchChange - Callback fired when the search input value changes.
 *
 * @returns {JSX.Element} The rendered header component.
 */
export const Header = ({ onSearchChange }: Props) => {
  const { user } = useUser();
  const { openModal } = useModal();
  const { mode, toggleMode } = useThemeMode();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  return (
    <Box
      sx={{
        mb: 3,
        gap: 2,
        display: "flex",
        alignItems: { sm: "center" },
        justifyContent: "space-between",
        flexDirection: { xs: "column", sm: "row" },
      }}
    >
      <Typography
        variant="h4"
        fontWeight={600}
        textAlign={{ xs: "center", lg: "left" }}
      >
        Intelligence Dashboard
      </Typography>

      <Stack
        spacing={2}
        direction="row"
        width={{ xs: "100%", md: "auto" }}
        justifyContent={{ xs: "center", lg: "left" }}
      >
        <TextField
          size="small"
          color="primary"
          variant="outlined"
          label="Search Reports"
          onChange={handleInputChange}
        />

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          disabled={user.role === "viewer"}
          onClick={() => openModal("create")}
        >
          Create
        </Button>

        <IconButton onClick={toggleMode}>
          {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </Stack>
    </Box>
  );
};
