const axios = require("axios");
const characterDetailshandler = async (req, res) => {
  const { id } = req.params;
  try {
    const characterResponse = await fetch(
      `https://swapi.dev/api/people/${id}/`
    );
    const characterResponseData = await characterResponse.json();

    // Fetch vehicles
    const vehiclePromises = characterResponseData.vehicles.map((url) =>
      axios.get(url)
    );
    const vehicles = await Promise.all(vehiclePromises);
    const vehicleData = vehicles.map((response) => response.data);
    // // Fetch starships
    const starshipPromises = characterResponseData.starships.map((url) =>
      axios.get(url)
    );
    const starships = await Promise.all(starshipPromises);
    const starshipData = starships.map((response) => response.data);
    // // Fetch films
    const filmPromises = characterResponseData.films.map((url) =>
      axios.get(url)
    );
    const films = await Promise.all(filmPromises);
    const filmData = films.map((response) => response.data);
    res.json({
      character: characterResponseData,
      vehicles: vehicleData,
      starships: starshipData,
      films: filmData,
    });
    // Your logic here
  } catch (error) {
    console.error("Error fetching character details:", error);
    res.sendStatus(500);
  }
};

module.exports = characterDetailshandler;
