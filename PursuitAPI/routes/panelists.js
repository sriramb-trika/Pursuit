let express = require("express");
let router = express.Router();
let userModel = require("../models/userModel");
let verifyToken = require("./../common/verifyToken");
let userService = require("../services/user");

/* GET panelists listing. */
router.get("/panelists", function (req, res, next) {
  res.send("Panelists is working..");
});

/**
 * @swagger
 * /panelists/getPanelistsByName/{searchText}:
 *   get:
 *     summary: Get all the panelists by their name. 
 *     tags:
 *       - Panelists
 *     description: Get all user profile details (Recruiters and Panelists) by their name as search parameter
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

router.get("/getPanelistsByName/:searchText", verifyToken, function (req, res) {
  let skip = req.query.skip;
  let limit = req.query.limit;
  let searchText = req.query.searchText ? req.query.searchText : "";

  let params = {
    skip: skip,
    limit: limit,
    searchText: searchText,
  };
  userModel.getPanelistsByName(params, function (error, response) {
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
  });
});


/**
 * @swagger
 * /panelists/getPanelistsBySkills/{searchText}:
 *   get:
 *     tags:
 *       - Panelists
 *     description: get all user profile details of panelists by their skill
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
 *         description: To get panelists profile details by skills
 */

router.get(
  "/getPanelistsBySkills/:searchText",
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
    userModel.getPanelistsBySkills(params, function (error, response) {
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
    });
  }
);


/**
 * @swagger
 * /panelists/updateUserSkills:
 *   put:
 *     summary: Update the panelist skills
 *     tags:
 *       - Panelists
 *     description: Update the panelist skills
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: x-access-token
 *         description: x-access-token of user
 *         in: header
 *         type: string
 *         required: true
 *       - name: body
 *         description: skillText
 *         in: body
 *         default : '{"skillText":"Java"}'
 *         schema:
 *           $ref: '#/definitions/updateSkill'
 *     responses:
 *       200:
 *         description: Successfully updated
 */

/**
 * @swagger
 * definitions:
 *   updateSkill:
 *     properties:
 *       id:
 *         type: string
 *       skillText:
 *         type: string
 */
router.put("/updateUserSkills", verifyToken, function (req, res) {
  try {
    console.log(req.userId);
    console.log(req.userType);
    let id = req.userId;
    let skillText = req.body.skillText;

    userModel
      .getPanelistsBySkills(id, skillText)
      .then((data) => {
        res.status(200).json({
          data: data,
          message: "Updated the panelist skills ",
        });
      })
      .catch((error) => {
        res.status(403).json({
          message: error.message,
        });
      });
  } catch (e) {
    res.status(403).json({
      message: e.message,
    });
  }
});


/**
 * @swagger
 * /panelists/updatePanelistProfile:
 *   put:
 *     summary: Update panelist profile
 *     tags:
 *       - Panelists
 *     description: Update panelist profile
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: x-access-token
 *         description: send valid token
 *         type: string
 *         in: header
 *       - name: body
 *         description: Update panelist profile
 *         in: body
 *         default: '{"firstName":"Ramesh","lastName":"Kumar","email":"ramesh.b@yopmail.com","phoneNumber":"9629880000","userType":"1","skills":["Java",".NET","React"]}'
 *         schema:
 *           $ref: '#/definitions/panelistUpdateProfileRef'
 *     responses:
 *       200:
 *         description: Update panelist profile
 */

/**
 * @swagger
 * definitions:
 *    panelistUpdateProfileRef:
 *      properties:
 *        firstName:
 *          type: string
 *        lastName:
 *          type: string
 *        email:
 *          type: string
 *        phoneNumber:
 *          type: string
 *        skills:
 *          type: [string]
 */

router.put("/updatePanelistProfile", verifyToken, function (req, res) {
  try {
    let userId = req.userId;

    let params = {
      id: userId,
      firstName: req.body.firstName,
      lastName: req.body.firstName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      skills: req.body.skills,
      userType: req.userType,
    };

    userModel.updatePanelistProfile(params, function (error, response) {
      if (error) {
        res.status(403).json({
          error: error.message,
        });
      } else {
        res.status(200).json({
          data: response,
          message: "Successfully updated the address details",
        });
      }
    });
  } catch (error) {
    res.status(403).json({
      message: error.message,
    });
  }
});

module.exports = router;
