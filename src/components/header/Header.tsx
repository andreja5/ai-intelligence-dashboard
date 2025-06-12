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

interface Props {
  onSearchChange: (value: string) => void;
  onCreateClick: () => void;
}

export const Header = ({ onSearchChange, onCreateClick }: Props) => {
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
      <Typography variant="h4" fontWeight={600}>
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
          onClick={onCreateClick}
        >
          New Report
        </Button>

        <IconButton onClick={toggleMode}>
          {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </Stack>
    </Box>
  );
};
