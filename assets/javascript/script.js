//Testing and figuring out how the AJAX call for the twitch API works
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


    }).then(function (response) {
        console.log(response);
        var gameMSRP = response.items[0].msrp;

        $("#price").html("Price: " + gameMSRP);
    })

})
$("#test-Btn").on("click", function (event) {
    event.preventDefault();
    var input = $("#testsearch").val().trim();
    $.ajax({
        url: "https://api-endpoint.igdb.com/games/?search="+ input +"&fields=*&limit=!",
        method: "GET",
        headers: {
            "user-key": "64bac0cd3f7f63493f86d418dc5f3363",
            Accept: "application/json"
        }
    }).then(function (response) {
        console.log(response);
        console.log(response[0].name);
        $("#title").text("title " + response[0].name);
    });
})


$("#test-Btn").on("click", function (event) {
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
            width: 754,
            height: 380,
            channel: twitchDisplayName //search input goes here
        });
    });
})
        


        // for (i = 0; i < response.length; i++) {
        //     $("#title").append(response[i].brandName);
        //     $("#price").append(response[i].salePrice);
        //     $("#rating").append(response[i].customerRating);


       

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


