import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageLayout } from "../components/page-layout";
import { getPetsResource } from "../services/message.service";
import { Gallery } from "react-grid-gallery";
import { useAuth0 } from '@auth0/auth0-react'

export const PetsPage = () => {

  const [images, setImages] = useState([]);
  const [filters, setFilters] = useState({typeAnimal: "", breed: ""});
  const [breedOptions, setBreedOptions] = useState([{value: "", text: "All"}])
  const { user } = useAuth0();

  let navigate = useNavigate();

  let dogBreeds = [
    {value: "", text: "All"},
    {value: "German Shepherd", text: "German Shepherd"},
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
    {value: "Mixed Dog Breed", text: "Mixed Dog Breed"},
    {value: "Other Dog Breed", text: "Other Dog Breed"},
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
    {value: "Mixed Cat Breed", text: "Mixed Cat Breed"},
    {value: "Other Cat Breed", text: "Other Cat Breed"},
  ]

  
  // Event handler for updating Animal Type filter (select dropdown)
  // Reset breed filter and update breed options when animal type is updated
  const handleFilterChangeDropdownAnimalType = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFilters(values => ({...values, "breed": "", [name]: value}))

    if (value === "dog") setBreedOptions(dogBreeds)
    else if (value === "cat") setBreedOptions(catBreeds)
    else setBreedOptions([{value: "", text: "All"}])
  }

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

  // Event handler for applying filters
  const handleFilterSubmit = (event) => {
    event.preventDefault();
    getImages(filters);
  }

  // Function to navigate to individual pet page when pet image is clicked
  const navigatePetProfile = (index, image, event) => {
    navigate("/petProfile", { state : image.petData });
  }

  // Function for fetching images (filters as optional parameter)
  const getImages = async (filters) => {
    const { data, error } = await getPetsResource();

    let typeAnimal, breed, goodWithAnimals, goodWithChildren, leashedAllTimes, sortDate;
    // console.log(filters)
    // console.log(data)
    let tempImages = [];
    if (data) {

      if (filters) {
        ({ typeAnimal, breed, goodWithAnimals, goodWithChildren, leashedAllTimes, sortDate } = filters);
      }

      for (let i = 0; i < data.length; i++) {

        // Skip any images that are filtered out
        if (filters) {
          if (
            ((typeAnimal) && typeAnimal !== data[i]["typeAnimal"]) || 
            ((breed.toLowerCase()) && breed.toLowerCase() !== data[i]["breed"]) || 
            ((goodWithAnimals) && goodWithAnimals !== data[i]["goodWithAnimals"]) || 
            ((goodWithChildren) && goodWithChildren !== data[i]["goodWithChildren"]) || 
            ((leashedAllTimes) && leashedAllTimes !== data[i]["leashedAllTimes"])
          ) continue;
        }

        let tempPet = {};

        // Use first image in images property array; else, use "no image" default image
        tempPet = data[i]["images"].length !== 0 ? { src: data[i]["images"][0] } :
        { src: "https://storage.googleapis.com/example-bucket-for-demo-purposes/GenericDogIcon.png" };

        // Add pet profile creation date and Pet Datastore ID as property
        tempPet.creationDate = data[i]["creationDate"];
        tempPet.petData = data[i];

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

    // Apply sort (if selected)
    if (sortDate === "Ascending") {
      tempImages.sort((a, b) => (a.creationDate > b.creationDate) ? 1 : ((b.creationDate > a.creationDate) ? -1 : 0))
    } else if (sortDate === "Descending") {
      tempImages.sort((a, b) => (a.creationDate > b.creationDate) ? -1 : ((b.creationDate > a.creationDate) ? 1 : 0))
    }
    
    setImages(tempImages);

    if (error) {
      // console.log("Error: " + error.message);
      alert("Error: " + error.message);
    }
  };

  useEffect(() => {
    getImages();
  }, []);

  if (user?.role === "user" || user?.role === "admin") {
    return (
      <PageLayout>
        <div className="content-layout">
          <h1 id="page-title" className="content__title">
            Pets Page
          </h1>
          <div className="content__body">
            <p id="page-description">
              Filter for your preferred companion then click their image to learn more. 
              <span>
              </span>
            </p>
            <form onSubmit={handleFilterSubmit}>
              <fieldset className="search-filters">
                <legend>SEARCH FILTERS</legend>
                <label>Animal Type: </label>
                <br />
                  <select id="typeAnimal" name="typeAnimal" onChange={handleFilterChangeDropdownAnimalType}>
                    <option value="">All</option>
                    <option value="dog">Dog</option>
                    <option value="cat">Cat</option>
                    <option value="other">Other</option>
                  </select><br></br><br />
                <label>Animal Breed: </label>
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
                <label>Disposition:</label>
                <br />
                <input type="checkbox" id="goodWithAnimals" name="goodWithAnimals" value onChange={handleFilterChangeCheckbox} />
                <label> Good with other animals</label><br></br>
                <input type="checkbox" id="goodWithChildren" name="goodWithChildren" value onChange={handleFilterChangeCheckbox} />
                <label> Good with children</label><br></br>
                <input type="checkbox" id="leashedAllTimes" name="leashedAllTimes" value onChange={handleFilterChangeCheckbox} />
                <label> Animal must be leashed at all times</label><br></br>
              </fieldset>
              <fieldset className="sort-by-date">
                <legend>SORT BY DATE</legend>
                <label>Sory by Pet Profile Creation Date: </label>
                <br />
                <select id="sortDate" name="sortDate" onChange={handleFilterChangeDropdown}>
                  <option value="">None</option>
                  <option value="Descending">Descending</option>
                  <option value="Ascending">Ascending</option>
                </select><br></br>
              </fieldset>

              <input type="submit" value="Apply Filters/Sort" />
            </form>
            <br></br>
            <Gallery images={images} enableImageSelection={false} onClick={navigatePetProfile} />
          </div>
        </div>
      </PageLayout>
    )
  } else {
    return (
      <PageLayout>
        <div className="content-layout">
          <h1 id="page-title" className="content__title">
            Pets Page
          </h1>
          <div className="content__body">
            <p id="page-description">
              <span>
              Create an account to search and view pet profiles.
              </span>
            </p>
            <Gallery images={images} enableImageSelection={false} />
          </div>
        </div>
      </PageLayout>
    )
  }
}