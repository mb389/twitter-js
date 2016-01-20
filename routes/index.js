
module.exports = function (io) {
  var express = require('express');
  var router = express.Router();
  // could use one line instead: var router = require('express').Router();
  var tweetBank = require('../tweetBank');
  var bodyParser = require('body-parser');

	// create application/json parser
	var jsonParser = bodyParser.json();
	// create application/x-www-form-urlencoded parser
	var urlencodedParser = bodyParser.urlencoded({ extended: false });

  router.get('/', function (req, res) {
    var tweets = tweetBank.list();
    res.render( 'index', { title: 'Twitter.js', tweets: tweets, showForm: true } );
  });

  router.get('/users/:name', function(req, res) {
    var name = req.params.name;
    var list = tweetBank.find( {name: name} );
    res.render( 'index', { title: 'Twitter.js - Posts by '+ name, tweets: list, showForm: true } );
  });

  router.get('/users/:name/tweets/:id', function(req, res) {
    var name = req.params.name;
    var id = parseInt(req.params.id);
    var list = tweetBank.find( {name: name, id: id} );
    res.render( 'index', { title: 'Twitter.js - Tweet number ' + id + ' by '+ name, tweets: list, showForm: false } );
  });

  router.post('/submit', urlencodedParser, function(req, res) {
    var name = req.body.name;
    var text = req.body.text;
    var newTweet = tweetBank.add(name, text);
    io.sockets.emit('new_tweet', newTweet);
    res.redirect('/');
  });

  return router;
};
