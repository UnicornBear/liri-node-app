    // require 
    var defaultRequest = require("dotenv").config();
    var request = require("request");
    var Spotify = require("node-spotify-api");
    var fs = require("fs");
    var keys = require("./keys.js");
    var moment = require("moment");

    // get action and userInput for search
    var action = process.argv[2];
    var userInput = process.argv.slice(3).join(" ");


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
            console.log('=====-------------------------------=====');
            console.log("Artist(s): " + songs[0].artists[0].name);
            console.log("Song Name: " + songs[0].name);
            console.log("Preview Link: " + songs[0].preview_url);
            console.log("Album: " + songs[0].album.name);
            console.log('=====-------------------------------=====');
	});
};

//concert-this function
function concert(userInput) {
    // queryURL for the Town Artist Events API
    var queryURL = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp";

    // data request for queryURL
    request(queryURL, function(error,response,data) {
        // json parse body
        var jsonData = JSON.parse(data);
          for(var i in jsonData) {
           temp = jsonData[i].datetime;
           console.log('Artist(s):' + process.argv[3]);
           console.log('Venue Name:' + jsonData[i].venue.name);
           console.log('date: ' + moment(temp).format('DD/MM/YYYY'));
           console.log('City/Country: ' + jsonData[i].venue.city + ', ' + jsonData[i].venue.country)
           console.log('Location : ' + jsonData[i].venue.latitude + ', ' + jsonData[i].venue.longitude);
           console.log('=====-------------------------------=====');
        }
    });
};

// movie-this function
function movie(userInput) {
    // creat variable for URL and userInput
    var queryURL = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=af0a456a";
    //axios request -  did not place anything for error or response, but was added since in documentation
	request(queryURL, function(error, response, data) {
        var jsonData =  JSON.parse(data)
		    console.log("Title: " + jsonData.Title);
		    console.log("Release Year: " + jsonData.Year);
		    console.log("IMDB Rating: " + jsonData.imdbRating);
		    console.log("Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value);
		    console.log("Country: " + jsonData.Country);
		    console.log("Language: " + jsonData.Language);
		    console.log("Plot: " + jsonData.Plot);
		    console.log("Actors: " + jsonData.Actors);
		
	});
};

// do what it says function
function  doWhatIt() {
        // use the fs. readfile package to get action and userInput
        fs.readFile('random.txt', "utf8", function(error, data){
        //test to random2 for concert-this and movie-this
        // fs.readFile('random2.txt', "utf8", function(error, data){
            if (error) {
                return console.log(error);
              }
            var dataArr = data.split(",");
    
            if (dataArr[0] === "spotify-this-song") {
                var songName = dataArr[1].slice(1, -1);
                spotify(songName);
            } else if (dataArr[0] === "concert-this") {
                var concertName = dataArr[1].slice(1, -1);
                concert(concertName);
            } else if(dataArr[0] === "movie-this") {
                var movieName = dataArr[1].slice(1, -1);
                movie(movieName);
            }
    });
};
