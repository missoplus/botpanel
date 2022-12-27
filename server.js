require ('dotenv').config();
const mongoose=require('mongoose');
const express = require('express');
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
const session = require("express-session");
var morgan = require("morgan");
const User = require("./models/users");
const expressLayouts = require('express-ejs-layouts')
const sessionChecker = require("./middlewares/admin.middleware");
const PORT= process.env.PORT || 5000;
const authroute=require('./routes/auth.route');
const panelroute=require('./routes/panel.route');
const path = require('path');
const cors = require('cors');
var app = express();
app.use(expressLayouts);
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());
app.use(
    session({
        key: "user_sid",
        secret: "somerandonstuffs",
        resave: true,
        saveUninitialized: true,
        cookie: {
            expires: 600000,
        },
    })
);
app.use(function (req, res, next) {
    global.req = req;
    next();
});
app.use("/static",express.static(__dirname+"/static"));
app.set("view engine","ejs");

//DB connection
mongoose.connect(process.env.DB_URI,{useNewUrlParser:true ,useunifiedTopology:true});
const db=mongoose.connection;
db.on('error',(error)=>console.log(error));
db.once('open',()=>console.log('Connected to Database'));

//Routes
//todo routes groups
app.use("/auth",authroute.routes);
app.use("/panel",sessionChecker,panelroute.routes);
app.get("/",(req,res)=>{
    res.redirect('/panel')
});
app.get("/home",function (req, res, next) {
    res.render("admin/home", {layout: 'admin/dashboard'});
});
app.listen(PORT, function () {
    console.log(`app listening on port ${PORT}!`);
});