import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { PageLayout } from "../components/page-layout";
import { createPetResource } from "../services/message.service";
import { useAuth0 } from "@auth0/auth0-react";

export const AddPetPage = () => {
  const { getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();

  const [typeAnimal, setTypeAnimal] = useState("dog");
  const [breed, setBreed] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [goodWithAnimals, setGoodWithAnimals] = useState(false);
  const [goodWithChildren, setGoodWithChildren] = useState(false);
  const [leashedAllTimes, setLeashedAllTimes] = useState(false);
  
  const [filters, setFilters] = useState({});

  const [imageFile, setImageFile] = useState("")
  const inputFile = useRef(null);

  let dogBreeds = [
    {value: "", text: "All"},
    {value: "German shepherd", text: "German Shepherd"},
    {value: "Golden Retriever", text: "Golden Retriever"},
    {value: "Labrador", text: "Labrador"},
    {value: "Pit Bull", text: "Pit Bull"},
    {value: "French Bulldog", text: "French Bulldog"},
    {value: "Rottweiler", text: "Rottweiler"},
    {value: "Beagle", text: "Beagle"},
    {value: "Dachsund", text: "Dachsund"},
    {value: "Boxer", text: "Boxer"},
    {value: "Yorkie", text: "Yorkie"},
    {value: "Poodle", text: "Poodle"},
    {value: "Mixed Breed", text: "Mixed Breed"}
  ]

  let catBreeds = [
    {value: "", text: "All"},
    {value: "Siamese", text: "Siamese"},
    {value: "Persian", text: "Persian"},
    {value: "Maine Coon", text: "Maine Coon"},
    {value: "Ragdoll", text: "Ragdoll"},
    {value: "Bengal", text: "Bengal"},
    {value: "Abyssinian", text: "Abyssinian"},
    {value: "Birman", text: "Birman"},
    {value: "Himalayan", text: "Himalayan"},
    {value: "American Shorthair", text: "American Shorthair"},
    {value: "Mixed Breed", text: "Mixed Breed"}
  ]

  const [breedOptions, setBreedOptions] = useState(dogBreeds);

  const addPet = async (event) => {
    event.preventDefault();

    let formData = new FormData();
    formData.append("typeAnimal", typeAnimal);
    formData.append("breed", breed);
    formData.append("description", description);
    formData.append("images", images);
    formData.append("goodWithAnimals", goodWithAnimals);
    formData.append("goodWithChildren", goodWithChildren);
    formData.append("leashedAllTimes", leashedAllTimes);
    formData.append("file", imageFile)

    const accessToken = await getAccessTokenSilently();
    const { data, error } = await createPetResource(accessToken, formData);

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
      alert("Pet added successfully!");
      navigate("/petProfile", { state: data });
    }

    if (error) {
      console.log("Error: " + error.message);
      alert("Error: " + error.message);
    }
  };

  // const handleTypeAnimalChange = (event) => {
  //   setTypeAnimal(event.target.value);
  // };

  // const handleBreedChange = (event) => {
  //   setBreed(event.target.value);
  // };

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

  const handleFilterChangeDropdownAnimalType = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    // setFilters(values => ({...values, "breed": "", [name]: value}))
    setTypeAnimal(value);
    if (value === "dog") setBreedOptions(dogBreeds)
    else if (value === "cat") setBreedOptions(catBreeds)
    else setBreedOptions([{value: "", text: "All"}])
  };

  const handleFilterChangeDropdown = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log(value)
    setBreed(value);
    // setFilters(values => ({...values, [name]: value}))
  };

  return (
    <PageLayout>
      <div className="content-layout">
        <h1 id="page-title" className="content__title">
          Add Pet
        </h1>
        <div className="content__body">
          <form onSubmit={addPet}>
            <div>
              <label>
                Animal Type:
                <br />
                <select
                  defaultValue={typeAnimal}
                  onChange={handleFilterChangeDropdownAnimalType}
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
            <select id="breed" name="breed" onChange={handleFilterChangeDropdown}>
                  {breedOptions.map((option) => {
                    return (
                      <option key={option.value} value={option.value}>
                        {option.text}
                      </option>
                    )
                  })}
                </select><br></br> <br />
            </div>
            {/* <div>
              <label>
                Breed:
                <br />
                <input value={breed} onChange={handleBreedChange} />
              </label>
            </div> */}
            <br />
            <div>
              <label>
                Description:
                <br />
                <textarea
                  value={description}
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
              Create
            </button>
          </form>
        </div>
      </div>
    </PageLayout>
  );
};
