import { useEffect, useState } from "react"
import { addDog, getCities } from "../../apiManager";
import { useLocation, useNavigate } from "react-router-dom";

export const AddDog = ({route}) => {
  const [cities, setCities] = useState([]);
  const [chosenName, setChosenName] = useState("");
  const [chosenCityId, setChosenCityId] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const dogsArrLength = state ? state.dogsArrLength : 0;


  useEffect(() => {
    getCities().then(citiesArr => setCities(citiesArr))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();

    const parsedCityId = parseInt(chosenCityId);

    const newDog = {
      name: chosenName,
      cityId: parsedCityId
    }

    if (newDog.name == "" || newDog.cityId == null || newDog.cityId == 0){
      window.alert("Please fill out all fields");
    } else {

      const newDogId = dogsArrLength + 1;
      addDog(newDog).then(() => navigate(`/doggie-details/${newDogId}`));
    }
  }

  return(
    <div className="newdog-container">
      <h4>Add New Dog</h4>
      <div className="newdog-info">
        Name: 
        <input 
          name="name" 
          size="50" 
          className="newdog-input"
          onChange={e => setChosenName(e.target.value)}
        />
      </div>
      <div className="newdog-info">
        City:
        <select
          name="cityId"
          id="cities"
          value={chosenCityId}
          onChange={e => {
            if(e.target.value === 0) {
              setChosenCityId(null)
            } else {
              // const foundCity = cities.find(c => c.id === parseInt(e.target.value))
              setChosenCityId(e.target.value)
            }
          }}>
            <option className="newdog-city" value="0">Choose a City</option>
            {cities.map(c => {
              return(
                <option
                  className="newdog-city"
                  key={c.Id}
                  value={c.id}
                >
                  {c.name}
                </option>
              )
            })}
          </select>
      </div>
      <button className="newdog-add-btn" onClick={handleSubmit}>Submit</button>
    </div>
  )
}