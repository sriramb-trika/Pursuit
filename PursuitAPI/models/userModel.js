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


function getPanelistsByName(params, callback) {
  let searchText = params.searchText;
  let limit = parseInt(params.limit);
  let skip = parseInt(params.skip);
  let match;
  if (searchText != "{searchText}" && searchText.length > 0) {
    match = {
      userType: {
        $in: [2],
      },
      $or: [
        { firstName: { $regex: searchText, $options: "i" } },
        { lastName: { $regex: searchText, $options: "i" } },
      ],
      isDeleted: false,
    };
  } else {
    match = {
      userType: {
        $in: [2],
      },
      isDeleted: false,
    };
  }

  let aggregateQuery = [
    {
      $match: match,
    },
    {
      $project: {
        firstName: 1,
        lastName: 1,
        email: 1,
        userType: 1,
        mobileNumber: 1,
        userTypeText: {
          $cond: {
            if: { $eq: ["$userType", 1] },
            then: "Recruiter",
            else: "Panelist",
          },
        },
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


// Logic not working. Needs fix
function getPanelistsBySkills(searchText, callback) {
  let match;
  if (searchText != "{searchText}" && searchText.length > 0) {
    match = {
      $nor: [
        { skills: { $exists: false } },
        { skills: { $size: 0 } },
        { skills: { $size: 1 } },
      ],
      $or: [
        {
          userType: 2,
        },
        {
          skills: {
            $in: [searchText],
          },
        },
        { isDeleted: false },
      ],
    };
  } else {
    match = {
      $nor: [
        { skills: { $exists: false } },
        { skills: { $size: 0 } },
        { skills: { $size: 1 } },
      ],
      $or: [
        {
          userType: 2,
        },
        { isDeleted: false },
      ],
    };
  }

  let aggregateQuery = [
    {
      $match: match,
    },
    {
      $project: {
        firstName: 1,
        lastName: 1,
        email: 1,
        userType: 1,
        mobileNumber: 1,
        skills: 1,
        userTypeText: {
          $cond: {
            if: { $eq: ["$userType", 1] },
            then: "Recruiter",
            else: "Panelist",
          },
        },
      },
    },
  ];

  model().aggregate(aggregateQuery, function (error, response) {
    callback(error, response);
  });
}


function deactivateUser(params, callback) {
  let id = params.id;
  let isDeactivated = params.isDeactivated;

  id = mongoose.Types.ObjectId(id);
  model().findOneAndUpdate(
    {
      _id: id,
    },
    {
      $set: {
        isDeactivated: isDeactivated,
      },
    },
    {
      new: true,
    },
    function (error, response) {
      callback(error, response);
    }
  );
}

function deleteUser(id, callback) {
  id = mongoose.Types.ObjectId(id);
  model().findOneAndUpdate(
    {
      _id: id,
    },
    {
      $set: {
        isDeleted: true,
      },
    },
    {
      new: true,
    },
    function (error, response) {
      callback(error, response);
    }
  );
}



function updatePanelistsSkills(id, params) {
  return new Promise((resolve, reject) => {
    userModel
      .findOne({
        _id: id,
      })
      .then((data) => {
        if (!data) {
          reject({
            message: "Invalid user",
          });
        } else {
          userModel
            .updateOne(
              {
                _id: id,
              },
              {
                $push: { skills: params },
              }
            )
            .then((data) => {
              resolve(data);
            })
            .catch((error) => {
              reject(error);
            });
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}


function updatePanelistProfile(params, callback) {
  let id = params.id;

  let firstName = params.firstName;
  let lastName = params.firstName;
  let phoneNumber = params.phoneNumber;
  let skills = params.skills;

  model().findOneAndUpdate(
    { _id: id, userType: params.userType },
    {
      $set: {
        firstName: firstName,
        lastName: lastName,
        // email : email,
        phoneNumber: phoneNumber,
        skills: skills,
      },
    },
    { new: true },
    function (error, response) {
      callback(error, response);
    }
  );
}


function getRecruitersByName(params, callback) {
  console.log(params);
  let searchText = params.searchText;
  let limit = parseInt(params.limit);
  let skip = parseInt(params.skip);

  let match;
  if (searchText != "{searchText}" && searchText.length > 0) {
    match = {
      userType: {
        $in: [1],
      },
      $or: [
        { firstName: { $regex: searchText, $options: "i" } },
        { lastName: { $regex: searchText, $options: "i" } },
      ],
      isDeleted: false,
    };
  } else {
    match = {
      userType: {
        $in: [1],
      },
      isDeleted: false,
    };
  }
  let aggregateQuery = [
    {
      $match: match,
    },
    {
      $project: {
        firstName: 1,
        lastName: 1,
        email: 1,
        userType: 1,
        mobileNumber: 1,
        userTypeText: {
          $cond: {
            if: { $eq: ["$userType", 1] },
            then: "Recruiter",
            else: "Panelist",
          },
        },
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
  login,
  userSignUp,
  getPanelistsByName,
  getPanelistsBySkills,
  deactivateUser,
  updatePanelistsSkills,
  updatePanelistProfile,
  deleteUser,
  getRecruitersByName
}