$(document).ready(function () {
  console.log("inside admin.js");
  console.log("inside the click");
  $(document).on("click", "#addbooks", function (event) {
    console.log("inside the click");
    event.preventDefault();
    var category = $("#addcat").val();
    console.log(category);
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
  });
  function searchCategory(category, apikey) {
      var bookArr=[];
    var queryURL = "https://www.googleapis.com/books/v1/volumes?q=" + category + "&api_key=" + apikey;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
          console.log(response);  
      for(var i=0;i<response.items.length;i++){
     
      var title=response.items[i].volumeInfo.title;
      var  authors=response.items[i].volumeInfo.authors["0"];
      console.log(authors);
      var  description=response.items[i].volumeInfo.description;
      console.log(description);
      var  averageRating=response.items[i].volumeInfo.averageRating;
      var thumbnail=response.items[i].volumeInfo.imageLinks.smallThumbnail;
      var publishedDate=response.items[i].volumeInfo.publishedDate;
      var  publisher=response.items[i].volumeInfo.publisher;  
      var  previewlink=response.items[i].volumeInfo.previewLink;
    
      console.log(category);
      console.log(previewlink);
       var bookObj={
            title:title,
            authors:authors,
            description:description,
            averageRating:averageRating,
            thumbnail:thumbnail,
            publishedDate:publishedDate,
            publisher:publisher,
            previewlink:previewlink,
            category:category

      };
      console.log(bookObj);
     $.ajax("/api/addbook", {
      type: "POST",
      data: bookObj
    }).then(function (data) {
      if(data.message===true){
            console.log("Added new Record");
            var p=$("<p>");
            p.addClass("message");
            p.text("New category Added");
            p.css("color", "blue");
            $("#error").append(p);
            
      }
      else{
            var p=$("<p>");
            p.addClass("errortag");
            p.text("*Not able to add data");
            p.css("color", "red");
            $("#error").append(p);
            
      }
      
      
      // Reload the page to get the updated list
      // location.reload();

    });
    $("#error").empty();
     }
    });
  }  
    
          
          
});
