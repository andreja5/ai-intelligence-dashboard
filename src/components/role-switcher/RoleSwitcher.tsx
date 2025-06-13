import { useUser } from "../../context/user/UserContext";
import { Button, Stack, Typography } from "@mui/material";

/**
 * RoleSwitcher component allows users to switch between "admin" and "viewer" roles.
 * It displays the current role and provides buttons to change the role.
 *
 * @returns {JSX.Element} The RoleSwitcher component.
 */
export const RoleSwitcher = () => {
  const { user, setUserRole } = useUser();

  return (
    <Stack
      spacing={2}
      direction="row"
      alignItems="center"
      justifyContent={{ xs: "center", lg: "flex-start" }}
    >
      <Typography variant="h6">
        Current Role: <strong>{user.role.toUpperCase()}</strong>
      </Typography>

      <Button variant="outlined" onClick={() => setUserRole("admin")}>
        Admin
      </Button>
      <Button variant="outlined" onClick={() => setUserRole("viewer")}>
        Viewer
      </Button>
    </Stack>
  );
};
