const fs = require("fs");
const express = require("express");
const path = require("path");
const cors = require("cors");

let app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let fullPath = require("path").join(process.cwd(), "routes");

require("./routesServer")("routes", (err, files) => {
  if (!err) {
    files.forEach((f) => {
      //console.log(`app.use("${f.route}", require("${f.file}"))`);
      app.use(f.route, require(f.file));
    });
  }
  app.use("/", (req, res) => {
    res.send("pollod");
  });
  app.use(function (req, res, next) {
    res.status(404).json("Not Found");
  });
  app.use(function (err, req, res, next) {
    console.log(err);
    res.status(500).json("Error");
  });
  app.listen(2021);
});

// catch 404 and forward to error handler
