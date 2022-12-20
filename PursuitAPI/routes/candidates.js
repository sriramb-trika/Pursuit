let express = require("express");
let router = express.Router();
let verifyToken = require("./../common/verifyToken");

/**
 * @swagger
 * /candidates/addCandidateProfile:
 *   post:
 *     summary: Adding a new candidates profile
 *     tags:
 *       - Candidates
 *     description: Adding a new candidates profile
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: x-access-token
 *         in: header
 *         type: string
 *         required: true
 *       - name: Details
 *         description: candidates profile details
 *         in: body
 *         default : '{"firstName":"Harry","lastName":"Ford","email":"harry.ford@yopmail.com","phoneNumber":"+919629883300","gender":"male","dob":"10/07/1995","address":"12, 1st street, 3rd cross","city":"Chennai","state":"Tamil Nadu","pincode":"600001","linkedInAccount":"www.linkedin.com/harry.ford","preferredLocation":"Bangalore","referredBy":"talentoHR","referralEmail":"admin@talentohr.com", "positionConsidered":"5ea95d3ac73f3120f8aa55d1"}'
 *         schema:
 *           $ref: '#/definitions/Candidates'
 *     responses:
 *       200:
 *         description: Successfully added a new candidate
 */

/**
 * @swagger
 * definitions:
 *   Candidates:
 *     properties:
 *       firstName:
 *         type: string
 *       lastName:
 *         type: string
 *       email:
 *         type: string
 *       phoneNumber:
 *         type: string
 *       gender:
 *         type: string
 *       dob:
 *         type: string
 *       address:
 *         type: string
 *       city:
 *         type: string
 *       state:
 *         type: string
 *       pinCode:
 *         type: string
 *       linkedInAccount:
 *         type: string
 *       referredBy:
 *         type: string
 *       referralEmail:
 *         type: string
 *       positionConsidered:
 *         type: string
 */

router.post("/addCandidateProfile", verifyToken, async function (req, res) {
  try {
    await candidateModel
      .addCandidateProfile(req.body)
      .then((data1) => {
        let result = {
          data: data1,
          message: "Candidates added successfully",
        };
        res.status(200).json(result);
      })
      .catch((error) => {
        let data = {
          message: error,
        };
        res.status(403).json(data);
      });
  } catch (e) {
    let data = {
      success: false,
      error: e.errorText,
      message: e.message,
    };
    res.status(403).json(data);
  }
});


/**
 * @swagger
 * /candidates/getCandidatesByName/{searchText}:
 *   get:
 *     summary: Get all the candidates by their name. 
 *     tags:
 *       - Candidates
 *     description: Get all candidates details by their name as search parameter
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
 *         description: To get candidate details    
 */

router.get("/getCandidatesByName/:searchText", function (req, res) {
  try {
    let skip = req.query.skip;
    let limit = req.query.limit;
    let searchText = req.query.searchText ? req.query.searchText : "";
  
    let params = {
      skip: skip,
      limit: limit,
      searchText: searchText,
    };

    candidateModel.getCandidatesByName(params, function (error, response) {
      if (error) {
        res.status(403).json({
          message: error,
        });
      } else if (response.length == 0) {
        res.status(403).json({
          success: false,
          message: "There is no candidates in the registry",
        });
      } else {
        res.status(200).json({
          success: true,
          data: response,
        });
      }
    });
  } catch (e) {
    let result = {
      success: false,
      message: e.message,
      data: e,
    };
    res.status(403).json(result);
  }
});

module.exports = router;
