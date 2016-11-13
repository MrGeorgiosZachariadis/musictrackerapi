'use strict'

const request = require('request')
try {
	if (process.argv.length < 2) {
		throw 'missing parameter'
  }
  const artist_name = process.argv[2]
  if (process.argv[3] == "undefined"){
     var url = ("https://itunes.apple.com/search?term=${artist_name}")
  }else{
     const artist_lastname = process.argv[3]
     var url = (`https://itunes.apple.com/search?term=${artist_name}+${artist_lastname}`)
}

request.get( url, (err, res, body) => {
			if (err) {
				throw 'could not complete request'
			}
		const json = JSON.parse(body)
		const output = JSON.stringify(json, null, 2)
		if (getValues(json,"resultCount") !== "0"){
			throw 'Artist Not Found in iTunes Database'
		}
  	var tracklist = getValues(json,"trackName")
		console.log(tracklist)
				 }
    );
}
		  catch(err) {
			console.log(err)
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
