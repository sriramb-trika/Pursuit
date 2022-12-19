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
 * /skills/addNewSkill:
 *   post:
 *     summary: Add a new skill to the skills registry
 *     tags:
 *       - Skills
 *     description: Add a new skill to the skills registry
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: x-access-token
 *         in: header
 *         type: string
 *         required: true
 *       - name: body
 *         description: Body content
 *         in: body
 *         default: '{"skillText":"C#"}'
 *         schema:
 *           $ref: '#/definitions/addNewSkill'
 *     responses:
 *       200:
 *         description: Successfully added the skill
 */


router.post("/addNewSkill", verifyToken, async function (req, res) {
    try {
      let data = await skillModel.addNewSkill(req.body);
      let result = {
        success: true,
        data: data,
        message: "Skill added successfully",
      };
      res.status(200).json(result);
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
