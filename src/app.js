import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { PageLoader } from "./components/page-loader";
import { AuthenticationGuard } from "./components/authentication-guard";
import { AdminPage } from "./pages/admin-page";
import { CallbackPage } from "./pages/callback-page";
import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile";
import { ProtectedPage } from "./pages/protected-page";
import { PublicPage } from "./pages/public-page";
import { PetsPage } from "./pages/pets-page";
import { CssBaseline, Container } from "@mui/material";
import { Navbar } from "./components/Navbar";

export const App = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="page-layout">
        <PageLoader />
      </div>
    );
  }

  return (
    <CssBaseline>
    <Container>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/profile"
        element={<AuthenticationGuard component={Profile} />}
      />
      <Route path="/public" element={<PublicPage />} />
      <Route path="/pets" element={<PetsPage />} />
      <Route
        path="/protected"
        element={<AuthenticationGuard component={ProtectedPage} />}
      />
      <Route
        path="/admin"
        element={<AuthenticationGuard component={AdminPage} />}
      />
      <Route path="/callback" element={<CallbackPage />} />
    </Routes>
    </Container>
    </CssBaseline>
    
  );
};