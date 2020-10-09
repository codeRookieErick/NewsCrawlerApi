const DataAccess = require("../data/sqliteDataAccess");
let express = require("express");
let router = express.Router();

router.get("/:category?", function (req, res) {
  let dataAccess = new DataAccess("./data/news.db");
  let parameters = [];
  let query = "select * from vw_categories;";
  if (req.params.category) {
    parameters = [req.params.category];
    query = "select * from vw_categories where category = ?;";
  }
  dataAccess.select(query, parameters, (err, data) => {
    if (err) {
      res.status(500).json("Algo se incendia...");
    } else {
      res.json(data);
    }
  });
});

module.exports = router;
