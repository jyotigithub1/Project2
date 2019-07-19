var db = require("../models");
var passport=require("../config/passport");
require("dotenv").config();
// var isAuthenticated = require("../config/middleware/isAuthenticated");
var apikey =process.env.API_KEY;
console.log(apikey);
module.exports = function (app) {
  // Get all examples
  app.post("/api/recovery", function(req, res) {
    console.log(req.body)
    db.user.findOne({where:{email:req.body.email}}).then(function(user){
      res.json(user);

    })
  })
  app.get("/api/examples", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.json(dbExamples);
    });
  });
  // Create a new example
  app.post("/api/examples", function (req, res) {
    db.Example.create(req.body).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {
    db.Example.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbExample) {
      res.json(dbExample);
    });
  });
  //Post data for register
  app.post("/api/register", function (req, res) {
    if (req.body.role === "admin") {
      db.User.findOne({ where: { role: "admin" } }).then(function(dbRes) {
        console.log(dbRes);
        if (!dbRes) {
          db.User.create(req.body).then(function (dbUser) {
            res.redirect(307, "/api/login");
            console.log("Added");
          });
        }
        else {
          res.json({
            status: false,
            message: "There's already an Admin"
          });
        }
      });
    }
    else {
      db.User.create(req.body).then(function (dbUser) {
        res.redirect(307, "/api/login");
        console.log("Added");
      });
    }
  });

  // post for checking the user 
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    console.log(req.user.role);
    //asdf
    res.status(200).send({
      firstname:req.user.firstname,
      lastname:req.user.lastname,
      role: req.user.role
            
    });
  });
  //searching the book with category
  app.get("/api/apikey", function (req, res) {
    console.log("inside the api key");
    res.send(apikey);  
  
  });

  //Adding a new book
  app.post("/api/addbook",function(req,res){
    // console.log("req data::::::::::::"+ req.body);
    try{
      db.Book.create(req.body).then (function(dbBook){
        res.send({message:true});
        console.log("Added");
      });
    }catch(err){
      console.log(err);
    }
  });
  //  serach by category
  app.post("/api/searchbycategory",function(req,res){
    console.log("reqbody ::::", req.body);
    try{
      db.Book.findAll({
        where: {category:req.body.category},
      }).then(function(dbcatogery){
        res.json(dbcatogery);
      });
    }catch(err){
      console.log(err);
    }
  });
  app.post("/api/searchbythree",function(req,res){
    console.log("reqbody ::::", req.body);
    var searchObject = {};
    searchObject.category = req.body.category;
    searchObject.authors = req.body.subsearchby;
    try{
      db.Book.findAll({
        where:searchObject
      }).then(function(dbsearch){
        res.json(dbsearch);
      }); 
    }catch(err){
      console.log(err);
    }
  });

  app.get("/whatever/url", function(req, res) {
    if (req.user) {
      var userObj = {
        // put in here whatever you want
        // role: req.user.role
      };
      res.json(userObj);
    }
  });

 
};