import { useEffect, useState } from "react"
import { getDogs } from "../../apiManager"
import "./Dogs.css"
import { useNavigate } from "react-router-dom"

export const Dogs = () => {
  const [dogs, setDogs] = useState([])
  const [dogsArrLength, setDogsArrLength] = useState(0)

  const navigate = useNavigate();

  useEffect(() => {
    getDogs().then(dogsArr => {
      setDogs(dogsArr)
    })
  }, [])

  useEffect(() => {
    setDogsArrLength(dogs.length)
  }, [dogs])



  return (
    <div className="dogs-container">
      <button 
        className="dog-add-btn"
        onClick={() => {navigate(`newdog`, { state: { dogsArrLength } })}}  
      >+Add New Dog</button>
      {/* <div>Dog List</div> */}
      {dogs.map(dog => {
        return (
          <div className="dog" key={dog.id}>
            <div className="dog-info">
              <div className="dog-name">{dog.name}</div>
              <button 
                className="dog-details-btn"
                onClick={() => {navigate(`doggie-details/${dog.id}`)}}
              >Details</button>
            </div>
            <button className="dog-delete-btn">Remove {dog.name}?</button>
          </div>

        )

      }
      )}
    </div>
  )

}
