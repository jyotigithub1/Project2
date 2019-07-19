$(document).ready(function() {
    $(document).on("click", "#recover-password", function(event) {
        console.log("clicked inside forgot.js");
        event.preventDefault();
        var email = $("#inputEmail").val();
        var recovered = $(".recovered-text")
        recovered.text("Your password is: ");
        $.ajax("/api/recovery", {
            type: "POST",
            data: {email:email}
        }).then(function (email) {
            console.log(email);
            recovered.text("Your password is: ", email);
        })
    })
});