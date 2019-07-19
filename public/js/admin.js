$(document).ready(function() {
  console.log("inside admin.js");
  console.log("inside the click");
  $(document).on("click", "#addbooks", function(event) {
    console.log("inside the click");
    event.preventDefault();
    var category = $("#addcat").val();
    var comments = $.trim($("#comments").val());
    console.log(category);
    console.log(comments);
    if (category === "Languages") {
      var p = $("<p>");
      p.addClass("errortag");
      p.text("*Need to select Category atleast for the search");
      p.css("color", "red");
      $("#error").append(p);
    } else {
      $.ajax("/api/apikey", {
        type: "GET"
      }).then(function(data) {
        console.log("Apikey inside the route" + data);
        var bookobj= searchCategory(category, data);
        console.log(bookobj);
      });
    }
  });
 
  function searchCategory(category, apikey, cb) {
    var count=0;  
    var queryURL =
      "https://www.googleapis.com/books/v1/volumes?q=" +
      category +
      "&api_key=" +
      apikey;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      for (var i = 0; i < response.items.length; i++) {
        var title = response.items[i].volumeInfo.title;
        var authors = response.items[i].volumeInfo.authors["0"];
        console.log(authors);
        var description = response.items[i].volumeInfo.description;
        console.log(description);
        var averageRating = response.items[i].volumeInfo.averageRating;
        var thumbnail = response.items[i].volumeInfo.imageLinks.smallThumbnail;
        var publishedDate = response.items[i].volumeInfo.publishedDate;
        var publisher = response.items[i].volumeInfo.publisher;
        var previewlink = response.items[i].volumeInfo.previewLink;
        console.log(category);
        console.log(previewlink);
        var bookObj = {
          title: title,
          authors: authors,
          description: description,
          averageRating: averageRating,
          thumbnail: thumbnail,
          publishedDate: publishedDate,
          publisher: publisher,
          previewlink: previewlink,
          category: category,
          usercomment:$.trim($("#comments").val())
        };
        console.log(bookObj);
        $.ajax("/api/addbook", {
          type: "POST",
          data: bookObj
        }).then(function (bookadded) {
          console.log(bookadded);  
          if (bookadded.message === true) {
            console.log("Added new Record");
            $("#error").empty();
            var p = $("<p>");
            p.addClass("message");
            p.text("New category Added");
            p.css("color", "blue");
            $("#error").append(p);
          } else {
            $("#error").empty();
            var p1 = $("<p>");
            p1.addClass("errortag");
            p1.text("*Not able to add data");
            p1.css("color", "red");
            $("#error").append(p1);

          }
      
          $("#error").empty();
     
        });
      }
    });
  }

  $("#books-span").click(function() {
    $("#categorydiv").show();
  });
});
