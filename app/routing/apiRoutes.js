var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

var filePath = path.join(__dirname, '../data/friends.js');

var friends = JSON.parse(fs.readFileSync(filePath, 'utf8'));

router.get('/friends', function(req, res){
	res.json(friends);
});

router.post('/friends', function(req, res){
	var scores = req.body.scores;
	var bestMatch = 0;
	var bestScore = 99;

	//console.log(req.body);

	
	for(var i = 0; i < friends.data.length; i++){
		var difference = 0;
		
		 for(var j = 0; j < 10; j++){
		 	difference += Math.abs(parseInt(friends.data[i].scores[j]) - scores[j]);
		 	if(difference < bestScore){
		 		bestScore = difference;
		 		bestMatch = i;
		 	}
		 }
	}
	friends.data.push(req.body);
	fs.writeFile(filePath, JSON.stringify(friends, null, 4), function(err) {
		if(err) {
			return console.log(err);
		}
	});

	res.send(friends.data[bestMatch]);
});

module.exports = router;