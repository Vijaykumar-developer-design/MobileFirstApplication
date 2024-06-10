const mongoose = require("mongoose");
const express = require("express");
const bcrypt = require("bcrypt");
const helmet = require("helmet");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
const verifyAuthorization = require("./middlewares/authMiddleware");
const signInHandler = require("./handlers/signInHandler");
const signUpHandler = require("./handlers/signUpHandler");
const forgotPasswordHandler = require("./handlers/forgotHandler");
const charactersHandler = require("./handlers/charactersHandler");
const characterDetailshandler = require("./handlers/characterDetailshandler");
// telling to the express that json object included in api request
app.use(express.json());
app.use(bodyParser.json());
// express security
app.use(helmet());
// it means if server running in anyport it can take resources from ui hosting port
// but we need to give frontend(react) running host address here
app.use(
  // cors({ origin: "http://localhost:3000", credentials: true })
  cors({
    origin: "https://mobile-first-frontend.vercel.app",
    credentials: true,
  })
);
// database connection address
const uri = process.env.DATABSE_ADDRESS;

// Connect to MongoDB
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
// sample api for cheching data
// app.get("/api/log", (req, res) => {
//   const initialData = {
//     timestamp: new Date().toISOString(),
//     message: "Initial data logged successfully",
//   };

//   // Log initial data to the console
//   console.log(initialData);

//   // Send response to client
//   res.status(200).json(initialData);
// });
app.post("/api/signup", signUpHandler);
app.post("/api/signin", signInHandler);
app.post("/api/forgot", forgotPasswordHandler);
app.get("/api/characters", verifyAuthorization, charactersHandler);
app.get("/api/character/:id", verifyAuthorization, characterDetailshandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
