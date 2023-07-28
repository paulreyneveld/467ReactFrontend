import React, { useEffect, useState } from "react";
import { PageLayout } from "../components/page-layout";
import { getPetsResource } from "../services/message.service";
import { Gallery } from "react-grid-gallery";

export const PetsPage = () => {
  const [images, setImages] = useState([]);
  const [filters, setFilters] = useState({});

  // Event handler for updating filters (select dropdown)
  const handleFilterChangeDropdown = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFilters(values => ({...values, [name]: value}))
  }

  // Event handler for updating filters (checkboxes)
  const handleFilterChangeCheckbox = (event) => {
    const name = event.target.name;
    const value = event.target.checked;
    setFilters(values => ({...values, [name]: value}))
  }

  // Event handler for apply filters
  const handleFilterSubmit = (event) => {
    event.preventDefault();
    getImages(filters);
  }

  // Function for fetching images (filters as optional parameter)
  const getImages = async (filters) => {
    const { data, error } = await getPetsResource();

    let tempImages = [];
    if (data) {

      let typeAnimal, breed, goodWithAnimals, goodWithChildren, leashedAllTimes;
      if (filters) {
        ({ typeAnimal, breed, goodWithAnimals, goodWithChildren, leashedAllTimes } = filters);
      }

      for (let i = 0; i < data.length; i++) {

        // Skip any images that are filtered out
        // TODO: Implement date created sorting option
        if (filters) {
          if (
            ((typeAnimal) && typeAnimal !== data[i]["typeAnimal"]) || 
            ((breed) && breed !== data[i]["breed"]) || 
            ((goodWithAnimals) && goodWithAnimals !== data[i]["goodWithAnimals"]) || 
            ((goodWithChildren) && goodWithChildren !== data[i]["goodWithChildren"]) || 
            ((leashedAllTimes) && leashedAllTimes !== data[i]["leashedAllTimes"])
          ) continue;
        }

        let tempPet = {};

        // Use first image in images property array; else, use "no image" default image
        tempPet = data[i]["images"].length !== 0 ? { src: data[i]["images"][0] } :
        { src: "https://storage.googleapis.com/example-bucket-for-demo-purposes/GenericDogIcon.png" };

        // Add font color for different "availability" values
        // TODO: Add font colors for "pending" and "adopted"
        if (data[i]["availability"] === "available") {
          tempPet.tags = [
            { value: <span style={{color: "green"}}>available</span> }
          ]
        }

        if (data[i]["availability"] === "not available") {
          tempPet.tags = [
            { value: <span style={{color: "red"}}>not available</span> }
          ]
        }

        tempImages.push(tempPet)
      }
    }
    setImages(tempImages)

    if (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getImages();
  }, []);

  return (
    <PageLayout>
      <div className="content-layout">
        <h1 id="page-title" className="content__title">
          Pets Page
        </h1>
        <div className="content__body">
          <p id="page-description">
            <span>
              This page retrieves the pet information from an
              external API.
            </span>
            <span>
              {/* <strong>Only registered visitors can access this page.</strong> */}
            </span>
          </p>
          {/* <CodeSnippet title="Public Message" code={message} /> */}
          <form onSubmit={handleFilterSubmit}>
            <fieldset>
              <legend>SEARCH FILTERS</legend>
              <label>Animal Type: </label>
                <select id="typeAnimal" name="typeAnimal" onChange={handleFilterChangeDropdown}>
                  <option value="">All</option>
                  <option value="dog">Dog</option>
                  <option value="cat">Cat</option>
                  <option value="other">Other</option>
                </select><br></br>
              <label>Animal Breed: </label>
              <select id="breed" name="breed" onChange={handleFilterChangeDropdown}>
                <option value="">All</option>
                <option value="German shepherd">German Shepherd</option>
                <option value="Golden Retriever">Golden Retriever</option>
              </select><br></br>
              <input type="checkbox" id="goodWithAnimals" name="goodWithAnimals" value onChange={handleFilterChangeCheckbox} />
              <label> Good with other animals</label><br></br>
              <input type="checkbox" id="goodWithChildren" name="goodWithChildren" value onChange={handleFilterChangeCheckbox} />
              <label> Good with children</label><br></br>
              <input type="checkbox" id="leashedAllTimes" name="leashedAllTimes" value onChange={handleFilterChangeCheckbox} />
              <label> Animal must be leashed at all times</label><br></br>
              <input type="submit" value="Apply Filters" />
            </fieldset>
          </form>
          <br></br>
          <Gallery images={images} />
        </div>
      </div>
    </PageLayout>
  );
};
