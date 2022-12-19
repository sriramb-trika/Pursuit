let express = require("express");
let router = express.Router();
let userModel = require("../models/userModel");
let utils = require("./../common/utils");
let md5 = require("md5");
let multer = require("multer");
let config = require("config");
let mailer = require("./../services/mailer");
let verifyToken = require("./../common/verifyToken");
let userService = require("../services/user");
let path = require("path");
let mongoose = require("mongoose");

/**
 * @swagger
 * /positions/listAllPositionsWithSearch/{searchText}:
 *   get:
 *     summary: List all positions
 *     tags:
 *       - Positions
 *     description: List all positions
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: x-access-token
 *         description: send valid token
 *         type: string
 *         in: header
 *       - name: searchText
 *         description: position search text
 *         type: string
 *         in: path
 *     responses:
 *       200:
 *         description: Successfully received all the positions by search
 */

router.get("/listAllPositionsWithSearch/:searchText", verifyToken, function (req, res) {
  try {
    positionModel
      .listAllPositionsWithSearch(req.params.searchText)
      .then((data) => {
        res.status(200).json({
          message: "Successfully retrieved all the positions by search",
          data: data,
        });
      })
      .catch((error) => {
        res.status(403).json({
          message: error.message,
        });
      });
  } catch (error) {
    res.status(403).json({
      message: error.message,
    });
  }
});

module.exports = router;
