
    var defaultRequest = require("dotenv").config();
    var request = require("request");
    var Spotify = require("node-spotify-api");

    var action = process.argv[2];
    var userInput = process.argv[3];

    var keys = require("./keys.js");

    // need moment package for the concert-this function
    var moment = require("moment");

// switch function for the desired actions [2]
// movie-this  |  do-what-it-says  |  spotify-this-song  |  concert-this
switch (action) {

	case "spotify-this-song":
	spotify(userInput);
    break;
    
    case "concert-this":
	concert(userInput);
	break;

	case "movie-this":
	movie(userInput);
	break;

	case "do-what-it-says":
	doWhatIt();
	break;
};

// spotify-this-song function
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

//concert-this function
function concert(userInput) {
    // queryURL for the Town Artist Events API
    var queryURL = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp";

    // data request for queryURL
    request(queryURL, function(error,response,data){
        // json parse body
        var jsonData = JSON.parse(data);
          for(var i in jsonData) {
           temp = jsonData[i].datetime;
           console.log('Artist(s):' + process.argv[3]);
           console.log('Venue Name:' + jsonData[i].venue.name);
           console.log('date: ' + moment(temp).format('DD/MM/YYYY'));
           console.log('City/Country: ' + jsonData[i].venue.city + ', ' + jsonData[i].venue.country)
           console.log('Location : ' + jsonData[i].venue.latitude + ', ' + jsonData[i].venue.longitude);
           console.log('=========================================');
        }
    });
};