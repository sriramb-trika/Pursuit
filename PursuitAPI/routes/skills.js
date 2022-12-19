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

/**
 * @swagger
 * /skills/getAllSkills:
 *   get:
 *     summary: Get all skills
 *     tags:
 *       - Skills
 *     description:  Get all skills
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: x-access-token
 *         in: header
 *         type: string
 *         required: true
 *       - name: text
 *         description: search text
 *         in: query
 *         type: string
 *         required: false
 *     responses:
 *       200:
 *         description: Successfully received all the skill.
 */

router.get("/getAllSkills", function (req, res, next) {
  try {
    let text = req.query.text ? req.query.text : "";

    let params = {
      text: text,
    };

    skillModel.getAllSkills(params, function (error, response) {
      if (error) {
        res.status(403).json({
          message: error,
        });
      } else if (response.length == 0) {
        res.status(403).json({
          success: false,
          message: "There is no skills in the registry",
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



/**
 * @swagger
 * /skills/deleteSkillById:
 *   delete:
 *     summary: Delete skill by id
 *     tags:
 *       - Skills
 *     description:  Delete skill by id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: x-access-token
 *         description: x-access-token of doctor
 *         in: header
 *         type: string
 *         required: true
 *       - name: id
 *         description: id
 *         in: query
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Successfully deleted a skill.
 */
router.delete('/deleteSkillById', verifyToken, function (req, res, next) {
    try {
      let id = req.query.id;
      skillModel.deleteSkillById(id, function (error, response) {
        if (error) {
          res.status(403).json({
            message: error
          });
        } else if (response.length == 0) {
          res.status(403).json({
            success: false,
            message: "There is no skill in the registry to delete"
          });
        } else {
          res.status(200).json({
            success: true,
            data: response,
            message: "Successfully deleted the selected skill"
          });
        }
      });
    } catch (e) {
      res.status(403).json({
        success: false,
        message: e.message,
        data: e
      });
    }
  });

module.exports = router;
