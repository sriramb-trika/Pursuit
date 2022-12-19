let express = require("express");
let router = express.Router();
let userModel = require("../models/userModel");
let utils = require("./../common/utils");
let verifyToken = require("./../common/verifyToken");
let userService = require("../services/user");
let mailer = require("./../services/mailer");

router.get("/", function (req, res, next) {
  res.send("Pursuit API");
});

/**
 * @swagger
 * /users/userSignup:
 *   post:
 *     summary: Signing up a new user. This could be a recruiter or panelist
 *     tags:
 *       - Users
 *     description: Signing up a new user. This could be a recruiter or panelist
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Details
 *         description: Athlete details
 *         in: body
 *         default : '{"name":"Ramesh","email":"ramesh.b@yopmail.com","password":"Welcome@123","userType":1}'
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: Successfully created
 */

/**
 * @swagger
 * definitions:
 *   User:
 *     properties:
 *       name:
 *         type: string
 *       email:
 *         type: string
 *       password:
 *         type: string
 *       userType:
 *         type: string
 */

router.post("/userSignup", function (req, res, next) {
  try {
    let names = req.body.name.split(" ");

    let firstName = names[0];
    let lastName = names[1];

    req.body.firstName = firstName;
    req.body.lastName = lastName;

    delete req.body.name;
    let params = req.body;

    userModel
      .userSignUp(params)
      .then((userData) => {
        if (userData) {
          let name = userData.firstName;
          if (userData.lastName != null) {
            name = name + " " + userData.lastName;
          }

          if (userData.userType == 1) {
            mailer.sendMail(
              "recruiterWelcomeEmail.html",
              userData.email,
              "Pursuit - Recruiter welcome email",
              {
                name: name,
              }
            );
          } else {
            mailer.sendMail(
              "panelistWelcomeEmail.html",
              userData.email,
              "Pursuit - Panelist welcome email",
              {
                name: name,
              }
            );
          }
          res.status(200).send({
            message: "Registered the user successfully",
            data: userData,
            // token: token,
          });
        } else {
          res.status(403).send({
            message: "Unable to register the user",
          });
        }
      })
      .catch((error) => {
        res.status(403).send({
          error: error,
        });
      });
  } catch (error) {
    res.status(403).json({
      message: error.message,
      data: error,
    });
  }
});

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: User login for recruiters and panelists
 *     tags:
 *       - Users
 *     description: User login for recruiters and panelists
 *     produces:
 *       - application/json
 *     parameters:
 *        - name: body
 *          description: send params for login
 *          in: body
 *          default: '{"email":"ramesh.b@yopmail.com","password":"Welcome@123"}'
 *          schema:
 *            $ref: '#/definitions/loginRef'
 *     responses:
 *       200:
 *         description: send user details if the credentials is correct
 */

/**
 * @swagger
 * definitions:
 *    loginRef:
 *      properties:
 *        email:
 *          type: string
 *        password:
 *          type: string
 */

router.post("/login", async function (req, res, next) {
  let params = req.body;
  let result = userService.validateFields(
    {
      email: true,
      password: true,
    },
    req.body,
    res
  );

  if (result.success == false) {
    return;
  }

  try {
    let data = await userModel.model().findOne({
      email: params.email,
    });
    if (!data) {
      res.status(400).send({
        message: "Incorrect email/password",
      });
      return;
    }

    params.userType = data.userType;

    userModel
      .login(params)
      .then((userData) => {
        if (userData) {
          if (userData.userApproved == false) {
            res.status(401).send({
              message:
                "Your account is not being approved yet. Please contact administrator",
            });
            return;
          } else if (userData.isDeleted == true) {
            res.status(403).send({
              message: "The account is already deleted. Cannot login",
            });
          }

          let name = userData.firstName;
          if (userData.lastName != null) {
            name = name + " " + userData.lastName;
          }
          if (userData.userType == 1) {
            mailer.sendMail(
              "recruiterWelcomeEmail.html",
              userData.email,
              "Pursuit - Recruiter welcome email",
              {
                name: name,
              }
            );
          } else {
            mailer.sendMail(
              "panelistWelcomeEmail.html",
              userData.email,
              "Pursuit - Panelist welcome email",
              {
                name: name,
              }
            );
          }
          let token = utils.generateJwtToken({
            userId: userData._id,
            name: name,
            email: userData.email,
            userType: params.userType,
          });

          res.status(200).send({
            message: "User logged in successfully.",
            data: userData,
            token: token,
          });
        } else {
          res.status(400).send({
            message: "Incorrect email/password",
          });
        }
      })
      .catch((error) => {
        res.status(403).send({
          message: error.message,
          data: error,
        });
      });
  } catch (error) {
    res.status(400).send({
      message: "Incorrect email/password",
    });
    return;
  }
});

/**
 * This function is used for logout
 */

/**
 * @swagger
 * /users/logOut:
 *   post:
 *     summary: Logout for user
 *     tags:
 *       - Users
 *     description: Logout for user.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: x-access-token
 *         in: header
 *         type: string
 *         required: true
 *         description: The access token for AH Care user
 *     responses:
 *       200:
 *         description: Successfully logged out
 */

router.post("/logOut", verifyToken, async function (req, res, next) {
  let token;
  try {
    token = req.headers["x-access-token"];

    blackListModel.saveAccesstoken(token, async function (err, result) {
      if (err) {
        res.status(403).json({
          message: "Unable to add the token in the blacklist model",
          errMessage: err.message,
          data: err,
          token: token,
        });
      } else {
        res.status(200).json({
          data: result,
          message: "Token added to the blacklist model",
        });
      }
    });
  } catch (e) {
    res.status(403).json({
      message: "Unable to add the token in the blacklist model",
      data: e,
      errMessage: e.message,
      token: token,
    });
  }
});

module.exports = router;
