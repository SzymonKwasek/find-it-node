var Camp = require("../models/camp"),
    Comment = require("../models/comment");
var exports = module.exports = {};



exports.isLoggedIn= (req, res, next) =>{
    if(req.isAuthenticated()){
        return next();
    }else{
        req.flash("error", "You have to be logged in !")
        res.redirect("/login");
    }
}
exports.checkCommentOwnership = (req, res, next) =>{
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, data){
            if(err || !data){
                req.flash("error", "Comment not found !")
                res.redirect("back")
            }else if(req.user.isAdmin || data.author.id.equals(req.user._id)){
                next();
            }else{
                req.flash("error", "You are not the owner of this comment!");
                res.redirect("back")
            }
        })
    }else{
        req.flash("error", "You have to be logged in !")
        res.redirect("back");
    }
}
exports.checkCampgroundOwnership = (req, res, next) =>{
    if(req.isAuthenticated()){
        Camp.findById(req.params.id, function(err, data){
            if(err || !data){
                req.flash("error", "Campground not found !")
                res.redirect("back")
            }else if(req.user.isAdmin || data.author.id.equals(req.user._id) ){
                next();
            }else{
                req.flash("error", "You are not the owner of this campground!")
                res.redirect("back")
            }
        })
    }else{
        req.flash("error", "You have to be logged in !")
        res.redirect("back");
    }
}
