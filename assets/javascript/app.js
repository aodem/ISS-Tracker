$(document).ready(function () {

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

//user validation function using regex to validate the location 

  function isValidLocation(input) {
    const regex = /([A-Za-z]+(?: [A-Za-z]+)*),? ([A-Za-z]{2})/;
    const result = regex.exec(input)
    // If result is null, no match was found
    return !!result
  }

//Event listener for submitting user location
document.addEventListener("keyup", function (event) {
  //user input 
  var location = $("#search_bar").val().trim();
  var userVal = isValidLocation(location);
  
  if (event.keyCode === 13 && userVal == true) {
    console.log(userVal);
    event.preventDefault();
    console.log("We are here")
    // var location = $("#search_bar").val().trim();
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
        // var riseTime;
        // var duration;

        console.log("Latitude: " + latitude);
        console.log("Longitude: " + longitude);

        var locationInfo = {
          location: location,
          latitude: latitude,
          longitude: longitude,
          // riseTime: riseTime,
          // duration: duration
        };

        //Pushes location object to Firebase
        database.ref().push(locationInfo);

        //Changes window to results page
        //window.location.replace("results.html");
      });
  };
});

  //Search History

  // firebase.database.ref().limitToLast(5).once().then(function (childSnapshot) {

  //   let listDiv = $("<div>");
  //   let listShell = $("<ul>");

  //   var dblocation = childSnapshot.val().location;

  //   $(listShell).append(dblocation);

  //   listDiv.empty();
  //   listDiv.append(listShell);

  //   $(".tabContent").html(listDiv);
  // });

  //tab animations
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
})

