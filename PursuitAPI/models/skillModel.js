let mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const skillSchema = new Schema(
  {
    skillText: String,
    isDeleted: { type: Boolean, default: false },
    isEnabled: { type: Boolean, default: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: false,
    },
    createdDateTime: { type: Number, default: new Date().getTime() },
  },
  {
    versionKey: false,
  }
);

let skillModel = mongoose.model("skill", skillSchema);

function model() {
  return skillModel;
}

function addNewSkill(params) {
  return new Promise((resolve, reject) => {
    skillModel
      .findOne({
        skillText: params.skillText,
      })
      .then((data) => {
        if (!data) {
          skillModel
            .create(params)
            .then((data) => {
              resolve(data);
            })
            .catch((error) => {
              reject(error);
            });
        } else {
          reject({
            message: "The skill is already present in the system",
          });
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}


module.exports = {
  addNewSkill,
};
