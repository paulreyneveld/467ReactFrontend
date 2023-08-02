import React, { useEffect, useState } from "react";
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

  const [image, setImage] = useState({ preview: '', data: '' })

  const addPet = async (event) => {
    event.preventDefault();

    let formData = new FormData();
    formData.append('typeAnimal', typeAnimal);
    formData.append('breed', breed);
    formData.append('description', description);
    formData.append('images', images);
    formData.append('goodWithAnimals', goodWithAnimals);
    formData.append('goodWithChildren', goodWithChildren);
    formData.append('leashedAllTimes', leashedAllTimes);
    console.log(formData.get('typeAnimal'));

    formData.append('file', image.data)

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
    const { data, error } = await createPetResource(accessToken, formData);

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

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    }
    setImage(img)
  }

  const handleCreateButton = () => {};
  return (
    <PageLayout>
      <div className="content-layout">
        <h1 id="page-title" className="content__title">
          Add Pet
        </h1>
        <div className="content__body">
          {image.preview && <img src={image.preview} width='100' height='100' />}
          <form onSubmit={addPet}>
            <div>
              <label>Image: </label>
              <input type='file' name='file' onChange={handleFileChange}></input>
              <br />
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
                <input value={breed} onChange={handleBreedChange} />
              </label>
            </div>
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
