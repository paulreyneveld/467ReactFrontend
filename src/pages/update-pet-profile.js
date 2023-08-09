import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { PageLayout } from "../components/page-layout";
import { useAuth0 } from "@auth0/auth0-react";
import { updatePetResource } from "../services/message.service";

export const UpdatePetProfilePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { petData } = location.state;

  const { getAccessTokenSilently } = useAuth0();

  const [typeAnimal, setTypeAnimal] = useState(petData.typeAnimal);
  const [breed, setBreed] = useState(petData.breed);
  const [description, setDescription] = useState(petData.description);
  const [images, setImages] = useState([]);
  const [goodWithAnimals, setGoodWithAnimals] = useState(petData.goodWithAnimals);
  const [goodWithChildren, setGoodWithChildren] = useState(petData.goodWithChildren);
  const [leashedAllTimes, setLeashedAllTimes] = useState(petData.leashedAllTimes);

  const [imageFile, setImageFile] = useState("")
  const inputFile = useRef(null);

  const updatePet = async (event) => {
    event.preventDefault();

    let formData = new FormData();
    formData.append("typeAnimal", typeAnimal);
    formData.append("breed", breed);
    formData.append("description", description);
    formData.append("images", images);
    formData.append("goodWithAnimals", goodWithAnimals);
    formData.append("goodWithChildren", goodWithChildren);
    formData.append("leashedAllTimes", leashedAllTimes);
    formData.append("file", imageFile);

    const accessToken = await getAccessTokenSilently();
    const { data, error } = await updatePetResource(accessToken, petData.id, formData);

    setTypeAnimal("dog");
    setBreed("");
    setDescription("");
    setGoodWithAnimals(false);
    setGoodWithChildren(false);
    setLeashedAllTimes(false);
    setImageFile("");

    // TODO: Error handling.
    if (data) {
      console.log("data:", data);
      alert("Pet updated successfully!");
      navigate("/petProfile", { state: data });
    }

    if (error) {
      console.log("Error: " + error.message);
      alert("Error: " + error.message);
    }
  };

  const handleTypeAnimalChange = (event) => {
    setTypeAnimal(event.target.value);
  };

  const handleBreedChange = (event) => {
    setBreed(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleGoodWithAnimalsChange = (event) => {
    setGoodWithAnimals(event.target.checked);
  };

  const handleGoodWithChildrensChange = (event) => {
    setGoodWithChildren(event.target.checked);
  };

  const handleLeashedAtAllTimesChange = (event) => {
    setLeashedAllTimes(event.target.checked);
  };

  const handleFileChange = (event) => {
    const newImageFile = event.target.files[0]
    setImageFile(newImageFile)
  }

  const handleCreateButton = () => {
    inputFile.current.value = "";
  };

  return (
    <PageLayout>
      <div className="content-layout">
        <h1 id="page-title" className="content__title">
          Update Pet
        </h1>
        <div className="content__body">
          <form onSubmit={updatePet}>
          <img
          style={{ height: "auto", width: "50%" }}
          src={petData.images[0]}
          alt={petData.breed}
          />
            <div>
              <label>
                Animal Type:
                <br />
                <select
                  defaultValue={typeAnimal}
                  onChange={handleTypeAnimalChange}
                >
                  <option value="dog">Dog</option>
                  <option value="cat">Cat</option>
                  <option value="other">Other</option>
                </select>
              </label>
            </div>
            <br />
            <div>
              <label>
                Breed:
                <br />
                <input defaultValue={breed} onChange={handleBreedChange} />
              </label>
            </div>
            <br />
            <div>
              <label>
                Description:
                <br />
                <textarea
                  defaultValue={description}
                  onChange={handleDescriptionChange}
                  rows="15"
                  cols="95"
                />
              </label>
            </div>
            <br />
            <div>
              <label>
                Pet Image (PNG, JPG, or JPEG):
                <br />
                <input type='file' name='file' ref={inputFile} onChange={handleFileChange} />
              </label>
            </div>
            <br />
            <div className="disposition">
            Disposition
              <div>
                <label>
                  Good With Animals:
                  <input
                    type="checkbox"
                    checked={goodWithAnimals}
                    onChange={handleGoodWithAnimalsChange}
                  />
                </label>
              </div>
              <div>
                <label>
                  Good With Children:
                  <input
                    type="checkbox"
                    checked={goodWithChildren}
                    onChange={handleGoodWithChildrensChange}
                  />
                </label>
              </div>
              <div>
                <label>
                  Leashed At All Times:
                  <input
                    type="checkbox"
                    checked={leashedAllTimes}
                    onChange={handleLeashedAtAllTimesChange}
                  />
                </label>
              </div>
            </div>
            <button type="submit" className="button__create-pet" onClick={handleCreateButton}>
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </PageLayout>
  );
};
