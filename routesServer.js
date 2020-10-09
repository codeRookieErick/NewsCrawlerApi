const fs = require("fs");
const path = require("path");

module.exports = (folder, callback) => {
  let fullPath = path.join(__dirname, folder);
  fs.readdir(fullPath, (err, files) => {
    if (err) {
      callback(err, undefined);
    } else {
      callback(
        undefined,
        files
          .filter((f) => f.endsWith(".js"))
          .map((f) => {
            return {
              route: "/" + f.substring(0, f.length - 3),
              file: path.join(fullPath, f),
            };
          })
      );
    }
  });
};
