const DataAccess = require("../data/sqliteDataAccess");
let express = require("express");
let router = express.Router();

router.get("/:source?", function (req, res) {
  let dataAccess = new DataAccess("./data/news.db");
  let parameters = [];
  let query = "select * from vw_sources;";
  if (req.params.source) {
    parameters = [req.params.source];
    query = "select * from vw_sources where source = ?;";
  }
  dataAccess.select(query, parameters, (err, data) => {
    if (err) {
      res.status(500).json("Algo se incendia...");
    } else {
      res.json(data);
    }
  });
});

router.get("/getOrdered/:top?", function (req, res) {
  let dataAccess = new DataAccess("./data/news.db");
  let parameters = [];
  let query = "select * from vw_news_with_order";
  if (req.params.top) {
    parameters = [parseInt(req.params.top)];
    query += " where ord <= ?";
  }
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
