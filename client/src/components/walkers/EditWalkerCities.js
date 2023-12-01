import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editWalker, getCities, getWalkerById } from "../../apiManager";

export const EditWalkerCities = () => {
  const [cities, setCities] = useState([]);
  const [walker, setWalker] = useState({});
  const [chosenName, setChosenName] = useState("")
  const [walkerCities, setWalkerCities] = useState([])

  const walkerId = useParams().walkerId;
  const navigate = useNavigate();

  useEffect(() => {
    getCities().then(arr => setCities(arr))
  }, [])

  useEffect(() => {
    getWalkerById(walkerId).then(obj => setWalker(obj))
  }, [walkerId])

  useEffect(() => {
    if (chosenName) {
      setChosenName(chosenName)
    }
  }, [chosenName])

  useEffect(() => {
    if (walkerCities) {
      setWalkerCities(walkerCities)
    }
  }, [walkerCities])


  const handleInputChange = (e) => {
    const stateCopy = { ...walker };
    stateCopy[e.target.name] = e.target.value;

    setWalker(stateCopy)
  }

  const handleCityChange = (cityId) => {
    const stateCopy = {...walker };
    const index = stateCopy.cities.findIndex(city => city.id === cityId);

    if (index !== -1) {
      stateCopy.cities.splice(index, 1);
    } else {
      const cityToAdd = cities.find(city => city.id === cityId);
      stateCopy.cities.push(cityToAdd);
    }

    setWalker(stateCopy);
  }

  const handleUpdate = (e) => {
    e.preventDefault();

    const walkerToUpdate = {
      id: walker.id,
      name: walker.name,
      cities: walker.cities
    }

    editWalker(walkerId, walkerToUpdate).then(navigate(`/walkers`))
  }

  return (
    <div className="edit-walker-container">
      <h4>Edit {walker.name}'s Details</h4>
      
      <div className="edit-walker-name">
        Name:
        <input
          name="name"
          value={walker.name ? walker.name : ""}
          onChange={handleInputChange}
        />
      </div>
      
      <div className="edit-walker-cities">
        {cities.map(city => {
          return (
            <div className="edit-walker-city" key={city.id}>
              <input
                type="checkbox"
                id={`city-${city.id}`}
                checked={walker.cities?.some(wc => wc.id === city.id)}
                onChange={() => handleCityChange(city.id)}
              />
              <label htmlFor={`city=${city.id}`}>{city.name}</label>
            </div>
          )
        })}
      </div>
      <button className="update-walker-btn" onClick={handleUpdate}>Update</button>
    </div>
  )
}