import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Button } from "@mui/material";

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/profile",
      },
      authorizationParams: {
        prompt: "login",
      },
    });
  };

  return (
    <Button sx={{ mx: 8 }} variant="outlined" onClick={handleLogin}>Login</Button>
  );
};
