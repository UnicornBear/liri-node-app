
// info for Spotify API

require("dotenv").config();

    var Spotify = require("node-spotify-api");
    var keys = require("./keys.js");
    var spotify = new Spotify(keys.spotify);

 
// request return
    var request = require("request");

// action request ( )
var action = process.argv[2];

