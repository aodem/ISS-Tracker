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

//ISS Map

var mymap = L.map('mapid').setView([51.505, -0.09], 2);

L.tileLayer('https://api.tiles.mapbox.com/v4/mapbox.run-bike-hike/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZHJkaXRvIiwiYSI6ImNqcWE0Z3FzYTA4OTMzeXFwYW9wcWttM2IifQ.9gxaoN0Eh0I5wnrZq2j3tQ', {
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiZHJkaXRvIiwiYSI6ImNqcWE0Z3FzYTA4OTMzeXFwYW9wcWttM2IifQ.9gxaoN0Eh0I5wnrZq2j3tQ'
}).addTo(mymap);

var issIcon = L.icon({
    iconUrl: 'assets/media/ISSIcon.png',
    iconSize: [38, 38],
});

var iss = L.marker([51.5, -0.09], { icon: issIcon }).addTo(mymap);

var isscirc = L.circle([51.508, -0.11], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.2,
    radius: 1200000
}).addTo(mymap);

function moveISS() {
    $.getJSON('http://api.open-notify.org/iss-now.json?callback=?', function (data) {
        var lat = data['iss_position']['latitude'];
        var lon = data['iss_position']['longitude'];
        iss.setLatLng([lat, lon]);
        isscirc.setLatLng([lat, lon]);
        mymap.panTo([lat, lon], animate = true);
    });
    setTimeout(moveISS, 5000);
}

$(document).ready(function () {

    //Pulling values from the database
    database.ref().limitToLast(1).on("child_added", function (childSnapshot) {

        var dblocation = childSnapshot.val().location;
        var dblatitude = childSnapshot.val().latitude.toFixed(1);
        var dblongitude = childSnapshot.val().longitude.toFixed(1);
        var passTimesURL = "http://api.open-notify.org/iss-pass.json?lat=" + dblatitude + "&lon=" + dblongitude + "&n=1";


        console.log("Location Query: " + dblocation);
        console.log("Latitude: " + dblatitude);
        console.log("Longitude: " + dblongitude);
        console.log("ISS API URL: " + passTimesURL);

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

            $("#passes-location").append("<p>" + dblocation + "</p>");

            for (var i = 0; i < response3.response.length; i++) {
                var unixRiseTime = response3.response[i].risetime;
                $("#passes-list").append("<p>" + moment.unix(unixRiseTime).format("MMMM Do YYYY, h:mm a") + "</p>");
            }
        });

    });

    //Current Location API Request
    var currentLocationURL = "http://api.open-notify.org/iss-now.json";

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

    //Current People in Space AJAX Call
    var astronautsURL = "http://api.open-notify.org/astros.json";

    $.ajax({
        url: astronautsURL,
        method: "GET",
    })
    .then(function (response4) {

        console.log(response4);

        var numAstro = response4.people.length;

        $("#numberAstronauts").append(numAstro);

        //Writing Info to the Page
        for (var i = 0; i < response4.people.length; i++) {
            $("#astronauts").append("<p>" + response4.people[i].name + "</p>");
        }
    });

    //Calling ISS Map Animation Function
    moveISS();

    //Rocket Man Hover Text
    intervalId = setInterval(() => { $('#rocketMan').tooltip('show') }, 3000)
   
});

//Number of Passes Drop Down Menu
$("#numPasses").on("change", function (event) {

    database.ref().limitToLast(1).on("child_added", function (childSnapshot) {

        var dblocation = childSnapshot.val().location;
        var dblatitude = childSnapshot.val().latitude.toFixed(1);
        var dblongitude = childSnapshot.val().longitude.toFixed(1);
  
        var numPassesSelection = $(numPasses).val();
        var passTimesURL2 = "http://api.open-notify.org/iss-pass.json?lat=" + dblatitude + "&lon=" + dblongitude + "&n=" + numPassesSelection;

        console.log("NUMBER OF PASSES SELECTION: " + numPassesSelection);

            // Pass Times API Request
            $.ajax({
                url: passTimesURL2,
                method: "GET",
                crossDomain: true,
                dataType: 'jsonp'
            })
            .then(function (response3a) {
    
                //Writing ISS Pass Times to the Page
                $("#passes-list").empty();
    
                for (var i = 0; i < response3a.response.length; i++) {
                    var unixRiseTime = response3a.response[i].risetime;
                    $("#passes-list").append("<p>" + moment.unix(unixRiseTime).format("MMMM Do YYYY, h:mm a") + "</p>");
                }
            });
    });
   
});

//Rocket Man Click Event to View ISS Live Feed
$("#rocketMan").on("click", function(event) {
    $([document.documentElement, document.body]).animate({
        scrollTop: $("#results_containerISS").offset().top
    }, 500);
});

//Back Button Click Event
$("#back-button").on("click", function (event) {
    window.location.href = "./index.html";
});

