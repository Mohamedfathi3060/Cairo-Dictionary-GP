const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storageImages = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.join(__dirname, "../public/uploads/images"); // Directory for images
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir); // Save to 'uploads/images'
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Rename file to avoid conflicts
  },
});
const uploadImg = multer({ storage: storageImages });

router.post("/image", uploadImg.single("img"), (req, res) => {
  if (req.file) {
    res.json({
      message: "Image uploaded successfully",
      filePath: "/public/uploads/images/" + req.file.filename,
    });
  } else {
    res.status(400).json({ message: "No file uploaded" });
  }
});

/////////////////////////////////////////

const storageRecord = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.join(__dirname, "../public/uploads/records"); // Directory for images
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir); // Save to 'uploads/avatars'
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Rename file to avoid conflicts
  },
});
const uploadRecord = multer({ storage: storageRecord });
// Route to upload an avatar file to the 'avatars' directory
router.post("/record", uploadRecord.single("record"), (req, res) => {
  if (req.file) {
    res.json({
      message: "Record uploaded successfully",
      filePath: "/public/uploads/images/" + req.file.filename,
    });
  } else {
    res.status(400).json({ message: "No file uploaded" });
  }
});

module.exports = router;
