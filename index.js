const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const uploader = require('express-fileupload');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cors());
app.use(uploader());

const upload = multer({
  dest: `uploads/`,
});

app.post("/", upload.single("files"), async (req, res) => {
  console.log(req.files);
  const files = req.files.files;
  if (files.length) {
    for (var i = 0; i < files.length; i++) {
      await files[i].mv("./uploads/" + files[i].name, (err) => {
        if (err) return res.json({ err: err });
      });
    }
  } else {
    await files.mv("./uploads/" + files.name, (err) => {
      console.log("this");
      if (err) return res.json({ err: err });
    });
  }

  return res.json({ message: "file uplaoded" });
});

app.get("/allfiles", (req, res) => {
  // directory path
  const dir = "./uploads/";
const allfiles = [];
  // list all files in the directory
  fs.readdir(dir, (err, files) => {
    if (err) {
      throw err;
    }

    files.forEach((file) => {
      allfiles.push(file);
    });
    return res.json({allfiles : allfiles});
  });
  
  
});

app.listen(8000);
