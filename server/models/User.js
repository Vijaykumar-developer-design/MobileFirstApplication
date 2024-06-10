const mongoose = require("mongoose");

//  Defining the schema for usersignup
const UserSchema = new mongoose.Schema({
  mobile: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
