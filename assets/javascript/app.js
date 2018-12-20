var config = {
    apiKey: "AIzaSyCTB2ONqGvJBBqRGg7FMr2Q8xfnH0Ejdqo",
    authDomain: "project-1-904b8.firebaseapp.com",
    databaseURL: "https://project-1-904b8.firebaseio.com",
    projectId: "project-1-904b8",
    storageBucket: "",
    messagingSenderId: "356456726650"
  };
  
  firebase.initializeApp(config);

//Click event for submitting user location
$("#searchButton").on("click", function(event) {
    event.preventDefault();

    var location = $("#location-input").val().trim();

    $("#show-input").val("");
});