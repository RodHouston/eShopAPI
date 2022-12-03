

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    firstname: { type: String, },
    lastname: { type: String, },
    city: { type: String, },
    state: { type: String, },
    zipcode: { type: String, },
    address: { type: String,  },
    password: { type: String, required: true },
    cart: { type: String },
    orders: {type: Array },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isWholesale: {
      type: Boolean,
      default: false,
    },
    img: {type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);