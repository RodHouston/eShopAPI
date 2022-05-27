
   
const Design = require("../models/Designs");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newDesign = new Design(req.body);

  try {
    const savedDesign = await newDesign.save();
    res.status(200).json(savedDesign);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedDesign = await Design.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedDesign);
    console.log('updeated des');
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Design.findByIdAndDelete(req.params.id);
    res.status(200).json("Design has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET Design
router.get("/find/:id", async (req, res) => {
  try {
    const design = await Design.findById(req.params.id);
    res.status(200).json(design);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL DesignS
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  const q = req.query.q;

  console.log('here');
    console.log(qCategory);
    console.log(q);
  const keys = ['title','desc', 'categories','color']
  try {
    let designs;  
    if (qNew) {
      designs = await Design.find().sort({ createdAt: - 1 }).limit(1);      
    } else if (qCategory) {
      designs = await Design.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else if (q){      
      pro = await Design.find()     
      designs = pro.filter((item) => {
        return keys.some((key) => item[key].toString().toLowerCase().trim().includes(q.toString().toLowerCase().trim()))
      }) 
    }else {
      designs = await Design.find();      
    }
    res.status(200).json(designs);    
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;