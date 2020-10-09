const sqlite3 = require("sqlite3").verbose();

let databasePath = "news.db";

module.exports = function (databaseName) {
  this.databaseName = databaseName;
  this.select = (query, parameters, callback) => {
    let database = new sqlite3.Database(
      this.databaseName,
      sqlite3.OPEN_READONLY,
      (err) => {
        if (err) {
          callback(err, undefined);
        } else {
          database.all(query, parameters, (err, rows) => {
            if (err) {
              callback(err, undefined);
            } else {
              callback(undefined, rows);
            }
            database.close();
          });
        }
      }
    );
  };
};
