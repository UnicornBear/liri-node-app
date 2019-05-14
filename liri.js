
    var defaultRequest = require("dotenv").config();
    var request = require("request");
    var Spotify = require("node-spotify-api");

    var action = process.argv[2];
    var userInput = process.argv[3];

    var keys = require("./keys.js");


// switch function for the desired actions [2]
// movie-this  |  do-what-it-says  |  spotify-this-song  |  concert-this
switch (action) {
	case "concert-this":
	concert(userInput);
	break;

	case "spotify-this-song":
	spotify(userInput);
	break;

	case "movie-this":
	movie(userInput);
	break;

	case "do-what-it-says":
	doWhatIt();
	break;
};

// spotify-this-song
function spotify(userInput) {

	var spotify = new Spotify(keys.spotify);

		spotify.search({ type: 'track', query: userInput }, function(err, data) {
			if (err){
	            console.log('Error occurred: ' + err);
	            return;
	        }

	        var songs = data.tracks.items;
          console.log('=========================================');
	        console.log("Artist(s): " + songs[0].artists[0].name);
	        console.log("Song Name: " + songs[0].name);
	        console.log("Preview Link: " + songs[0].preview_url);
	        console.log("Album: " + songs[0].album.name);
          console.log('=========================================');
	});
};
