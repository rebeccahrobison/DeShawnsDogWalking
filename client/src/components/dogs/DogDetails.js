import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getDogById } from "../../apiManager";

export const DogDetails = () => {
  const [dog, setDog] = useState([]);

  const dogId = useParams().dogId;

  useEffect(() => {
    getDogById(dogId).then(data => {
      const dogObj = data;
      setDog(dogObj);
    })
  }, [dogId])

  return (
    <div className="dogs-container">
      <h4>Doggie Details</h4>
      <div className="dog-info">
        <div className="dog-detail name"><b>Name:</b> {dog.name}</div>
        {(dog.walkerId == null) ? (
          <div className="dog-detail walker"><b>No Walker Assigned</b></div>
        ) : (
          <div className="dog-detail walker"><b>Walker's Name:</b> {dog.walker.name}</div>
        )}
        <div className="dog-detail city"><b>Location:</b> {dog.city?.name}</div>
      </div>
    </div>
  )
}