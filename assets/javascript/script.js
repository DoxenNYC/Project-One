//Testing and figuring out how the AJAX call for the twitch API works
//Keeps erroring 400
$("#test-Btn").on("click", function () {
    var input = $("#testsearch").val().trim();
    $.ajax({

        type: "GET",
        url: "https://api.twitch.tv/kraken/users?login=" + input,
        headers: {
            "Client-ID": "axjhfp777tflhy0yjb5sftsil",
            "Accept": "application/vnd.twitchtv.v5+json"
        },
    }).then(function (response) {
        console.log(response);
    });

})