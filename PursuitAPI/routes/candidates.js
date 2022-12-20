let express = require("express");
let router = express.Router();
let verifyToken = require("./../common/verifyToken");

/**
 * @swagger
 * /candidates/addCandidateProfile:
 *   post:
 *     summary: Signing up a new user. This could be a recruiter or panelist
 *     tags:
 *       - Candidates
 *     description: Signing up a new user. This could be a recruiter or panelist
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: x-access-token
 *         in: header
 *         type: string
 *         required: true
 *       - name: Details
 *         description: Candidate details
 *         in: body
 *         default : '{"firstName":"Harry","lastName":"Ford","email":"harry.ford@yopmail.com","phoneNumber":"+919629883300","gender":"male","dob":"10/07/1995","address":"12, 1st street, 3rd cross","city":"Chennai","state":"Tamil Nadu","pincode":"600001","linkedInAccount":"www.linkedin.com/harry.ford","preferredLocation":"Bangalore","referredBy":"talentoHR","referralEmail":"admin@talentohr.com"}'
 *         schema:
 *           $ref: '#/definitions/Candidates'
 *     responses:
 *       200:
 *         description: Successfully created
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
 */

router.post("/addCandidateProfile", verifyToken, async function (req, res) {
  try {
   
    await candidateModel
      .addCandidateProfile(req.body).then((data1) => {
        let result = {
            data : data1,
          message: "Candidates added successfully",
        };
        res.status(200).json(result);
      }).catch((error) => {
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

module.exports = router;
