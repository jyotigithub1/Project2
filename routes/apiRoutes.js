var db = require("../models");
var passport=require("../config/passport");
require("dotenv").config();
// var isAuthenticated = require("../config/middleware/isAuthenticated");
var apikey =process.env.API_KEY;
console.log(apikey);
module.exports = function (app) {
  // Get all examples
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
    console.log("req data::::::::::::", req.body);
    try{
      createBook(0, req.body.dataArr, res);
      
    }catch(err){
      console.log(err);
    }
    // res.send({message:true});
  });

  function createBook(i, dataArr, res) {
    db.Book.create(dataArr[i]).then (function(dbBook){
      i++;
      if (i < dataArr.length) {
        console.log("still more books");
        createBook(i, dataArr, res);
      }
      else {
        res.send({message:true});
        console.log("Added");
      }
    });
  }
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

  app.get("/api/comments", function(req, res) {
    try{
      db.Book.findAll({attributes:["id","usercomment","createdAt","updatedAt"]}).then(function(dbcatogery){
        res.json(dbcatogery);
      });
    }catch(err){
      console.log(err);
    }
     
    
  });
  
  //end of module.exports
};