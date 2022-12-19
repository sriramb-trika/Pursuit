let mongoose = require('mongoose');

Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

blacklistSchema = new Schema({
    id: ObjectId,
    accessToken: String,
    createdDateTime: { type: Date, default: Date.now },
}, {
    versionKey: false // You should be aware of the outcome after set to false
});

let blacklistModel = mongoose.model('blacklist', blacklistSchema);

function model() {

    return blacklistModel;
};

function saveAccesstoken(modelData, callback) {
    model().find({
        accessToken: modelData,
    }, function (err, data) {
        if (data.length <= 0) {
            model().create({
                accessToken: modelData
            }, function (err, data) {
                return callback(err, data)
            });
        } else {

            model().findOneAndUpdate({
                "accessToken": modelData
            }, {
                "accessToken": modelData
            }, { new: true }, function (err, user) {
                return callback(err, user);
            });
        }
    });
}


module.exports = { model, saveAccesstoken };