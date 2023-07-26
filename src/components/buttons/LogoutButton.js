import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Button } from "@mui/material";

export const LogoutButton = () => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <Button sx={{ mx: 8 }}variant="outlined" onClick={handleSignUp}>Sign up</Button>
  );
};
