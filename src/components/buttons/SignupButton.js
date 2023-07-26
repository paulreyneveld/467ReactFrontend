import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Button } from "@mui/material"

export const SignupButton = () => {
  const { loginWithRedirect } = useAuth0();

  const handleSignUp = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/profile",
      },
      authorizationParams: {
        prompt: "login",
        screen_hint: "signup",
      },
    });
  };

  return (
      <Button sx={{ mx: 8 }}variant="outlined" onClick={handleSignUp}>Sign up</Button>
  );
};
