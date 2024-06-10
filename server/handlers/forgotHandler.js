const bcrypt = require("bcrypt");
const UserModel = require("../models/User");

const forgotPasswordHandler = async (req, res) => {
  try {
    const { mobile, password } = req.body;

    // Check if the user already exists
    const existingUser = await UserModel.findOne({ mobile });

    if (!existingUser) {
      return res.status(400).json({ error: "User not found" });
    } else if (existingUser) {
      const isSamePassword = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (isSamePassword) {
        return res.status(400).json({ error: "Please enter a new password" });
      } else {
        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Update the user's password
        existingUser.password = hashedPassword;

        // Save the updated user to the database
        await existingUser.save();

        // Respond with success message
        return res.json({ success: "Password Reset Successfully" });
      }
    }
  } catch (error) {
    // Handle other unexpected errors
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = forgotPasswordHandler;
