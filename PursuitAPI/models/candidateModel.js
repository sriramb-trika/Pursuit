const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const candidateSchema = new Schema(
  {
    firstName: { type: String, default: null },
    lastName: { type: String, default: null },
    email: { type: String, default: null },
    phoneNumber: { type: String, default: null },
    gender: { type: String, required: true },
    dob: { type: String, required: true, default: null },
    address: { type: String, default: null },
    city: { type: String, default: null },
    state: { type: String, default: null },
    pincode: { type: String, default: null },
    isDeleted: { type: Boolean, default: false },
    linkedInAccount: { type: String, default: null },
    preferredLocation: { type: String, default: null },
    referredBy: { type: String, default: null },
    referralEmail: { type: String, default: null },
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
    return new Promise((resolve,reject) => {
      candidateModel.findOne({
          email: params.email,
        }).then((data) => {
          if (!data) {
            candidateModel.create(params)
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

module.exports = {
  model,
  addCandidateProfile
};
