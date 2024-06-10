const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");
const secretKey = process.env.SECRET_KEY;

const signInHandler = async (req, res) => {
  try {
    const { mobile, password } = req.body;
    // console.log(mobile);
    const existingUser = await UserModel.findOne({ mobile });

    if (existingUser) {
      // verify password
      const passwordMatched = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (passwordMatched) {
        const payload = { mobile: existingUser.mobile };
        const jwtToken = jwt.sign(payload, secretKey);
        return res.status(200).json({
          jwt_token: jwtToken,
          success: "User SigIn SuccessFull",
        });
      } else {
        return res.status(401).json({ error: "Invalid Password" });
      }
    } else {
      return res.status(401).json({ error: "User Not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = signInHandler;
