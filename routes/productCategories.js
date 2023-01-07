
   
const Category = require("../models/ProductCategories.js");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE
router.post("/", async (req, res) => {
  const newCat = new Category(req.body);
  // console.log('in catergory create');
  // console.log(req.body);
  try {
    const savedCat = await newCat.save();
    // console.log('after new product');
    res.status(200).json(savedCat);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
    
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  
  // console.log(req.body);
  try {
    const updatedCat = await Category.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCat);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Catergory.findByIdAndDelete(req.params.id);
    res.status(200).json("Catergory has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET CATEGORY
router.get("/find/:id", async (req, res) => {
  try {
    const cat = await Catergory.findById(req.params.id);
    res.status(200).json(cat);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL Categories
router.get("/", async (req, res) => {
 
  try{  
      cats = await Category.find()  
    res.status(200).json(cats);    
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;