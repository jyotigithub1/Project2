$(document).ready(function () {
  console.log("inside book.js");
  
   $(document).on("click", "#book-search-btn", function (event) {
    console.log("inside the click");
    event.preventDefault();
    var category = $("#searchcat").val();
    console.log(category);
    var searchby = $("#searchby").val();
    var subsearchby=$("#book-search").val().trim();
    console.log(subsearchby);
    console.log("category:", category, "searchby:", searchby, "subsearchby:", subsearchby);
    if(category==="Languages" && searchby=== "Select"){
      $("#errorsearchby").empty();
      var p = $("<p>");
      p.addClass("errortag");
      p.text("*Need to select Category atleast for the search");
      p.css("color", "red");
      $("#error").append(p);
    
    }
 
    else if(category !== "Language" && searchby === "Select"){
     console.log("in case 2");
      $.ajax("/api/searchbycategory", {
        type: "POST",
        data: { category: category }
      }).then(function (category) {
        console.log(category);
      });
    }
    
    else if(category!=="Languages" && searchby !== "Select" && subsearchby!==""){
        var data={
        category:category,
        searcby:searchby,
        subsearchby:subsearchby
      };
      console.log();
      console.log("search inside 3");
      $.ajax("/api/searchbythree", {
        type: "POST",
        data: data
      }).then(function (category) {
        console.log(category);
      });
    }
    else if(category !== "Languages" && searchby !== "Select" && subsearchby === "" ){
      console.log("inside case 3");
      $("#error").empty();  
       var p1 = $("<p>");
       p1.addClass("errorsearch");
        p1.text("*Need to specify the "+searchby+" field" );
        p1.css("color", "red");
        $("#errorsearchby").append(p1);
    }
  });
});
