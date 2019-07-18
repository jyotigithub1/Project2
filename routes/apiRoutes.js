var db = require("../models");
var passport=require("../config/passport");
var path = require("path");
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
    db.User.create(req.body).then(function (dbUser) {
      res.json({
        id: dbUser.Id
      });
      console.log("Added");
      res.sendFile(path.join(__dirname, "../public/display.html"));
    });
  });

  // post for checking the user 
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    console.log(res);
    res.status(200).send();
  });
//searching the book with category
app.get("/api/apikey", function (req, res) {
    console.log("inside the api key");
     res.send(apikey);  
  
});

  //end of module.exports
};