var express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    User = require("./models/user"),
    passport =  require("passport"),
    localStrategy = require("passport-local"),
    flash = require("connect-flash"),
    methodOverride = require("method-override");
    
var campgroundRoute = require("./routes/campgrounds"),
    commentRoute = require("./routes/comments"),
    indexRoute = require("./routes/index");

var url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp"
mongoose.connect(url);
// mongoose.connect("mongodb://localhost/yelp_camp");
// mongoose.connect("mongodb://ejsit:admin@ds237868.mlab.com:37868/findit")
app.set('view engine','ejs');

app.use(flash());
app.use(methodOverride("_method"));
app.use(express.static(__dirname +'/public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(require("express-session")({
    secret:"I am going to live my life",
    resave: false,
    saveUninitialized: false
    }));
    
//passport initializer 
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// put variables in every route
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error")
    res.locals.success = req.flash("success")
    next();
});

// Shortcuts that helps in routes.
app.use("/campgrounds", campgroundRoute);
app.use("/campgrounds/:id/comments", commentRoute);
app.use("/", indexRoute);


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is listening");
});


