import React, { useEffect, useState, useRef, useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import { ApiUrl } from "../Api/api";
import Cookies from "js-cookie";
import "./index.css";
const apiState = {
  initial: "INITIAL",
  inProgress: "PROGRESS",
  success: "SUCCESS",
};
const CharacterList = () => {
  const [apiStatus, setApiStatus] = useState(apiState.initial);
  const [characters, setCharacters] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [page, setPage] = useState(1);
  const effectRan = useRef(false);
  const history = useHistory();
  const fetchData = useCallback(async () => {
    try {
      const jwtToken = Cookies.get("jwt_token");
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      };
      const url = `${ApiUrl}/characters?page=${page}`;
      const response = await fetch(url, options);

      if (response.ok) {
        const data = await response.json();
        setCharacters(data.data.results);
        setApiStatus(apiState.success);
        setHasNextPage(!!data.data.next);
        // console.log(data.data.results);
      } else {
        console.log("Error while fetching data");
      }
    } catch (error) {
      console.log(error);
    }
  }, [page]);
  useEffect(() => {
    if (!effectRan.current) {
      setApiStatus(apiState.inProgress);
      fetchData();
      effectRan.current = true;
    } else {
      fetchData(); // Fetch data on page change
    }
  }, [fetchData]);
  const onLogout = () => {
    Cookies.remove("jwt_token");
    history.replace("/signin");
  };
  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    setPage(page - 1);
  };
  const Loading = () => (
    <tbody>
      <tr className="loading-row">
        <td colSpan="4">Loading...</td>
      </tr>
    </tbody>
  );
  const RenderData = () => (
    <tbody>
      {characters.map((character) => (
        <tr key={character.name}>
          <td>
            <Link
              className="username"
              to={`/character/${character.url.split("/").slice(-2, -1)[0]}`}
            >
              {character.name}
            </Link>
          </td>
          <td>{character.height}</td>
          <td>{character.mass}</td>
          <td>
            {character.birth_year === "unknown" ? "NA" : character.birth_year}
          </td>
        </tr>
      ))}
    </tbody>
  );

  const renderCharacters = () => {
    switch (apiStatus) {
      case apiState.inProgress:
        return <Loading />;
      case apiState.success:
        return <RenderData />;
      default:
        return null;
    }
  };
  return (
    <div className="characters-container">
      <div className="logout-container">
        <h1 className="heading">Star Wars Characters</h1>
        <button onClick={onLogout} className="logout-btn">
          Logout
        </button>
      </div>
      <div className="user-table-details">
        <table className="character-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Height</th>
              <th>Mass</th>
              <th>Birth Year</th>
            </tr>
          </thead>
          {renderCharacters()}
        </table>
      </div>
      <div className="pagination-container">
        <button
          className="pre-btn"
          onClick={handlePrevPage}
          disabled={page === 1}
        >
          Previous
        </button>
        <button
          className="next-btn"
          disabled={!hasNextPage}
          onClick={handleNextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CharacterList;
