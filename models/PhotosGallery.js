const mongoose = require("mongoose");

const PhotoGallerySchema = new mongoose.Schema(
  {
    galTitle: { type: String, required: true },
    galDescription:"",
    photos: [
      {
        phoTitle: {
          type: String,
        },
        photoDescription: {
          type: String,
        },
        source: {
          type: String,
        },
        createdDate: {
          type: String,
        },
      },
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("PhotoGallery", PhotoGallerySchema);