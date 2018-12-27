$(document).ready(function(){

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

     //history list
     let histArray = [];
     if(histArray.length < 6){
       histArray.unshift(location); 
     }else{
       histArray.pop();
       histArray.unshift(location);
     }     

     let listDiv = $("<div>");
     let listShell = $("<ul>");

     for(let i = 0; i < histArray.length; i++){
       listItem = listShell.append("<li>" + histArray[i] + "</li>")
     }

     listDiv.empty();
     listDiv.append(listShell);

     $(".tabContent").html(listDiv);
  });

  //rocket man
  var intervaId;

  intervalId = setInterval(() => { $('#rocketMan').tooltip('show')}, 3000)

  $('#rocketMan').on("click", function(){
      console.log("hi!")
      $('#rocketMan').tooltip('hide')
      clearInterval(intervalId);
      $('#rocketMan').attr('title', 'Random Info!')
      $('#rocketMan').popover('show')
  });


  //tab animations
  $(".nav_tab_body").on("click", function(){
    console.log("hi!");
    if($(this).attr("data-state") === 'still'){
      $(this).addClass("tabsSlide");
      $(this).attr('data-state', 'animate');
    }else if($(this).attr("data-state") === 'animate'){
      $(this).removeClass("tabsSlide")
      $(this).attr("data-state", 'still');
    }
  });

});