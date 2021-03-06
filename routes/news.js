const DataAccess = require("../data/sqliteDataAccess");
let express = require("express");
let router = express.Router();

router.get("/find", (req, res) => {
  let dataAccess = new DataAccess("./data/news.db");
  let queryKeys = Object.keys(req.query);
  let filterTemplate = "";
  let parameters = [];
  let query = `select * from raw_data`;
  if (queryKeys.length > 0) {
    filterTemplate = queryKeys
      .map((q) => `${q} = ?`)
      .reduce((a, b) => `${a} and ${b}`);
    parameters = queryKeys.map((k) => req.query[k]);
    query += ` where ${filterTemplate}`;
  }
  query += " order by random() limit 20;";

  dataAccess.select(query, parameters, (err, data) => {
    if (err) {
      res.status(400).json("Qué haces? [-_-]");
    } else {
      res.json(data);
    }
  });
});

router.get("/token/:token", function (req, res) {
  let dataAccess = new DataAccess("./data/news.db");
  let tokensEval = ["title", "url"];
  let query =
    "select * from raw_data where " +
    tokensEval
      .map((t) => `${t} like '%${req.params.token}%'`)
      .reduce((a, b) => `${a} or ${b}`)
    + " limit 20;";
    
  console.log(query);
  dataAccess.select(query, [], (err, data) => {
    if (err) {
      res.status(400).json("En serio... Qué prentendes?");
    } else {
      res.json(data);
    }
  });
});

router.get("/nourl", function (req, res) {
  let dataAccess = new DataAccess("./data/news.db");
  dataAccess.select(
    "select * from raw_data where url = '' order by random() limit 20;",
    [],
    (err, data) => {
      if (err) {
        res.status(500).json("Ups... Creo que algo anda mal :(");
      } else {
        res.json(data);
      }
    }
  );
});

router.get("/:id?", function (req, res) {
  let dataAccess = new DataAccess("./data/news.db");
  let parameters = [];
  let query = "select * from raw_data";
  if (req.params.id) {
    let id = req.params.id
      .split(',')
      .map(r=> r.trim())
      .filter(r=>!isNaN(r))
      .map(r=>parseInt(r))
      .reduce((a, b)=>`${a}, ${b}`);
    parameters = [];
    query += ` where id in (${id});`;
  }
  query += ` order by random()`;
  query += ` limit ` + (req.query["top"] || 20);
  query += ";";
  dataAccess.select(query, parameters, (err, data) => {
    if (err) {
      res.status(500).json("Algo se incendia...");
    } else {
      res.json(data);
    }
  });
});

module.exports = router;
