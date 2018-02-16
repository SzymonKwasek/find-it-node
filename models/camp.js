var mongoose = require("mongoose");

var campSchema = mongoose.Schema({
    name:String,
    image:String,
    description:String,
    comments:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }],
    author:{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
        },
    created:{
        type: Date,
        default: Date.now
    },
    // location: String,
    lat: Number,
    lng: Number,
    cords:[
        {
            lat: String, lng: String, authorOfMark: String
        }]
});

module.exports = mongoose.model("Camp", campSchema);