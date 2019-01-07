//Initialize Firebase
var config = {
  apiKey: "AIzaSyCTB2ONqGvJBBqRGg7FMr2Q8xfnH0Ejdqo",
  authDomain: "project-1-904b8.firebaseapp.com",
  databaseURL: "https://project-1-904b8.firebaseio.com",
  projectId: "project-1-904b8",
  storageBucket: "",
  messagingSenderId: "356456726650"
};

firebase.initializeApp(config);

var database = firebase.database();

//User validation function using regex to validate the location 

  function isValidLocation(input) {
    const regex = /([A-Za-z]+(?: [A-Za-z]+)*),? ([A-Za-z]{2})/;
    const result = regex.exec(input)
    // If result is null, no match was found
    return !!result
  }

$(document).ready(function () {
  
  //Event listener for submitting user location
  document.addEventListener("keyup", function (event) {

    //User input 
    var location = $("#search_bar").val().trim();
    var userVal = isValidLocation(location);
  
    if (event.keyCode === 13 && userVal == true) {
      console.log(userVal);
      event.preventDefault();
    
      $("#search_bar").val("");

      var queryURL = "http://www.mapquestapi.com/geocoding/v1/address?key=sVLMqoRolFyhsmbAGzECprYrQinTd4CB&location=" + location;

      //AJAX Get Request -- Mapquest API
      $.ajax({
        url: queryURL,
        method: "GET"
      })
      .then(function (response) {
        console.log("Query URL: " + queryURL);
        console.log(response);

        var latitude = response.results[0].locations[0].latLng.lat;
        var longitude = response.results[0].locations[0].latLng.lng;
      

        console.log("Latitude: " + latitude);
        console.log("Longitude: " + longitude);

        var locationInfo = {
          location: location,
          latitude: latitude,
          longitude: longitude,
         
        };

        //Pushes location object to Firebase
        database.ref().push(locationInfo);

        //Changes window to results page
        window.location.href = "./results.html";

      });

    } else if (event.keyCode === 13 && userVal == false) {
      $("#search_bar").attr("class", "form-control is-invalid has-error has-feedback");
      $(".invalid-feedback").text("Please enter a valid location.");
    }
  });

  //Tab animation
  $(".nav_tab_body").on("click", function () {
    console.log("hi!");
    if ($(this).attr("data-state") === 'still') {
      $(this).addClass("tabsSlide");
      $(this).attr('data-state', 'animate');
    } else if ($(this).attr("data-state") === 'animate') {
        $(this).removeClass("tabsSlide")
        $(this).attr("data-state", 'still');
    }
  });
  
});

