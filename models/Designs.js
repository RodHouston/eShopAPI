const mongoose = require("mongoose");

const DesignSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    stockNumber: { type: String, required: true, unique: true },
    desc: { type: String, required: true, },
    img: { type: String, required: true },
    categories: { type: Array },    
    color: { type: Array},
    price: { type: Number, required: true },
    inStock: {type: Boolean, default:true},
    quantity: {type: Number, required:true, default:1}    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Design", DesignSchema);