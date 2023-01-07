const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {productId: {
        type: String, 
      },
      productItem:{
        type: Object,

      },
      
    color: {
      type: String, 
    },

    desc: {
      type: String, 
    },
    img: {
      type: String, 
    },
    price: {
      type: Number,
      default: 1,
    },
    quantity: {
      type: Number,
      default: 1,
    },
      size: {
      type: String, 
    },
      title: {
      type: String, 
    },
      isDesign: {
      type: Boolean, 
    },
      quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    amount:{
      type: Number,
      default: 0
    }, 
    address: {type: String} 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);