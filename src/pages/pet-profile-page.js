import { useLocation, useNavigate } from "react-router-dom";
import { PageLayout } from "../components/page-layout";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import {
  deletePetResource,
  updatePetResource,
} from "../services/message.service";

export const PetProfilePage = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const location = useLocation();
  const navigate = useNavigate();
  const [petData, setPetData] = useState(location.state);

  useEffect(() => {
    setPetData(location.state);
  }, [location.state]);

  const handlePetUpdateButton = () => {
    navigate("/updatePetProfile", { state: { petData } });
  };

  const handleDeletePetProfile = async (id) => {
    const accessToken = await getAccessTokenSilently();
    await deletePetResource(accessToken, id);
    navigate("/pets");
  };

  const handleAdoptPet = async (id) => {
    const updatedPet = {
      availability: "not available",
    };
    console.log(updatedPet);
    const accessToken = await getAccessTokenSilently();
    const { data, error } = await updatePetResource(
      accessToken,
      id,
      updatedPet
    );
    if (data && !error) {
      setPetData((prevData) => ({
        ...prevData,
        availability: updatedPet.availability,
      }));
    }
  };

  return (
    <PageLayout>
      <div className="content-layout">
        <h1 id="page-title" className="content__title">
          Pet Profile Page
        </h1>
        <img
          style={{ height: "auto", width: "50%" }}
          src={petData.images[0]}
          alt={petData.breed}
        />
        <div className="content__body">
          <p>{petData.description}</p>

          <ul>
            <li>
              <strong>Type of animal: </strong> {petData.typeAnimal}
            </li>
            <li>
              <strong>Good with children: </strong>{" "}
              {petData.goodWithChildren ? "Yes" : "No"}
            </li>
            <li>
              <strong>Good with other animals: </strong>{" "}
              {petData.goodWithAnimals ? "Yes" : "No"}
            </li>
            <li>
              <strong>Needs to be leashed at all times: </strong>{" "}
              {petData.leashedAllTimes ? "Yes" : "No"}
            </li>
            <li>
              <strong>Availability: </strong> {petData.availability}
            </li>
          </ul>
          {user?.role === "admin" && (
            <>
              <button onClick={handlePetUpdateButton}>Update</button>
              <button onClick={() => handleDeletePetProfile(petData.id)}>
                Delete
              </button>
            </>
          )}
          {user?.role === "user" && (
            <button
              onClick={() => handleAdoptPet(petData.id)}
              disabled={petData.availability.toLowerCase() !== "available"}
            >
              Adopt
            </button>
          )}
        </div>
      </div>
    </PageLayout>
  );
};
