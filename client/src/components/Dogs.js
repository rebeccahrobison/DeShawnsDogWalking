import { useEffect, useState } from "react"
import { getDogs } from "../apiManager"
import "./Dogs.css"

export const Dogs = () => {
  const [dogs, setDogs] = useState([])
  
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
            <div className="dog-name">{dog.name}</div>
            <button className="dog-details-btn">Details</button>
          </div>

        )

      }
      )}
    </div>
  )

}
