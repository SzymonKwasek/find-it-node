var mongoose = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");
    
var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    isAdmin: {type: Boolean, default: false},
    campgrounds:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Camp"
        }],
    clicks: Number
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);