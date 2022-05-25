const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true, },
    img: { type: String, required: true },
    gender: { type: Array },
    categories: { type: Array },
    subCategories: { type: Array },
    size: { type: Array },
    color: { type: Array},
    price: { type: Number, required: true },

    salePrice: { type: Number, required: true },
    wholeSaleTier1:  {
                      wholeSaleQuantity1: {type: Number, required: true },
                       wholePrice1: {type: Number, required: true }
                       },
    
    wholeSaleTier2:  {
                      wholeSaleQuantity2: {type: Number, required: true },
                       wholePrice2: {type: Number, required: true }
                       },
    
    wholeSaleTier3:  {
                      wholeSaleQuantity3: {type: Number, required: true },
                       wholePrice3: {type: Number, required: true }
                       },
    
    onSale: {type: Boolean, default:false},
    isWholeSaleItem: {type: Boolean, default:false},

    inStock: {type: Boolean, default:true}, 
    inventory: {type: Number, required: true }    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);