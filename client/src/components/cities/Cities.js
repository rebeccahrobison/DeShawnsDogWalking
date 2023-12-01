import { useEffect, useState } from "react";
import "./Cities.css";
import { addCity, getCities } from "../../apiManager";

export const Cities = () => {
  const [cities, setCities] = useState();
  const [chosenName, setChosenName] = useState();

  useEffect(() => {
    getCities().then(arr => setCities(arr))
  }, [])

  const handleAddBtn = async (e) => {
    e.preventDefault();

    const newCity = {
      name: chosenName,
    }

    if (newCity.name == "" || newCity.name == undefined) {
      window.alert("Please fill out all fields");
    } else {
      await addCity(newCity);
      
      const updatedCities = [...cities, newCity];
      setCities(updatedCities);
      
      setChosenName("");
    }
  }

  return (
    <div className="cities-container">
      <h4>Cities</h4>
      <div className="city-add">
        <input
          name="name" 
          size="20" 
          className="city-input"
          value={chosenName}
          onChange={e => setChosenName(e.target.value)}></input>
        <button className="city-add-btn" onClick={handleAddBtn}>Add New City</button>
      </div>
      {cities?.map(c => {
        return (
          <div className="city" key={c?.id}>{c?.name}</div>
        )
      })}
    </div>
  )
}

// As a user, I want to add a city, so that I can expand service to new areas
// GIVEN a user is viewing the list of cities
// WHEN they enter a City name in the "Add a city" input and click "Add"
// THEN the city is added to the list of cities