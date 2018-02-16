var express = require("express"),
    router = express.Router(),
    User = require("../models/user"),
    Camp = require("../models/camp"),
    passport =  require("passport");


//root route
router.get("/", function(req,res){
   res.render("landing"); 
});


// REGISTER FORM
router.get("/register", function(req, res){
    res.render('./authentication/register');
});

router.get("/register/admin", function(req, res){
    res.render('./authentication/registeradmin');
});

// ADD USER TO DATABASE
router.post("/register", function(req, res){
    var newUser = new User({username:req.body.username, clicks: 0});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            // req.flash("error", err.message)
            return res.render("./authentication/register",{"error": err.message});
        }
            passport.authenticate('local')(req, res, function(){
                req.flash("success", "User "+user.username+" has been created successfully!");
                res.redirect("campgrounds");
            });
    });
});

router.post("/register/admin", function(req, res){
    var newUser = new User({username:req.body.username});
    if(req.body.adminCode === 'secretcode'){
        newUser.isAdmin = true;
    }
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            // req.flash("error", err.message)
            return res.render("./authentication/register",{"error": err.message});
        }
            passport.authenticate('local')(req, res, function(){
                req.flash("success", "User "+user.username+" has been created successfully!");
                res.redirect("campgrounds");
            });
    });
});



// LOGIN
// login form
router.get("/login", function(req, res){
    res.render("./authentication/login");
});

// login logic handler
router.post("/login", passport.authenticate('local',
{
    successRedirect : "/campgrounds",
    failureRedirect : "/login",
    failureFlash: true
}), function(req, res){
});

// logout
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("back");
});



// User Panel

router.get("/user/:id", function(req, res){
    User.findById(req.params.id).populate("campgrounds").exec(function(err, data){
        if(err){
            console.log(err);
            res.redirect("campgrounds");
        }else{
            res.render("./user", {user:data});
        }
    });
});




// ================================
router.get("/*", function(req, res){
    res.redirect("campgrounds");
});




module.exports = router;