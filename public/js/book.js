// require("dotenv").config();
$(document).ready(function () {

  $(document).on("click", "#addCategory", function (event) {
    console.log("inside the click");
    event.preventDefault();
    var category = $("#make").val().trim();
    console.log(category);
    searchCategory(category);  
            
  });   
  function searchCategory(category) {
    var apikey ="AIzaSyDv-GLhZ0fA_ss6m4p7OmX6v0184bkFp4E";
    var queryURL = "https://www.googleapis.com/books/v1/volumes?q=" + category + "&api_key="+apikey;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      console.log(response);
    });
  }

                 

//   function searchbyAuthor(category, author) {
//     var apikey = process.env.api_key;
//     var queryURL = "https://www.googleapis.com/books/v1/volumes?q=" + category + "&inauthor=" + author + "&api_key=" + apikey;
//     $.ajax({
//       url: queryURL,
//       method: "GET"
//     }).then(function (response) {
//       console.log(response);
//     });
//   }

//   function searchbyPublisher(category, publisher) {
//     var apikey = process.env.api_key;
//     var queryURL = "https://www.googleapis.com/books/v1/volumes?q=" + category + "&inpublisher=" + publisher + "&api_key=" + apikey;
//     $.ajax({
//       url: queryURL,
//       method: "GET"
//     }).then(function (response) {
//       console.log(response);
//     });
//   }

//   function searchbytitle(category, title) {
//     var apikey = process.env.api_key;
//     var queryURL = "https://www.googleapis.com/books/v1/volumes?q=" + category + "&intitle=" + title + "&api_key=" + apikey;
//     $.ajax({
//       url: queryURL,
//       method: "GET"
//     }).then(function (response) {
//       console.log(response);
//     });
//   }
});


                  