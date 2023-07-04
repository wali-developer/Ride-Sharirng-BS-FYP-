const multer = require("multer");
const path = require("path");

// Define middleware here for uploading images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
// Define the upload images middleware
const upload = multer({ storage: storage });

module.exports = upload;
