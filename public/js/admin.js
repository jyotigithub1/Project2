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

            var queryURL = "https://www.googleapis.com/books/v1/volumes?q=" + category + "&api_key=" + apikey;
            $.ajax({
              url: queryURL,
              method: "GET"
            }).then(function (response) {
              console.log(response);
            });
          }  
    
          
          
});
