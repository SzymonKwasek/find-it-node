var express = require("express"),
    router = express.Router({mergeParams: true}),
    Camp = require("../models/camp"),
    Comment = require("../models/comment"),
    middleware = require("../middlewares/middlewares");

// new comment
router.get("/new", middleware.isLoggedIn,  function(req, res){
    Camp.findById(req.params.id, function(err, camp){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.render("./comments/new",{campground:camp});
        }
    });
});

// create comment
router.post("/", middleware.isLoggedIn, function(req, res){
        Camp.findById(req.params.id, function(err,camp){
            if(err){
                console.log(err);          
            }else{
                 Comment.create(req.body.comment, function(err, comment){
                     if(err){
                         req.flash("error", "Something went wrong!")
                         console.log(err);
                     }else{
                         comment.author.id = req.user._id;
                         comment.author.username = req.user.username;
                        //  comment.edited = false;
                         comment.save();
                         camp.comments.push(comment._id);
                         camp.save(function(err){
                             console.log("comment has been added");
                         });
                         req.flash("success", "Comment has been created succesfully!")
                         res.redirect("/campgrounds/"+camp._id);
                     }
                 });
            }
        });
});


// edit
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
            Comment.findById(req.params.comment_id, function(err, comment){
                    res.render("./comments/edit",{campground_id: req.params.id, comment:comment});
    });
});


// UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
            Comment.findByIdAndUpdate(req.params.comment_id, {content: req.body.content, edited : true},  function(err, comment){
                    req.flash("success", "Comment has been edited succesfully!")
                    res.redirect("/campgrounds/"+req.params.id);
    });
});


// DELETE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err, comment){
            req.flash("success", "Comment has been deleted succesfully!")
            res.redirect("/campgrounds/"+req.params.id);
    })
})
// middleware


module.exports = router;