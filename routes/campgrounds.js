var express = require("express"),
    router = express.Router(),
    Camp = require("../models/camp"),
    User = require("../models/user"),
    geocoder = require("geocoder"),
    middleware = require("../middlewares/middlewares");


// INDEX
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}
router.get('/', function(req,res){
    if(!req.query.search){
        Camp.find({},function(err, camp){
          if(err){
              console.log(err);
          }else{
            res.render("./campgrounds/index",{campgrounds: camp}) ;
          }
        });
    }else{
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        Camp.find({name: regex}, function(err, camp){
            if(err){
                console.log(err);
            }else{
                res.render("./campgrounds/index",{campgrounds: camp});
            }
        });
    }
});

// CREATE
router.post('/', middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
        };
    geocoder.geocode(req.body.location, function(err, data){
    
  
    var lat = req.body.lat;
    var lng = req.body.lng;
    if(isNaN(lat) || isNaN(lng)){
        req.flash("error","Something is wrong with your location ! Try to set latitude and longitude!");
        return res.redirect("back");
    }
    var cords = {lat: lat, lng:lng};
    var newCampground = {name: name, image: image, description: desc, author:author, lat: lat, lng: lng, cords:cords};
    // Create a new campground and save to DB
    Camp.create(newCampground, function(err, camp){
        if(err){
            console.log(err);
        }else{
           User.findById(req.user._id, function(err, user){
               user.campgrounds.push(camp._id);
               user.save();
           });
            // camp.author.id = req.user._id;
            // camp.author.username = req.user.username;
            // camp.save();
            console.log("Camp created");
            console.log(camp);
                res.redirect("/campgrounds");
        }
    });
  });
});

// NEW
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("./campgrounds/new") ;
});

// SHOW- Shows more info about campgrounds---------
router.get("/:id", function(req, res) {
    Camp.findById(req.params.id).populate("comments").exec(function(err, camp){
        if(err || !camp){
            req.flash("error", "Campground not found!");
            res.redirect("back");
        }else{
            res.render("./campgrounds/show",{campgrounds:camp});
        }
    });
});

// DELETE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Camp.findByIdAndRemove(req.params.id, function(err, camp){
            res.redirect("/campgrounds");
    });
});


// EDIT
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    Camp.findById(req.params.id, function(err, camp){
            res.render("./campgrounds/edit",{camp:camp});
    });
});

// UPDATE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    geocoder.geocode(req.body.camp.location, function (err, data) {
    var lat = req.body.camp.lat;
    var lng = req.body.camp.lng;
    if(isNaN(lat) || isNaN(lng)){
        req.flash("error","Something is wrong with your location ! Try to set latitude and longitude!");
        return res.redirect("back");
    }
    var cords = {lat: lat, lng: lng};
    var newData = {name: req.body.camp.name, image: req.body.camp.image, description: req.body.camp.description, location: cords, lat: lat, lng: lng};
    Camp.findByIdAndUpdate(req.params.id, req.body.camp, function(err, data){
        console.log(newData);
            req.flash("success", "Campground has been edited succesfully!");
            res.redirect("/campgrounds/"+req.params.id);
    });
  });
});

// Marks update
router.post("/:id/coordinates", middleware.isLoggedIn, function(req, res){
        Camp.findById(req.params.id, function(err, camp){
            if(err){
                console.log(err);
            }else{
                 var lat = req.body.coordinates.slice(1,18);
                 var lng = req.body.coordinates.slice(20,36);
                 var authorOfMark = req.user.username;
                 var loc = {lat: lat, lng: lng, authorOfMark: authorOfMark};
                //  console.log("Clicked")
                //  console.log(lat+" "+lng)
                camp.cords.push(loc);
                camp.save();
                res.redirect("/campgrounds/"+req.params.id);
            }
        });
});


module.exports = router;