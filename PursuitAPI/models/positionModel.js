const e = require("express");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const positionSchema = new Schema(
  {
    positionID: { type: String, default: null },
    positionText: { type: String, default: null },
    isDeleted: { type: Boolean, default: false },
    createdDate: { type: Date, default: null },
  },
  {
    versionKey: false,
  }
);

const positionModel = mongoose.model("positions", positionSchema);

function model() {
  return positionModel;
}

module.exports = {
  model,
};

function createData() {
  model()
    .countDocuments({})
    .then(function (doc) {
      if (doc != "undefined" && doc == 0) {
        console.log(true);
        positions = require("../data/positions.json");

        let positionsData = positions;

        let positionArray = [];
        for (let i in positionsData) {
          let positionJSON = {};

          positionJSON.positionID = positionsData[i].PositionID;
          positionJSON.positionText = positionsData[i].PositionText;
          positionJSON.createdDate = new Date();
          positionArray.push(positionJSON);
        }
        return model().insertMany(positionArray);
      } else {
        throw "*** Position details are already imported ***";
      }
    })
    .then(function (result) {
      console.log("Imported position data i=" + result.length);
    })
    .catch(function (err) {
      console.log(err);
    });
}

function listAllPositionsWithSearch(search) {
  let searchText = search != "{searchText}" ? search : "";
  let match = {};
  if (searchText != undefined && searchText.length > 0) {
    match = {
      positionText: { $regex: searchText, $options: "i" },
      isDeleted: false,
    };
  } else {
    match = {
      isDeleted: false,
    };
  }
  let query = [
    {
      $match: match,
    },
    {
      $project: {
        positionText: 1,
        _id: 0,
      },
    },
    {
      $skip: 0,
    },
    {
      $limit: 40,
    },
    {
      $sort: {
        PositionText: 1,
      },
    },
  ];


  return model().aggregate(query);
}

createData();

module.exports = { model, listAllPositionsWithSearch };
