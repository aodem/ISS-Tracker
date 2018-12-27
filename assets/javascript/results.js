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

//Pulling values from the database on page load
$(document).ready(function () {
    database.ref().on("child_added", function (childSnapshot) {

        var dblocation = childSnapshot.val().location;
        var dblatitude = childSnapshot.val().latitude.toFixed(1);
        var dblongitude = childSnapshot.val().longitude.toFixed(1);
        var currentLocationURL = "http://api.open-notify.org/iss-now.json";
        var passTimesURL = "http://api.open-notify.org/iss-pass.json?lat=" + dblatitude + "&lon=" + dblongitude;


        console.log("Location Query: " + dblocation);
        console.log("Latitude: " + dblatitude);
        console.log("Longitude: " + dblongitude);
        console.log("ISS API URL: " + passTimesURL);

        //Current Location API Request
        $.ajax({
            url: currentLocationURL,
            method: "GET",
            crossDomain: true
        })
        .then(function (response2) {

            console.log(response2);

            //Writing Current ISS Position to the Page
            $("#current-position").append("<p>Latitude: " + response2.iss_position.latitude + "</p><p> Longitude: " + response2.iss_position.longitude + "</p>");

        });

        // Pass Times API Request
        $.ajax({
            url: passTimesURL,
            method: "GET",
            crossDomain: true,
            dataType: 'jsonp'
        })
        .then(function (response3) {

            console.log(response3);

            //Writing ISS Pass Times to the Page

            
            
            
            for (var i = 0; i < response3.response.length; i++) {
                var unixRiseTime = response3.response[i].risetime;
                $("#pass-times").append("<p>" + moment.unix(unixRiseTime).format("MMMM Do YYYY, h:mm a") + "</p>");
            }
        });

    });
});