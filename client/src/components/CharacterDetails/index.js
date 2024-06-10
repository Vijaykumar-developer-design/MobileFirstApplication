import React, { useEffect, useState, useCallback, useRef } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css";
import { ApiUrl } from "../Api/api";

const CharacterDetails = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [starships, setStarships] = useState([]);
  const [films, setFilms] = useState([]);
  const effectRan = useRef(false);

  const fetchData = useCallback(async () => {
    try {
      const jwtToken = Cookies.get("jwt_token");
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      };
      const url = `${ApiUrl}/character/${id}`;
      const response = await fetch(url, options);
      // console.log("response=>", response);
      if (response.ok) {
        const data = await response.json();
        // console.log(data);
        setCharacter(data.character);
        setVehicles(data.vehicles);
        setStarships(data.starships);
        setFilms(data.films);
        // Handle the response data
      } else {
        console.log("Error while fetching data");
      }
    } catch (error) {
      console.log(error);
      console.log("Error fetching character details:", error);
    }
  }, [id]);

  useEffect(() => {
    if (!effectRan.current) {
      fetchData();
      effectRan.current = true;
    } else {
      fetchData();
    }
  }, [fetchData]);

  if (!character) {
    return <div className="loading-character">Loading...</div>;
  }

  return (
    <div className="main-container">
      <h1 className="username">{character.name}</h1>
      <table className="user-table">
        <thead>
          <tr>
            <th>Height</th>
            <th>Mass</th>
            <th>Birth Year</th>
            <th>Gender</th>
            <th>Hair Color</th>
            <th>Skin Color</th>
          </tr>
        </thead>
        <tbody className="character-body">
          <tr>
            <td>{character.height}</td>
            <td>{character.mass}</td>
            <td>
              {character.birth_year === "unknown" ? "NA" : character.birth_year}
            </td>
            <td>{character.gender}</td>
            <td>{character.hair_color}</td>
            <td>{character.skin_color}</td>
          </tr>
        </tbody>
      </table>

      <h2 className="category">Vehicles:</h2>
      <table className="vehicle-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Model</th>
            <th>Manufacturer</th>
            <th>Max Atmosphering Speed</th>
            <th>Vehicle Class</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle, index) => (
            <tr key={index}>
              <td>{vehicle.name}</td>
              <td>{vehicle.model}</td>
              <td>{vehicle.manufacturer}</td>
              <td>{vehicle.max_atmosphering_speed}</td>
              <td>{vehicle.vehicle_class}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="category">Starships:</h2>
      <table className="starship-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Model</th>
            <th>Manufacturer</th>
            <th>Max Atmosphering Speed</th>
            <th>Starship Class</th>
          </tr>
        </thead>
        <tbody>
          {starships.map((starship, index) => (
            <tr key={index}>
              <td>{starship.name}</td>
              <td>{starship.model}</td>
              <td>{starship.manufacturer}</td>
              <td>{starship.max_atmosphering_speed}</td>
              <td>{starship.starship_class}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="category">Films:</h2>
      <table className="film-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Director</th>
            <th>Producer</th>
            <th>Release Date</th>
          </tr>
        </thead>
        <tbody>
          {films.map((film, index) => (
            <tr key={index}>
              <td>{film.title}</td>
              <td>{film.director}</td>
              <td>{film.producer}</td>
              <td>{film.release_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CharacterDetails;
