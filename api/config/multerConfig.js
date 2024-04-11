const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Specify the directory where you want to store the files
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    // Use the original filename for the uploaded file
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
