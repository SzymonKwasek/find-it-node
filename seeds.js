var mongoose = require("mongoose"),
    Camp = require("./models/camp"),
    Comment = require("./models/comment")
    
var data = [
        {
            name:"Wonderful place",
            image:"https://images.unsplash.com/photo-1496153615838-861aed350146?ixlib=rb-0.3.5&s=84b86405372e6c5c6ab51b2c30dc5b63&auto=format&fit=crop&w=1390&q=80",
            description:"Jazda"
        },
        {
            name:"Perfect place",
            image:"https://images.unsplash.com/reserve/Hxev8VTsTuOJ27thHQdK_DSC_0068.JPG?ixlib=rb-0.3.5&s=7cbe7a38fa72deeef209d50f5d52d571&auto=format&fit=crop&w=1347&q=80",
            description:"Jazda"
        },
        {
            name:"A dream of..",
            image:"https://images.unsplash.com/photo-1495249536756-c5348250650c?ixlib=rb-0.3.5&s=74cfac30b8f4294a545149babe99f8b4&auto=format&fit=crop&w=1350&q=80",
            description:"jazda"
        }
    ];

function seedDB(){
    // Remove campgrounds
    Camp.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("Removed campground");
        // Add a few campgrounds
          data.forEach(function(camp){
            Camp.create(camp, function(err, campground){
                if(err){
                    console.log(err);
                }else{
                    console.log("Added a campground");
                    Comment.create(
                        {
                            content:"Been there!",
                            author:"Paco"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            }else{
                                campground.comments.push(comment._id);
                                campground.save(function(err){
                                    console.log("Comment created");
                                });
                           }
                        });
                }
            });
        });
    });
}

module.exports = seedDB;