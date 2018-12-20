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

//Click event for submitting user location
$("#searchButton").on("click", function(event) {
    event.preventDefault();

    var location = $("#location-input").val().trim();
    var latitude;
    var longitude;
    var riseTime;
    var duration;

    var locationInfo = {
        location: location,
        latitude: latitude,
        longitude: longitude,
        riseTime: riseTime,
        duration: duration
      };
    
    var queryURL = "http://www.mapquestapi.com/geocoding/v1/address?key=sVLMqoRolFyhsmbAGzECprYrQinTd4CB&location=" + location;
    
    //Pushes location object to Firebase
    database.ref().push(locationInfo);

    //AJAX Get Request
    $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function(response) {
          console.log(queryURL);
          console.log(response);
        });
});

//rocket man
var intervaId;

intervalId = setInterval(() => { $('#rocketMan').tooltip('show')}, 3000)

$(document).on("click", function(){
    console.log(this)
    $('#rocketMan').tooltip('hide')
    clearInterval(intervalId);
    $('#rocketMan').attr('title', 'Random Info!')
    $('#rocketMan').popover('show')
});