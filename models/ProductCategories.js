const mongoose = require("mongoose");

const ProductCategorySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    img: { type: String, required: true },
    cat: { type: String, required: true},
    subCats: { type:Array,      
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProductCategory", ProductCategorySchema);