$(".hide-row").hide();

$(document).ready(function () {
  console.log("inside book.js");
  // make a GET request
  $("#books-area").empty();
  var fname = sessionStorage.getItem("fname");
  var lname = sessionStorage.getItem("lname");
  var name = (fname + " " + lname).toUpperCase();
  $("#name").append(name);
  // Event listner for book search
  $(document).on("click", "#book-search-btn", function (event) {
    $("#error").empty();
    $("#errorsearchby").empty();
    $("#books-area").empty();
    console.log("inside the click");
    event.preventDefault();
    var category = $("#searchcat").val();
    console.log(category);
    var searchby = $("#searchby").val();
    var subsearchby = $("#book-search")
      .val()
      .trim();
    console.log(subsearchby);
    console.log(
      "category:",
      category,
      "searchby:",
      searchby,
      "subsearchby:",
      subsearchby
    );
    if (category === "Languages" && searchby === "Select") {
      $("#errorsearchby").empty();
      $("#error").empty();
      var p = $("<p>");
      p.addClass("errortag");
      p.text("*Need to select Category atleast for the search");
      p.css("color", "red");
      $("#error").append(p);
    } else if (category !== "Language" && searchby === "Select") {
      console.log("in case 2");
      $.ajax("/api/searchbycategory", {
        type: "POST",
        data: {
          category: category
        }
      }).then(function (category) {
        if(category.length===0){
          var p5 = $("<p>");
          p5.addClass("errortag");
          p5.text("Book Coming soon..!!");
          p5.css("color", "red");
          $("#error").append(p5);
        }else{
        console.log(category);
        displayBooks(category);
        }
      });
    } else if (category === "Language" && searchby !== "Select") {
      console.log("in case 2");
      $("#error").empty();
      var p3 = $("<p>");
      p3.addClass("errortag");
      p3.text("*Need to select Category atleast for the search");
      p3.css("color", "red");
      $("#error").append(p3);
    } else if (
      category !== "Languages" &&
      searchby !== "Select" &&
      subsearchby !== ""
    ) {
      var data = {
        category: category,
        searcby: searchby,
        subsearchby: subsearchby
      };
      console.log();
      console.log("search inside 3");
      $.ajax("/api/searchbythree", {
        type: "POST",
        data: data
      }).then(function (category) {
        console.log(category);
        if(category.length===0){
          var p5 = $("<p>");
          p5.addClass("errortag");
          p5.text("Books Coming soon..!!");
          p5.css("color", "red");
          $("#error").append(p5);
        }
        else{
        displayBooks(category);
        }
      });
    } else if (
      category !== "Languages" &&
      searchby !== "Select" &&
      subsearchby === ""
    ) {
      console.log("inside case 3");
      $("#error").empty();
      $("#errorsearchby").empty();
      var p1 = $("<p>");
      p1.addClass("errorsearch");
      p1.text("*Need to specify the " + searchby + " field");
      p1.css("color", "red");
      $("#errorsearchby").append(p1);
    } else if (
      category === "Languages" &&
      searchby !== "Select" &&
      subsearchby !== ""
    ) {
      console.log("inside case 4");
      $("#error").empty();
      $("#errorsearchby").empty();
      var p2 = $("<p>");
      p2.addClass("errorsearch");
      p2.text("*please enter the category for the search");
      p2.css("color", "red");
      $("#error").append(p2);
    }
  });

  function displayBooks(category) {
    $("#books-area").empty();
    $(".hide-row").show();
    $(".hide-row").show();
    for (var i = 0; i < category.length; i++) {
      console.log(category[i]);

      //display books and images
      var bookDiv = $("<div>");
      bookDiv.addClass("book-div");
      var bookRow = $("<div>");
      bookRow.addClass("info-row");
      var bookTitle = category[i].title;
      var author = category[i].authors;
      var publishedDate = category[i].publishedDate;
      publishedDate = moment(publishedDate, "YYYY-MM-DD").format(
        "MMMM Do YYYY"
      );
      var bookImage = category[i].thumbnail;
      var rating = category[i].averageRating;
      console.log(bookTitle, author, publishedDate);
      console.log(bookImage);

      var preview = category[i].previewlink;
      var linkName = $("<a>");
      linkName.attr("href", preview);
      linkName.addClass("link-name");
      linkName.text(bookTitle);
      linkName.attr("target", "_blank");

      var p = $("<p>");
      var titleDiv = $("<div>");
      var infoDiv = $("<div>");
      titleDiv.addClass("book-title");
      linkName.html(bookTitle + "<br>");
      linkName.addClass("book-title");
      infoDiv.addClass("info-text");
      infoDiv.html(
        "Author: " +
        author +
        "<br>" +
        "Date Published: " +
        publishedDate +
        "<br>" +
        "Rating: " +
        rating +
        "<br>"
      );
      var imageDiv = $("<img>");
      imageDiv.attr("src", bookImage);
      imageDiv.addClass("images col-6");
      bookRow.append(imageDiv);

      p.append(linkName);
      p.append(infoDiv);
      p.addClass("text col-6");
      bookRow.append(p);
      bookDiv.append(bookRow);
      $("#books-area").append(bookDiv);
    }
  }
});