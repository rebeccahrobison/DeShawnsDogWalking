import { useEffect, useState } from "react";
import "./Cities.css";
import { getCities } from "../../apiManager";

export const Cities = () => {
  const [cities, setCities] = useState();

  useEffect(() => {
    getCities().then(arr => setCities(arr))
  }, [])

  return (
    <div className="cities-container">
      <h4>Cities</h4>
      {cities?.map(c => {
        return (
          <div className="city" key={c?.id}>{c?.name}</div>
        )
      })}
    </div>
  )
}