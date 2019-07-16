//global variables
//parts of the queryurl
var books = "";
var search = "search?q=";
var limit = "&limit=12";
var key = "";
//conditionals
var toggle = false;
var found = false;



$(document).ready(function() {
    //display initial books tabs
    function tabDisplay() {
        //clear tabs section
        $(".tabs").empty();
        //loop through topics array
        for (var i = 0; i < topics.length; i++) {
            //add div for tabs
            var buttonContainer = $("<div>").addClass("books-tabs");
            //add individual tabs
            var tab = $("<p>").addClass("books-button").attr("data-name", topics[i]).text(topics[i]);
            //place tabs into div
            buttonContainer.append(tab);
            //place div on the side nav
            $(".tabs").append(buttonContainer);
        }
    }
    tabDisplay();

    //display books on load so screen won't be empty
    function onLoadDisplay() {
        //select the p element by data name from array
        var activeElement = $("p[data-name='" + topics[1] + "']");
        //place selector on active books tab
        tabActive(activeElement);
        //ajax call to pull data and display books
        ajaxCall(topics[1]);
    }
    onLoadDisplay();

        //display books when tab is clicked on
        function booksTab() {
            //get data-name of tab clicked for query url
            var button = $(this).attr("data-name");
            //clear previous active classes when clicking on a new button
            tabClear();
            //add new active classes
            tabActive(this);
            //ajax call for when button is clicked
            ajaxCall(button);
        }
    
        //remove active classes on buttons
        function tabClear() {
            $("p").removeClass("active");
            $(".selector").remove();
        }

        
    //submit listener on form instead of input for it to work on mobile
    //search for books once form is submitted
    $(".search-bar").on("submit", function(event) {
        //prevent page from refreshing
        event.preventDefault();
        //get input word, trim white space from sides, set to lowercase compared to array
        term = $(".input-bar").val().trim().toLowerCase();
        //clear input
        $(".input-bar").val("");
        //select new tab
        var tabSelector = "p[data-name='" + term + "']";
        //if input is not empty
        if (term !== "") {
            //display new books first to see if results are found or not
            //wait for ajax to finish loading to get boolean from found variable
            ajaxCall(term).then(function() {
                //if results are found
                if (found === true) {
                    //push search term into array if not in array already
                    if (topics.indexOf(term) === -1) {
                        topics.push(term);
                    }
                    //display new list of tabs
                    tabDisplay();
                    //put active class on new tab
                    tabActive(tabSelector);
                //no results found
                } else {
                    //clear current active class so no classes are active when error page is shown
                    tabClear();
                }
            });
        }
        //prevent page from refreshing on submit
        return false;
    })

    //making ajax call to get data to get books
    function ajaxCall(input) {
        //clear books
        $(".books-area").empty();
        //piece together queryurl
        var queryURL = books + search + input + limit + key;
        //return ajax to get the boolean from the found variable
        return $.ajax({
            url: queryURL,
            method: "GET"
        //once data has been retrieved, run function
        }).then(function(response) {
            console.log(response);
            //if there is more than one result
            if (response.data.length !== 0) {
                //loop through data array
                for (var i = 0; i < response.data.length; i++) {
                    //create book container
                    var newbook = $("<div>").addClass("books");
                    //place book in image element 
                    var bookImage = $("<img/>");
                    bookImage.addClass("books-image").attr({
                        "src": response.data[i].images.fixed_height_still.url,
                        "data-animate": response.data[i].images.fixed_height.url,
                        "data-still": response.data[i].images.fixed_height_still.url,
                        "data-state": "still"
                    });
                   
                //result found
                found = true;
            }
                   //if returning zero search results
                   else {
                    //create error message
                    var errorMessage = $("<div>").addClass("error-message");
                    var errorTitle = $("<h1>").append("Uh-oh, there's nothing here.");
                    var errorSubtitle = $("<p>").append("We're very sorry for the inconvenience. It looks like you're trying to search for Books that aren't available. Please select one of the following tabs on the side menu bar or start a new search instead.");
                    //back to homepage button
                    var goBack = $("<div>").addClass("go-back");
                    var homeLink = $("<a>").attr("href", "index.html").append("Go Back");
                    goBack.append(homeLink);
                    errorMessage.append(errorTitle).append(errorSubtitle).append(goBack);
                    $(".books-area").append(errorMessage);
                    //result not found
                    found = false;
                }
            
        }
        //display books on when tabs are clicked
        $(".tabs").on("click", ".books-button", booksTab);
