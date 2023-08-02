import { useLocation } from "react-router-dom";
import { PageLayout } from "../components/page-layout";
import { useAuth0 } from "@auth0/auth0-react";

export const UpdatePetProfilePage = () => {
  const { user } = useAuth0();
  const location = useLocation();
  const petData = location.state;
  console.log(petData);

  return (
    <PageLayout>
      <div className="content-layout">
        <h1 id="page-title" className="content__title">
          Update Pet Profile Page
        </h1>
        <div className="content__body"></div>
      </div>
    </PageLayout>
  );
};
