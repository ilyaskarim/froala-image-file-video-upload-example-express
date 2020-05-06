var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var multer = require("multer");
var path = require("path");

const app = express();

app.use(express.static(__dirname + "/uploads"));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const imageLink = "https://cdn0.froala.com/assets/editor/pages/v3/editor-photo-0c6048e9ae73fe1da41b5e805324e919.png";

const videoLink = "https://cdn.froala.com/froala-design.mp4";

var imageUpload = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/image");
  },
  filename: function (req, file, cb) {
    cb(null, Math.random() + file.originalname);
  },
});

var upload = multer({ storage: imageUpload });

app.use(function (err, req, res, next) {
  console.log("This is the invalid field ->", err.field);
  next(err);
});

app.post("/upload/image", upload.single("image"), (req, res, next) => {
  const file = req.file;
  if (!file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return next(error);
  }
  // res.send(file);
  res.json({ link: `http://localhost:7000/${req.file.path}` });
});

app.listen(7000, function () {
  console.log("Running on port 7000");
});
