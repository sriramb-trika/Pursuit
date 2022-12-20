const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const candidateSchema = new Schema(
  {
    firstName: { type: String, default: null },
    lastName: { type: String, default: null },
    email: { type: String, required: true, default: null },
    phoneNumber: { type: String, default: null },
    gender: { type: String, required: true },
    dob: { type: String, required: true, default: null },
    address: { type: String, default: null },
    isDeleted: { type: Boolean, default: false },
    linkedInAccount: { type: String, default: null },
    noticePeriod : {type : Number, default : 2},
    qualification : {type : String},
    yearsOfExperience : {type : String},
    preferredLocation: { type: String, default: null },
    immediateJoinee : {type : Boolean, default : false},
    referredBy: { type: String, default: null },
    referralEmail: { type: String, default: null },
    resumeUrl: { type: String, default: null },
    positionConsidered : {type : mongoose.Schema.Types.ObjectId, ref : "position", required: true},
    positionSuited : {type : mongoose.Schema.Types.ObjectId, ref : "position", required : false},
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    createdDateTime: { type: Number, default: new Date().getTime() },
  },
  {
    versionKey: false,
  }
);

const candidateModel = mongoose.model("candidate", candidateSchema);

function model() {
  return candidateModel;
}

function addCandidateProfile(params) {
  return new Promise((resolve, reject) => {
    candidateModel
      .findOne({
        email: params.email,
      })
      .then((data) => {
        if (!data) {
          candidateModel
            .create(params)
            .then((candidateData) => {
              resolve(candidateData);
            })
            .catch((error) => {
              reject(error);
            });
        } else {
          reject("The candidate is already added to Pursuit");
        }
      })
      .catch((error1) => {
        reject(error1);
      });
  });
}

function getCandidatesByName(params, callback) {
  let searchText = params.searchText;
  let limit = parseInt(params.limit);
  let skip = parseInt(params.skip);
  
  let match;
  if (searchText != "{searchText}" && searchText.length > 0) {
    match = {
      $or: [
        { firstName: { $regex: searchText, $options: "i" } },
        { lastName: { $regex: searchText, $options: "i" } },
      ],
      isDeleted: false,
    };
  } else {
    match = {
      isDeleted: false,
    };
  }

  let aggregateQuery = [
    {
     $lookup: {
        'from': "positions",
        'localField': "positionConsidered",
        'foreignField': "_id",
        'as': "positions"
      }
    },
    {
      "$unwind": {
        'path': "$positions",
      }
    },
    {
      $lookup: {
         'from': "positions",
         'localField': "positionSuited",
         'foreignField': "_id",
         'as': "positions1"
       }
     },
     {
       "$unwind": {
         'path': "$positions1",
         preserveNullAndEmptyArrays: true

       }
     },
    {
      $match: match,
    },
    {
      $project: {
        firstName: 1,
        lastName: 1,
        email: 1,
        phoneNumber: 1,
        gender: 1,
        dob: 1,
        address: 1,
        noticePeriod : 1,
        yearsOfExperience : 1,
        immediateJoinee : 1,
        qualification : 1,
        positionConsidered : "$positions.positionText",
        positionSuited : "$positions1.positionText"
      },
    },
    {
      $skip: skip,
    },
    {
      $limit: limit,
    },
  ];

  model().aggregate(aggregateQuery, function (error, response) {
    callback(error, response);
  });
}

module.exports = {
  model,
  addCandidateProfile,
  getCandidatesByName,
};
