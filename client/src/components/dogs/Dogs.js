import { useEffect, useState } from "react"
import { getDogs } from "../../apiManager"
import "./Dogs.css"
import { useNavigate } from "react-router-dom"

export const Dogs = () => {
  const [dogs, setDogs] = useState([])

  const navigate = useNavigate();
  
  useEffect(() => {
    getDogs().then(dogsArr => {
      setDogs(dogsArr)
    })
  }, [])



  return (
    <div className="dogs-container">
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
