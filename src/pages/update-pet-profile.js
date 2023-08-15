import React, { useState } from "react";
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

  let dogBreeds = [
    {value: "german shepherd", text: "German Shepherd"},
    {value: "golden retriever", text: "Golden Retriever"},
    {value: "labrador", text: "Labrador"},
    {value: "pit bull", text: "Pit Bull"},
    {value: "french bulldog", text: "French Bulldog"},
    {value: "rottweiler", text: "Rottweiler"},
    {value: "beagle", text: "Beagle"},
    {value: "dachsund", text: "Dachsund"},
    {value: "boxer", text: "Boxer"},
    {value: "yorkie", text: "Yorkie"},
    {value: "poodle", text: "Poodle"},
    {value: "mixed dog breed", text: "Mixed Dog Breed"},
    {value: "other dog breed", text: "Other Dog Breed"},
  ]

  let catBreeds = [
    {value: "siamese", text: "Siamese"},
    {value: "persian", text: "Persian"},
    {value: "maine coon", text: "Maine Coon"},
    {value: "ragdoll", text: "Ragdoll"},
    {value: "bengal", text: "Bengal"},
    {value: "abyssinian", text: "Abyssinian"},
    {value: "birman", text: "Birman"},
    {value: "himalayan", text: "Himalayan"},
    {value: "american shorthair", text: "American Shorthair"},
    {value: "mixed cat breed", text: "Mixed Cat Breed"},
    {value: "other cat breed", text: "Other Cat Breed"},
  ]

  const [breedOptions, setBreedOptions] = useState(() => {
    if (typeAnimal === "dog") {
      return dogBreeds;
    }
    else if (typeAnimal === "cat") {
      return catBreeds;
    }
    else {
      return [{value: "other", text: "Other"}];
    };
  });

  const updatePet = async (event) => {
    event.preventDefault();

    if (!description) {
      alert("Error: Please enter a description");
      return;
    }

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

    setImageFile("");

    if (data) {
      // console.log("data:", data);
      alert("Pet updated successfully!");
      navigate("/petProfile", { state: data });
    }

    if (error) {
      // console.log("Error: " + error.message);
      alert("Error: " + error.message);
    }
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

  const handleAnimalTypeChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setTypeAnimal(value);

    if (value === "dog") {
      setBreedOptions(dogBreeds)
      setBreed("german shepherd")
    }
    else if (value === "cat") {
      setBreedOptions(catBreeds)
      setBreed("siamese")
    }
    else {
      setBreedOptions([{value: "other", text: "Other"}])
      setBreed("other")
    }
  };

  const handleBreedChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setBreed(value);
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
                  onChange={handleAnimalTypeChange}
                >
                  <option value="dog">Dog</option>
                  <option value="cat">Cat</option>
                  <option value="other">Other</option>
                </select>
              </label>
            </div>
            <br />
            <div>
            <label>Animal Breed:</label>
            <br />
            <select id="breed" name="breed" defaultValue={breed} onChange={handleBreedChange}>
                  {breedOptions.map((option) => {
                    return (
                      <option key={option.value} value={option.value}>
                        {option.text}
                      </option>
                    )
                  })}
                </select><br></br> <br />
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
                <input type='file' name='file' onChange={handleFileChange} />
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
            <button type="submit" className="button__create-pet">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </PageLayout>
  );
};
