
   
const Product = require("../models/Product");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new Product(req.body);
  console.log('in product create');
  // console.log(req.body);
  try {
    const savedProduct = await newProduct.save();
    console.log('after new product');
    res.status(200).json(savedProduct);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
    
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  
  // console.log(req.body);
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET PRODUCT
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL PRODUCTS
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  const q = req.query.q;

  // console.log('here in get All Products api call ');
  //   console.log(req);
    // console.log(q);
    const keys = ['title','desc', 'gender', 'categories', 'subCategories', 'size','color']
  try {
    let products;
    
    
    if (qNew) {
      products = await Product.find().sort({ createdAt: - 1 }).limit(1);
      
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else if (q){ 
      if(q=== 'boys' || q=== 'man'|| q=== 'men'||q=== 'ladies'|| q=== 'girl'){
        products = await Product.find({
          gender: {
            $in: [q],
          },
        });
      } else{    
      pro = await Product.find()     
      products = pro.filter((item) => {
        return keys.some((key) => item[key].toString().toLowerCase().trim().includes(q.toString().toLowerCase().trim()))
      }) }
    }else {
      products = await Product.find();      
    }
    res.status(200).json(products);    
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;