const { verifyToken,  verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken')
const User = require("../models/User");

const router = require('express').Router()


//CREATE USER 
router.post("/createUser", async (req, res) => {
// console.log("here to create User");
const newUser = new User(req.body);
  // console.log('in User create');
  // console.log(req.body);
  try {
    const savedUser = await newUser.save();
    // console.log('after new User');
    res.status(200).json(savedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
    
  }
})

//update
// verifyTokenAndAuthorization,
router.put("/:id",  async (req, res) => {
  // console.log("updated req");
  // console.log(req);
  
    // if (req.body.password) {
    //   req.body.password = CryptoJS.AES.encrypt(
    //     req.body.password, 
    //     process.env.PASS_SEC
    //   ).toString();
    // } 
    try {         
      // console.log(" inside update User");
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        // console.log("after Update User");
        // console.log(updatedUser);
        res.status(200).json(updatedUser);
      } catch (err) {
        res.status(500).json('err');
      }
    });

    //Delete
    router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
        try {
          await User.findByIdAndDelete(req.params.id);
          res.status(200).json("User has been deleted...");
        } catch (err) {
          res.status(500).json(err);
        }
      });
      

    //GET USER
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const { password, ...others } = user._doc;
      res.status(200).json(others);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //GET ALL USER
 router.get("/", verifyTokenAndAdmin, async (req, res) => {    
    const query = req.query.new;
    try {
      const users = query
        ? await User.find().sort({ _id: -1 }).limit(5)
        : await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  
    try {
      const data = await User.aggregate([
        { $match: { createdAt: { $gte: lastYear } } },
        {
          $project: {
            month: { $month: "$createdAt" },
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: 1 },
          },
        },
      ]);
      res.status(200).json(data)
    } catch (err) {
      res.status(500).json(err);
    }
  });
module.exports = router