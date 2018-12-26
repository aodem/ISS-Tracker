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
$(document).ready(function() {
    database.ref().on("child_added", function(childSnapshot) {

        var dblocation = childSnapshot.val().location;
        var dblatitude = childSnapshot.val().latitude;
        var dblongitude = childSnapshot.val().longitude;
        var query2URL = "https://api.open-notify.org/iss-pass.json?lat=" + dblatitude + "&lon=" + dblongitude;
        
        console.log("Location Query: " + dblocation);
        console.log("Latitude: " + dblatitude);
        console.log("Longitude: " + dblongitude);
        console.log("ISS API URL: " + query2URL);
    
    
        $.ajax({
            url: query2URL,
            method: "GET"
        })
        .then(function(response2) {
                
            console.log(response2);
                
        });
    });
});