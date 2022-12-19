let express = require("express");
let router = express.Router();
let userModel = require("../models/userModel");
let verifyToken = require("./../common/verifyToken");
const c = require("config");

/* GET panelists listing. */
router.get("/panelists", function (req, res, next) {
  res.send("Recruiters is working..");
});


/**
 * @swagger
 * /recruiters/getRecruitersByName/{searchText}:
 *   get:
 *     tags:
 *       - Recruiters
 *     description: get all Recruiters profile details
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: x-access-token
 *         description: send valid token
 *         type: string
 *         in: header
 *       - name: searchText
 *         description: searchText
 *         type: string
 *         in: query
 *       - name: skip
 *         description: skip default is 0
 *         in: query
 *         type: number
 *         required: true
 *       - name: limit
 *         description: limit
 *         in: query
 *         type: number
 *         required: true
 *     responses:
 *       200:
 *         description: To get panelists profile details
 */

router.get(
    "/getRecruitersByName/:searchText",
    verifyToken,
    function (req, res) {
      let skip = req.query.skip;
      let limit = req.query.limit;
      let searchText = req.query.searchText ? req.query.searchText : "";
  
      let params = {
        skip: skip,
        limit: limit,
        searchText: searchText,
      };

      userModel.getRecruitersByName(
        params,
        function (error, response) {
          if (error) {
            res.status(403).json({
              error: error,
            });
          } else {
            res.status(200).json({
              data: response,
              message: "Received the user details",
            });
          }
        }
      );
    }
  );

  module.exports = router;