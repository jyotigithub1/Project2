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
    // elseif(category==="Languages" &&  searchby==="Select"){

    // }
    console.log(searchby);
    if (searchby==="Select") {
      console.log("search by "+searchby);
    }
    console.log(category);

  });

  function searchCategory(category, apikey) {

    var queryURL = "https://www.googleapis.com/books/v1/volumes?q=" + category + "&api_key=" + apikey;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      var response = response.items;
      console.log(response);
      
      //opening of main for loop
      for (var i = 0; i < response.length; i++) {
        console.log(response[i]);

        //display books and images
        var bookDiv = $("<div>");
        bookDiv.addClass("book-div")
        var bookRow = $("<div>");
        bookRow.addClass("info-row");
        var bookTitle = response[i].volumeInfo.title;
        var author = response[i].volumeInfo.authors[0];
        var publishedDate = response[i].volumeInfo.publishedDate;
        var bookImage = response[i].volumeInfo.imageLinks.smallThumbnail;
        console.log(bookTitle, author, publishedDate);
        console.log(bookImage)

        var p = $("<p>");
        var titleDiv = $("<div>")
        var infoDiv = $("<div>")
        titleDiv.addClass("book-title")
        titleDiv.html(bookTitle + "<br>")
        infoDiv.addClass("info-text")
        infoDiv.html(author + "<br>" + publishedDate + "<br>")
        var imageDiv = $("<img>");
        imageDiv.attr("src", bookImage);
        imageDiv.addClass("images col-6")
        bookRow.append(imageDiv);

        p.prepend(titleDiv);
        p.append(infoDiv);
        p.addClass("text col-6")
        bookRow.append(p);
        bookDiv.append(bookRow);
        $("#books-area").append(bookDiv);
      }  //closing of main for loop
    });
  }
});



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
