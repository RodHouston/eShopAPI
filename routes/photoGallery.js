

const PhotoGallery = require("../models/PhotosGallery");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newPhotoGallery = new PhotoGallery(req.body);

  try {
    const savedPhotoGallery = await newPhotoGallery.save();
    res.status(200).json(savedPhotoGallery);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedPhotoGallery = await PhotoGallery.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedPhotoGallery);
    console.log('updeated des');
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await PhotoGallery.findByIdAndDelete(req.params.id);
    res.status(200).json("PhotoGallery has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET PhotoGallery
router.get("/find/:id", async (req, res) => {
  try {
    const photoGallery = await PhotoGallery.findById(req.params.id);
    res.status(200).json(photoGallery);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL Photos
router.get("/", async (req, res) => {
  try {
    const photoGallery = await PhotoGallery.find();

    res.status(200).json(photoGallery);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;