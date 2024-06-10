const bcrypt = require("bcrypt");
const UserModel = require("../models/User");

const signUpHandler = async (req, res) => {
  try {
    const { mobile, password } = req.body;
    // Check if the user already exists
    const existingUser = await UserModel.findOne({ mobile });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User already exists with the given username" });
    }

    // If the user doesn't exist, proceed with user creation
    const hashPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new UserModel({
      mobile,
      password: hashPassword,
    });

    // Save the user to the database
    await newUser.save();

    // Respond with success message
    res.json({ success: "User Created Successfully" });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = signUpHandler;
