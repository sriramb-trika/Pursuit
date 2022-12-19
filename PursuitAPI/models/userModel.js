const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema(
  {
    firstName: { type: String, default: null },
    lastName: { type: String, default: null },
    email: { type: String, default: null },
    phoneNumber: { type: String, default: null },
    password: { type: String, default: null },
    temporaryPassword: { type: String, default: null },
    userType: { type: Number, default: 1 },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    skills: [{ type: String }],

    userApproved: { type: Boolean, default: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    createdDateTime: { type: Number, default: new Date().getTime() },
  },
  {
    versionKey: false,
  }
);

const userModel = mongoose.model("user", userSchema);

function model() {
  return userModel;
}

function login(params) {
  return userModel.findOne(
    {
      email: params.email,
      password: params.password,
      userType: params.userType,
    },
    { firstName: 1, lastName: 1, userType: 1, email: 1, _id: 1 }
  );
}

function userSignUp(params) {
  return new Promise((resolve, reject) => {
    userModel
      .findOne({
        email: params.email,
      })
      .then((data) => {
        if (!data) {
          userModel
            .create(params)
            .then((data) => {
              resolve(data);
            })
            .catch((error) => {
              reject(error);
            });
        } else {
          reject({
            message: "The requesting user is already part of the system",
          });
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

module.exports = {
  model,
  login,
  userSignUp
}