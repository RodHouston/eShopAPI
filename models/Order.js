const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
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
    total: {
      type: Number,
      default: 0,
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
    amount: { type: Number, required: true },
    shipping: { type: Number, default: 0, required: true },
    address: { type: Object, default: 0, required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);