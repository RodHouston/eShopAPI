const mongoose = require("mongoose");

const WishSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {productId: {
        type: String, 
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

module.exports = mongoose.model("Wish", WishSchema);