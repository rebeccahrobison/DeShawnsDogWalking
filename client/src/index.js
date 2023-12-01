import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import Home from "./Home";
import { DogDetails } from "./components/dogs/DogDetails";
import { AddDog } from "./components/forms/AddDog";
import { Walkers } from "./components/walkers/Walkers";
import { AssignWalker } from "./components/walkers/AssignWalker";
import { Cities } from "./components/cities/Cities";
import { EditWalkerCities } from "./components/walkers/EditWalkerCities";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="doggie-details">
          <Route path=":dogId" element={<DogDetails />} />
        </Route>
        <Route path="newdog" element={<AddDog />} />
        <Route path="walkers" element={<Walkers /> } />
        <Route path="assignwalker" element={<AssignWalker />} />
        <Route path="cities" element={ <Cities /> } />
        <Route path="editwalker">
          <Route path=":walkerId" element={<EditWalkerCities />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
