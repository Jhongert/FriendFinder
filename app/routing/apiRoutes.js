// Dependencies
var express = require('express');
var path = require('path');
var fs = require('fs');

// Get an instance of router
var router = express.Router();

//Get the data file
var friendsData = path.join(__dirname, '../data/friends.js');

// Read the data file
// If no error convert it to javascript object with JSON.parse
// and asign it to object friends
var friends = {};
fs.readFile(friendsData, 'utf8', function(err, data){
	if(err) throw err;
	friends = JSON.parse(data);
});


//Get Route  /api/friends
router.get('/friends', function(req, res){
	// Return the object friends
	res.json(friends);
});

//Post Route  /api/friends
router.post('/friends', function(req, res){

	//Convert the array scores to integers
	for(var i = 0; i < req.body.scores.length; i++){
		req.body.scores[i] = parseInt(req.body.scores[i]);
	}

	// Get the scores array from the request
	var scores = req.body.scores;

	// Asign temp values to bestMatch and bestScore
	var bestMatch = 0;
	var bestScore = 99;

	// Loop the object "friends". This object has an array of objects
	for(var i = 0; i < friends.data.length; i++){
		var difference = 0;

		// Get the scores of the current friend in the array
		var friendScore = friends.data[i].scores;

		// Loop the array "friendScores"
		for(var j = 0; j < friendScore.length; j++){
			// Get the difference from the scores of the current friend and the one from the survey
		 	difference += Math.abs(friendScore[j] - scores[j]);
		 	
		}
		// If the difference between both scores is less than bestScore
	 	if(difference < bestScore){
	 		bestScore = difference;
	 		bestMatch = i; // Store the position of the friend tha has the best match
	 	}
	}

	// Insert the new friend in the array of friends
	friends.data.push(req.body);

	//Write the object to the file
	fs.writeFile(friendsData, JSON.stringify(friends, null, 4), function(err) {
		if(err) {
			return console.log(err);
		}
	});

	// Send a response with the best match
	res.send(friends.data[bestMatch]);
});

module.exports = router;