$(".hide-row").hide();

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
      $.ajax("/api/searchbycategory", {
        type: "POST",
        data: { category: category }
      }).then(function (category) {
        console.log(category);
        function displayBooks(){
          $(".hide-row").show();
          for (var i = 0; i < category.length; i++) {
            console.log(category[i]);
        
            //display books and images
            var bookDiv = $("<div>");
            bookDiv.addClass("book-div")
            var bookRow = $("<div>");
            bookRow.addClass("info-row");
            var bookTitle = category[i].title;
            var author = category[i].authors;
            var publishedDate = category[i].publishedDate;
            var bookImage = category[i].thumbnail;
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
        
            p.append(titleDiv);
            p.append(infoDiv);
            p.addClass("text col-6")
            bookRow.append(p);
            bookDiv.append(bookRow);
            $("#books-area").append(bookDiv);
            }  //closing of main for loop
          }
        displayBooks();
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
});

