const mongoose = require("mongoose");

const DesignSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    stockNumber: { type: String, required: true, unique: true },      
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true, },
    img: { type: String, required: true },   
    color: { type: Array},
    categories: { type: Array },     
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
    inventory: {type: Number, required: true },  
    isDesign: {type: Boolean, default:true, required: true }   
  },
  { timestamps: true }
);

module.exports = mongoose.model("Design", DesignSchema);