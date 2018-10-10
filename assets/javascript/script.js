//Testing and figuring out how the AJAX call for the twitch API works
//If it errors 400, check Client ID(update)
jQuery.ajaxPrefilter(function (options) {
    if (options.crossDomain && jQuery.support.cors) {
        options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    }
});

$("#test-Btn").on("click", function () {
    event.preventDefault();
    var input = $("#testsearch").val().trim();
    $.ajax({
        type: "GET",
        url: "http://api.walmartlabs.com/v1/search?apiKey=knmwws2qd2rtru6gzrcbehms&query=" + input,


    }).then(function(response){
        console.log(response);
        var gameMSRP = response.items[0].msrp;
        $("#price").html("Price: " + gameMSRP);
    })

})

$("#test-Btn").on("click", function () {
    event.preventDefault();
    var input = $("#testsearch").val().trim();
    $.ajax({

        type: "GET",
        url: "https://api.twitch.tv/kraken/streams/?game=" + input,
        headers: {
            "Client-ID": "3h185ufea6321xhqh2fawi17uy1uoy",
            "Accept": "application/vnd.twitchtv.v5+json"
        },
    }).then(function (response) {
        $("#twitch-embed").empty();
        console.log(response)
        var twitchDisplayName = response.streams[0].channel.display_name;
        new Twitch.Embed("twitch-embed", {
            width: 854,
            height: 480,
            channel: twitchDisplayName //search input goes here
        });
    });
})

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCAyx-aQJ1mQFEvJABqPnyU88rWI45b8js",
    authDomain: "groupproject1-5531a.firebaseapp.com",
    databaseURL: "https://groupproject1-5531a.firebaseio.com",
    projectId: "groupproject1-5531a",
    storageBucket: "groupproject1-5531a.appspot.com",
    messagingSenderId: "320551251443"
  };
  firebase.initializeApp(config);
    var database = firebase.database();
  var clickCounter = 0;
  $("#test-Btn").on("click", function() {
    clickCounter++;
    database.ref().set({
        clickCount: clickCounter
      });
    });


