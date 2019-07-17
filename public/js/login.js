$(document).ready(function () {
  console.log("Inside the js");

  //Eventlistner for register submit
  $(document).on("click", "#register_submit", function (event) {
    console.log("inside the click");
    event.preventDefault();
    var postregister = {
      firstname: $("#cmsInputName").val().trim(),
      lastname: $("#cmsInputLastName").val().trim(),
      email: $("#cmsInputEmail1").val().trim(),
      password: $("#cmsInputPassword1").val().trim(),
      cnfpassword: $("#cmsConfirmPassword").val().trim(),
      role:$("#role").val().trim()
    };
    console.log(postregister);
    $.ajax("/api/register", {
      type: "POST",
      data: postregister
    }).then(function () {
      console.log("Added new Record");
      alert("data added");
      // Reload the page to get the updated list
      location.reload();

    });
  });
  // Event listner for login check 
  $(document).on("click", "#login", function (event) {
    console.log("inside the click");
    event.preventDefault();
    var login = {
      email: $("#inputEmail").val().trim(),
      password: $("#inputPassword").val().trim()
    };
    console.log(login);
    $.ajax("/api/login", {
      type: "POST",
      data: login
    }).then(function (data, successful, xhr) {
      console.log(arguments);
      // redirect the user
      // window.location.href = "/whatever/url";
      console.log(data);
      console.log(xhr.status);
      if (xhr.status !== 200) {
        var p = $("<p>");
        p.addClass("errortag");
        p.text("User details does not match");
        p.css("color", "red");
        $("#error").append(p);
        console.log("no match");
      } else {
        console.log("test");
        window.location.href = "/welcome";
       
      }
    });

  });






  //End of document.ready function()     
});