'use strict'

const request = require('request')

var search_tracks_by_name = function (artist_full_name, callback) {
		const artist = artist_full_name.replace(' ','+')
		var url = ("https://itunes.apple.com/search?term="+artist)
		request.get( url, (err, res, body) => {
      if (err) {
						throw 'could not complete request'}
				const json = JSON.parse(body)
				const output = JSON.stringify(json, null, 2)
        if (getValues(json,"resultCount") == "0"){
					 throw 'Artist Not Found in iTunes Database'
				} else {
          var tracklist = getValues(json,"trackName");
    console.log(tracklist);
        }
    })
   }

var search_by_name = function (artist_full_name, callback) {
		const artist = artist_full_name.replace(' ','+')
		var url = ("https://itunes.apple.com/search?term="+artist)
		request.get( url, (err, res, body) => {
      if (err) {
						throw 'could not complete request'}
				const json = JSON.parse(body)
				const output = JSON.stringify(json, null, 2)
        if (getValues(json,"resultCount") == "0"){
					 throw 'Artist Not Found in iTunes Database'
				} else {
           search_by_name(acallback)

        }
    })
   }

function getValues(obj, key) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getValues(obj[i], key));
        } else if (i == key) {
            objects.push(obj[i]);
        }
    }
    return objects;
}

//Lab Demo
// check username exists
var check = function(artist_full_name) {
  	const artist = artist_full_name.replace(' ','+')
    search_by_name(artist, function(err, result) {
        if (err) {
            // it didn't work i.e. not found
            console.error(err)
            throw new Error("Error Occured while search for result")
        } else {
            // success: i.e. result has a value
            console.log("The result is now being displayed below :")
            console.log(result)
        }
    })
}
check("Martin Garrix")
console.log(search_by_name("Martin Garrix"))
