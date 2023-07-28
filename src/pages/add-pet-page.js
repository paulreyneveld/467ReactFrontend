import React, { useEffect, useState } from "react";
import { CodeSnippet } from "../components/code-snippet";
import { PageLayout } from "../components/page-layout";
import { createPetResource } from "../services/message.service";
import { useAuth0 } from "@auth0/auth0-react";

export const AddPetPage = () => {
  const { getAccessTokenSilently } = useAuth0();

  const [typeAnimal, setTypeAnimal] = useState("dog");
  const [breed, setBreed] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [goodWithAnimals, setGoodWithAnimals] = useState(false);
  const [goodWithChildren, setGoodWithChildren] = useState(false);
  const [leashedAllTimes, setLeashedAllTimes] = useState(false);

  const addPet = async (event) => {
    event.preventDefault();
    const petObject = {
      typeAnimal: typeAnimal,
      breed: breed,
      description: description,
      images: images,
      goodWithAnimals: goodWithAnimals,
      goodWithChildren: goodWithChildren,
      leashedAllTimes: leashedAllTimes,
    };

    const accessToken = await getAccessTokenSilently();
    const { data, error } = await createPetResource(accessToken, petObject);

    setTypeAnimal("dog");
    setBreed("");
    setDescription("");
    setGoodWithAnimals(false);
    setGoodWithChildren(false);
    setLeashedAllTimes(false);

    // TODO: Error handling.
    if (data) {
      console.log("data:", data);
    }

    if (error) {
      console.log("error:", error);
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

  const handleCreateButton = () => {};
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
            <div>
              <label>
                Breed:
                <input value={breed} onChange={handleBreedChange} />
              </label>
            </div>
            <div>
              <label>
                Description:
                <textarea
                  value={description}
                  onChange={handleDescriptionChange}
                />
              </label>
            </div>
            Disposition:
            <div>
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
            <button type="submit" onClick={handleCreateButton}>
              Create
            </button>
          </form>
          {/* <CodeSnippet title="Protected Message" code={message} /> */}
        </div>
      </div>
    </PageLayout>
  );
};