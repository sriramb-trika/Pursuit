var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('config');
var utils = require('./../common/utils');

function verifyToken(req, res, next) {
  try {
    const accessToken = req.headers['x-access-token'];
    if (!accessToken) {
      res.status(401).json({
        message: "No access token"
      });
    } else {

      utils.verifyJwtToken(accessToken).then((data) => {
        blackListModel.model().find({ access_token: accessToken }).then(function (result) {
          if (result.length == 0) {
            req.userId = data.userId;
            req.userType = data.userType;
            req.deviceInfo = data.deviceInfo;
            next();
          }
          else {
            res.status(401).json({
              message: "User has logged out",
              data: accessToken
            })
          }
        }).catch((error) => {
          res.status(401).json({
            message: "Invalid access token.",
            data: error
          })
        })
      }).catch((error) => {
        res.status(401).json({
          message: "Invalid access token.",
          data: error
        })
      })
    }
  } catch (error) {
    res.status(401).json({
      message: "Token verification failed ",
      data: error
    });
  }
}

module.exports = verifyToken;