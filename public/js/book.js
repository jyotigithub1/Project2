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
