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

//Event listener for submitting user location
document.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();

    var location = $("#search_bar").val().trim();
    var queryURL = "http://www.mapquestapi.com/geocoding/v1/address?key=sVLMqoRolFyhsmbAGzECprYrQinTd4CB&location=" + location;

    //AJAX Get Request -- Mapquest API
    $.ajax({
      url: queryURL,
      method: "GET"
    })
    .then(function(response) {
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
      window.location.replace("results.html");
    });
  };
});