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
        //http://api.open-notify.org/iss-pass.json?lat=33.4&lon=-112.1


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

            });
    });
});