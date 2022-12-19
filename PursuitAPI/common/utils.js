let config = require("../config/dev.json");
var jwt = require("jsonwebtoken");
const converter = require("json-2-csv");
const fs = require("fs");

var generateJwtToken = (data) => {
  var token = jwt.sign(data, config.project.jwtSecret, { expiresIn: "1d" });
  return token;
};

var verifyJwtToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.project.jwtSecret, function (err, decoded) {
      if (err) {
        reject(err);
      }
      // console.log(decoded);
      resolve(decoded);
    });
  });
};

var getConectionString = () => {
  var connStr = "";
  //mongodb://[username:password@]host1[:port1][,...hostN[:portN]][/[defaultauthdb][?options]]
  var userOption = "";
  if (config.database.username) {
    userOption =
      config.database.username + ":" + config.database.password + "@";
  }

  return (
    "mongodb://" +
    userOption +
    config.database.host +
    ":" +
    config.database.port +
    "/" +
    config.database.database
  );
};


module.exports = {
  generateJwtToken,
  verifyJwtToken,
  getConectionString,
}