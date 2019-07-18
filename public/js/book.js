$(document).ready(function () {
  console.log("inside book.js");
  $(document).on("click", "#book-search-btn", function (event) {
    console.log("inside the click");
    event.preventDefault();

    var category = $("#searchcat").val();
    console.log(category);
    var searchby = $("#searchby").val();
   
    if(category==="Languages"){
      var p=$("<p>");
        p.addClass("errortag");
        p.text("*Need to select Category atleast for the search");
        p.css("color", "red");
        $("#error").append(p);
     }
     else{
      $.ajax("/api/apikey", {
        type: "GET",
      }).then(function (data) {
        console.log("Apikey inside the route" + data);
        searchCategory(category, data);
      });
    }
    elseif(category==="Languages" &&  searchby==="Select"){

    }
    console.log(searchby);
    if (searchby==="Select") {
      console.log("search by "+searchby);
    }
    console.log(category);

   

  function searchCategory(category, apikey) {

    var queryURL = "https://www.googleapis.com/books/v1/volumes?q=" + category + "&api_key=" + apikey;
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