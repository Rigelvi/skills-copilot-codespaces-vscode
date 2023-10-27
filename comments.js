
// Create web server
var express = require('express');
var app = express();

// Set up the database
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/comments');

// Define the schema
var Comment = require('./models/comment.js');

// Set up the logger
var logger = require('morgan');
app.use(logger());

// Set up the body parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set up the static file server
app.use(express.static(__dirname + '/public'));

// Set up the routes
app.get('/comments', function(req, res) {
	Comment.find(function(err, comments) {
		if (err) {
			console.log(err);
		} else {
			res.json(comments);
		}
	});
});

app.post('/comments', function(req, res) {
	var comment = new Comment({