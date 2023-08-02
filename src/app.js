import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { PageLoader } from "./components/page-loader";
import { AuthenticationGuard } from "./components/authentication-guard";
import { CallbackPage } from "./pages/callback-page";
import { HomePage } from "./pages/home-page";
import { NotFoundPage } from "./pages/not-found-page";
import { ProfilePage } from "./pages/profile-page";
import { PetsPage } from "./pages/pets-page";
import { AddPetPage } from "./pages/add-pet-page";
import { PetProfilePage } from "./pages/pet-profile-page";

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
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/profile"
        element={<AuthenticationGuard component={ProfilePage} />}
      />
      <Route path="/pets" element={<PetsPage />} />
      <Route
        path="/addPet"
        element={<AuthenticationGuard component={AddPetPage} />}
      />
      <Route
        path="/petProfile"
        element={<AuthenticationGuard component={PetProfilePage} />}
      />
      <Route
        path="/pets"
        element={<AuthenticationGuard component={PetsPage} />}
      />
      <Route path="/callback" element={<CallbackPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};