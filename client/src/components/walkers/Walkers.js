import { useEffect, useState } from "react";
import "./Walkers.css";
import { getCities, getCityById, getWalkers } from "../../apiManager";
import { Link, useNavigate } from "react-router-dom";

export const Walkers = () => {
  const [walkers, setWalkers] = useState([]);
  const [cities, setCities] = useState([]);
  const [filteredWalkers, setFilteredWalkers] = useState([]);
  const [chosenCityId, setChosenCityId] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    getWalkers().then(walkersArr => {
      setWalkers(walkersArr);
    })
  }, [])

  useEffect(() => {
    getCities().then(citiesArr => {
      setCities(citiesArr);
    })
  }, [])

  useEffect(() => {
    if(chosenCityId != 0) {
      //filter walkers by cities they walk in
      getCityById(chosenCityId).then(arr => setFilteredWalkers(arr.walkers));
    } else {
      setFilteredWalkers(walkers);
    }
  }, [chosenCityId, walkers])
  
  return (
    <div className="walkers-container">
        <div className="cities-dropdown">
          Filter by City:
          <select
          name="cityId"
          id="cities"
          value={chosenCityId}
          onChange={e => {
            if(e.target.value === 0) {
              setChosenCityId(null)
            } else {
              setChosenCityId(parseInt(e.target.value))
            }
          }}>
            <option className="walkers-city" value="0">Choose a City</option>
            {cities.map(c => {
              return(
                <option
                  className="walkers-city"
                  key={c.Id}
                  value={c.id}
                >
                  {c.name}
                </option>
              )
            })}
          </select>
        </div>
        {filteredWalkers.map(walker => {
          const walkerId = walker.id;
          return (
            <div className="walker" key={walker.id}>
              <div className="walker-info">
                <div className="walker-name"><Link to={`/editwalker/${walkerId}`}>{walker.name}</Link></div>
              </div>
              <button 
                className="walker-add-dog-btn"
                onClick={() => {navigate(`/assignwalker`, { state: { walkerId } })}}
              >Add Dog</button>
              <button className="walker-delete-btn">Remove</button>
            </div>

          )

        }
        )}
        </div>
  )
}