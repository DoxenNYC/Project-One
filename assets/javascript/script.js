//Testing and figuring out how the AJAX call for the twitch API works
//Testing and figuring out how the AJAX call for the twitch API works
//If it errors 400, check Client ID(update)
jQuery.ajaxPrefilter(function (options) {
    if (options.crossDomain && jQuery.support.cors) {
        options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    }
});


//   Initialize Firebase
var config = {
    apiKey: "AIzaSyDidMgp5MjZqGj-XEKLJLkR2SbgTLj6hdM",
    authDomain: "groupproject-c4be9.firebaseapp.com",
    databaseURL: "https://groupproject-c4be9.firebaseio.com",
    projectId: "groupproject-c4be9",
    storageBucket: "groupproject-c4be9.appspot.com",
    messagingSenderId: "250785848685"
  };
  firebase.initializeApp(config);

  var database = firebase.database()

$("#test-Btn").on("click", function () {
    event.preventDefault();
    var input = $("#testsearch").val().trim();
    $.ajax({
        type: "GET",
        url: "http://api.walmartlabs.com/v1/search?apiKey=knmwws2qd2rtru6gzrcbehms&query=" + input,


    }).then(function (response) {
        console.log(response);
        var gameMSRP = response.items[0].msrp;

        $("#price").html("Price: $" + gameMSRP + " USD");
    })

})
$("#test-Btn").on("click", function (event) {
    event.preventDefault();
    var input = $("#testsearch").val().trim();
    $.ajax({
        url: "https://api-endpoint.igdb.com/games/?search=" + input + "&fields=*&limit=!",
        method: "GET",
        headers: {
            "user-key": "64bac0cd3f7f63493f86d418dc5f3363",
            Accept: "application/json"
        }
    }).then(function (response) {
        console.log(response);
        console.log(response[0].name);
        $("#title").text("Title: " + response[0].name);
        var rating = response[0].total_rating;
        console.log(rating);
        $("#customerRating").html("Customer Rating out of 100: " + rating)
        var cover = response[0].cover.url;
        var newPic = $("<img>");
        newPic.attr("src", `http:${cover}`);
        newPic.css({ "width": "150px", "height": "150px" });
        $("#photogame").html(newPic);
    });
})

var clickCounter;
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
        
        clickCounter++;
        database.ref().set({
            clickCount: clickCounter
        });

    });
})





database.ref().on("value", function(snapshot) {
    //changes the text inside heartHolder to the value of the snapshot of firebaseNumberOfHearts
    console.log("yo")
    console.log(snapshot.val())
    clickCounter = snapshot.val().clickCount
    $("#count").html(clickCounter + " games have been searched using this site!");

})
