// Dependencies
var express = require('express');
var path = require('path');

// get an instance of router
var router = express.Router();

//Survey page
router.get('/survey', function(req, res){
	res.sendFile(path.join(__dirname,'../public/survey.html'));
});

//Home page
router.use(function(req, res, next){
	res.sendFile(path.join(__dirname,'../public/home.html'));
});

module.exports = router;