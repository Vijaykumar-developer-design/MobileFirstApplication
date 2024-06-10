const charactersHandler = async (req, res) => {
  try {
    const page = req.query.page || 1;
    // console.log("page=>", page);
    const response = await fetch(`https://swapi.dev/api/people/?page=${page}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    // res.json(data);
    res.json({ data, success: "Data fetched Successfully" });
  } catch (error) {
    res.status(500).send("Error fetching characters");
  }
};

module.exports = charactersHandler;
