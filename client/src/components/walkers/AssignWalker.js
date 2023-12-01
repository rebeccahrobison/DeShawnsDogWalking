import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import { addWalkerToDog, getDogs, getWalkerById } from "../../apiManager";
import "./Walkers.css"

export const AssignWalker = () => {
  const [dogs, setDogs] = useState([]);
  const [availableDogs, setAvailableDogs] = useState([]);
  const [currentWalker, setCurrentWalker] = useState([]);

  const location = useLocation();
  const walkerId = location.state && location.state.walkerId;
  const navigate = useNavigate();

  useEffect(() => {
    getDogs().then(arr => setDogs(arr));
  }, [])

  useEffect(() => {
    getWalkerById(walkerId).then(obj => setCurrentWalker(obj))
  }, [walkerId])

  useEffect(() => {
    const dogsNotWalkedByWalker = dogs.filter(d => d.walkerId != walkerId);
    // let dogsArr = []
    if (currentWalker.cities) {
      const citiesArr = currentWalker.cities
      // for (const city of citiesArr) {
      //   for (const dog of dogsNotWalkedByWalker) {
      //     if (city.id == dog.cityId) {
      //       dogsArr.push(dog);
      //     }
      //   }
      // }
      const dogsArr = dogsNotWalkedByWalker.filter(dog =>
        citiesArr.some(city => city.id == dog.cityId))
      setAvailableDogs(dogsArr)
    }
  }, [dogs, walkerId, currentWalker])

  const handleClick = (dog, e) => {
    e.preventDefault();

    const dogToUpdate = {
      id: dog.id,
      name: dog.name,
      walkerId: walkerId,
      cityId: dog.cityId
    }
    addWalkerToDog(dog.id, dogToUpdate).then(navigate(`/doggie-details/${dog.id}`))
  }

  return (
    <div>
      <div className="dogs-walkers-container">
        <h4>Assign {currentWalker.name} to One of the Dogs Below</h4>
        {availableDogs.map(dog => {
          return (
            <div 
              className="dog-walker" 
              key={dog.id} 
              onClick={(e) => {handleClick(dog, e)}}
            >{dog.name}</div>
          )
        })}
      </div>

    </div>
  )
}