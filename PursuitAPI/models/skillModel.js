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

function getAllSkills(params, callback) {
  let text = params.text;
  let match;
  if (text != "" && text.length > 0) {
    match = {
      skillText: { $regex: text, $options: "i" },
      isDeleted: false,
    };
  } else {
    match = { isDeleted: false };
  }
  let aggregate = [
    {
      $facet: {
        totalData: [
          {
            $match: match,
          },
        ],
        totalCount: [
          {
            $match: match,
          },
          {
            $count: "count",
          },
        ],
      },
    },
  ];
  model().aggregate(aggregate, function (error, response) {
    callback(error, response);
  });
}

function deleteSkillBySkillId(skillId, callback) {
  model().findOneAndUpdate(
    { skillId: skillId },
    { isDeleted: true },
    function (error, response) {
      callback(error, response);
    }
  );
}

function deleteSkillById(id, callback) {
  model().findOneAndUpdate(
    { _id: mongoose.Types.ObjectId(id) },
    { isDeleted: true },
    {
      new: true,
    },
    function (error, response) {
      callback(error, response);
    }
  );
}
module.exports = {
  addNewSkill,
  getAllSkills,
  deleteSkillBySkillId,
  deleteSkillById
};
